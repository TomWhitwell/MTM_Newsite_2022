#!/usr/bin/env ruby
# frozen_string_literal: true

require 'fileutils'
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
  'PulseIn1' => 'pulse_1',
  'PulseIn2' => 'pulse_2'
}.freeze
API_OUTPUT_KEYS = {
  'AudioOut1' => 'audio_out_l',
  'AudioOut2' => 'audio_out_r',
  'CVOut1' => 'cv_out_1',
  'CVOut2' => 'cv_out_2',
  'PulseOut1' => 'pulse_out_1',
  'PulseOut2' => 'pulse_out_2'
}.freeze
KNOB_KEYS = %w[main x y].freeze
Z_MODES = %w[up middle down].freeze

options = {
  source: ENV['WORKSHOP_COMPUTER_DIR'],
  output: '_data/program_cards/cards.yml',
  pages: '_program_cards',
  tags: '_data/program_cards/tags.yml',
  repo: ENV['WORKSHOP_COMPUTER_REPO'] || DEFAULT_REPO,
  web_ref: ENV['WORKSHOP_COMPUTER_WEB_REF'] || ENV['WORKSHOP_COMPUTER_REF'] || 'main'
}

OptionParser.new do |opts|
  opts.banner = 'Usage: ruby scripts/import_program_cards.rb --source ../Workshop_Computer [options]'
  opts.on('--source PATH', 'Workshop_Computer checkout containing releases/*/info.yaml') { |v| options[:source] = v }
  opts.on('--output PATH', 'cards.yml output path') { |v| options[:output] = v }
  opts.on('--pages PATH', '_program_cards output path') { |v| options[:pages] = v }
  opts.on('--tags PATH', 'tags.yml file to pre-populate with missing card IDs') { |v| options[:tags] = v }
  opts.on('--repo OWNER/REPO', 'GitHub repo used for generated links') { |v| options[:repo] = v }
  opts.on('--web-ref REF', 'GitHub ref used for generated source/raw links') { |v| options[:web_ref] = v }
end.parse!

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

config_path = '_data/program_cards/import.yml'
if File.exist?(config_path)
  config = YAML.load_file(config_path) || {}
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

def card_number(id)
  id.to_s.split('_', 2).first
end

def titleize_id(id)
  id.to_s.sub(/^\d+_?/, '').tr('_-', ' ').split.map(&:capitalize).join(' ')
end

def compact_panel_label(name)
  text = name.to_s.strip.gsub(%r{\s*/\s*}, ' / ')
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
  name = field(item, 'name', 'Name') || field(item, 'id')
  out = {
    'label' => compact_panel_label(name),
    'description' => field(item, 'description', 'Description').to_s.strip,
    'source' => source
  }
  type = field(item, 'type')
  out['type'] = type if type && type != ''
  out.delete('description') if out['description'].empty?
  out
end

def normalize_socket_list(items, mapping)
  result = {}
  Array(items).each do |item|
    api_id = field(item, 'id')
    slot = mapping[api_id.to_s]
    next unless slot

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
  parts << "Z #{z}" if z && z != ''
  parts << layer.to_s if layer && layer != ''
  parts << gesture.to_s if gesture && gesture != ''
  parts.empty? ? 'Default' : parts.map(&:to_s).join(', ')
end

def summarize_knob_row(row)
  KNOB_KEYS.map do |key|
    knob = field(row, key)
    next unless knob.is_a?(Hash)

    name = field(knob, 'name')
    next unless name && name != ''

    "#{key.upcase}: #{name}"
  end.compact.join('; ')
end

def normalize_controls(info)
  rows = Array(field(field(info, 'controls'), 'knobs'))
  primary = rows.find do |row|
    context = row_when(row)
    field(context, 'z').to_s == 'middle' && !field(context, 'layer') && !field(context, 'gesture')
  end || rows.find { |row| KNOB_KEYS.any? { |key| field(row, key).is_a?(Hash) } }

  controls = {}
  if primary
    KNOB_KEYS.each do |key|
      knob = field(primary, key)
      next unless knob.is_a?(Hash)

      name = field(knob, 'name')
      next unless name && name != ''

      controls[key] = {
        'label' => compact_panel_label(name),
        'description' => field(knob, 'description').to_s.strip,
        'source' => 'info.yaml'
      }
      controls[key].delete('description') if controls[key]['description'].empty?
    end
  end

  z_rows = rows.select { |row| field(row_when(row), 'z') }
  down_action = z_rows.find { |row| field(row_when(row), 'z').to_s == 'down' && field(row, 'main').is_a?(Hash) }
  if down_action
    knob = field(down_action, 'main')
    name = field(knob, 'name')
    controls['z'] = {
      'label' => compact_panel_label(name),
      'description' => field(knob, 'description').to_s.strip,
      'source' => 'info.yaml'
    }
    controls['z'].delete('description') if controls['z']['description'].empty?
  elsif z_rows.any?
    controls['z'] = { 'label' => 'Mode', 'description' => 'Selects alternate control modes.', 'source' => 'info.yaml' }
  end

  controls
end

def normalize_switch_modes(info)
  modes = { 'up' => '', 'middle' => '', 'down' => '' }
  rows = Array(field(field(info, 'controls'), 'knobs'))
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

