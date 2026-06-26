// Case Files — bare pages over the open case file, click to pan-read
(function () {

  const CASES = {
    '001': {
      pages: [
        'Assets/Agency%20Content/cf_001_p1.png',
        'Assets/Agency%20Content/cf_001_p2.png',
      ]
    },
    '002': {
      pages: [
        'Assets/Case%20Files/cf_002.png',
        'Assets/Case%20Files/cf_002_2.png',
        'Assets/Case%20Files/cf_002_3.png',
      ],
      notes: [
        { src: 'Assets/Case%20Files/cf_002_note.png', underPage: 1 }
      ]
    },
    '003': {
      pages: [
        'Assets/Case%20Files/cf_003.png',
        'Assets/Case%20Files/cf_003_2.png',
      ]
    }
  };

  let currentPages = [];
  let dragViewer   = null;

  function playRandomPageTurn() {
    const n   = Math.ceil(Math.random() * 4);
    const sfx = new Audio(`Assets/Sound/pt${n}.mp3`);
    sfx.volume = 0.6;
    sfx.play().catch(() => {});
  }

  // ── Open a case — render small preview pages into the overlay ─────────────
  function openCase(caseId) {
    const data = CASES[caseId];
    if (!data) return;
    currentPages = data.pages;

    const overlay = document.getElementById('case-pages-overlay');
    if (!overlay) return;

    const notesByPage = {};
    (data.notes || []).forEach(n => { notesByPage[n.underPage] = n; });

    overlay.innerHTML =
      `<button class="cf-nav-arrow cf-nav-arrow--left"  type="button" aria-label="Back to case list">&#8249;</button>` +
      currentPages.map((src, i) => {
        const pageNum = i + 1;
        const note    = notesByPage[pageNum];
        const noteHtml = note
          ? `<div class="cf-note" data-under-page="${pageNum}"><img class="cf-note-img" src="${note.src}" alt="Note" draggable="false"></div>`
          : '';
        return noteHtml +
          `<button class="cf-page-btn" data-page="${pageNum}" type="button" aria-label="Read case file page ${pageNum}">
             <img class="cf-page-img" src="${src}" alt="Case file page ${pageNum}" draggable="false">
           </button>`;
      }).join('') +
      `<button class="cf-nav-arrow cf-nav-arrow--right" type="button" aria-label="Back to case list">&#8250;</button>`;

    // RETIRED: uncomment to re-enable click-to-enlarge drag viewer
    // overlay.querySelectorAll('.cf-page-btn').forEach((btn, i) => {
    //   btn.addEventListener('click', () => openDragViewer(currentPages[i], i + 1));
    // });

    const pageBtns = [...overlay.querySelectorAll('.cf-page-btn')];
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pageBtns.forEach(b => b.classList.remove('cf-page--raised'));
        btn.classList.add('cf-page--raised');
      });
    });

    overlay.querySelectorAll('.cf-note').forEach(note => {
      note.addEventListener('click', () => {
        const expanding = note.classList.contains('cf-note--tucked');
        note.classList.toggle('cf-note--tucked');
        if (expanding) {
          // clear any raised page so nothing blocks the note coming back out
          pageBtns.forEach(b => b.classList.remove('cf-page--raised'));
        }
      });
    });

    const caseIds     = Object.keys(CASES);
    const caseIndex   = caseIds.indexOf(caseId);

    overlay.querySelectorAll('.cf-nav-arrow').forEach(btn => {
      btn.addEventListener('click', () => {
        playRandomPageTurn();
        const isLeft    = btn.classList.contains('cf-nav-arrow--left');
        const nextIndex = caseIndex + (isLeft ? -1 : 1);
        if (nextIndex >= 0 && nextIndex < caseIds.length) {
          openCase(caseIds[nextIndex]);
        } else {
          closeCase();
        }
      });
    });

    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeCase();
    });

    overlay.dataset.case = caseId;
    overlay.classList.remove('office-hidden');
  }

  // ── Drag-to-pan reading window ─────────────────────────────────────────────
  function openDragViewer(src, pageNum) {
    closeDragViewer();

    dragViewer = document.createElement('div');
    dragViewer.className = 'cf-drag-viewer';
    dragViewer.innerHTML = `
      <div class="cf-drag-window">
        <img class="cf-drag-img" src="${src}" alt="Case file page ${pageNum}" draggable="false">
      </div>`;
    document.body.appendChild(dragViewer);

    const dragWin = dragViewer.querySelector('.cf-drag-window');
    const img     = dragViewer.querySelector('.cf-drag-img');

    let dragging  = false;
    let hasDragged = false;
    let posX = 0, posY = 0;
    let startMouseX = 0, startMouseY = 0;
    let startPosX   = 0, startPosY   = 0;

    function applyTransform() {
      img.style.transform = `translate(${posX}px, ${posY}px)`;
    }

    function onMouseDown(e) {
      dragging    = true;
      hasDragged  = false;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startPosX   = posX;
      startPosY   = posY;
      dragWin.classList.add('is-dragging');
      e.preventDefault();
    }

    function onMouseMove(e) {
      if (!dragging) return;
      const dx = e.clientX - startMouseX;
      const dy = e.clientY - startMouseY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged = true;
      posX = startPosX + dx;
      posY = startPosY + dy;
      applyTransform();
    }

    function onMouseUp() {
      dragging = false;
      dragWin.classList.remove('is-dragging');
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') closeDragViewer();
    }

    // Clicking outside the window closes the viewer; ignore drag-release clicks
    dragViewer.addEventListener('click', () => { if (!hasDragged) closeDragViewer(); });
    dragWin.addEventListener('click', e => e.stopPropagation());

    dragWin.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',   onMouseUp);
    document.addEventListener('keydown',   onKeyDown);

    dragViewer._cleanup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup',   onMouseUp);
      document.removeEventListener('keydown',   onKeyDown);
    };
  }

  function closeDragViewer() {
    if (!dragViewer) return;
    if (dragViewer._cleanup) dragViewer._cleanup();
    dragViewer.remove();
    dragViewer = null;
  }

  // ── Close overlay ──────────────────────────────────────────────────────────
  function closeCase() {
    closeDragViewer();
    const overlay = document.getElementById('case-pages-overlay');
    if (!overlay) return;
    overlay.classList.add('office-hidden');
    overlay.innerHTML = '';
    delete overlay.dataset.case;
    currentPages = [];
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.CaseFiles = {
    openCase,
    closeCase,
    flipNext:  () => {},
    flipPrev:  () => {},
    pageIndex: () => 0,
    pageCount: () => currentPages.length,
  };

})();
