document.addEventListener('DOMContentLoaded', function () {

// =============================================================================
// MARCY JOURNAL — Main Script
// =============================================================================

// =============================================================================
// SECTION 1 — Sound paths & volume constants
// =============================================================================
const LANDING_SOUND_PATH         = encodeURI('Assets/Sound/Steampunk City _ Victorian Fantasy Ambience _ 1 Hour.mp3');
const BOOK_OPEN_SOUND_PATH       = encodeURI('Assets/Sound/Book Opening.mp3');
const DOOR_OPEN_SOUND_PATH       = encodeURI('Assets/Sound/door open.mp3');
const DOOR_CLOSE_SOUND_PATH      = encodeURI('Assets/Sound/door closing.mp3');
const CASE_MUSIC_PATH            = encodeURI('Assets/Sound/L.A. Noire Soundtrack - Menu Theme [HQ].mp3');
const PAGE_TURN_FORWARD_PATH     = encodeURI('Assets/Sound/pt1.mp3');
const PAGE_TURN_BACK_PATH        = encodeURI('Assets/Sound/pt2.mp3');
const JOURNAL_WRITING_SOUND_PATH = encodeURI('Assets/Sound/writing sound.mp3');
const OFFICE_AMBIENCE_PATH       = encodeURI('Assets/Sound/Detective Office - Ambient Sounds (No Music).mp3');
const PUB_AMBIENCE_PATH          = encodeURI('Assets/Sound/pub.mp3');

const LANDING_TARGET_GAIN        = 0.15;
const BOOK_OPEN_VOLUME           = 0.34;
const DOOR_OPEN_VOLUME           = 0.20;
const DOOR_CLOSE_VOLUME          = 0.42;
const CASE_MUSIC_VOLUME          = 0.16;
const PAGE_TURN_VOLUME           = 0.40;
const JOURNAL_WRITING_VOLUME     = 0.30;
const OFFICE_AMBIENCE_VOLUME     = 0.08;
const PUB_DIRECT_VOLUME          = 0.22;
const CASE_FADE_MS               = 300;
const CASE_FILE_OPEN_PATH   = encodeURI('Assets/Sound/files.mp3');
const CASE_FILE_OPEN_VOLUME = 0.7;
// =============================================================================
// SECTION 2 — Unified Audio Engine & State Variables
// =============================================================================
let globalAudioEnabled       = true;
let currentScene             = 'hallway';
let previousScene            = 'hallway';
let hasPlayedJournalIntroReveal = false;
let journalIsAnimating       = false;
let journalSpreadIndex       = 0;

let landingAmbienceEl        = null;
let caseMusicEl              = null;
let officeAmbienceEl         = null;
let pubAmbienceEl            = null;

let audioCtx                 = null;
const audioNodes             = new Map();
const activeOneShotEls       = new Set();

/**
 * Connects an audio element to a Web Audio filter graph dynamically
 */
function getAudioNode(audioEl) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (!audioNodes.has(audioEl)) {
    const source = audioCtx.createMediaElementSource(audioEl);
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 22000; 
    source.connect(filter);
    filter.connect(audioCtx.destination);
    audioNodes.set(audioEl, { source, filter });
  }
  return audioNodes.get(audioEl);
}

/**
 * Sets precise frequency filtering to simulate physical barriers
 * 800Hz  = Second story glass window / exterior brick wall
 * 400Hz  = Heavy interior wall (Inn bedroom setup)
 * 22000Hz = Crystal clear open space
 */
function setFilterFrequency(audioEl, hz) {
  if (!globalAudioEnabled) return;
  try {
    const node = getAudioNode(audioEl);
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    node.filter.frequency.setTargetAtTime(hz, audioCtx.currentTime, 0.1);
  } catch (e) {
    console.warn("Audio Context graph routing error: ", e);
  }
}

// =============================================================================
// SECTION 3 — Page turn sounds
// =============================================================================
const pageTurnForwardEl = new Audio(PAGE_TURN_FORWARD_PATH);
const pageTurnBackEl    = new Audio(PAGE_TURN_BACK_PATH);
pageTurnForwardEl.preload = pageTurnBackEl.preload = 'auto';
pageTurnForwardEl.volume  = pageTurnBackEl.volume  = PAGE_TURN_VOLUME;

function playPageTurnSfx(audioEl) {
  if (!audioEl || !globalAudioEnabled) return;
  audioEl.currentTime = 0;
  audioEl.play().catch(() => {});
}

// =============================================================================
// SECTION 4 — Scene switching & Navigation
// =============================================================================
function showScene(name) {
  previousScene = currentScene;
  currentScene  = name;

  document.querySelectorAll('.hallway-only').forEach(el => {
    el.classList.toggle('scene-hidden', name !== 'hallway');
  });

  document.querySelectorAll('.scene').forEach(scene => {
    const isTarget = scene.dataset.scene === name;
    scene.classList.toggle('active', isTarget);
    scene.setAttribute('aria-hidden', String(!isTarget));
  });

  const shadow = document.getElementById('global-shadow-overlay');
  if (shadow) shadow.style.display = name === 'hallway' ? '' : 'none';

  if (name === 'office' && previousScene !== 'office') resetOfficeSequence();
  if (name === 'hallway') hasPlayedJournalIntroReveal = false;

  const journalZoneL = document.querySelector('.journal-zone-left');
  const journalZoneR = document.querySelector('.journal-zone-right');
  if (journalZoneL) journalZoneL.style.pointerEvents = name === 'room1' ? 'auto' : 'none';
  if (journalZoneR) journalZoneR.style.pointerEvents = name === 'room1' ? 'auto' : 'none';
  setSceneActiveFlip(name);
  syncSceneAudio();
}

// =============================================================================
// SECTION 5 — Asset Managers
// =============================================================================
function initLandingAmbience() {
  if (landingAmbienceEl) return;
  landingAmbienceEl             = new Audio(LANDING_SOUND_PATH);
  landingAmbienceEl.loop        = true;
  landingAmbienceEl.preload     = 'auto';
  landingAmbienceEl.playsInline = true;
}

function ensureOfficeAmbience() {
  if (officeAmbienceEl) return;
  officeAmbienceEl             = new Audio(OFFICE_AMBIENCE_PATH);
  officeAmbienceEl.loop        = true;
  officeAmbienceEl.preload     = 'auto';
  officeAmbienceEl.playsInline = true;
}

function ensureCaseMusic() {
  if (caseMusicEl) return;
  caseMusicEl             = new Audio(CASE_MUSIC_PATH);
  caseMusicEl.loop        = true;
  caseMusicEl.preload     = 'auto';
  caseMusicEl.playsInline = true;
}

// =============================================================================
// SECTION 6 — Scene Audio Sync Engine
// =============================================================================
function syncSceneAudio() {
  if (!globalAudioEnabled) {
    stopAllAudio();
    return;
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  if (currentScene === 'hallway') {
    initLandingAmbience();
    setFilterFrequency(landingAmbienceEl, 800); 
    landingAmbienceEl.volume = LANDING_TARGET_GAIN;
    landingAmbienceEl.play().catch(() => {});

    if (caseMusicEl) caseMusicEl.pause(); 
    if (officeAmbienceEl) officeAmbienceEl.pause(); 
    if (pubAmbienceEl) pubAmbienceEl.pause();
  } 
  
  else if (currentScene === 'office') {
    if (landingAmbienceEl) {
      setFilterFrequency(landingAmbienceEl, 500); 
      landingAmbienceEl.volume = 0.04;
    }

    ensureCaseMusic();
    caseMusicEl.currentTime = 0;
    setFilterFrequency(caseMusicEl, 22000); 
    caseMusicEl.volume = CASE_MUSIC_VOLUME;
    caseMusicEl.play().catch(() => {});

    ensureOfficeAmbience();
    setFilterFrequency(officeAmbienceEl, 22000); 
    officeAmbienceEl.volume = OFFICE_AMBIENCE_VOLUME;
    officeAmbienceEl.play().catch(() => {});

    if (pubAmbienceEl) pubAmbienceEl.pause();
  } 
  
  else if (currentScene === 'room1') {
    if (landingAmbienceEl) landingAmbienceEl.pause();
    if (caseMusicEl) caseMusicEl.pause();
    if (officeAmbienceEl) officeAmbienceEl.pause();

    if (!pubAmbienceEl) {
      pubAmbienceEl = new Audio(PUB_AMBIENCE_PATH);
      pubAmbienceEl.loop = true;
      pubAmbienceEl.preload = 'auto';
      pubAmbienceEl.playsInline = true;
    }
    setFilterFrequency(pubAmbienceEl, 400); 
    pubAmbienceEl.volume = PUB_DIRECT_VOLUME;
    pubAmbienceEl.play().catch(() => {});
  }
}

function stopAllAudio() {
  if (landingAmbienceEl) { landingAmbienceEl.pause(); }
  if (caseMusicEl) { caseMusicEl.pause(); }
  if (officeAmbienceEl) { officeAmbienceEl.pause(); }
  if (pubAmbienceEl) { pubAmbienceEl.pause(); }
  pageTurnForwardEl.pause(); pageTurnForwardEl.currentTime = 0;
  pageTurnBackEl.pause();    pageTurnBackEl.currentTime    = 0;
  activeOneShotEls.forEach(sfx => { sfx.pause(); sfx.currentTime = 0; });
  activeOneShotEls.clear();
}

function playOneShot(soundPath, volume) {
  if (!globalAudioEnabled) return null;
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  const sfx   = new Audio(soundPath);
  sfx.preload = 'auto';
  sfx.volume  = Math.max(0, Math.min(1, volume));
  activeOneShotEls.add(sfx);
  sfx.addEventListener('ended', () => activeOneShotEls.delete(sfx), { once: true });
  sfx.play().catch(e => console.warn('playOneShot failed:', e));
  return sfx;
}

function playOneShotWithEnded(soundPath, volume, onEnded) {
  if (!globalAudioEnabled) { if (typeof onEnded === 'function') onEnded(); return null; }
  const sfx   = new Audio(soundPath);
  sfx.preload = 'auto';
  sfx.volume  = Math.max(0, Math.min(1, volume));
  activeOneShotEls.add(sfx);

  const finish = () => {
    activeOneShotEls.delete(sfx);
    if (typeof onEnded === 'function') onEnded();
  };
  sfx.addEventListener('ended', finish, { once: true });
  sfx.addEventListener('error', finish, { once: true });
  sfx.play().catch(() => finish());
  return sfx;
}

function playJournalWritingSound() {
  if (!globalAudioEnabled) return;
  const sfx  = new Audio(JOURNAL_WRITING_SOUND_PATH);
  sfx.volume = JOURNAL_WRITING_VOLUME;
  activeOneShotEls.add(sfx);
  sfx.play().catch(() => {});
  window.setTimeout(() => {
    sfx.pause();
    activeOneShotEls.delete(sfx);
  }, 3500);
}

// =============================================================================
// SECTION 7 — Global Audio Control & Master Toggle
// =============================================================================
function initGramophoneToggle() {
  const el = document.getElementById('gramophone-toggle');
  if (!el) return;
  el.addEventListener('click', () => setGlobalAudioEnabled(!globalAudioEnabled));
  setGlobalAudioEnabled(globalAudioEnabled);
}

function setGlobalAudioEnabled(enabled) {
  globalAudioEnabled = !!enabled;
  const btn    = document.getElementById('gramophone-toggle');
  const status = document.getElementById('gramophone-status');
  
  if (btn) {
    btn.classList.toggle('playing', globalAudioEnabled);
    btn.classList.toggle('active', globalAudioEnabled); 
  }
  if (status) status.textContent = globalAudioEnabled ? 'Music On' : 'Music Off';

  if (!globalAudioEnabled) { stopAllAudio(); return; }
  syncSceneAudio();
}

// =============================================================================
// SECTION 8 — Journal Page Logic
// =============================================================================
function buildIndexHTML() {
  const pages = window.JournalPages;
  let html = `<p class="journal-index-heading" style="--line-index:0;">Contents</p>`;
  let lineIdx = 1;
  pages.forEach((spread, i) => {
    if (i === 0 || !spread.chapterLabel) return;
    const rawDate = spread.date || spread.chapterDate || '';
    const dateStr = rawDate.replace(/^Throneport\s*[—\-]\s*/i, '');
    html += `<p class="journal-index-entry" style="--line-index:${lineIdx};" data-spread="${i}">
      <span class="journal-index-chapter">${spread.chapterLabel}</span>
      ${dateStr ? `<span class="journal-index-date">${dateStr}</span>` : ''}
    </p>`;
    lineIdx++;
  });
  return html;
}

function buildJournalPageHTML(spreadIndex, side) {
  const pages = window.JournalPages;
  if (!pages || !pages[spreadIndex]) return '';

  const spread = pages[spreadIndex];

  if (spread.isIndex) {
    return side === 'left' ? buildIndexHTML() : '';
  }

  const isLeft  = side === 'left';
  const lines   = isLeft ? (spread.left || []) : (spread.right || []);
  const dateStr = isLeft ? (spread.date || spread.chapterDate || null) : null;

  let html = '';
  if (dateStr) html += `<p class="journal-stf-date" style="--line-index:0;">${dateStr}</p>`;
  lines.forEach((line, i) => {
    const idx = dateStr ? i + 1 : i;
    html += `<p style="--line-index:${idx};">${line}</p>`;
  });
  return html;
}

// FIX: Added 'isIntro' parameter to prevent elements from pop-rendering at opacity 1
function renderJournalSpread(index, isIntro = false) {
  const pages = window.JournalPages;
  if (!pages || !pages.length) return;

  const clamped      = Math.max(0, Math.min(pages.length - 1, index));
  journalSpreadIndex = clamped;

  const leftEl  = document.getElementById('journal-text-left');
  const rightEl = document.getElementById('journal-text-right');
  const isIndexPage = !!(pages[clamped] && pages[clamped].isIndex);

  if (leftEl) {
    leftEl.innerHTML = buildJournalPageHTML(clamped, 'left');
    leftEl.classList.toggle('is-index', isIndexPage);

    if (isIndexPage) {
      // Index page: always fully visible, entries are clickable
      leftEl.querySelectorAll('p').forEach(p => { p.style.opacity = '1'; });
      leftEl.querySelectorAll('.journal-index-entry[data-spread]').forEach(el => {
        el.addEventListener('click', () => flipJournalTo(parseInt(el.dataset.spread, 10)));
      });
    } else {
      leftEl.querySelectorAll('p, .journal-stf-date').forEach(p => {
        p.style.opacity = isIntro ? '0' : '1';
      });
    }
  }
  if (rightEl) {
    rightEl.innerHTML = buildJournalPageHTML(clamped, 'right');
    rightEl.querySelectorAll('p').forEach(p => {
      p.style.opacity = isIntro ? '0' : '1';
    });
  }
}

function flipJournalTo(newIndex) {
  if (journalIsAnimating) return;
  const pages = window.JournalPages;
  if (!pages) return;

  // Going right past the last spread → return to the index page
  if (newIndex >= pages.length) {
    if (journalSpreadIndex === 0) return;
    journalIsAnimating = true;
    playPageTurnSfx(pageTurnForwardEl);
    renderJournalSpread(0, false);
    journalIsAnimating = false;
    return;
  }

  const clamped = Math.max(0, Math.min(pages.length - 1, newIndex));
  if (clamped === journalSpreadIndex) return;

  journalIsAnimating = true;
  const direction = clamped > journalSpreadIndex ? 'forward' : 'back';
  playPageTurnSfx(direction === 'forward' ? pageTurnForwardEl : pageTurnBackEl);
  renderJournalSpread(clamped, false);
  journalIsAnimating = false;
}

const journalFlip = {
  flip(index)  { renderJournalSpread(index, false); },
  flipPrev()   { flipJournalTo(journalSpreadIndex - 1); },
  flipNext()   { flipJournalTo(journalSpreadIndex + 1); },
};

// =============================================================================
// SECTION 9 — Journal Intro Typing Animation
// =============================================================================
function journalIntroReveal() {
  const leftEl  = document.getElementById('journal-text-left');
  const rightEl = document.getElementById('journal-text-right');
  if (!leftEl) return;

  const allLeftEls   = Array.from(leftEl.querySelectorAll('p, .journal-stf-date'));
  const dateEl       = allLeftEls[0];
  const firstParaEl  = allLeftEls[1];
  const remainingEls = allLeftEls.slice(2);

  const typedSpans      = [];
  let   restSpan        = null;
  const pendingTimeouts = [];

  function showAll() {
    pendingTimeouts.forEach(id => window.clearTimeout(id));
    typedSpans.forEach(span => span.classList.add('shown'));
    if (restSpan) { restSpan.style.transition = 'none'; restSpan.style.opacity = '1'; }
    remainingEls.forEach(el => { el.style.transition = 'none'; el.style.opacity = '1'; });
    if (rightEl) {
      Array.from(rightEl.querySelectorAll('p')).forEach(p => {
        p.style.transition = 'none';
        p.style.opacity    = '1';
      });
    }
    document.removeEventListener('click', showAll);
  }

  document.addEventListener('click', showAll);

  // Type all words of the date line
  if (dateEl) {
    const words = dateEl.textContent.split(' ');
    dateEl.textContent = '';
    dateEl.style.opacity = '1';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className   = 'journal-word-span';
      span.textContent = (i > 0 ? '\u00A0' : '') + word;
      dateEl.appendChild(span);
      typedSpans.push(span);
    });
  }

  // Type word-by-word up to and including "dock"; wrap the rest in a single fade span
  if (firstParaEl) {
    const words  = firstParaEl.textContent.split(' ');
    firstParaEl.textContent = '';
    firstParaEl.style.opacity = '1';

    let cutoff = words.findIndex(w => w.replace(/[^a-zA-Z]/g, '').toLowerCase() === 'before');
    if (cutoff === -1) cutoff = 4;

    words.slice(0, cutoff + 1).forEach((word, i) => {
      const span = document.createElement('span');
      span.className   = 'journal-word-span';
      span.textContent = (i > 0 ? '\u00A0' : '') + word;
      firstParaEl.appendChild(span);
      typedSpans.push(span);
    });

    if (words.length > cutoff + 1) {
      restSpan             = document.createElement('span');
      restSpan.style.opacity = '0';
      restSpan.textContent = '\u00A0' + words.slice(cutoff + 1).join(' ');
      firstParaEl.appendChild(restSpan);
    }
  }

  let totalDelay = 400;
  typedSpans.forEach((span, i) => {
    totalDelay += Math.max(60, 120 - (i * 2));
    const id = window.setTimeout(() => { span.classList.add('shown'); }, totalDelay);
    pendingTimeouts.push(id);
  });

  const revealId = window.setTimeout(() => {
    document.removeEventListener('click', showAll);

    if (restSpan) {
      restSpan.style.transition = 'opacity 1000ms ease';
      void restSpan.offsetWidth;
      restSpan.style.opacity = '1';
    }
    remainingEls.forEach(el => {
      el.style.transition = 'opacity 1000ms ease';
      void el.offsetWidth;
      el.style.opacity = '1';
    });
    if (rightEl) {
      Array.from(rightEl.querySelectorAll('p')).forEach((p, i) => {
        p.style.transition = `opacity 1000ms ease ${200 + (i * 80)}ms`;
        void p.offsetWidth;
        p.style.opacity = '1';
      });
    }
  }, totalDelay + 300);
  pendingTimeouts.push(revealId);
}

