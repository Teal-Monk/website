// TealMonk v3 — shared scripts: scroll reveal + mobile menu
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

// Ask Monk — recreated streaming answer animation (only runs where the section exists)
(function () {
  var demo = document.querySelector('.ask .frag');
  if (!demo) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var answer = function () { demo.classList.remove('is-searching'); demo.classList.add('is-answered'); };
  var search = function () { demo.classList.remove('is-answered'); demo.classList.add('is-searching'); };
  if (reduce) { answer(); return; }
  var cycle = function () { search(); setTimeout(answer, 2500); };
  var start = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { cycle(); setInterval(cycle, 9200); start.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  start.observe(demo);
})();
