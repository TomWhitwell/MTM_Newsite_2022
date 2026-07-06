#!/usr/bin/env ruby
# frozen_string_literal: true

require 'date'
require 'fileutils'
require 'open3'
require 'optparse'
require 'time'
require 'uri'
require 'yaml'

DEFAULT_REPO = 'TomWhitwell/Workshop_Computer'
API_INPUT_KEYS = {
  'AudioIn1' => 'audio_l',
  'AudioIn2' => 'audio_r',
  'CVIn1' => 'cv_1',
  'CVIn2' => 'cv_2',
  'CV1' => 'cv_1',
  'CV2' => 'cv_2',
  'PulseIn1' => 'pulse_1',
  'PulseIn2' => 'pulse_2',
  'Pulse1' => 'pulse_1',
  'Pulse2' => 'pulse_2'
}.freeze
API_OUTPUT_KEYS = {
  'AudioOut1' => 'audio_out_l',
  'AudioOut2' => 'audio_out_r',
  'CVOut1' => 'cv_out_1',
  'CVOut2' => 'cv_out_2',
  'PulseOut1' => 'pulse_out_1',
  'PulseOut2' => 'pulse_out_2'
}.freeze
SLOT_KEY_ALIASES = {
  'audio_out_1' => 'audio_out_l',
  'audio_out_2' => 'audio_out_r',
  'audio_in_1' => 'audio_l',
  'audio_in_2' => 'audio_r'
}.freeze
KNOB_KEYS = %w[main x y].freeze
Z_MODES = %w[up middle down].freeze

options = {
  site: ENV['MTM_NEWSITE_DIR'],
  source: ENV['WORKSHOP_COMPUTER_DIR'],
  output: '_data/program_cards/cards.yml',
  pages: '_program_cards',
  tags: '_data/program_cards/tags.yml',
  repo: ENV['WORKSHOP_COMPUTER_REPO'] || DEFAULT_REPO,
  web_ref: ENV['WORKSHOP_COMPUTER_WEB_REF'] || ENV['WORKSHOP_COMPUTER_REF'] || 'main'
}

OptionParser.new do |opts|
  opts.banner = 'Usage: ruby scripts/import_program_cards.rb --source ../Workshop_Computer [options]'
  opts.on('--site PATH', 'MTM_Newsite_2022 checkout to write generated data/pages into') { |v| options[:site] = v }
  opts.on('--source PATH', 'Workshop_Computer checkout containing releases/*/info.yaml') { |v| options[:source] = v }
  opts.on('--output PATH', 'cards.yml output path') { |v| options[:output] = v }
  opts.on('--pages PATH', '_program_cards output path') { |v| options[:pages] = v }
  opts.on('--tags PATH', 'tags.yml file to pre-populate with missing card IDs') { |v| options[:tags] = v }
  opts.on('--repo OWNER/REPO', 'GitHub repo used for generated links') { |v| options[:repo] = v }
  opts.on('--web-ref REF', 'GitHub ref used for generated source/raw links') { |v| options[:web_ref] = v }
end.parse!

site_root = options[:site] ? File.expand_path(options[:site]) : Dir.pwd

def normalize_key(key)
  key.to_s.downcase.gsub(/[-_\s]/, '')
end

def field(hash, *names)
  return nil unless hash.is_a?(Hash)

  names.each do |name|
    return hash[name] if hash.key?(name)
    normalized = normalize_key(name)
    hash.each do |key, value|
      return value if normalize_key(key) == normalized
    end
  end
  nil
end

def load_yaml_file(path, warnings = nil)
  YAML.safe_load(File.read(path), permitted_classes: [Date, Time], aliases: true) || {}
rescue Psych::Exception => e
  warnings << "Could not parse YAML: #{e.class}: #{e.message}" if warnings
  {}
rescue StandardError => e
  warnings << "Could not read YAML: #{e.class}: #{e.message}" if warnings
  {}
end

def text_value(value, fallback = '')
  case value
  when nil
    fallback
  when Date
    value.iso8601
  when Time
    value.iso8601
  when Hash, Array
    fallback
  else
    value.to_s.strip
  end
end

def required_text(value, warnings, field_name, fallback = 'n/a')
  case value
  when nil
    warnings << "#{field_name} missing; using #{fallback.inspect}." if warnings
    fallback
  when Hash, Array
    warnings << "#{field_name} should be text; using #{fallback.inspect}." if warnings
    fallback
  else
    text = text_value(value)
    if text.empty?
      warnings << "#{field_name} blank; using #{fallback.inspect}." if warnings
      fallback
    else
      text
    end
  end