// =============================================================================
// SECTION 10 — Scene Entry Handlers
// =============================================================================
function openJournalFromLanding() {
  const leftEl  = document.getElementById('journal-text-left');
  const rightEl = document.getElementById('journal-text-right');
  
  const isIntro = !hasPlayedJournalIntroReveal;

  // FIX: Force render elements at 0% opacity to prevent a pre-animation flash
  // Open to spread 1 (first real entry) — spread 0 is the index page
  renderJournalSpread(1, isIntro);

  if (isIntro) {
    if (leftEl)  leftEl.classList.add('journal-text-hidden');
    if (rightEl) rightEl.classList.add('journal-text-hidden');
  }

  showScene('room1');

  playOneShotWithEnded(BOOK_OPEN_SOUND_PATH, BOOK_OPEN_VOLUME, () => {
    if (currentScene !== 'room1') return;

    if (isIntro) {
      hasPlayedJournalIntroReveal = true;
      if (leftEl)  leftEl.classList.remove('journal-text-hidden');
      if (rightEl) rightEl.classList.remove('journal-text-hidden');

      playJournalWritingSound();
      window.setTimeout(() => journalIntroReveal(), 300);
    } else {
      if (leftEl)  leftEl.classList.remove('journal-text-hidden');
      if (rightEl) rightEl.classList.remove('journal-text-hidden');
    }
  });
}

