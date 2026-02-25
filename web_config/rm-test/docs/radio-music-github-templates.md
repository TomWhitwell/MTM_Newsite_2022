# Radio Music Mk2 GitHub Templates

## Included templates
- Bug report template:
  - Canonical (GitHub): `.github/ISSUE_TEMPLATE/radio-music-bug-report.md`
  - Raw copy/paste: [radio-music-bug-report.md.txt](../docs/templates/radio-music-bug-report.md.txt)
- Test finding template:
  - Canonical (GitHub): `.github/ISSUE_TEMPLATE/radio-music-test-finding.md`
  - Raw copy/paste: [radio-music-test-finding.md.txt](../docs/templates/radio-music-test-finding.md.txt)

## Usage
1. Choose the template matching what you found.
2. Fill every field, especially firmware build ID, test ID, and exact repro steps.
3. Attach evidence (audio/video/scope/images/logs) for non-trivial failures.

## Reporting standard
A report is actionable when it includes:
- exact Test ID from the relevant tier script (`core`, `standard`, or `full`),
- exact settings snippet,
- exact repro sequence,
- expected vs observed behavior,
- reproducibility estimate.