def normalize_leds(info)
  rows = Array(field(field(info, 'controls'), 'leds'))
  rows.map do |row|
    items = Array(field(row, 'items'))
    next if items.empty?

    names = items.map { |item| field(item, 'name') }.compact.join('; ')
    next if names.empty?

    "#{row_context_label(row)}: #{names}."
  end.compact
end

def youtube_id(url)
  return nil unless url && url != ''

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
  editor = field(info, 'Editor')
  entry = field(info, 'web-entry') || 'index.html'
  return nil if editor.to_s.downcase == 'none'
  return editor if editor.to_s.start_with?('http://', 'https://')

  folder = nil
  if editor.nil? || editor.to_s.strip.empty?
    folder = 'web' if Dir.exist?(File.join(card_dir, 'web'))
  elsif %w[web dist].include?(editor.to_s)
    folder = editor.to_s
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
Dir.glob(File.join(source_root, 'releases', '*', 'info.yaml')).sort_by { |path| File.basename(File.dirname(path)) }.each do |info_path|
  card_dir = File.dirname(info_path)
  id = File.basename(card_dir)
  info = YAML.load_file(info_path) || {}
  number = card_number(id)
  slug = slugify(id.tr('_', '-'))
  title = field(info, 'Name', 'Title') || titleize_id(id)
  version = field(info, 'Version')
  description = field(info, 'Description').to_s.strip
  release = version && version != '' ? "#{number} / #{version}" : number
  demo_link = field(info, 'demo-link')
  video_id = youtube_id(demo_link)
  editor = editor_url(info, card_dir, slug, pages_base)
  download_url = first_uf2_url(card_dir, id, raw_base)
  source_url = "#{repo_url}/tree/#{options[:web_ref]}/releases/#{id}"
  readme_url = "#{repo_url}/blob/#{options[:web_ref]}/releases/#{id}/README.md"

  panel_info = field(info, 'panel') || {}
  normalized = {
    'id' => id,
    'title' => title,
    'release' => release,
    'summary' => description,
    'description' => description,
    'panel' => {
      'controls' => normalize_controls(info),
      'inputs' => normalize_socket_list(field(panel_info, 'inputs'), API_INPUT_KEYS),
      'outputs' => normalize_socket_list(field(panel_info, 'outputs'), API_OUTPUT_KEYS)
    },
    'switch_modes' => normalize_switch_modes(info),
    'leds' => normalize_leds(info),
    'notes' => [],
    'source' => ["releases/#{id}/info.yaml", "releases/#{id}/README.md"],
    'slug' => slug,
    'url' => "/workshopsystem/program-cards/#{slug}/",
    'tags' => Array(field(info, 'tags')).flat_map { |tag| tag.to_s.split(',') }.map(&:strip).reject(&:empty?),
    'source_file' => "releases/#{id}/info.yaml",
    'source_url' => source_url,
    'readme_url' => readme_url,
    'download_url' => download_url || source_url,
    'metadata' => {
      'creator' => field(info, 'Creator'),
      'language' => field(info, 'Language'),
      'version' => version,
      'status' => field(info, 'Status'),
      'license' => field(info, 'License'),
      'repository' => field(info, 'repository'),
      'contact' => field(info, 'contact')
    }.delete_if { |_key, value| value.nil? || value == '' }
  }

  manual = field(info, 'manual')
  normalized['documentation'] = { 'intro' => manual } if manual && manual.to_s.strip != ''
  normalized['videos'] = [{ 'title' => 'Demo video', 'url' => demo_link, 'id' => video_id }] if demo_link && video_id
  normalized['metadata']['editor_url'] = editor if editor
  normalized['metadata']['editor_note'] = 'Configure this card in your browser' if editor

  host = field(info, 'host')
  if host.is_a?(Hash)
    usb = Array(field(host, 'usb'))
    usb.each do |entry|
      name = field(entry, 'name')
      desc = field(entry, 'description')
      normalized['notes'] << [name, desc].compact.join(': ') if name || desc
    end
    host_notes = field(host, 'notes')
    normalized['notes'] << host_notes if host_notes && host_notes.to_s.strip != ''
  end
  normalized.delete('notes') if normalized['notes'].empty?
  normalized['panel'].delete('controls') if normalized['panel']['controls'].empty?
  normalized['panel'].delete('inputs') if normalized['panel']['inputs'].empty?
  normalized['panel'].delete('outputs') if normalized['panel']['outputs'].empty?

  cards << normalized
end

cards.sort_by! { |card| [card['id'].to_s[/^\d+/].to_i, card['id']] }

output_path = File.expand_path(options[:output])
FileUtils.mkdir_p(File.dirname(output_path))
File.write(output_path, "# Generated from Workshop_Computer releases/*/info.yaml. Do not edit by hand; edit source YAML or curation files.\n" + YAML.dump(cards).sub(/^---\n/, ''))

pages_dir = File.expand_path(options[:pages])
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
tags_path = File.expand_path(options[:tags])
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

puts "Imported #{cards.length} program cards from #{source_root}"
puts "Wrote #{output_path}"
puts "Wrote #{cards.length} page wrappers to #{pages_dir}"