function openCaseFilesFromLanding() {
  playOneShotWithEnded(DOOR_OPEN_SOUND_PATH, DOOR_OPEN_VOLUME, () => {
    playOneShot(DOOR_CLOSE_SOUND_PATH, DOOR_CLOSE_VOLUME);
  });
  showScene('office');
}

function openNoticeBoardFromLanding() {
  playOneShotWithEnded(DOOR_OPEN_SOUND_PATH, DOOR_OPEN_VOLUME, () => {
    playOneShot(DOOR_CLOSE_SOUND_PATH, DOOR_CLOSE_VOLUME);
  });
  showScene('office');
  showOfficePanel('notice');
}

// =============================================================================
// SECTION 11 — Case File Reader Pipeline
// =============================================================================
const pageData  = window.MarcyPageData;
const casePages = (pageData && pageData.casePages) ? pageData.casePages : [];

let activeFlip        = null;
const CASE_001_START  = 2;
let   casePageIndex   = 0;
let   caseFadeTimer   = null;
let   caseIsTransitioning = false;

const officeEls = {
  nav:         document.getElementById('office-nav'),
  navCase:     document.getElementById('office-nav-case'),
  navNotice:   document.getElementById('office-nav-notice'),
  panelCase:   document.getElementById('office-panel-case'),
  panelNotice: document.getElementById('office-panel-notice'),
  closed:      document.getElementById('case-closed-hotspot'),
  content:     document.getElementById('case-content-hotspot'),
  case001:     document.getElementById('case-case001-hotspot'),
  reader:      document.getElementById('office-case-reader'),
  notice:      document.getElementById('notice-board-hotspot'),
  btnToNotice: document.getElementById('subnav-to-notice'),
  btnToCase:   document.getElementById('subnav-to-case'),
  seqNext:     document.getElementById('case-seq-next'),
  seqPrev:     document.getElementById('case-seq-prev'),
};

