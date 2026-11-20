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
    // close any open mobile dropdowns
    nav.querySelectorAll('.nav-item.mob-open').forEach(function(item) {
      item.classList.remove('mob-open');
    });
  }

  toggle.addEventListener('click', function () {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Mobile dropdown: clicking a .has-dropdown parent link toggles sub-menu
  nav.querySelectorAll('.nav-item.has-dropdown > a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var isMobile = window.innerWidth <= 860;
      if (!isMobile) return;
      e.preventDefault();
      var item = link.closest('.nav-item');
      var wasOpen = item.classList.contains('mob-open');
      nav.querySelectorAll('.nav-item.mob-open').forEach(function(i) { i.classList.remove('mob-open'); });
      if (!wasOpen) item.classList.add('mob-open');
    });
  });

  // Sub-menu links close the drawer
  nav.querySelectorAll('.dd-menu a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Direct nav links (not inside dropdowns) close the drawer
  nav.querySelectorAll('a:not(.dd-menu a):not(.nav-item > a)').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
});
