// Mobile nav overlay
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  function openMenu() {
    nav.classList.add('open');
    toggle.classList.add('open');
    toggle.textContent = '✕';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.textContent = '☰';
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
});