const caseFlipbookEl = document.getElementById('case-flipbook');

function clampCaseIndex(i) { return Math.max(0, Math.min(casePages.length - 1, i)); }

function renderCasePage(index) {
  if (!caseFlipbookEl || casePages.length === 0) return;
  caseFlipbookEl.innerHTML = casePages[index];
}

function setCasePage(index) {
  casePageIndex = clampCaseIndex(index);
  renderCasePage(casePageIndex);
}

function fadeToCasePage(index) {
  if (!caseFlipbookEl || caseIsTransitioning || casePages.length === 0) return;
  const target = clampCaseIndex(index);
  if (target === casePageIndex) return;

  caseIsTransitioning = true;
  caseFlipbookEl.classList.remove('is-fading-in');
  caseFlipbookEl.classList.add('is-fading-out');

  caseFadeTimer = window.setTimeout(() => {
    const previous = casePageIndex;
    casePageIndex  = target;
    renderCasePage(casePageIndex);

    if (casePageIndex > previous) playPageTurnSfx(pageTurnForwardEl);
    else if (casePageIndex < previous) playPageTurnSfx(pageTurnBackEl);

    caseFlipbookEl.classList.remove('is-fading-out');
    caseFlipbookEl.classList.add('is-fading-in');

    caseFadeTimer = window.setTimeout(() => {
      caseFlipbookEl.classList.remove('is-fading-in');
      caseIsTransitioning = false;
    }, CASE_FADE_MS);
  }, CASE_FADE_MS);
}

