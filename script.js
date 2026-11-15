(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Staggered scroll reveal
  var groups = {};
  document.querySelectorAll('.reveal').forEach(function(el){
    var sec = el.closest('section') || document.body;
    var key = sec.id || 'root';
    groups[key] = groups[key] || 0;
    el.style.transitionDelay = reduce ? '0ms' : (groups[key] * 90) + 'ms';
    groups[key]++;
  });
  if(!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  // Counting stats
  function animateCount(el){
    var raw = el.textContent.trim();
    var match = raw.match(/^(\d+)(M?)$/);
    if(!match){ return; }
    var target = parseInt(match[1], 10);
    var suffix = match[2] || '';
    if(reduce){ return; }
    var start = null, dur = 1100;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if(p < 1){ requestAnimationFrame(step); } else { el.textContent = target + suffix; }
    }
    requestAnimationFrame(step);
  }
  var statNums = document.querySelectorAll('.stat .num');
  if('IntersectionObserver' in window){
    var statIo = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ animateCount(e.target); statIo.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    statNums.forEach(function(el){ statIo.observe(el); });
  }

  // Gentle tilt on cards
  if(!reduce && window.matchMedia('(pointer: fine)').matches){
    document.querySelectorAll('.arm, .post').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(600px) rotateX(' + (y * -4) + 'deg) rotateY(' + (x * 4) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
    });
  }

  // Mobile menu toggle
  var menuBtn = document.querySelector('.menu-btn');
  var navlinks = document.querySelector('.navlinks');
  if(menuBtn && navlinks){
    menuBtn.addEventListener('click', function(){
      navlinks.classList.toggle('open');
      menuBtn.textContent = navlinks.classList.contains('open') ? '✕' : '☰';
    });
  }
})();
