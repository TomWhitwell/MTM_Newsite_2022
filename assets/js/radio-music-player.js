(() => {
  const audio = document.querySelector('[data-library-audio]');
  const rows = Array.from(document.querySelectorAll('[data-track]'));
  if (!audio || rows.length === 0) return;

  let activeRow = null;
  let animationFrame = null;
  let loadToken = 0;

  const buttonFor = row => row.querySelector('.track-play');
  const cursorFor = row => row.querySelector('.spectrogram__cursor');

  function setProgress(row, fraction) {
    if (!row) return;
    cursorFor(row).style.left = `${Math.max(0, Math.min(1, fraction)) * 100}%`;
  }

  function setButtonState(row, playing) {
    if (!row) return;
    const button = buttonFor(row);
    row.classList.toggle('is-playing', playing);
    button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${row.dataset.title}`);
  }

  function selectRow(row) {
    if (activeRow === row) return;
    if (activeRow) {
      setButtonState(activeRow, false);
      setProgress(activeRow, 0);
    }
    activeRow = row;
    audio.src = row.dataset.audio;
    audio.load();
  }

  function playRow(row, seekFraction = null) {
    selectRow(row);
    const token = ++loadToken;
    const begin = () => {
      if (token !== loadToken || activeRow !== row) return;
      if (seekFraction !== null && Number.isFinite(audio.duration)) {
        audio.currentTime = seekFraction * audio.duration;
      }
      audio.play().catch(() => setButtonState(row, false));
    };
    if (audio.readyState >= 1) begin();
    else audio.addEventListener('loadedmetadata', begin, { once: true });
  }

  function updateCursor() {
    if (activeRow && Number.isFinite(audio.duration) && audio.duration > 0) {
      setProgress(activeRow, audio.currentTime / audio.duration);
    }
    if (!audio.paused && !audio.ended) animationFrame = requestAnimationFrame(updateCursor);
  }

  rows.forEach(row => {
    buttonFor(row).addEventListener('click', () => {
      if (activeRow === row && !audio.paused) audio.pause();
      else playRow(row);
    });

    row.querySelector('.spectrogram').addEventListener('click', event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const fraction = (event.clientX - bounds.left) / bounds.width;
      playRow(row, Math.max(0, Math.min(1, fraction)));
    });
  });

  audio.addEventListener('play', () => {
    setButtonState(activeRow, true);
    cancelAnimationFrame(animationFrame);
    updateCursor();
  });
  audio.addEventListener('pause', () => setButtonState(activeRow, false));
  audio.addEventListener('ended', () => {
    setButtonState(activeRow, false);
    setProgress(activeRow, 0);
  });
  audio.addEventListener('error', () => {
    if (!activeRow) return;
    setButtonState(activeRow, false);
    buttonFor(activeRow).setAttribute('aria-label', `Could not play ${activeRow.dataset.title}`);
  });
})();