const caseFlip = {
  flip(i)    { if (!window.CaseFiles) setCasePage(i); },
  flipPrev() { window.CaseFiles ? window.CaseFiles.flipPrev() : fadeToCasePage(casePageIndex - 1); },
  flipNext() { window.CaseFiles ? window.CaseFiles.flipNext() : fadeToCasePage(casePageIndex + 1); },
};

// Global left/right navigation for the entire case panel
// Right = advance sequence or flip page forward
// Left  = go back through sequence or flip page back
function caseSeqAdvance() {
  const closedVisible  = officeEls.closed  && !officeEls.closed.classList.contains('office-hidden');
  const contentVisible = officeEls.content && !officeEls.content.classList.contains('office-hidden');

  if (closedVisible)   showOfficeStep('content');
  else if (contentVisible) openOfficeCaseReader();
}

function caseSeqBack() {
  const overlay = document.getElementById('case-pages-overlay');
  if (overlay && !overlay.classList.contains('office-hidden')) {
    if (window.CaseFiles) window.CaseFiles.closeCase();
    return;
  }

  const contentVisible = officeEls.content && !officeEls.content.classList.contains('office-hidden');
  if (contentVisible) showOfficeStep('closed');
}

if (officeEls.seqNext) officeEls.seqNext.addEventListener('click', caseSeqAdvance);
if (officeEls.seqPrev) officeEls.seqPrev.addEventListener('click', caseSeqBack);

