/**
 * Bible book study page: scroll reveal, accordion, checklist progress.
 */
(function (global) {
  function initReveal() {
    const els = document.querySelectorAll('.ux-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in global)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.06, 0.36)}s`;
      io.observe(el);
    });
  }

  function initAccordions() {
    document.querySelectorAll('.sec-btn').forEach((btn) => {
      const body = btn.nextElementSibling;
      if (!body?.classList.contains('sec-body')) return;
      const icon = btn.querySelector('span');
      btn.setAttribute('aria-expanded', 'false');
      btn.onclick = () => {
        const open = body.classList.toggle('show');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (icon) icon.textContent = open ? '−' : '＋';
      };
    });
  }

  function initVerseCards() {
    document.querySelectorAll('.verse-card').forEach((card) => {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      const toggle = () => card.classList.toggle('open');
      card.onclick = toggle;
      card.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      };
    });
  }

  function initChecklistProgress() {
    const box = document.getElementById('checklist');
    if (!box) return;
    const bar = document.createElement('div');
    bar.className = 'checklist-progress';
    bar.innerHTML = '<div class="checklist-progress-fill"></div>';
    box.before(bar);
    const fill = bar.querySelector('.checklist-progress-fill');

    function update() {
      const inputs = box.querySelectorAll('input[type="checkbox"]');
      if (!inputs.length) return;
      const done = [...inputs].filter((i) => i.checked).length;
      fill.style.width = `${(done / inputs.length) * 100}%`;
    }
    box.addEventListener('change', update);
    update();
  }

  function initLinkPills() {
    document.querySelectorAll('main a.rounded-full').forEach((a) => {
      a.classList.add('ux-link-pill');
    });
  }

  function init() {
    initReveal();
    initAccordions();
    initVerseCards();
    initChecklistProgress();
    initLinkPills();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.BookStudyUX = { init };
})(typeof window !== 'undefined' ? window : globalThis);
