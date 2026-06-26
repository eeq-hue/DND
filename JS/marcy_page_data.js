// Extracted page template data to keep main app logic easier to read.
(function () {
// ── SHARED HELPERS ────────────────────────────────────────────────────────────

const cornerSVG = `
  <div class="corner-anchor corner-tl">
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 14 Q2 2 14 2" stroke="#8a6a2a" stroke-width="1"/><circle cx="5" cy="5" r="1.8" fill="#8a6a2a" opacity="0.5"/></svg>
  </div>
  <div class="corner-anchor corner-tr">
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 14 Q2 2 14 2" stroke="#8a6a2a" stroke-width="1"/><circle cx="5" cy="5" r="1.8" fill="#8a6a2a" opacity="0.5"/></svg>
  </div>
  <div class="corner-anchor corner-bl">
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 14 Q2 2 14 2" stroke="#8a6a2a" stroke-width="1"/><circle cx="5" cy="5" r="1.8" fill="#8a6a2a" opacity="0.5"/></svg>
  </div>
  <div class="corner-anchor corner-br">
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 14 Q2 2 14 2" stroke="#8a6a2a" stroke-width="1"/><circle cx="5" cy="5" r="1.8" fill="#8a6a2a" opacity="0.5"/></svg>
  </div>`;

const rule = `<div class="rule"><div class="rule-line"></div><div class="rule-diamond"></div><div class="rule-line"></div></div>`;

function makePage(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

// ── JOURNAL PAGES ─────────────────────────────────────────────────────────────
// To use your Canva exports, replace the inner content with:
// <img src="your-slide.png" class="img-page" alt="Journal page">

const journalPages = [

  // COVER
  `<div class="diary-page">
    ${cornerSVG}
    <div class="page-border"></div>
    <div class="cover-center">
      <svg width="50" height="50" viewBox="0 0 60 60" class="u-cover-icon" aria-hidden="true">
        <circle cx="30" cy="30" r="27" fill="none" stroke="#8a6a2a" stroke-width="1"/>
        <path d="M30 10 L33 22 L46 22 L36 30 L40 43 L30 35 L20 43 L24 30 L14 22 L27 22Z" fill="none" stroke="#8a6a2a" stroke-width="1.2"/>
      </svg>
      <p class="u-pf-label">The Private Journal of</p>
      <p class="u-caveat-name">M. Marple</p>
      <p class="u-pf-italic-11">Investigator, Throneport</p>
      ${rule}
      <p class="u-pf-gold-10">998 YK</p>
      <p class="u-caveat-note-11">If found please return to M. Marple.<br/>Reward negotiable. Inquire at nearest post office.</p>
    </div>
  </div>`,

  // CONTENTS
  `<div class="diary-page right-page">
    ${cornerSVG}
    <div class="page-border"></div>
    <div class="u-col-center-10">
      <p class="section-label">✦ Contents ✦</p>
      ${rule}
      <div class="u-pad-14-6">
        <p class="u-caveat-main-16-mb8">I. &nbsp;Therendor 12th — Arrival</p>
        <p class="u-caveat-main-16-mb3">II. &nbsp;Case No. 001</p>
        <p class="u-caveat-sub-12-mb8">The L'Mur Situation</p>
        <p class="u-caveat-main-16-mb3">III. &nbsp;Case No. 002</p>
        <p class="u-caveat-sub-12">The Langstrom Disappearance</p>
      </div>
      ${rule}
      <div class="hand-aside u-hand-aside-auto">Lies are just puzzles waiting to be solved. And the truth is always kinder than the alternative. Eventually.</div>
    </div>
    <span class="page-num num-right">—</span>
  </div>`,

  // JOURNAL ENTRY p1
  `<div class="diary-page">
    ${cornerSVG}
    <div class="u-pt-4">
      <p class="u-caveat-date">Therendor 12th, 998 YK — late</p>
      <div class="handnote">
        <p><em>Okay. So. I'm here.</em></p>
        <p>I'm actually in Throneport. I have been saying that word for months, in that way you say a word so many times it stops meaning anything, and now I'm sitting in it and it smells like the docks, which makes sense, because I have just come from the docks, and before that I was on a boat, and before that I was in Millhaven, and the distance between those two things feels much larger than it did this morning.</p>
        <p>I tried very hard not to cry leaving because everyone came to see me off — which I was not expecting — and Millhaven is so small and everyone knew and they all waved. Grandmother cried enough for both of us, which I appreciated, and then pressed another parcel of food into my hands at the last possible second like I was going somewhere without shops. I have sandwiches. I have biscuits. I have, somehow, more biscuits. I am fine.</p>
      </div>
    </div>
    <span class="page-num num-left">1</span>
  </div>`,

  // JOURNAL ENTRY p2
  `<div class="diary-page right-page">
    ${cornerSVG}
    <div class="handnote">
      <p>Throneport is not what I pictured. Grand, I suppose. Glamorous. And it is all of that — but when you get down to it, it's still just a place. Good parts and bad parts. Same as everywhere. Something that felt less like the world I already knew, just taller.</p>
      <p>Bai and Garrick were waiting for me at the docks. Bai called me Miss Maple within approximately thirty seconds. I told him, very politely, that it was actually Marple. He took this with complete good humor and the grace of a gentleman. I was fine.</p>
      <p>Bai is — hmm. He's something. Smart, I think, or at least he moves like someone who is, which might be the same thing. There is a version of him that was once very impressive in a more straightforward way, and what's left is still impressive, just sideways. Confusing and completely magnetic.</p>
      <p>Garrick is enormous. Genuinely, sincerely enormous, and very calm about it. He looked at me on the dock and nodded, like I made sense, like I was expected. I think he is why nothing has gone completely sideways. I think that is probably a permanent condition of his.</p>
    </div>
    <span class="page-num num-right">2</span>
  </div>`,

  // JOURNAL ENTRY p3
  `<div class="diary-page">
    ${cornerSVG}
    <div class="handnote">
      <p>The agency is more accurately a large walk-in closet, which would be fine, except that Garrick is also in it. Everything is chaos — papers and files and objects I cannot identify — except that when Bai needs something he finds it immediately. So apparently there is a system. It is just not one available to anyone else.</p>
      <p>My desk is a school desk. The kind with the lid that lifts up. It is fine. It does remind me, in a small and persistent way, that I am still very much a child despite my best efforts. Grandfather would find this funny. I am choosing not to.</p>
      <p>From the agency we went to the Gold Dragon Inn to meet the clients — the L'Murs, spelling unconfirmed, categorically too late now — and then straight to their house. A haunted house. The Church found nothing. I have filed a full report separately. I'm calling it <em>The Case of the Ghostly Shadow</em> in the letters home. Grandmother will appreciate the drama.</p>
    </div>
    <span class="page-num num-left">3</span>
  </div>`,

  // JOURNAL ENTRY p4
  `<div class="diary-page right-page">
    ${cornerSVG}
    <div class="handnote u-handnote-short">
      <p>I have a case. Solved, actually. First day. Haven't unpacked. I am writing this from a room in the same inn where I met my first clients approximately six hours ago, which I find both convenient and slightly strange.</p>
      <p>Grandmother would not be comforted by any of this. I feel more awake than I have in years.</p>
      <p><em>This is exactly what I came here for.</em></p>
      <p class="u-right-sign">— M.</p>
    </div>
    ${rule}
    <p class="section-label u-section-top-8">✦ Case Files in Official Record ✦</p>
    <span class="page-num num-right">4</span>
  </div>`,

];

// ── CASE FILE PAGES ───────────────────────────────────────────────────────────
// Replace content divs with <img src="your-canva-export.png" class="img-page" alt="...">
// when you have your Canva exports ready

const casePages = [

  // COVER
  `<div class="case-page">
    <div class="page-border"></div>
    ${cornerSVG}
    <div class="cover-center">
      <p class="u-pf-agency">Bai Detective Agency</p>
      <p class="u-pf-case-title-mb4">Official</p>
      <p class="u-pf-case-title">Case Files</p>
      ${rule}
      <p class="u-ifell-12-mt4">Filed by M. Marple, Investigator</p>
      <p class="u-pf-gold-10-mt12">998 YK — Throneport</p>
      <div class="u-mt-20-wrap">
        <span class="stamp stamp-red u-stamp-cover">Confidential</span>
      </div>
    </div>
  </div>`,

  // CASE INDEX
  `<div class="case-page right-page">
    <div class="page-border"></div>
    ${cornerSVG}
    <div class="u-col-center-8">
      <p class="section-label">✦ Case Index ✦</p>
      ${rule}
      <div class="u-pad-12-4">
        <div class="bullet-row"><span class="ornament">◆</span><p class="u-type-12">Case No. 001 — The L'Mur Situation <span class="stamp stamp-green u-stamp-tilt-sm">Closed</span></p></div>
        <p class="u-ifell-11-left18-mb10">Throneport, Aundair District · Therendor 12th</p>
        <div class="bullet-row"><span class="ornament">◆</span><p class="u-type-12">Case No. 002 — The Langstrom Disappearance <span class="stamp stamp-red u-stamp-tilt-sm">Active</span></p></div>
        <p class="u-ifell-11-left18">Throneport · Ongoing</p>
      </div>
      ${rule}
      <div class="hand-aside u-hand-aside-auto u-hand-aside-11">Evidence in my possession: drugs (3 bags, assorted). Status: secured. Role: evidence-holder. This is a defined role.</div>
    </div>
    <span class="page-num num-right">—</span>
  </div>`,

  // CASE 001 LEFT
  `<div class="case-page">
    <div class="page-border"></div>
    ${cornerSVG}
    <div class="u-col-full">
      <p class="deco-title">Case No. 001</p>
      <p class="deco-sub">The L'Mur Situation</p>
      <p class="deco-meta">Throneport, Aundair District · 998 YK · Filed by M. Maple, Investigator</p>
      ${rule}
      <p class="section-label">✦ Circumstances ✦</p>
      <div class="body-type">
        <p>The L'Mur family <em>(spelling unconfirmed)</em> subject to a fortnight of unexplained disturbances. Church of the Silver Flame investigated and found nothing of note.</p>
      </div>
      <div class="hand-aside">"The Church found nothing?? Great. More for us."</div>
      <p class="section-label">✦ The Family ✦</p>
      <div class="two-col body-type u-body-10">
        <div>
          <div class="bullet-row"><span class="ornament u-ornament-11">◆</span><p><strong>Jannete</strong> — Dawn's plants dying</p></div>
          <div class="bullet-row"><span class="ornament u-ornament-11">◆</span><p><strong>Jaquece</strong> — cookbooks; oil on door handle</p></div>
          <div class="bullet-row"><span class="ornament u-ornament-11">◆</span><p><strong>Heather</strong> — exhausted, feels watched; oily residue near her room</p></div>
        </div>
        <div>
          <div class="bullet-row"><span class="ornament u-ornament-11">◆</span><p><strong>Dawn</strong> — plants thriving. Only things in the house that are.</p></div>
          <div class="bullet-row"><span class="ornament u-ornament-11">◆</span><p><strong>Shannon</strong> — hears whispers; a man <span class="u-caveat-red-12">(ew)</span></p></div>
          <div class="bullet-row"><span class="ornament u-ornament-11">◆</span><p><strong>Karin</strong> — saw long-haired man in kitchen; pill in room</p></div>
        </div>
      </div>
      <p class="section-label">✦ Physical Evidence ✦</p>
      <div class="body-type u-body-10">
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Door: translucent glint — possibly holy water</p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Shuffling footsteps above — family cannot afford servants</p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Oily sheen: Heather's room → Karin's room</p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>One pill, Karin's room <span class="stamp stamp-red">Evidence</span></p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Toilet had been used. Noted. Ongoing.</p></div>
      </div>
    </div>
    <span class="page-num num-left">5</span>
  </div>`,

  // CASE 001 RIGHT
  `<div class="case-page right-page">
    <div class="page-border"></div>
    ${cornerSVG}
    <div class="u-col-full">
      <p class="section-label">✦ The Dealer & The Deed ✦</p>
      <div class="body-type u-body-10">
        <p>Dealer known as <em>Slick</em> conducting intimidation campaign. The haunting was him. Alchemical concealment oil — rendered translucent enough to pass for a ghost. Church found no spirits because technically correct: it was not a spirit. It was a man covered in oil with a trained Mournland bear.</p>
        <p>Brother Darren Moorstel (accountant, purple house, immediate cooperation) provided full disclosure. Teens → House Jorasco. Dogs → rehomed.</p>
      </div>
      <div class="hand-aside u-hand-aside-11">Deed to purple house may now be ours. I keep starting sentences about this. Prev. owners: Eilif & Hjeltia Merchiot. <span class="stamp stamp-gold">Lead</span></div>
      <p class="section-label">✦ Outstanding ✦</p>
      <div class="body-type u-body-10">
        <div class="bullet-row"><span class="u-marker-red">?</span><p>Pill in Karin's room — origin unknown, never resolved</p></div>
        <div class="bullet-row"><span class="u-marker-red">?</span><p>Karin not Jaquece's biological daughter — affair. <span class="u-caveat-11">none of my business but also extremely my business</span></p></div>
      </div>
      <p class="section-label">✦ Case Status ✦</p>
      <div class="status-wrap">
        <span class="stamp stamp-green">L'Murs: Safe</span>
        <span class="stamp stamp-green">Teens: In Care</span>
        <span class="stamp stamp-green">Dogs: Good Place</span>
        <span class="stamp stamp-red">Deed: Ethically Pending</span>
        <span class="stamp stamp-blue">Haunting: Solved</span>
        <span class="stamp stamp-gold">Toothbear: ???</span>
        <span class="stamp stamp-gold">Pill: ???</span>
      </div>
      <div class="hand-aside u-hand-aside-11-mt8">
        <p>Upon reflection the disturbances were entirely the work of one Slick, operating via alchemical concealment oil. The Church was looking for spirits and found nothing because technically they were right. <span class="u-caveat-12">it was just a guy</span></p>
        <p class="u-signoff-right-6">— M. Marple ✦ 998 YK</p>
      </div>
    </div>
    <span class="page-num num-right">6</span>
  </div>`,

  // CASE 002 PLACEHOLDER
  `<div class="case-page">
    <div class="page-border"></div>
    ${cornerSVG}
    <div class="u-col-full">
      <p class="deco-title">Case No. 002</p>
      <p class="deco-sub">The Langstrom Disappearance</p>
      <p class="deco-meta">Throneport & beyond · 998 YK · Active</p>
      ${rule}
      <p class="section-label">✦ Client ✦</p>
      <div class="body-type u-body-11">
        <p>Pipi "I'm an Independent and Strong Girl" Langstrom. Self-described. Not a strong reader or writer. Assisted with missing persons report.</p>
      </div>
      <p class="section-label">✦ Missing Person ✦</p>
      <div class="body-type u-body-10">
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Capt. Philip Langstrom. Big. Red hair. Beard, no moustache. Corn cob pipe.</p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Last address: Langstrom House, Aundair District, Throneport.</p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Washed overboard when Pipi was a baby. Parents were pirates keeping shipping lanes safe.</p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Known possessions: large sack of gold coins.</p></div>
      </div>
      <div class="hand-aside u-hand-aside-11">He washed overboard. As a pirate. When she was a baby. Either he is alive and chose not to come back, or he is dead, or the grandmother's stories were a kindness. All three require careful handling.</div>
    </div>
    <span class="page-num num-left">7</span>
  </div>`,

  // CASE 002 LEADS
  `<div class="case-page right-page">
    <div class="page-border"></div>
    ${cornerSVG}
    <div class="u-col-full">
      <p class="section-label">✦ Active Leads ✦</p>
      <div class="body-type u-body-10-mt4">
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>The docks — ships, ocean, pirates. Starting point. <span class="stamp stamp-blue">Active</span></p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Bai's dock contacts — "labour organizers." (They are in the mafia. I have been briefed.) <span class="stamp stamp-blue">Active</span></p></div>
        <div class="bullet-row"><span class="u-marker-gold">✦</span><p>Fencing establishments or seedy maritime contacts. <span class="stamp stamp-blue">Active</span></p></div>
        <div class="bullet-row"><span class="u-marker-red">?</span><p>Annual birthday package — House Orien courier. Who is sending it. <span class="stamp stamp-red">Do not mention to Pipi yet</span></p></div>
        <div class="bullet-row"><span class="u-marker-red">?</span><p>The unmarked coins Pipi pays with. No national markings. Origin unknown.</p></div>
      </div>
      ${rule}
      <div class="hand-aside u-hand-aside-11-mt8">She mentioned her birthday like it was nothing and then led me to a package that arrives every year from someone who knows exactly where she is. I am not saying anything yet. I am just noting that I am not saying anything yet.</div>
      <p class="section-label u-section-auto-top">✦ Notes pending · Case Active ✦</p>
      <div class="u-center-mt6">
        <span class="stamp stamp-red u-stamp-small">Ongoing Investigation</span>
      </div>
    </div>
    <span class="page-num num-right">8</span>
  </div>`,

];


  window.MarcyPageData = {
    makePage,
    journalPages,
    casePages,
  };
})();