end

def optional_text(value, warnings = nil, field_name = nil)
  case value
  when nil
    ''
  when Hash, Array
    warnings << "#{field_name} should be text; using n/a." if warnings && field_name
    'n/a'
  else
    text_value(value)
  end
end

def list_value(value, warnings = nil, field_name = nil)
  case value
  when nil
    []
  when Array
    value
  else
    warnings << "#{field_name} should be a list; coerced single value to a list." if warnings && field_name
    [value]
  end
end

def hash_value(value, warnings = nil, field_name = nil)
  return value if value.is_a?(Hash)

  warnings << "#{field_name} should be a map/object; ignored #{value.class}." if warnings && field_name && !value.nil?
  {}
end

def sanitize_value(value)
  case value
  when Hash
    value.each_with_object({}) do |(key, child), out|
      out[text_value(key, 'unknown')] = sanitize_value(child)
    end
  when Array
    value.map { |child| sanitize_value(child) }
  when Date
    value.iso8601
  when Time
    value.iso8601
  when NilClass, String, Integer, Float, TrueClass, FalseClass
    value
  else
    value.to_s
  end
end

config_path = File.join(site_root, '_data/program_cards/import.yml')
if File.exist?(config_path)
  config = load_yaml_file(config_path)
  import_config = field(config, 'workshop_computer') || {}
  options[:repo] = ENV['WORKSHOP_COMPUTER_REPO'] || field(import_config, 'repo') || options[:repo]
  options[:web_ref] = ENV['WORKSHOP_COMPUTER_WEB_REF'] || ENV['WORKSHOP_COMPUTER_REF'] || field(import_config, 'ref') || options[:web_ref]
end

abort 'Missing --source or WORKSHOP_COMPUTER_DIR' unless options[:source]
source_root = File.expand_path(options[:source])
abort "Workshop Computer source not found: #{source_root}" unless Dir.exist?(File.join(source_root, 'releases'))

repo_url = "https://github.com/#{options[:repo]}"
raw_base = "https://raw.githubusercontent.com/#{options[:repo]}/#{options[:web_ref]}"
pages_base = "https://tomwhitwell.github.io/Workshop_Computer"

def slugify(value)
  value.to_s.downcase.gsub(/[^a-z0-9]+/, '-').gsub(/^-|-$/, '')
end

def mapped_slot(mapping, value)
  key = text_value(value)
  return mapping[key] if mapping[key]
  return SLOT_KEY_ALIASES[key] if SLOT_KEY_ALIASES[key]

  normalized = normalize_key(key)
  mapping.each do |map_key, slot|
    return slot if normalize_key(map_key) == normalized
  end
  SLOT_KEY_ALIASES.each do |alias_key, slot|
    return slot if normalize_key(alias_key) == normalized
  end
  nil
end

def truthy?(value)
  case value
  when true then true
  when false, nil then false
  else
    %w[true yes y 1].include?(value.to_s.strip.downcase)
  end
end

def site_path(site_root, path)
  File.absolute_path(path.to_s.start_with?('/') ? path : File.join(site_root, path))
end

def git_date(source_root, release_id, mode)
  args = ['git', '-C', source_root, 'log', '--format=%cs', '--', "releases/#{release_id}"]
  out, status = Open3.capture2(*args)
  return '' unless status.success?

  dates = out.lines.map(&:strip).reject(&:empty?)
  mode == :first ? dates.last.to_s : dates.first.to_s
rescue StandardError
  ''
end

def normalized_date(value, warnings = nil, field_name = nil)
  text = optional_text(value, warnings, field_name)
  return '' if text.empty?

  return text if text.match?(/\A\d{4}-\d{2}-\d{2}\z/)

  warnings << "#{field_name} should be YYYY-MM-DD; using n/a." if warnings && field_name
  'n/a'
end

def card_number(id)
  id.to_s.split('_', 2).first
end

def titleize_id(id)
  id.to_s.sub(/^\d+_?/, '').tr('_-', ' ').split.map(&:capitalize).join(' ')
end

