// Popy v3 — shared scripts: scroll reveal + mobile menu
(function () {
  // Scroll-reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Mobile menu
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    var setOpen = function (open) {
      links.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !burger.contains(e.target)) {
        setOpen(false);
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }
})();
