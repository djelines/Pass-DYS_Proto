const FOLDERS = [
  { id: 'fac', name: 'Fac', c: '#8A6412', bg: '#FBE7A1' },
  { id: 'bilans', name: 'Bilans', c: '#2F7F77', bg: '#BDE8E2' },
  { id: 'mdph', name: 'MDPH', c: '#6552C9', bg: '#DCD6F7' },
  { id: 'pap', name: 'PAP et PPS', c: '#3B64A8', bg: '#D2E2F6' },
  { id: 'rqth', name: 'RQTH', c: '#B4533A', bg: '#F9CDB7' },
];
const ago = (n) => (n === 0 ? 'à l’instant' : n === 1 ? 'hier' : n < 30 ? `il y a ${n} jours` : n < 365 ? `il y a ${Math.round(n / 30)} mois` : `il y a ${Math.round(n / 365)} an${n >= 548 ? 's' : ''}`);
const folderName = (id) => (FOLDERS.find((f) => f.id === id) || { name: 'Coffre' }).name;
const TYPES = { pdf: ['PDF', '#B23A2E', '#FBE4DF', 'file'], img: ['Image', '#2F7F77', '#E6F3F1', 'image'], doc: ['Texte', '#3B64A8', '#E9EFF8', 'file'] };
const fileIcon = (f, s = 40) => { const t = TYPES[f.type] || TYPES.pdf; return `<span class="cf-ft" style="width: ${s}px; height: ${s}px; background: ${t[2]}; color: ${t[1]};">${ic(t[3], Math.round(s * 0.48))}<i>${t[0]}</i></span>`; };
let fN = 1;
const FILES = [
  ['Certificat de scolarité 2026-2027', 'fac', 1, [], 'pdf', 184, ['Certificat de scolarité', 'Année 2026-2027', 'Adam C. est inscrit en licence 2 d’histoire.']],
  ['Bilan orthophonique', 'bilans', 400, ['samir'], 'pdf', 920, ['Bilan orthophonique de suivi', 'Lecture plus lente que la moyenne, compréhension préservée.', 'Recommandations : temps majoré d’un tiers, supports numériques, consignes lues.']],
  ['Notification MDPH', 'mdph', 1100, ['samir'], 'pdf', 312, ['Notification de décision', 'Décision valable trois ans.']],
  ['PAP terminale', 'pap', 900, ['samir'], 'pdf', 456, ['Plan d’accompagnement personnalisé', 'Classe de terminale.', 'Supports agrandis, consignes reformulées.']],
  ['Aménagements bac 2024', 'pap', 820, ['samir'], 'pdf', 268, ['Décision d’aménagement des épreuves', 'Temps majoré d’un tiers.', 'Ordinateur sans correcteur.']],
  ['Compte rendu ergothérapie', 'bilans', 300, [], 'doc', 96, ['Compte rendu de séance', 'Clavier recommandé.', 'Logiciel de dictée conseillé.']],
  ['Photo carte étudiante', 'fac', 40, [], 'img', 1240, ['Carte étudiante', 'Université, campus des Chênes.']],
].map(([name, folder, age, shared, type, kb, text]) => ({ id: `f${fN++}`, name, folder, age, shared, type, kb, text }));
const CF = { folder: null, q: '', filter: 'all', view: 'list' };
const size = (kb) => (kb >= 1000 ? `${(kb / 1000).toFixed(1).replace('.', ',')} Mo` : `${kb} Ko`);
const sharedAv = (f, s = 26) => (f.shared.length ? `<span class="avs">${f.shared.map((w) => avatar(w, s)).join('')}</span>` : `<span class="row tiny muted" style="gap: 5px;">${ic('lock', 14)}Privé</span>`);
const old = (f) => f.folder === 'bilans' && f.age > 365;
const CF_FILTERS = [['all', 'Tous'], ['pdf', 'PDF'], ['img', 'Images'], ['shared', 'Partagés'], ['old', 'À renouveler']];
function cfList() {
  const q = CF.q.toLowerCase();
  return FILES.filter((f) => (!CF.folder || f.folder === CF.folder)
    && (!q || `${f.name} ${folderName(f.folder)}`.toLowerCase().includes(q))
    && (CF.filter === 'all' || (CF.filter === 'shared' ? f.shared.length : CF.filter === 'old' ? old(f) : f.type === CF.filter)))
    .sort((a, b) => a.age - b.age);
}
function cfRows(l) {
  if (!l.length) return `<div class="empty"><span class="circle">${ic('search', 24)}</span><b style="color: var(--ink);">Aucun document ici</b><span class="small">Change de filtre ou ajoute un document.</span></div>`;
  if (CF.view === 'grid') return `<div class="cf-grid">${l.map((f) => `<div class="cf-tile"><button class="cf-thumb" data-act="cfOpen" data-id="${f.id}" aria-label="Ouvrir ${esc(f.name)}"><span class="hm-page"><i style="width: 70%; height: 5px; background: #34475F;"></i><i></i><i style="width: 80%;"></i><i></i><i style="width: 60%;"></i></span>${fileIcon(f, 30)}</button><div class="row" style="gap: 6px; padding: 10px 10px 12px 14px;"><button class="grow" data-act="cfOpen" data-id="${f.id}" style="text-align: left; min-width: 0;"><span class="ac-t">${esc(f.name)}</span><span class="tiny muted">${ago(f.age)}</span></button><button class="ib" data-act="cfMore" data-id="${f.id}" aria-label="Actions sur ${esc(f.name)}">${ic('more', 18)}</button></div></div>`).join('')}</div>`;
  return `<div class="cf-table"><div class="cf-th"><span>Nom</span><span>Modifié</span><span>Partagé avec</span><span>Taille</span><span></span></div>${l.map((f) => `<div class="cf-tr"><button class="cf-name" data-act="cfOpen" data-id="${f.id}">${fileIcon(f, 40)}<span style="min-width: 0;"><span class="ac-t">${esc(f.name)}</span><span class="tiny muted">${CF.folder ? size(f.kb) : folderName(f.folder)}${old(f) ? ' · <b style="color: var(--aut); font-weight: 600;">plus d’un an</b>' : ''}</span></span></button><span class="small muted cf-c">${ago(f.age)}</span><span class="cf-c">${sharedAv(f)}</span><span class="small muted cf-c">${size(f.kb)}</span><button class="ib" data-act="cfMore" data-id="${f.id}" aria-label="Actions sur ${esc(f.name)}">${ic('more')}</button></div>`).join('')}</div>`;
}
function cfTools() {
  return `<div class="cf-tools"><div class="mp-search grow" style="min-width: 220px;">${ic('search', 18)}<input id="cfSearch" placeholder="Chercher un document" value="${esc(CF.q)}" aria-label="Chercher un document"></div>
    <div class="chips cf-filters">${CF_FILTERS.map(([k, l]) => `<button class="chip${CF.filter === k ? ' on' : ''}" data-act="cfFilter" data-f="${k}">${l}</button>`).join('')}</div>
    <div class="seg" aria-label="Affichage"><button class="${CF.view === 'list' ? 'on' : ''}" data-act="cfView" data-v="list" aria-label="Liste">${ic('list', 18)}</button><button class="${CF.view === 'grid' ? 'on' : ''}" data-act="cfView" data-v="grid" aria-label="Vignettes">${ic('grid', 18)}</button></div></div>`;
}
function cfAside() {
  const used = FILES.reduce((a, f) => a + f.kb, 0);
  const people = [['samir', 'Samir Charfi'], ['nadia', 'Nadia Charfi']].map(([w, n]) => [w, n, FILES.filter((f) => f.shared.includes(w)).length]);
  return `<aside class="cf-aside"><div class="ac-box"><b class="t3" style="font-size: 17px;">Espace utilisé</b><div class="bar" style="margin: 12px 0 8px;"><i style="width: ${Math.max(3, used / 10000)}%; background: var(--navy);"></i></div><span class="small muted">${size(used)} sur 1 Go</span></div>
    <div class="ac-box"><b class="t3" style="font-size: 17px;">Partagé avec</b>${people.map(([w, n, k]) => `<div class="row" style="margin-top: 12px;">${avatar(w, 34)}<span class="grow"><b style="font-weight: 600; display: block; font-size: 15px;">${n}</b><span class="tiny muted">${k ? `${k} document${k > 1 ? 's' : ''}` : 'Rien pour l’instant'}</span></span></div>`).join('')}</div>
    <div class="ac-box"><div class="row" style="gap: 10px;"><span class="ac-ic" style="width: 38px; height: 38px; background: var(--lio-bg); color: var(--lio);">${ic('shield', 18)}</span><b class="t3" style="font-size: 17px;">Protégé</b></div><p class="small muted" style="margin-top: 10px;">Tes documents sont chiffrés. Tu choisis qui les voit, et tu peux arrêter de partager à tout moment.</p></div></aside>`;
}
function cfRender() {
  if (typeof topbar === 'function' && cur() === 'coffre') setTimeout(topbar);
  const fo = CF.folder && FOLDERS.find((x) => x.id === CF.folder);
  const l = cfList();
  const alert = FILES.find(old);
  const head = fo
    ? `<nav class="cf-crumb" aria-label="Fil d’Ariane"><button data-act="cfRoot">Mon coffre</button>${ic('right', 14)}<b>${esc(fo.name)}</b></nav><div class="page-h fade"><div><h1 class="t1 row" style="gap: 14px;"><span class="cf-fold-ic" style="background: ${fo.bg}; color: ${fo.c};">${ic('folder', 26)}</span>${esc(fo.name)}</h1></div><div class="row wrap hide-m"><button class="btn pri" data-act="cfAdd">${ic('upload', 18)}Ajouter ici</button></div></div>`
    : `<div class="page-h fade"><div><h1 class="t1">Mon coffre</h1><p class="lead">Tes documents, rangés et prêts pour la prochaine démarche.</p></div><div class="row wrap"><button class="btn sec" data-act="cfNewFolder">${ic('folderplus', 18)}Nouveau dossier</button><button class="btn pri hide-m" data-act="cfAdd">${ic('upload', 18)}Ajouter un document</button></div></div>`;
  $('#cfView').innerHTML = `${head}<div class="cf-layout"><div class="cf-main">
    ${!fo && alert ? `<div class="cf-alert fade">${ic('alert', 20)}<span class="grow"><b>« ${esc(alert.name)} » a plus d’un an.</b> La MDPH demande souvent un bilan récent.</span><button class="btn sec sm" data-act="cfOpen" data-id="${alert.id}">Voir</button></div>` : ''}
    ${fo ? '' : `<div class="cf-folders fade">${FOLDERS.map((f) => { const n = FILES.filter((x) => x.folder === f.id); const sh = [...new Set(n.flatMap((x) => x.shared))]; return `<button class="cf-folder" data-act="cfFolder" data-f="${f.id}" style="--fc: ${f.bg}; --fi: ${f.c};"><span class="cf-tab"></span><span class="cf-body"><span class="row" style="justify-content: space-between; align-items: flex-start;"><span class="cf-fold-ic">${ic('folder', 22)}</span>${sh.length ? `<span class="avs">${sh.map((w) => avatar(w, 24)).join('')}</span>` : ''}</span><b>${esc(f.name)}</b><span class="small">${n.length ? `${n.length} document${n.length > 1 ? 's' : ''}` : 'Vide'}</span></span></button>`; }).join('')}</div>`}
    <div class="fade">${fo ? '' : '<h2 class="t3" style="margin: 30px 0 14px;">Tous mes documents</h2>'}${cfTools()}
      <div class="cf-drop" id="cfDrop">${cfRows(l)}<button class="cf-dz" data-act="cfAdd">${ic('upload', 20)}Glisse un fichier ici, ou clique pour l’ajouter${fo ? ` dans « ${esc(fo.name)} »` : ''}</button></div></div>
  </div>${cfAside()}</div><button class="fab" data-act="cfAdd" aria-label="Ajouter un document">${ic('upload', 24, '#fff', 2.2)}</button>`;
}
ACT.cfFolder = (el) => { CF.folder = el.dataset.f; CF.filter = 'all'; CF.q = ''; cfRender(); scrollTo(0, 0); };
ACT.cfRoot = () => { CF.folder = null; cfRender(); };
ACT.cfFilter = (el) => { CF.filter = el.dataset.f; cfRender(); };
ACT.cfView = (el) => { CF.view = el.dataset.v; cfRender(); };
ACT.cfAdd = () => $('#file').click();
document.addEventListener('input', (e) => { if (e.target.id !== 'cfSearch') return; CF.q = e.target.value; const pos = e.target.selectionStart; cfRender(); const i = $('#cfSearch'); i.focus(); i.setSelectionRange(pos, pos); });
document.addEventListener('dragover', (e) => { const d = e.target.closest && e.target.closest('#cfDrop'); if (!d) return; e.preventDefault(); d.classList.add('over'); });
document.addEventListener('dragleave', (e) => { const d = e.target.closest && e.target.closest('#cfDrop'); if (d && !d.contains(e.relatedTarget)) d.classList.remove('over'); });
document.addEventListener('drop', (e) => { const d = e.target.closest && e.target.closest('#cfDrop'); if (!d) return; e.preventDefault(); d.classList.remove('over'); [...e.dataTransfer.files].forEach(addFile); cfRender(); });
const FF = (id) => FILES.find((f) => f.id === id);
ACT.cfOpen = (el) => {
  const f = FF(el.dataset.id);
  modal(`${mHead(esc(f.name))}<div class="doc-page"><div class="doc-wm">Document fictif</div><b style="font-family: var(--title); font-size: 20px; display: block; border-bottom: 2px solid #1D2B3A; padding-bottom: 10px; margin-bottom: 14px;">${esc(f.text[0])}</b>${f.text.slice(1).map((t) => `<p style="margin-bottom: 10px; line-height: 1.7;">${esc(t)}</p>`).join('')}${[90, 75, 85, 60].map((w) => `<i style="display: block; height: 7px; width: ${w}%; background: #ECE8DF; border-radius: 4px; margin-top: 10px;"></i>`).join('')}</div>
    <div class="cf-meta"><span><span class="tiny muted">Dossier</span><b>${folderName(f.folder)}</b></span><span><span class="tiny muted">Ajouté</span><b>${ago(f.age)}</b></span><span><span class="tiny muted">Taille</span><b>${size(f.kb)}</b></span><span><span class="tiny muted">Partagé</span>${sharedAv(f, 24)}</span></div>
    <div class="cf-log"><span class="flabel">Qui l’a consulté</span>${(() => { const l = ACCESS.filter((a) => a.what === f.name); return l.length ? l.map(accessRow).join('') : '<p class="small muted">Personne d’autre que toi.</p>'; })()}</div>
    <div class="modal-f"><button class="btn ghost" data-act="say" data-t="${esc(f.text.join('. '))}">${ic('volume', 18)}Écouter</button><button class="btn sec" data-act="cfDl" data-id="${f.id}">${ic('download', 18)}Télécharger</button><button class="btn pri" data-act="cfMore" data-id="${f.id}">${ic('users', 18)}Partager et ranger</button></div>`);
};
ACT.cfDl = (el) => toast(`« ${FF(el.dataset.id).name} » téléchargé`);
ACT.cfMore = (el) => {
  const f = FF(el.dataset.id);
  const sw = (w) => { const m = M(w); const on = f.shared.includes(w); return `<div class="row" style="padding: 10px 0;">${avatar(w, 36)}<span class="grow"><b style="font-weight: 600;">${m.name}</b><span class="small muted" style="display: block;">${m.role} · ${on ? 'peut voir ce document' : 'ne le voit pas'}</span></span><button class="tgl${on ? ' on' : ''}" data-act="cfShare" data-id="${f.id}" data-w="${w}" role="switch" aria-checked="${on}" aria-label="Partager avec ${m.name}"></button></div>`; };
  modal(`${mHead(esc(f.name))}<div><span class="flabel">Qui le voit</span>${sw('samir')}${sw('nadia')}</div>
    <label><span class="flabel">Nom du document</span><input class="field" id="cfName" value="${esc(f.name)}"></label>
    <div><span class="flabel">Ranger dans</span><div class="chips" id="cfMove">${FOLDERS.map((x) => `<button class="chip${x.id === f.folder ? ' on' : ''}" data-act="cfMoveTo" data-f="${x.id}">${esc(x.name)}</button>`).join('')}</div></div>
    <div class="modal-f" style="justify-content: space-between;"><button class="btn bad sm" data-act="cfDel" data-id="${f.id}">${ic('trash', 16)}Supprimer</button><button class="btn pri" data-act="cfSave" data-id="${f.id}">Enregistrer</button></div>`);
};
ACT.cfMoveTo = (el) => $$('#cfMove .chip').forEach((c) => c.classList.toggle('on', c === el));
ACT.cfShare = (el) => { const f = FF(el.dataset.id); const w = el.dataset.w; f.shared = f.shared.includes(w) ? f.shared.filter((x) => x !== w) : [...f.shared, w]; ACT.cfMore(el); cfRender(); toast(f.shared.includes(w) ? 'Document partagé' : 'Partage arrêté. L’accès est retiré tout de suite.'); };
ACT.cfSave = (el) => { const f = FF(el.dataset.id); const v = $('#cfName').value.trim(); if (v) f.name = v; const to = $('#cfMove .on'); if (to && to.dataset.f !== f.folder) { f.folder = to.dataset.f; toast(`Rangé dans « ${folderName(f.folder)} »`); } else toast('Enregistré'); closeModal(); cfRender(); };
ACT.cfDel = (el) => { if (el.dataset.ok !== '1') { el.dataset.ok = '1'; el.innerHTML = `${ic('trash', 16)}Confirmer`; return; } FILES.splice(FILES.findIndex((f) => f.id === el.dataset.id), 1); closeModal(); cfRender(); toast('Document supprimé'); };
const SWATCH = [['#FBE7A1', '#8A6412'], ['#BDE8E2', '#2F7F77'], ['#D2E2F6', '#3B64A8'], ['#F9CDB7', '#B4533A'], ['#DCD6F7', '#6552C9']];
ACT.cfNewFolder = () => modal(`${mHead('Nouveau dossier')}<label><span class="flabel">Nom</span><input class="field" id="nfName" placeholder="Par exemple : Stage"></label><div><span class="flabel">Couleur</span><div class="row" style="gap: 10px;" id="nfCol">${SWATCH.map(([bg], i) => `<button class="swatch${i ? '' : ' on'}" style="background: ${bg};" data-act="nfCol" data-i="${i}" aria-label="Couleur ${i + 1}"></button>`).join('')}</div></div><div class="modal-f"><button class="btn ghost" data-act="close">Annuler</button><button class="btn pri" data-act="nfOk">Créer</button></div>`);
ACT.nfCol = (el) => $$('#nfCol .swatch').forEach((s) => s.classList.toggle('on', s === el));
ACT.nfOk = () => { const v = $('#nfName').value.trim(); if (!v) return $('#nfName').focus(); const [bg, c] = SWATCH[Number($('#nfCol .on').dataset.i)]; FOLDERS.push({ id: `d${fN++}`, name: v, bg, c }); closeModal(); cfRender(); toast(`Dossier « ${v} » créé`); };
function addFile(file) {
  const type = /^image\//.test(file.type) ? 'img' : /pdf/.test(file.type) ? 'pdf' : 'doc';
  FILES.unshift({ id: `f${fN++}`, name: file.name.replace(/\.[^.]+$/, ''), folder: CF.folder || 'fac', age: 0, shared: [], type, kb: Math.max(1, Math.round(file.size / 1000)), text: [file.name, 'Ajouté depuis ton appareil.', 'Aperçu non disponible dans le prototype.'] });
  addXp(10, 'document rangé');
}
$('#file').addEventListener('change', (e) => { [...e.target.files].forEach(addFile); e.target.value = ''; if (cur() === 'coffre') cfRender(); else go('coffre'); });
ENTER.coffre = cfRender;
