(() => {
  const paths = JSON.parse(document.getElementById('case-page-paths').textContent);
  const key = path => path.replace(/\/$/, '').toLowerCase();
  const requested = key(location.pathname);
  const matches = paths.filter(path => key(path) === requested);

  // Stay on the 404 if there's no unique match or the target itself failed.
  if (matches.length === 1 && matches[0] !== location.pathname) {
    location.replace(matches[0] + location.search + location.hash);
  }
})();