// =============================================================================
// SECTION 12 — Office View Steps
// =============================================================================
function setSceneActiveFlip(sceneName) {
  if (sceneName === 'office' && officeEls.panelCase &&
      !officeEls.panelCase.classList.contains('office-hidden')
  ) { activeFlip = caseFlip; return; }

  if (sceneName === 'room1') { activeFlip = journalFlip; return; }
  activeFlip = null;
}

function showOfficeStep(step) {
  if (!officeEls.closed || !officeEls.content) return;
  officeEls.closed.classList.toggle('office-hidden',  step !== 'closed');
  officeEls.content.classList.toggle('office-hidden', step !== 'content');
  document.querySelectorAll('.case-num-hotspot').forEach(el => {
    el.classList.toggle('office-hidden', step !== 'content');
  });
  setSceneActiveFlip('office');
}

function showOfficePanel(panelName) {
  const isCase   = (panelName === 'case');
  const isNotice = (panelName === 'notice');
  const isMenu   = (panelName === 'menu');
  const boardHelp = document.getElementById('board-help');
  
  // 1. Toggle Panels
  if (officeEls.nav)         officeEls.nav.classList.toggle('office-hidden', !isMenu);
  if (officeEls.panelCase)   officeEls.panelCase.classList.toggle('office-hidden', !isCase);
  if (officeEls.panelNotice) officeEls.panelNotice.classList.toggle('office-hidden', !isNotice);
  if (boardHelp) {  boardHelp.style.display = isNotice ? 'block' : 'none';}
  if (isNotice) {
  document.querySelector('.page-edge-zones').style.pointerEvents = 'none';
} else {
  document.querySelector('.page-edge-zones').style.pointerEvents = '';
}
  // 2. Toggle New Shortcut Buttons
  // Notice button shows only if we are in Case Files
  if (officeEls.btnToNotice) officeEls.btnToNotice.classList.toggle('office-hidden', !isCase);
  // Case button shows only if we are in Notice Board
  if (officeEls.btnToCase)   officeEls.btnToCase.classList.toggle('office-hidden', !isNotice);

  // 3. Reset Reader/Step
  if (window.CaseFiles) window.CaseFiles.closeCase();
  showOfficeStep('closed');

  if (isCase && window.caseFlip) caseFlip.flip(0); 
  
  setSceneActiveFlip('office');
}