def compact_panel_label(name)
  text = text_value(name).strip.gsub(%r{\s*/\s*}, ' / ')
  return '' if text.empty?

  replacements = {
    'External' => 'Ext',
    'Channel' => 'Chan',
    'Quantized' => 'Quant',
    'Modulation' => 'Mod',
    'Divide' => 'Div',
    'Multiply' => 'Mult',
    'Randomness' => 'Random',
    'Trigger' => 'Trig',
    'Output' => 'Out',
    'Input' => 'In',
    'Preset Select' => 'Preset',
    'Pattern' => 'Patt'
  }
  replacements.each { |from, to| text = text.gsub(/\b#{Regexp.escape(from)}\b/i, to) }
  words = text.split
  lines = []
  line = ''
  words.each do |word|
    candidate = line.empty? ? word : "#{line} #{word}"
    if candidate.length <= 12
      line = candidate
    else
      lines << line unless line.empty?
      line = word
    end
  end
  lines << line unless line.empty?
  lines = lines.first(2)
  label = lines.join("\n")
  label.length > 24 ? label[0, 23].rstrip : label
end

def normalize_socket(item, source)
  item = hash_value(item)
  name = field(item, 'label', 'name', 'Name') || field(item, 'id')
  out = {
    'label' => compact_panel_label(name),
    'description' => text_value(field(item, 'description', 'Description')),
    'source' => source
  }
  type = text_value(field(item, 'type'))
  out['type'] = type if type && type != ''
  out.delete('description') if out['description'].empty?
  out
end

def normalize_socket_list(items, mapping, warnings = nil, field_name = 'panel sockets')
  result = {}
  slot_keys = mapping.values

  if items.is_a?(Hash)
    items.each do |key, value|
      key = text_value(key)
      item = hash_value(value, warnings, "#{field_name}.#{key}")
      aliased_key = mapped_slot(mapping, key) || key
      if slot_keys.include?(aliased_key)
        result[aliased_key] = normalize_socket(item.merge('id' => key), 'info.yaml')
      else
        api_id = text_value(field(item, 'id'))
        slot = mapped_slot(mapping, api_id)
        if slot
          result[slot] = normalize_socket(item, 'info.yaml')
        else
          warnings << "Unknown #{field_name} socket key #{key.inspect}; ignored." if warnings
        end
      end
    end
    return result
  end

  list_value(items, warnings, field_name).each do |item|
    unless item.is_a?(Hash)
      warnings << "#{field_name} entry should be a map/object; ignored #{item.class}." if warnings
      next
    end

    api_id = text_value(field(item, 'id'))
    slot = mapped_slot(mapping, api_id)
    unless slot
      warnings << "Unknown #{field_name} socket id #{api_id.inspect}; ignored." if warnings && !api_id.empty?
      next
    end

    result[slot] = normalize_socket(item, 'info.yaml')
  end
  result
end

def row_when(row)
  value = field(row, 'when')
  value.is_a?(Hash) ? value : {}
end

def row_context_label(row)
  context = row_when(row)
  parts = []
  z = field(context, 'z')
  layer = field(context, 'layer')
  gesture = field(context, 'gesture')
  z = text_value(z)
  layer = text_value(layer)
  gesture = text_value(gesture)
  parts << "Z #{z}" if z && z != ''
  parts << layer if layer && layer != ''
  parts << gesture if gesture && gesture != ''
  parts.empty? ? 'Default' : parts.map(&:to_s).join(', ')
end

def summarize_knob_row(row)
  KNOB_KEYS.map do |key|
    knob = field(row, key)
    next unless knob.is_a?(Hash)

    name = text_value(field(knob, 'name'))
    next if name.empty?

    "#{key.upcase}: #{name}"
  end.compact.join('; ')
end

def normalize_controls(info, warnings = nil)
  direct_controls = field(field(info, 'panel'), 'controls')
  if direct_controls.is_a?(Hash)
    controls = {}
    %w[main x y z].each do |key|
      control = direct_controls[key]
      next unless control.is_a?(Hash)

      label = text_value(field(control, 'label', 'name'), key)
      controls[key] = {
        'label' => compact_panel_label(label),
        'description' => optional_text(field(control, 'description'), warnings, "panel.controls.#{key}.description"),
        'source' => text_value(field(control, 'source'), 'info.yaml')
      }
      controls[key].delete('description') if controls[key]['description'].empty?
    end
    return controls unless controls.empty?
  end

  rows = list_value(field(field(info, 'controls'), 'knobs'), warnings, 'controls.knobs')
  primary = rows.find do |row|
    context = row_when(row)
    field(context, 'z').to_s == 'middle' && !field(context, 'layer') && !field(context, 'gesture')
  end || rows.find { |row| KNOB_KEYS.any? { |key| field(row, key).is_a?(Hash) } }

  controls = {}
  if primary
    KNOB_KEYS.each do |key|
      knob = field(primary, key)
      next unless knob.is_a?(Hash)

      name = text_value(field(knob, 'name'))
      next if name.empty?

      controls[key] = {
        'label' => compact_panel_label(name),
        'description' => optional_text(field(knob, 'description'), warnings, "controls.knobs.#{key}.description"),
        'source' => 'info.yaml'
      }
      controls[key].delete('description') if controls[key]['description'].empty?
    end
  end

  z_rows = rows.select { |row| field(row_when(row), 'z') }
  down_action = z_rows.find { |row| field(row_when(row), 'z').to_s == 'down' && field(row, 'main').is_a?(Hash) }
  if down_action
    knob = field(down_action, 'main')
    name = text_value(field(knob, 'name'))
    controls['z'] = {
      'label' => compact_panel_label(name),
      'description' => optional_text(field(knob, 'description'), warnings, 'controls.knobs.z.description'),
      'source' => 'info.yaml'
    }
    controls['z'].delete('description') if controls['z']['description'].empty?
  elsif z_rows.any?
    controls['z'] = { 'label' => 'Mode', 'description' => 'Selects alternate control modes.', 'source' => 'info.yaml' }
  end

  controls
end

def normalize_switch_modes(info, warnings = nil)
  modes = { 'up' => '', 'middle' => '', 'down' => '' }
  direct_modes = field(info, 'switch_modes')
  if direct_modes.is_a?(Hash)
    Z_MODES.each { |mode| modes[mode] = optional_text(field(direct_modes, mode), warnings, "switch_modes.#{mode}") }
    return modes
  end

  controls_switch = field(field(info, 'controls'), 'switch')
  if controls_switch.is_a?(Hash)
    Z_MODES.each do |mode|
      item = field(controls_switch, mode)
      modes[mode] = if item.is_a?(Hash)
        name = optional_text(field(item, 'name'), warnings, "controls.switch.#{mode}.name")
        description = optional_text(field(item, 'description'), warnings, "controls.switch.#{mode}.description")
        [name, description].reject(&:empty?).join(': ')
      else
        optional_text(item, warnings, "controls.switch.#{mode}")
      end
    end
    return modes
  end

  rows = list_value(field(field(info, 'controls'), 'knobs'), warnings, 'controls.knobs')
  Z_MODES.each do |mode|
    summaries = rows.select { |row| field(row_when(row), 'z').to_s == mode }.map do |row|
      summary = summarize_knob_row(row)
      context = row_context_label(row)
      summary.empty? ? nil : "#{context}: #{summary}."
    end.compact
    modes[mode] = summaries.join(' ')
  end
  modes
end

def normalize_leds(info, warnings = nil)
  direct_leds = field(info, 'leds')
  if direct_leds
    return direct_leds.lines.map(&:strip).reject(&:empty?) if direct_leds.is_a?(String)

    return list_value(direct_leds, warnings, 'leds').map { |led| text_value(led) }.reject(&:empty?)
  end

  rows = list_value(field(field(info, 'controls'), 'leds'), warnings, 'controls.leds')
  rows.map do |row|
    items = list_value(field(row, 'items'), warnings, 'controls.leds.items')
    next if items.empty?

    names = items.map { |item| text_value(field(item, 'name')) }.reject(&:empty?).join('; ')
    next if names.empty?

    "#{row_context_label(row)}: #{names}."
  end.compact
end

def youtube_id(url)
  url = text_value(url)
  return nil if url.empty?

  uri = URI.parse(url) rescue nil
  return nil unless uri

  host = uri.host.to_s.downcase
  if host.include?('youtu.be')
    uri.path.split('/').reject(&:empty?).first
  elsif host.include?('youtube.com')
    if uri.path.include?('/embed/') || uri.path.include?('/shorts/')
      uri.path.split('/').reject(&:empty?).last
    else
      params = URI.decode_www_form(uri.query.to_s).to_h
      params['v']
    end
  end
end

def editor_url(info, card_dir, slug, pages_base)
  editor = text_value(field(info, 'Editor'))
  entry = text_value(field(info, 'web-entry'), 'index.html')
  return nil if editor.downcase == 'none'
  return editor if editor.start_with?('http://', 'https://')

  folder = nil
  if editor.nil? || editor.to_s.strip.empty?
    folder = 'web' if Dir.exist?(File.join(card_dir, 'web'))
  elsif %w[web dist].include?(editor)
    folder = editor
  end
  folder ? "#{pages_base}/programs/#{slug}/#{folder}/#{entry}" : nil
end

def first_uf2_url(card_dir, id, raw_base)
  uf2s = Dir.glob(File.join(card_dir, '**', '*.uf2')).sort
  uf2 = uf2s.reject { |path| path.split(File::SEPARATOR).any? { |part| part.downcase == 'old' || part.downcase == 'old versions' } }.first || uf2s.first
  return nil unless uf2

  relative = uf2.delete_prefix(card_dir + File::SEPARATOR).split(File::SEPARATOR).map do |part|
    URI.encode_www_form_component(part).gsub('+', '%20')
  end.join('/')
  "#{raw_base}/releases/#{id}/#{relative}"
end

cards = []
all_warnings = []
Dir.glob(File.join(source_root, 'releases', '*', 'info.yaml')).sort_by { |path| File.basename(File.dirname(path)) }.each do |info_path|
  card_dir = File.dirname(info_path)
  id = File.basename(card_dir)
  import_warnings = []
  info = load_yaml_file(info_path, import_warnings)
  unless info.is_a?(Hash)
    import_warnings << "Top-level YAML should be a map/object; ignored #{info.class}."
    info = {}
  end
  number = card_number(id)
  slug = slugify(id.tr('_', '-'))
  title = required_text(field(info, 'Name', 'Title'), import_warnings, 'Name', titleize_id(id))
  release_text = optional_text(field(info, 'release'), import_warnings, 'release')
  version = optional_text(field(info, 'Version'), import_warnings, 'Version')
  version = release_text.split('/', 2).last.to_s.strip if version.empty? && release_text.include?('/')
  description = required_text(field(info, 'Description'), import_warnings, 'Description', 'n/a')
  release = release_text.empty? ? (version && version != '' ? "#{number} / #{version}" : number) : release_text
  created_at = normalized_date(field(info, 'created', 'created_at'), import_warnings, 'created')
  created_at = git_date(source_root, id, :first) if created_at.empty?
  created_at = 'n/a' if created_at.empty?
  updated_at = normalized_date(field(info, 'date', 'updated', 'updated_at'), import_warnings, 'date')
  updated_at = git_date(source_root, id, :last) if updated_at.empty?
  updated_at = 'n/a' if updated_at.empty?
  demo_link = optional_text(field(info, 'demo-link'), import_warnings, 'demo-link')
  video_id = youtube_id(demo_link)
  editor = editor_url(info, card_dir, slug, pages_base)
  download_url = first_uf2_url(card_dir, id, raw_base)
  source_url = "#{repo_url}/tree/#{options[:web_ref]}/releases/#{id}"
  readme_url = "#{repo_url}/blob/#{options[:web_ref]}/releases/#{id}/README.md"

  panel_info = hash_value(field(info, 'panel'), import_warnings, 'panel')
  normalized = {
    'id' => id,
    'title' => title,
    'draft' => truthy?(field(info, 'draft', 'Draft')),
    'release' => release,
    'summary' => description,
    'description' => description,
    'panel' => {
      'controls' => normalize_controls(info, import_warnings),
      'inputs' => normalize_socket_list(field(panel_info, 'inputs'), API_INPUT_KEYS, import_warnings, 'panel.inputs'),
      'outputs' => normalize_socket_list(field(panel_info, 'outputs'), API_OUTPUT_KEYS, import_warnings, 'panel.outputs')
    },
    'switch_modes' => normalize_switch_modes(info, import_warnings),
    'leds' => normalize_leds(info, import_warnings),
    'notes' => [],
    'source' => ["releases/#{id}/info.yaml", "releases/#{id}/README.md"],
    'slug' => slug,
    'url' => "/workshopsystem/program-cards/#{slug}/",
    'tags' => list_value(field(info, 'tags'), import_warnings, 'tags').flat_map { |tag| text_value(tag).split(',') }.map(&:strip).reject(&:empty?),
    'source_file' => "releases/#{id}/info.yaml",
    'source_url' => source_url,
    'readme_url' => readme_url,
    'download_url' => download_url || source_url,
    'metadata' => {
      'creator' => optional_text(field(info, 'Creator'), import_warnings, 'Creator'),
      'language' => optional_text(field(info, 'Language'), import_warnings, 'Language'),
      'version' => version,
      'status' => optional_text(field(info, 'Status'), import_warnings, 'Status'),
      'license' => optional_text(field(info, 'License'), import_warnings, 'License'),
      'created' => created_at,
      'updated' => updated_at,
      'repository' => optional_text(field(info, 'repository'), import_warnings, 'repository'),
      'contact' => sanitize_value(field(info, 'contact'))
    }.delete_if { |_key, value| value.nil? || value == '' || value == {} || value == [] }
  }

  manual = optional_text(field(info, 'manual'), import_warnings, 'manual')
  normalized['documentation'] = { 'intro' => manual } unless manual.empty?
  normalized['videos'] = [{ 'title' => 'Demo video', 'url' => demo_link, 'id' => video_id }] if !demo_link.empty? && video_id
  normalized['metadata']['editor_url'] = editor if editor
  normalized['metadata']['editor_note'] = 'Configure this card in your browser' if editor

  host = field(info, 'host')
  if host.is_a?(Hash)
    usb = list_value(field(host, 'usb'), import_warnings, 'host.usb')
    usb.each do |entry|
      entry = hash_value(entry, import_warnings, 'host.usb entry')
      name = optional_text(field(entry, 'name'), import_warnings, 'host.usb.name')
      desc = optional_text(field(entry, 'description'), import_warnings, 'host.usb.description')
      note = [name, desc].reject(&:empty?).join(': ')
      normalized['notes'] << note unless note.empty?
    end
    host_notes = optional_text(field(host, 'notes'), import_warnings, 'host.notes')
    normalized['notes'] << host_notes unless host_notes.empty?
  end
  normalized.delete('notes') if normalized['notes'].empty?
  normalized['panel'].delete('controls') if normalized['panel']['controls'].empty?
  normalized['panel'].delete('inputs') if normalized['panel']['inputs'].empty?
  normalized['panel'].delete('outputs') if normalized['panel']['outputs'].empty?
  all_warnings << [id, import_warnings.uniq] unless import_warnings.empty?

  cards << sanitize_value(normalized)
end

cards.sort_by! { |card| [card['id'].to_s[/^\d+/].to_i, card['id']] }

def stable_yaml(value)
  YAML.dump(value).sub(/^---\n/, '').gsub(/^(\s*)y:/, '\1"y":')
end

output_path = site_path(site_root, options[:output])
FileUtils.mkdir_p(File.dirname(output_path))
File.write(output_path, "# Generated from Workshop_Computer releases/*/info.yaml. Do not edit by hand; edit source YAML or curation files.\n" + stable_yaml(cards))

pages_dir = site_path(site_root, options[:pages])
FileUtils.mkdir_p(pages_dir)
cards.each do |card|
  page = <<~PAGE
    ---
    layout: program_card
    title: #{card['title'].to_s.inspect}
    card_id: #{card['id'].inspect}
    permalink: #{card['url'].inspect}
    ---
  PAGE
  File.write(File.join(pages_dir, "#{card['slug']}.md"), page)
end

# Preserve the human-editable tag file, but append missing card IDs so moderators can curate without hunting exact IDs.
tags_path = site_path(site_root, options[:tags])
if File.exist?(tags_path)
  tag_text = File.read(tags_path)
  existing = tag_text.scan(/^\s{2}["']?([^"':\n]+)["']?:/).flatten
  missing = cards.reject { |card| existing.include?(card['id']) }
  unless missing.empty?
    addition = missing.map do |card|
      "\n  # #{card['release'].to_s.split('/').first.strip} #{card['title']}\n  #{card['id'].inspect}: []\n"
    end.join
    File.write(tags_path, tag_text.rstrip + "\n" + addition)
  end
end

warning_count = all_warnings.sum { |_id, warnings| warnings.length }
puts "Imported #{cards.length} program cards from #{source_root}"
puts "Import warnings: #{warning_count}"
all_warnings.each do |id, warnings|
  warnings.each { |warning| warn "#{id}: #{warning}" }
end
puts "Wrote #{output_path}"
puts "Wrote #{cards.length} page wrappers to #{pages_dir}"
