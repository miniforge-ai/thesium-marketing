// Theme toggle. The pre-paint read of localStorage is inlined in each
// page's <head>; this only wires the button and keeps its label honest
// when no explicit choice has been made and the system preference wins.
(function () {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  if (!button) return;

  const systemLight = window.matchMedia('(prefers-color-scheme: light)');

  function isLight() {
    return root.dataset.theme ? root.dataset.theme === 'light' : systemLight.matches;
  }

  function render() {
    const next = isLight() ? 'dark' : 'light';
    button.textContent = next;
    button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  button.addEventListener('click', function () {
    root.dataset.theme = isLight() ? 'dark' : 'light';
    try {
      localStorage.setItem('thesium-theme', root.dataset.theme);
    } catch (e) {
      // Private browsing or blocked storage: the choice applies to this
      // page view and is simply not remembered.
    }
    render();
  });

  systemLight.addEventListener('change', function () {
    if (!root.dataset.theme) render();
  });

  render();
})();