function resetOfficeSequence()  { showOfficePanel('menu'); }
function openOfficeCaseReader() {
  playOneShot(CASE_FILE_OPEN_PATH, CASE_FILE_OPEN_VOLUME);
  if (window.CaseFiles) {
    window.CaseFiles.openCase('001');
  } else {
    showOfficeStep('reader');
    caseFlip.flip(CASE_001_START);
  }
}


// =============================================================================
// SECTION 13 — Click Zone Setup & Initialization
// =============================================================================
function initEdgeZoneNavigation() {
  const map = { case: caseFlip };
  document.querySelectorAll('[data-edge-nav]').forEach(wrap => {
    const flip = map[wrap.dataset.edgeNav];
    if (!flip) return;
    wrap.querySelectorAll('[data-edge-action]').forEach(zone => {
      zone.addEventListener('click', () => {
        if (zone.dataset.edgeAction === 'prev') flip.flipPrev();
        if (zone.dataset.edgeAction === 'next') flip.flipNext();
      });
    });
  });
}

// Initial configuration
setCasePage(0);
renderJournalSpread(0, false);
initGramophoneToggle();
initEdgeZoneNavigation();
resetOfficeSequence();
showScene('hallway');

// Event Hooks
document.getElementById('journal-btn').addEventListener('click',    openJournalFromLanding);
document.getElementById('door-btn').addEventListener('click',       openCaseFilesFromLanding);
document.getElementById('choice-journal').addEventListener('click', openJournalFromLanding);
document.getElementById('choice-door').addEventListener('click',    openCaseFilesFromLanding);
document.getElementById('choice-notice').addEventListener('click',  openNoticeBoardFromLanding);

