/* 7주 커스텀 — 키워드 칩이 카드가 화면에 들어오면 하나씩 떨어진다 (my-style.css '키워드 칩') */
(function () {
  var cards = document.querySelectorAll('.cs-intro__card');
  if (!cards.length) return;
  function drop(card) {
    card.querySelectorAll('.cs-tag').forEach(function (t, i) { t.style.setProperty('--i', i); });
    card.classList.add('is-drop');
  }
  if (!('IntersectionObserver' in window)) { cards.forEach(drop); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { drop(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.3 });
  cards.forEach(function (c) { io.observe(c); });
})();
/* 7주 커스텀 — 홈 마지막 글: 화면에 들어오면 한 줄씩 차례로 떠오른다 (my-style.css '.cs-finale') */
(function () {
  var s = document.querySelector('.cs-finale');
  if (!s) return;
  s.querySelectorAll('.cs-finale__line').forEach(function (p, i) { p.style.setProperty('--i', i); });
  if (!('IntersectionObserver' in window)) { s.classList.add('is-read'); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { s.classList.add('is-read'); io.disconnect(); } });
  }, { threshold: 0.25 });
  io.observe(s);
})();
