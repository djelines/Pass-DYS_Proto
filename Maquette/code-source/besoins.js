const STAGES = {
  Primaire: ['school', [['Qu’on me lise les consignes', 'volume'], ['Une consigne à la fois', 'steps'], ['Moins recopier', 'pen'], ['Répondre à l’oral', 'mic'], ['Être placé devant', 'users']], 'École Jules-Ferry · CM1'],
  'Collège': ['school', [['Qu’on me lise les consignes', 'volume'], ['Des photocopies agrandies', 'file'], ['Du temps en plus aux contrôles', 'clock'], ['Utiliser un ordinateur', 'grid'], ['Ne pas lire à voix haute', 'eye']], 'Collège Jean-Moulin · 4e'],
  'Lycée': ['book', [['Qu’on me lise les consignes', 'volume'], ['Les cours à l’avance', 'file'], ['Du temps en plus au bac', 'clock'], ['Des sujets en police lisible', 'eye'], ['Utiliser un ordinateur', 'grid']], 'Lycée Ampère · Terminale'],
  'Étudiant': ['library', [['Du temps en plus aux examens', 'clock'], ['Les diaporamas avant le cours', 'file'], ['Un ordinateur pour composer', 'grid'], ['Des sujets en police lisible', 'eye'], ['Une salle au calme', 'moon']], 'Université · L2 Histoire'],
  'Salarié': ['hands', [['Des consignes écrites', 'pen'], ['Un logiciel de dictée', 'mic'], ['Du temps pour relire mes mails', 'clock'], ['Un ordre du jour avant les réunions', 'list'], ['Un bureau au calme', 'moon']], 'Assistant · Cabinet Martin'],
  Parent: ['heart', [['Qu’on lise les consignes à mon enfant', 'volume'], ['Moins de copie pour lui', 'pen'], ['Du temps en plus aux contrôles', 'clock'], ['Un ordinateur en classe', 'grid'], ['Un point régulier avec le professeur', 'users']], 'Pour Léa · Collège, 4e'],
};
const PHRASES = [
  'Ces aménagements m’aident à montrer ce que je sais vraiment. Merci de votre aide.',
  'Je travaille bien quand ces conditions sont réunies. N’hésitez pas à me poser vos questions.',
  'Ces besoins sont reconnus. Je peux vous montrer les justificatifs si besoin.',
];
const BS0 = STAGES[PROFIL.stage] ? PROFIL.stage : 'Étudiant';
const BS = { stage: BS0, place: STAGES[BS0][2], on: [true, true, true, true, false], extra: [], phrase: 0, links: [] };
const bsAll = () => [...STAGES[BS.stage][1], ...BS.extra.map((t) => [t, 'check'])];
const bsActive = () => bsAll().filter((x, i) => BS.on[i]);
const bsName = () => (BS.stage === 'Parent' ? 'Léa A.' : `${PROFIL.prenom} ${PROFIL.nom[0]}.`);
function qr(s = 200) {
  let seed = 11; const r = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  let d = '';
  for (let y = 0; y < 25; y++) for (let x = 0; x < 25; x++) { const f = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16); if (!f && r() > 0.5) d += `M${x} ${y}h1v1h-1z`; }
  [[0, 0], [18, 0], [0, 18]].forEach(([x, y]) => { d += `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`; });
  return `<svg viewBox="0 0 25 25" width="${s}" height="${s}" shape-rendering="crispEdges" role="img" aria-label="QR code de ta carte"><path d="${d}" fill="#1D2B3A" fill-rule="evenodd"></path></svg>`;
}
function idCard(max = 99, big = false, compact = false) {
  const act = bsActive();
  const shown = act.slice(0, max);
  return `<div class="idc${big ? ' big' : ''}">
    <div class="idc-top"><span class="row" style="gap: 8px;">${LOGO}<b>Pass’Dys</b></span><span class="idc-kind">Carte de besoins</span></div>
    <div class="idc-who"><span class="idc-av">${BS.stage === 'Parent' ? 'LA' : 'AC'}</span><span style="min-width: 0;"><b class="idc-name">${esc(bsName())}</b><span class="idc-sub">${esc(BS.place)}</span></span><span class="idc-stage">${ic(STAGES[BS.stage][0], 15)}${BS.stage}</span></div>
    <div class="idc-needs">${shown.map(([t, i]) => `<span class="idc-need"><span class="idc-ni">${ic(i, 16, '#1D2B3A', 2.2)}</span>${esc(t)}</span>`).join('') || '<span class="small" style="color: #BFD0E0;">Choisis au moins un besoin.</span>'}${act.length > max ? `<span class="tiny" style="color: #BFD0E0; padding-left: 40px;">et ${act.length - max} autre${act.length - max > 1 ? 's' : ''}</span>` : ''}</div>
    <div class="idc-foot"><span class="idc-qr">${qr(big ? 92 : 58)}</span><span class="grow">${compact ? '<span class="idc-phrase">Scanne pour garder mes besoins.</span>' : `<span class="idc-phrase">${esc(PHRASES[BS.phrase])}</span>`}<span class="tiny" style="color: #BFD0E0; display: block; margin-top: 6px;">Aucun diagnostic n’est affiché.</span></span></div>
  </div>`;
}
function bsRender() {
  const all = bsAll();
  const n = BS.on.filter((x, i) => x && i < all.length).length;
  $('#bsView').innerHTML = `<div class="page-h fade"><div><h1 class="t1">Ma carte de besoins</h1><p class="lead">Ce qui t’aide, sans avoir à te justifier. Tu la montres, ou tu l’envoies.</p></div><div class="row wrap hide-m"><button class="btn sec" data-act="bsShare">${ic('qr', 18)}Partager</button><button class="btn pri" data-act="bsShow">${ic('expand', 18)}Montrer en classe</button></div></div>
    <div class="bs-layout">
      <div class="col" style="gap: 18px;">
        <section class="ac-box fade"><div class="bs-step"><span class="bs-n">1</span><div><h2 class="t3">Pour quelle situation ?</h2><p class="small muted">Les besoins proposés changent selon ta situation.</p></div></div>
          <div class="bs-stages">${Object.entries(STAGES).map(([s, [i]]) => `<button class="bs-stage${s === BS.stage ? ' on' : ''}" data-act="bsStage" data-s="${s}">${ic(i, 22)}<span>${s}</span></button>`).join('')}</div>
          <label style="display: block; margin-top: 16px;"><span class="flabel">${BS.stage === 'Parent' ? 'Établissement de ton enfant' : BS.stage === 'Salarié' ? 'Entreprise et poste' : 'Établissement et classe'}</span><input class="field" id="bsPlace" value="${esc(BS.place)}"></label></section>
        <section class="ac-box fade"><div class="bs-step"><span class="bs-n">2</span><div class="grow"><h2 class="t3">Mes besoins</h2><p class="small muted">${n} affiché${n > 1 ? 's' : ''} sur la carte. Garde les plus importants.</p></div></div>
          <div class="bs-list">${all.map(([t, i], k) => `<button class="bs-line${BS.on[k] ? ' on' : ''}" data-act="bsTgl" data-i="${k}" role="switch" aria-checked="${!!BS.on[k]}"><span class="bs-ic">${ic(i, 18)}</span><span class="grow">${esc(t)}</span><span class="tgl${BS.on[k] ? ' on' : ''}"></span></button>`).join('')}</div>
          <div class="hm-input" style="margin-top: 12px; padding: 6px 6px 6px 16px;"><input id="bsNew" placeholder="Ajouter un autre besoin" aria-label="Ajouter un besoin" style="flex: 1; border: 0; background: transparent; outline: none; font-size: 16px; min-height: 40px; color: var(--ink);"><button class="btn pri sm" data-act="bsAdd">${ic('plus', 16)}Ajouter</button></div></section>
        <section class="ac-box fade"><div class="bs-step"><span class="bs-n">3</span><div><h2 class="t3">Une phrase pour expliquer</h2><p class="small muted">Elle s’affiche en bas de la carte.</p></div></div>
          <div class="col" style="gap: 8px;">${PHRASES.map((p, i) => `<button class="sh-opt${BS.phrase === i ? ' on' : ''}" data-act="bsPhrase" data-i="${i}"><span class="sh-radio"></span><span>${esc(p)}</span></button>`).join('')}</div></section>
      </div>
      <div class="bs-side"><div class="bs-sticky"><p class="lbl" style="margin-bottom: 10px;">Aperçu de ta carte</p>${idCard()}
        <div class="bs-acts"><button class="btn pri" data-act="bsShow">${ic('expand', 18)}Plein écran</button><button class="btn sec" data-act="bsShare">${ic('qr', 18)}QR code ou lien</button><button class="btn sec" data-act="bsPdf">${ic('download', 18)}PDF</button></div>
        ${BS.links.filter((l) => l.on).length ? `<p class="small muted" style="margin-top: 12px;">${ic('link', 14)} ${BS.links.filter((l) => l.on).length} lien actif. <button class="btn ghost sm" data-act="bsShare">Gérer</button></p>` : ''}</div></div>
    </div>`;
}
ACT.bsStage = (el) => { BS.stage = el.dataset.s; BS.place = STAGES[BS.stage][2]; BS.on = [true, true, true, true, false]; BS.extra = []; bsRender(); };
ACT.bsTgl = (el) => { const i = Number(el.dataset.i); BS.on[i] = !BS.on[i]; bsRender(); };
ACT.bsPhrase = (el) => { BS.phrase = Number(el.dataset.i); bsRender(); };
ACT.bsAdd = () => { const v = $('#bsNew').value.trim(); if (!v) return $('#bsNew').focus(); BS.extra.push(v); BS.on[bsAll().length - 1] = true; bsRender(); toast('Besoin ajouté à ta carte'); };
ACT.bsPdf = () => toast('PDF prêt. Dans la vraie app, il se télécharge.');
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'bsNew') ACT.bsAdd(); });
document.addEventListener('change', (e) => { if (e.target.id === 'bsPlace') { BS.place = e.target.value.trim() || STAGES[BS.stage][2]; bsRender(); } });
ACT.bsShow = () => {
  const o = document.createElement('div');
  o.className = 'bs-full';
  o.setAttribute('role', 'dialog');
  o.setAttribute('aria-label', 'Ma carte en plein écran');
  o.innerHTML = `<button class="bs-close" data-act="bsHide" aria-label="Fermer">${ic('x', 26, '#fff')}</button><div class="bs-full-in"><p class="bs-full-k">Carte de besoins</p><h2 class="bs-full-n">${esc(bsName())}</h2><p class="bs-full-s">${esc(BS.place)}</p><div class="bs-full-l">${bsActive().map(([t, i]) => `<span><span class="idc-ni">${ic(i, 22, '#1D2B3A', 2.2)}</span>${esc(t)}</span>`).join('')}</div><p class="bs-full-p">${esc(PHRASES[BS.phrase])}</p><div class="row" style="gap: 14px; margin-top: 26px;"><span class="idc-qr">${qr(84)}</span><span class="small" style="color: #BFD0E0;">Scannez pour garder ces besoins.<br>Aucun diagnostic n’est affiché.</span></div></div>`;
  document.body.append(o);
  $('.bs-close', o).focus();
};
ACT.bsHide = () => $$('.bs-full').forEach((x) => x.remove());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') ACT.bsHide(); });
function bsLinks() { return BS.links.map((l, i) => `<div class="row small" style="padding: 10px 12px; border-radius: 12px; background: var(--surf2); ${l.on ? '' : 'opacity: .5;'}">${ic('link', 16)}<b class="grow" style="font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis;">${l.url}</b><span class="muted">${l.on ? `jusqu’au ${l.until.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}` : 'Arrêté'}</span>${l.on ? `<button class="btn ghost sm" data-act="bsRevoke" data-i="${i}">Arrêter</button>` : ''}</div>`).join(''); }
ACT.bsShare = () => {
  modal(`${mHead('Partager ma carte')}<div class="sh-info">${ic('lock', 18)}<span>La personne voit <b>seulement tes besoins</b>. Jamais ton dossier, jamais de diagnostic.</span></div>
    <div style="display: flex; justify-content: center; background: #fff; border-radius: 18px; padding: 16px; border: 1px solid var(--line);">${qr(180)}</div><p class="small muted" style="text-align: center; margin-top: -6px;">À faire scanner avec un téléphone.</p>
    <div><span class="flabel">Ou envoyer un lien qui s’arrête tout seul</span><div class="row wrap"><div class="seg" id="bsTtl"><button data-act="bsTtl" data-d="1">24 h</button><button class="on" data-act="bsTtl" data-d="7">7 jours</button><button data-act="bsTtl" data-d="30">30 jours</button></div><button class="btn sec" data-act="bsLink">${ic('link', 16)}Créer et copier le lien</button></div><div class="col" id="bsLinks" style="gap: 8px; margin-top: 12px;">${bsLinks()}</div></div>`);
  addXp(15, 'carte partagée');
};
ACT.bsTtl = (el) => $$('#bsTtl button').forEach((b) => b.classList.toggle('on', b === el));
ACT.bsLink = () => { const d = Number(($('#bsTtl .on') || { dataset: { d: 7 } }).dataset.d); const id = Math.random().toString(36).slice(2, 8); BS.links.unshift({ url: `passdys.fr/c/${id}`, until: inDays(d), on: true }); $('#bsLinks').innerHTML = bsLinks(); copy(`https://passdys.fr/c/${id}`, `Lien copié · valable ${d === 1 ? '24 h' : `${d} jours`}`); if (cur() === 'besoins') bsRender(); };
ACT.bsRevoke = (el) => { BS.links[Number(el.dataset.i)].on = false; $('#bsLinks').innerHTML = bsLinks(); toast('Lien arrêté. Il ne marche plus.'); if (cur() === 'besoins') bsRender(); };
ENTER.besoins = bsRender;
