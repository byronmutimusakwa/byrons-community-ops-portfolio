(function(){
  // Today's date, memo-style (e.g. 02 SEP 2026)
  var opts = { day: '2-digit', month: 'short', year: 'numeric' };
  var dateStr = new Date().toLocaleDateString('en-US', opts).toUpperCase();
  var d1 = document.getElementById('today-date');
  var d2 = document.getElementById('today-date-2');
  if (d1) d1.textContent = dateStr;
  if (d2) d2.textContent = dateStr;

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });

    var ticker = document.querySelector('.ticker');
    if (ticker) {
      var tickerIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            tickerIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      tickerIo.observe(ticker);
    }
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
    var tk = document.querySelector('.ticker');
    if (tk) tk.classList.add('is-visible');
  }

  // Sticky bar
  var stickybar = document.getElementById('stickybar');
  var masthead = document.querySelector('.masthead');
  if (stickybar && masthead) {
    var threshold = masthead.offsetTop + masthead.offsetHeight + 40;
    window.addEventListener('scroll', function(){
      if (window.scrollY > threshold) {
        stickybar.classList.add('is-shown');
      } else {
        stickybar.classList.remove('is-shown');
      }
    }, { passive: true });
  }

  // Ticket expand/collapse
  document.querySelectorAll('.ticket__head').forEach(function(btn){
    btn.addEventListener('click', function(){
      var ticket = btn.closest('.ticket');
      var isOpen = ticket.getAttribute('data-open') === 'true';
      ticket.setAttribute('data-open', isOpen ? 'false' : 'true');
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });
})();
