/* 7주 커스텀 — 장 넘김: 지금 페이지가 흐려지며 떠오르고, 다음 페이지가 흐림에서 또렷해지며 내려앉는다 (my-style.css '장 넘김')
   도착 표시(is-arriving)는 <head>의 한 줄 스크립트가 첫 화면 그리기 전에 붙인다 */
(function () {
  var html = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { sessionStorage.removeItem('veil'); } catch (e) {}
  if (html.classList.contains('is-arriving')) {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      html.classList.add('is-arrived'); html.classList.remove('is-arriving');
      setTimeout(function () { html.classList.remove('is-arrived'); }, 1100);
    }); });
  }
  if (reduce) return;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || !/\.html$|\/$/.test(url.pathname)) return;
    e.preventDefault();
    try { sessionStorage.setItem('veil', '1'); } catch (err) {}
    html.classList.add('is-leaving');
    setTimeout(function () { location.href = a.href; }, 450);
  });
  window.addEventListener('pageshow', function (ev) { if (ev.persisted) html.classList.remove('is-leaving', 'is-arriving', 'is-arrived'); });
})();