document.getElementById('office-back-btn').addEventListener('click',   () => showScene('hallway'));
document.getElementById('room1-back-btn').addEventListener('click',    () => showScene('hallway'));
document.getElementById('office-back-label').addEventListener('click', () => showScene('hallway'));
document.getElementById('room1-back-label').addEventListener('click',  () => showScene('hallway'));

if (officeEls.closed) officeEls.closed.addEventListener('click', () => {
  playOneShot(CASE_FILE_OPEN_PATH, CASE_FILE_OPEN_VOLUME);
  showOfficeStep('content');
});

document.querySelectorAll('.case-num-hotspot[data-case-id]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.CaseFiles) window.CaseFiles.openCase(btn.dataset.caseId);
  });
});

const landingEl    = document.getElementById('landing');
const creditsPanel = document.getElementById('credits-panel');
const creditsBtn   = document.getElementById('credits-btn');
const creditsClose = document.getElementById('credits-close');
const shadowEl     = document.getElementById('global-shadow-overlay');

function openCredits() {
  if (landingEl)    landingEl.classList.add('credits-open');
  if (creditsPanel) creditsPanel.setAttribute('aria-hidden', 'false');
  if (shadowEl)     shadowEl.style.display = 'none';
}
function closeCredits() {
  if (landingEl)    landingEl.classList.remove('credits-open');
  if (creditsPanel) creditsPanel.setAttribute('aria-hidden', 'true');
  if (shadowEl && currentScene === 'hallway') shadowEl.style.display = '';
}

if (creditsBtn)   creditsBtn.addEventListener('click',   openCredits);
if (creditsClose) creditsClose.addEventListener('click', closeCredits);
document.getElementById('credits-back')?.addEventListener('click', closeCredits);

if (officeEls.navCase)   officeEls.navCase.addEventListener('click',   () => showOfficePanel('case'));
if (officeEls.navNotice) officeEls.navNotice.addEventListener('click', () => showOfficePanel('notice'));
if (officeEls.btnToNotice) officeEls.btnToNotice.addEventListener('click', () => showOfficePanel('notice'));
if (officeEls.btnToCase) officeEls.btnToCase.addEventListener('click', () => showOfficePanel('case'));


const journalZoneLeft  = document.querySelector('.journal-zone-left');
const journalZoneRight = document.querySelector('.journal-zone-right');
if (journalZoneLeft)  journalZoneLeft.addEventListener('click',  () => journalFlip.flipPrev());
if (journalZoneRight) journalZoneRight.addEventListener('click', () => journalFlip.flipNext());

// Arrow keys navigation
document.addEventListener('keydown', e => {
  if (!activeFlip) return;
  if (e.key === 'ArrowRight') activeFlip.flipNext();
  if (e.key === 'ArrowLeft')  activeFlip.flipPrev();
});

document.getElementById('journal-btn').addEventListener('keydown', e => { if (e.key === 'Enter') openJournalFromLanding(); });
document.getElementById('door-btn').addEventListener('keydown',    e => { if (e.key === 'Enter') openCaseFilesFromLanding(); });

});