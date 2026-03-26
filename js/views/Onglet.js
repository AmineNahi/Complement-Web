/*
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
    t.classList.remove('active-tab');
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
    });
    panels.forEach(p => p.hidden = true);

    tab.classList.add('active-tab');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    panels[i].hidden = false;
  });
});
*/