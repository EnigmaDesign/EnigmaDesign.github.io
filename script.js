// ── Typewriter (main + subtitle loop) ──
(function() {
  const mainText = 'Hi, this is Luca.';
  const subPhrases = [
    'The PM you were looking for.',
    'I design products people actually want.',
    'Leading projects to success.',
    'Bridging vision and execution.',
    'Turning ideas into products.'
  ];

  const mainEl   = document.getElementById('typewriter');
  const subEl    = document.getElementById('typewriter-sub');
  const cursor   = document.querySelector('.cursor');

  // Type main title first
  let i = 0;
  setTimeout(function typeMain() {
    mainEl.textContent = mainText.slice(0, i);
    i++;
    if (i <= mainText.length) {
      setTimeout(typeMain, 80);
    } else {
      // Start subtitle loop after a short pause
      setTimeout(() => loopSub(0), 600);
      // Fade cursor after main done
      setTimeout(() => {
        cursor.style.transition = 'opacity .5s';
        cursor.style.opacity = '0';
      }, 3000);
    }
  }, 400);

  function loopSub(phraseIndex) {
    const phrase = subPhrases[phraseIndex % subPhrases.length];
    typePhrase(phrase, 0, () => {
      // pause, then erase
      setTimeout(() => erasePhrase(phrase.length, () => {
        setTimeout(() => loopSub(phraseIndex + 1), 300);
      }), 1800);
    });
  }

  function typePhrase(phrase, j, done) {
    subEl.textContent = phrase.slice(0, j);
    if (j <= phrase.length) {
      setTimeout(() => typePhrase(phrase, j + 1, done), 60);
    } else {
      done();
    }
  }

  function erasePhrase(len, done) {
    subEl.textContent = subEl.textContent.slice(0, len);
    if (len > 0) {
      setTimeout(() => erasePhrase(len - 1, done), 35);
    } else {
      done();
    }
  }
})();

// ── Slider state ──
const sliders = {
  skills: { current: 0, total: 0, track: 'skillsTrack', dots: 'skillsDots' },
  proj:   { current: 0, total: 0, track: 'projTrack',   dots: 'projDots'   },
  cert:   { current: 0, total: 0, track: 'certTrack',   dots: 'certDots'   }
};

function initSlider(id) {
  const s = sliders[id];
  const track = document.getElementById(s.track);
  s.total = track.children.length;
  const dotsContainer = document.getElementById(s.dots);
  for (let i = 0; i < s.total; i++) {
    const d = document.createElement('div');
    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(id, i);
    dotsContainer.appendChild(d);
  }
  updateSlider(id);
}

function goTo(id, index) {
  const s = sliders[id];
  s.current = (index + s.total) % s.total;
  updateSlider(id);
}

function slide(id, dir) {
  const s = sliders[id];
  s.current = (s.current + dir + s.total) % s.total;
  updateSlider(id);
}

function updateSlider(id) {
  const s = sliders[id];
  const track = document.getElementById(s.track);
  const dots  = document.getElementById(s.dots).children;
  track.style.transform = `translateX(-${s.current * 100}%)`;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('active', i === s.current);
  }
}

// Auto-play
function autoPlay(id, interval) {
  setInterval(() => slide(id, 1), interval);
}

initSlider('skills');
initSlider('proj');
initSlider('cert');
autoPlay('skills', 5000);
autoPlay('proj', 4500);
autoPlay('cert', 4000);

// Drag/swipe support (touch + mouse)
function addDrag(wrapperId, id) {
  const el = document.getElementById(wrapperId).querySelector('.slider-track-outer');
  let startX = 0, isDragging = false;

  // Touch
  el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) slide(id, dx < 0 ? 1 : -1);
  });

  // Mouse
  el.addEventListener('mousedown', e => {
    startX = e.clientX; isDragging = true;
    el.classList.add('dragging');
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => { /* track but no live movement needed */ });
  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    el.classList.remove('dragging');
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) slide(id, dx < 0 ? 1 : -1);
  });
}
addDrag('skillsSlider', 'skills');
addDrag('projSlider', 'proj');
addDrag('certSlider', 'cert');

// ── Language switcher ──
(function() {
  const switcher = document.getElementById('langSwitcher');
  const label    = document.getElementById('langLabel');
  const menu     = document.getElementById('langMenu');
  if (!switcher) return;

  const langs = { en: 'English (US)', it: 'Italiano', fr: 'Français' };
  let current = 'en';

  switcher.addEventListener('click', e => {
    switcher.classList.toggle('open');
    e.stopPropagation();
  });

  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', e => {
      current = opt.dataset.lang;
      label.textContent = langs[current];
      document.querySelectorAll('.lang-opt').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      switcher.classList.remove('open');
      e.stopPropagation();
    });
  });

  document.addEventListener('click', () => switcher.classList.remove('open'));
})();

// ── Scroll fade-up reveal ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));