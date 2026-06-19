(function(){
  // Mobile menu toggle
  var burger = document.querySelector('[data-burger]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'flex' : 'none';
    });
    var closeLinks = mobileMenu.querySelectorAll('a');
    closeLinks.forEach(function(a) {
      a.addEventListener('click', function() { mobileMenu.style.display = 'none'; });
    });
  }

  // Back-to-top button
  var btn = document.querySelector('[data-totop]');
  if (btn) {
    btn.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });
    var shown = null;
    (function tick(){
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      var show = y > 600;
      if (show !== shown) {
        shown = show;
        btn.style.opacity = show ? '1' : '0';
        btn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
        btn.style.pointerEvents = show ? 'auto' : 'none';
      }
      requestAnimationFrame(tick);
    })();
  }

  // Scroll reveal animations
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  var showAll = function() { revealEls.forEach(function(el) { el.style.opacity = '1'; el.style.transform = 'none'; }); };

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function(el) { io.observe(el); });
    requestAnimationFrame(function() {
      revealEls.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
    });
  }

  // Handle style-hover attributes
  document.querySelectorAll('[style-hover]').forEach(function(el) {
    var hoverStyle = el.getAttribute('style-hover');
    var originalStyle = el.getAttribute('style') || '';
    var pairs = hoverStyle.split(';').filter(Boolean);
    var hoverProps = {};
    pairs.forEach(function(p) {
      var kv = p.split(':');
      if (kv.length >= 2) hoverProps[kv[0].trim()] = kv.slice(1).join(':').trim();
    });

    el.addEventListener('mouseenter', function() {
      Object.keys(hoverProps).forEach(function(k) { el.style.setProperty(k, hoverProps[k]); });
    });
    el.addEventListener('mouseleave', function() {
      el.setAttribute('style', originalStyle);
    });
  });

  // Contact form handling
  var form = document.querySelector('[data-contact-form]');
  var formCard = document.querySelector('[data-form-card]');
  var successCard = document.querySelector('[data-success-card]');
  if (form && formCard && successCard) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      formCard.style.display = 'none';
      successCard.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
