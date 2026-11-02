const MEMBERS = [
  { id: 'adam', name: 'Adam Charfi', ini: 'AC', bg: '#97D4D0', role: 'Toi' },
  { id: 'samir', name: 'Samir Charfi', ini: 'SC', bg: '#D2E2F6', role: 'Parent 1' },
  { id: 'nadia', name: 'Nadia Charfi', ini: 'NC', bg: '#F9CDB7', role: 'Parent 2' },
];
const CATALOG = {
  examens: { name: 'Aménagement d’examens', tag: 'Études', color: '#34475F', src: 'service-public.fr', place: 'Service handicap, campus des Chênes', steps: [
    ['Contacter le service handicap', 'Écris au service handicap de ton université dès la rentrée pour ouvrir ta demande.', []],
    ['Rassembler les justificatifs', 'Réunis les documents qui montrent tes besoins et les aménagements déjà obtenus.', ['Bilan orthophonique', 'Certificat de scolarité', 'Aménagements obtenus au bac']],
    ['Rendez-vous avec le médecin', 'Le médecin du service de santé étudiante lit tes justificatifs et donne son avis.', ['Justificatifs rassemblés']],
    ['Recevoir la décision', 'L’université t’envoie la décision. Range-la dans ton coffre.', ['Décision d’aménagement']],
    ['Prévenir les enseignants', 'Transmets la décision à la scolarité avant les partiels.', []]] },
  pap: { name: 'Plan d’accompagnement personnalisé', tag: 'École', color: '#8A6412', src: 'service-public.fr', place: 'Collège ou lycée', steps: [
    ['Demander le plan', 'Écris au chef d’établissement pour demander un plan d’accompagnement.', ['Mail de demande']],
    ['Rassembler les bilans', 'Bilans récents : orthophonie, psychomotricité ou neuropsychologie.', ['Bilan orthophonique']],
    ['Voir le médecin scolaire', 'Il lit les bilans et donne son avis.', ['Bilans']],
    ['Relire le plan', 'L’établissement rédige le plan avec les professeurs. Tu peux proposer des ajouts.', []]] },
  mdph: { name: 'Dossier MDPH', tag: 'MDPH', color: '#3E3A63', src: 'monparcourshandicap.gouv.fr', place: 'MDPH du Val-d’Oise, Cergy', steps: [
    ['Vérifier la fin des droits', 'Regarde la date sur la dernière notification. On renouvelle six mois avant.', ['Dernière notification']],
    ['Remplir le formulaire', 'Formulaire Cerfa 15692. Tu peux dicter le projet de vie à Lio.', ['Cerfa 15692']],
    ['Faire remplir le certificat médical', 'Cerfa 15695, daté de moins d’un an.', ['Cerfa 15695']],
    ['Déposer le dossier', 'En ligne ou par courrier. Garde l’accusé de réception.', ['Accusé de réception']]] },
  rqth: { name: 'Reconnaissance RQTH', tag: 'Travail', color: '#B4533A', src: 'service-public.fr', place: 'MDPH du Val-d’Oise, Cergy', steps: [
    ['Remplir le formulaire MDPH', 'Cerfa 15692, partie vie professionnelle.', ['Cerfa 15692']],
    ['Certificat médical', 'Cerfa 15695, daté de moins d’un an.', ['Cerfa 15695']],
    ['Déposer à la MDPH', 'Tu n’es pas obligé d’en parler à ton employeur.', ['Accusé de réception']],
    ['Attendre la décision', 'Compte plusieurs mois. La RQTH dure de 1 à 10 ans.', []]] },
  poste: { name: 'Aménagement de poste', tag: 'Travail', color: '#2F7F77', src: 'agefiph.fr', place: 'Ton entreprise', steps: [
    ['Lister mes besoins', 'Pars de ta carte de besoins : dictée vocale, consignes écrites, temps de relecture.', []],
    ['Voir le médecin du travail', 'Il peut recommander des aménagements à l’employeur.', []],
    ['En parler au référent handicap', 'Lio peut t’aider à préparer l’échange.', []],
    ['Demander le financement', 'L’Agefiph peut financer le matériel.', ['Devis']]] },
  autre: { name: 'Autre démarche', tag: 'Perso', color: '#5E6B7C', src: '', place: 'À préciser', steps: [['Première étape', 'Décris ce qu’il faut faire.', []]] },
};
let kN = 100;
const EVENTS = [
  { id: 'e1', date: inDays(3), time: '10:00', title: 'Rendez-vous service handicap', place: 'Campus des Chênes, bureau 104', board: 'b1' },
  { id: 'e2', date: inDays(8), time: '17:30', title: 'Orthophoniste', place: 'Cabinet des Linandes, Cergy', board: 'b1' },
  { id: 'e3', date: inDays(36), time: '08:30', title: 'Début des partiels', place: 'Amphi B', board: 'b1' },
  { id: 'e4', date: inDays(15), time: '14:00', title: 'Médecin pour le certificat', place: 'Cabinet du Dr Morel, Cergy', board: 'b2' },
];
const K = (id, col, title, due, who, list = [], desc = '') => ({ id: id || `k${kN++}`, col, title, due: due === null ? null : inDays(due), who, list: list.map(([t, d]) => ({ t, d: !!d })), desc });
const COLS = () => [{ id: 'todo', t: 'À faire' }, { id: 'doing', t: 'En cours' }, { id: 'wait', t: 'En attente' }, { id: 'done', t: 'Fait', done: true }];
const BOARDS = [
  { id: 'b1', type: 'examens', name: 'Aménagement d’examens', color: '#34475F', members: ['adam', 'samir'], rights: { samir: 'edit' }, cols: COLS(), cards: [
    K('k1', 'done', 'Contacter le service handicap', -6, ['adam'], [['Trouver l’adresse du service', 1], ['Envoyer le premier mail', 1]]),
    K('k2', 'doing', 'Rassembler trois documents', 4, ['adam', 'samir'], [['Bilan orthophonique', 1], ['Certificat de scolarité', 0], ['Aménagements obtenus au bac', 0]], 'Le service handicap demande ces documents avant le rendez-vous médical.'),
    K('k3', 'todo', 'Rendez-vous avec le médecin', 9, ['adam'], [['Préparer le rendez-vous avec Lio', 0]]),
    K('k4', 'wait', 'Réponse de la scolarité', 12, ['adam'], [['Relancer si rien sous 7 jours', 0]]),
    K('k5', 'todo', 'Prévenir les enseignants', 30, ['adam'], []),
  ] },
  { id: 'b2', type: 'mdph', name: 'Renouvellement MDPH', color: '#3E3A63', members: ['adam', 'samir', 'nadia'], rights: { samir: 'edit', nadia: 'view' }, cols: COLS(), cards: [
    K('k6', 'doing', 'Remplir le formulaire', 20, ['samir'], [['Partie A', 1], ['Projet de vie', 0]]),
    K('k7', 'todo', 'Certificat médical', 25, ['samir'], [['Prendre rendez-vous', 0]]),
    K('k8', 'todo', 'Déposer le dossier', 60, ['adam', 'samir'], []),
  ] },
  { id: 'b3', type: 'autre', name: 'Carte de besoins', color: '#8A6412', members: ['adam'], rights: {}, cols: COLS(), cards: [
    K('k9', 'done', 'Choisir mes besoins', -10, ['adam'], [['Tiers temps', 1], ['Diaporamas avant le cours', 1]]),
    K('k10', 'done', 'Montrer la carte en cours d’histoire', -3, ['adam'], []),
    K('k11', 'todo', 'Ajouter « salle au calme »', 6, ['adam'], []),
  ] },
];
const isDone = (b, c) => !!(b.cols.find((x) => x.id === c.col) || {}).done;
function progress(b) { const total = b.cards.length; const done = b.cards.filter((c) => isDone(b, c)).length; const next = b.cards.filter((c) => !isDone(b, c) && c.due).sort((a, z) => a.due - z.due)[0]; return { total, done, pct: total ? Math.round(done / total * 100) : 0, next }; }
const M = (id) => MEMBERS.find((m) => m.id === id);
const avatar = (id, s = 28) => { const m = M(id); return m ? `<span class="av" title="${esc(m.name)}" style="width: ${s}px; height: ${s}px; background: ${m.bg}; font-size: ${Math.round(s * 0.38)}px;">${m.ini}</span>` : ''; };
const DM = { board: null, view: 'board', cal: null, card: null, who: 'all' };
const B = () => BOARDS.find((b) => b.id === DM.board);
const iso = (d) => (d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : '');
const fromIso = (v) => (v ? new Date(`${v}T00:00`) : null);
const dueChip = (b, c) => { if (!c.due) return ''; const late = c.due < today0() && !isDone(b, c); const soon = !late && (c.due - today0()) / DAY <= 3 && !isDone(b, c); return `<span class="due${late ? ' late' : soon ? ' soon' : ''}">${ic('clock', 13)}${relDay(c.due)}</span>`; };
const status = (b) => { const p = progress(b); if (p.total && p.done === p.total) return ['Terminée', 'var(--lio)', 'TERMINÉE', 'lio']; if (p.next && p.next.due < today0()) return ['En retard', 'var(--bad)', 'EN RETARD', 'bad']; if (p.next && (p.next.due - today0()) / DAY <= 5) return ['Bientôt', 'var(--aut)', 'CETTE SEMAINE', 'aut']; return ['En cours', 'var(--dem)', 'EN COURS', 'dem']; };
const colDot = (b, col) => (col.done ? 'var(--lio)' : col.id === 'doing' ? b.color : col.id === 'wait' ? 'var(--vio)' : 'var(--mute)');

function dmHome() {
  if (typeof topbar === 'function' && cur() === 'demarches') setTimeout(topbar);
  $('#dmBoard').hidden = true;
  $('#dmHome').hidden = false;
  $('#dmHome').innerHTML = `<div class="page-h fade"><div><h1 class="t1">Mes démarches</h1><p class="lead">Une démarche, un tableau. Ouvre-la pour avancer carte par carte.</p></div><div class="row wrap"><button class="btn sec" data-act="go" data-to="mails">${ic('mail', 18)}Écrire un mail</button><button class="btn pri hide-m" data-act="newBoard">${ic('plus', 18)}Nouvelle démarche</button></div></div><button class="fab" data-act="newBoard" aria-label="Nouvelle démarche">${ic('plus', 26, '#fff', 2.2)}</button>
    <div class="pj-grid fade">${BOARDS.map((b) => {
      const p = progress(b); const cat = CATALOG[b.type]; const st = status(b);
      const d = p.next ? p.next.due : today0();
      return `<button class="pj-card" data-act="openB" data-b="${b.id}"><span class="pj-date" style="background: ${b.color};"><b>${d.getDate()}</b><span class="m">${d.toLocaleDateString('fr-FR', { month: 'long' })}</span><span class="y">${d.getFullYear()}</span></span>
        <span class="pj-body"><span class="pj-top"><span class="pj-cat">${cat.tag}</span><span class="pj-st"><i style="background: ${st[1]};"></i>${st[0]}</span></span>
          <span class="pj-title">${esc(b.name)}</span>
          <span class="pj-line">${ic('pin', 17, 'var(--aut)')}<span class="pj-txt">${esc(p.next ? `Prochaine étape : ${p.next.title}` : cat.place)}</span></span>
          <span class="pj-line">${ic('users', 17)}<span>${p.done} étape${p.done > 1 ? 's' : ''} faite${p.done > 1 ? 's' : ''} sur ${p.total}</span><span class="pill ${st[3]}">${st[2]}</span><span class="avs pj-avs">${b.members.map((m) => avatar(m, 26)).join('')}</span></span></span></button>`;
    }).join('')}<button class="pj-card pj-new" data-act="newBoard">${ic('plus', 24)}<span>Nouvelle démarche</span></button></div>
    <div class="card fade" style="margin-top: 22px; padding: 16px 20px;"><div class="row wrap"><span style="width: 40px; height: 40px; border-radius: 12px; background: var(--lio-bg); color: var(--lio); display: flex; align-items: center; justify-content: center;">${ic('sparkle', 20)}</span><span class="grow" style="min-width: 200px;"><b>Idée de Lio :</b> <span class="muted">demander la RQTH avant ton premier stage.</span></span><button class="btn sec sm" data-act="newBoard" data-type="rqth">${ic('plus', 16)}Créer cette démarche</button></div></div>`;
}
function dmBoard() {
  const b = B();
  if (!b) return dmHome();
  if (typeof topbar === 'function' && cur() === 'demarches') setTimeout(topbar);
  $('#dmHome').hidden = true;
  $('#dmBoard').hidden = false;
  const p = progress(b);
  const f = DM.fade ? ' fade' : '';
  DM.fade = false;
  const add = { board: ['addTask', 'Nouvelle tâche'], list: ['addTask', 'Nouvelle tâche'], cal: ['addEvent', 'Ajouter au calendrier'] }[DM.view];
  $('#dmBoard').innerHTML = `<div class="${f}" style="margin-bottom: 20px;"><button class="btn ghost sm pg-back" data-act="dmBack" style="margin-left: -10px;">${ic('left', 16)}Mes démarches</button>
    <div class="row wrap" style="margin-top: 8px; gap: 14px;"><span style="width: 14px; height: 14px; border-radius: 5px; background: ${b.color};"></span><h1 class="t2 grow" style="min-width: 200px;">${esc(b.name)}</h1>
      <div class="row" style="gap: 10px;"><div class="bar" style="width: 120px;"><i style="width: ${p.pct}%; background: ${b.color};"></i></div><span class="small muted">${p.done} sur ${p.total}</span></div>
      <button class="row" data-act="share" style="gap: 8px;" aria-label="Voir qui a accès"><span class="avs">${b.members.map((m) => avatar(m, 32)).join('')}</span></button><button class="btn sec sm" data-act="share">${ic('users', 16)}Partager</button></div>
    <div class="row wrap" style="margin-top: 16px; gap: 10px;"><div class="seg">${[['board', 'kanban', 'Tableau'], ['list', 'list', 'Liste'], ['cal', 'calendar', 'Calendrier']].map(([v, i, l]) => `<button class="${DM.view === v ? 'on' : ''}" data-act="dmView" data-v="${v}">${ic(i, 16)}${l}</button>`).join('')}</div>
      <span class="grow"></span><button class="btn ghost sm hide-s" data-act="go" data-to="mails">${ic('mail', 16)}Écrire un mail</button><button class="btn pri sm hide-m" data-act="${add[0]}">${ic('plus', 16)}${add[1]}</button></div></div>
    <div id="dmContent" class="${f}"></div><button class="fab" data-act="${add[0]}" aria-label="${add[1]}">${ic('plus', 26, '#fff', 2.2)}</button>`;
  if (DM.view === 'board') kanban(b);
  if (DM.view === 'list') listView(b);
  if (DM.view === 'cal') calView(b);
}

function cardHtml(b, c) {
  const done = c.list.filter((x) => x.d).length;
  const ci = b.cols.findIndex((x) => x.id === c.col);
  return `<div class="kb-card" data-card="${c.id}" tabindex="0" role="button" aria-label="${esc(c.title)}">
    <span class="tt" style="${isDone(b, c) ? 'text-decoration: line-through; color: var(--mute);' : ''}">${esc(c.title)}</span>
    ${c.list.length ? `<span class="kb-prog"><i style="width: ${done / c.list.length * 100}%; background: ${done === c.list.length ? 'var(--lio)' : b.color};"></i></span>` : ''}
    <span class="kb-meta">${dueChip(b, c)}${c.list.length ? `<span class="row" style="gap: 4px;">${ic('check', 14)}${done}/${c.list.length}</span>` : ''}${c.desc ? `<span title="Description">${ic('list', 14)}</span>` : ''}<span class="grow"></span>
      <span class="kb-move">${ci > 0 ? `<button class="kb-arrow" data-act="mv" data-d="-1" data-card="${c.id}" aria-label="Déplacer vers ${esc(b.cols[ci - 1].t)}">${ic('left', 15)}</button>` : ''}${ci < b.cols.length - 1 ? `<button class="kb-arrow" data-act="mv" data-d="1" data-card="${c.id}" aria-label="Déplacer vers ${esc(b.cols[ci + 1].t)}">${ic('right', 15)}</button>` : ''}</span>
      <span class="avs">${c.who.map((w) => avatar(w, 24)).join('')}</span></span></div>`;
}
const isMob = () => innerWidth <= 760;
const colHtml = (b, col, one = false) => { const cs = b.cards.filter((c) => c.col === col.id); return `<section class="kb-col${one ? ' kb-one' : ''}" data-col="${col.id}" aria-label="${esc(col.t)}"><header class="kb-h"><span class="kb-dot" style="background: ${colDot(b, col)};"></span><span class="nm">${esc(col.t)}</span><span class="kb-n">${cs.length}</span><button class="kb-arrow" data-act="colMenu" data-col="${col.id}" aria-label="Options de la colonne ${esc(col.t)}">${ic('more', 16)}</button></header>
      <div class="kb-list">${cs.map((c) => cardHtml(b, c)).join('') || (one ? '<p class="small muted" style="padding: 8px 4px;">Aucune carte ici.</p>' : '')}</div>
      <div class="kb-compose" data-col="${col.id}"><button class="kb-add" data-act="compose" data-col="${col.id}">${ic('plus', 16)}Ajouter une carte</button></div></section>`; };
function kanban(b) {
  if (isMob()) {
    if (!b.cols.find((c) => c.id === DM.col)) DM.col = (b.cols.find((c) => !c.done && b.cards.some((k) => k.col === c.id)) || b.cols[0]).id;
    $('#dmContent').innerHTML = `<div class="kb-tabs" role="tablist">${b.cols.map((c) => `<button role="tab" aria-selected="${c.id === DM.col}" class="${c.id === DM.col ? 'on' : ''}" data-act="kbCol" data-col="${c.id}"><span class="kb-dot" style="background: ${colDot(b, c)};"></span>${esc(c.t)}<span class="kb-n">${b.cards.filter((k) => k.col === c.id).length}</span></button>`).join('')}<button data-act="addCol" aria-label="Ajouter une colonne">${ic('plus', 16)}</button></div>
      ${colHtml(b, b.cols.find((c) => c.id === DM.col), true)}<p class="tiny muted" style="margin-top: 10px;">Les flèches d’une carte la font passer à la colonne d’avant ou d’après.</p>`;
    return;
  }
  $('#dmContent').innerHTML = `<p class="small muted kb-hint">Fais glisser une carte d’une colonne à l’autre, ou utilise les flèches.</p><div class="kb-wrap" id="kbWrap">${b.cols.map((col) => colHtml(b, col)).join('')}
    <button class="kb-newcol" data-act="addCol">${ic('plus', 16)}Ajouter une colonne</button></div>`;
}
ACT.kbCol = (el) => { DM.col = el.dataset.col; kanban(B()); };
let wasMob = isMob();
addEventListener('resize', () => { if (isMob() !== wasMob) { wasMob = isMob(); if (cur() === 'demarches' && DM.board) dmBoard(); } });
function moveCard(id, colId, before) {
  const b = B();
  const c = b.cards.find((x) => x.id === id);
  if (!c) return;
  const was = isDone(b, c);
  c.col = colId;
  b.cards.splice(b.cards.indexOf(c), 1);
  const i = before ? b.cards.findIndex((x) => x.id === before) : -1;
  if (i >= 0) b.cards.splice(i, 0, c); else b.cards.push(c);
  if (isDone(b, c) && !was) { c.list.forEach((x) => { x.d = true; }); addXp(20, 'étape terminée'); }
  dmBoard();
}
ACT.mv = (el) => { const b = B(); const c = b.cards.find((x) => x.id === el.dataset.card); const i = b.cols.findIndex((x) => x.id === c.col) + Number(el.dataset.d); if (b.cols[i]) { moveCard(c.id, b.cols[i].id); if (isMob()) toast(`Déplacée dans « ${b.cols[i].t} »`); } };
ACT.compose = (el) => {
  const box = el.parentElement;
  box.innerHTML = `<textarea class="field kb-ta" rows="2" placeholder="Titre de la carte" aria-label="Titre de la nouvelle carte"></textarea><div class="row" style="margin-top: 8px; gap: 6px;"><button class="btn pri sm" data-act="composeOk" data-col="${el.dataset.col}">Ajouter la carte</button><button class="ib" data-act="composeX" aria-label="Annuler">${ic('x', 18)}</button></div>`;
  $('textarea', box).focus();
};
ACT.composeOk = (el) => {
  const t = $('textarea', el.closest('.kb-compose')).value.trim();
  if (!t) return;
  B().cards.push(K(null, el.dataset.col, t, 7, ['adam']));
  dmBoard();
  const again = $(`.kb-compose[data-col="${el.dataset.col}"] [data-act="compose"]`);
  if (again) ACT.compose(again);
};
ACT.composeX = () => dmBoard();
document.addEventListener('keydown', (e) => {
  if (!e.target.classList || !e.target.classList.contains('kb-ta')) return;
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ACT.composeOk($('[data-act="composeOk"]', e.target.closest('.kb-compose'))); }
  if (e.key === 'Escape') dmBoard();
});
ACT.addCol = () => modal(`${mHead('Nouvelle colonne')}<label><span class="flabel">Nom de la colonne</span><input class="field" id="ncName" placeholder="Par exemple : À relire"></label><div class="modal-f"><button class="btn ghost" data-act="close">Annuler</button><button class="btn pri" data-act="addColOk">Ajouter</button></div>`);
ACT.addColOk = () => { const v = $('#ncName').value.trim(); if (!v) return $('#ncName').focus(); const b = B(); const i = b.cols.findIndex((c) => c.done); b.cols.splice(i < 0 ? b.cols.length : i, 0, { id: `c${kN++}`, t: v }); closeModal(); dmBoard(); };
ACT.colMenu = (el) => {
  const b = B(); const col = b.cols.find((c) => c.id === el.dataset.col);
  const n = b.cards.filter((c) => c.col === col.id).length;
  modal(`${mHead('Modifier la colonne')}<label><span class="flabel">Nom</span><input class="field" id="cmColName" value="${esc(col.t)}"></label>
    <div class="modal-f" style="justify-content: space-between;">${n ? `<span class="small muted" style="max-width: 24ch;">Déplace ses ${n} carte${n > 1 ? 's' : ''} pour pouvoir la supprimer.</span>` : `<button class="btn bad sm" data-act="colDel" data-col="${col.id}">${ic('trash', 16)}Supprimer</button>`}<button class="btn pri" data-act="colSave" data-col="${col.id}">Enregistrer</button></div>`);
};
ACT.colSave = (el) => { const col = B().cols.find((c) => c.id === el.dataset.col); const v = $('#cmColName').value.trim(); if (v) col.t = v; closeModal(); dmBoard(); };
ACT.colDel = (el) => { const b = B(); if (b.cols.length < 2) return; b.cols = b.cols.filter((c) => c.id !== el.dataset.col); closeModal(); dmBoard(); };

let drag = null;
let justDragged = false;
document.addEventListener('pointerdown', (e) => {
  const c = e.target.closest && e.target.closest('.kb-card');
  if (!c || e.button > 0 || e.pointerType === 'touch' || e.target.closest('button')) return;
  drag = { id: c.dataset.card, el: c, x0: e.clientX, y0: e.clientY, on: false };
});
document.addEventListener('pointermove', (e) => {
  if (!drag) return;
  if (!drag.on) {
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
    const r = drag.el.getBoundingClientRect();
    drag.on = true; drag.dx = e.clientX - r.left; drag.dy = e.clientY - r.top;
    drag.ghost = drag.el.cloneNode(true);
    drag.ghost.className = 'kb-card kb-ghost';
    drag.ghost.style.width = `${r.width}px`;
    document.body.append(drag.ghost);
    drag.el.classList.add('kb-ph');
    document.body.classList.add('dragging');
  }
  drag.ghost.style.left = `${e.clientX - drag.dx}px`;
  drag.ghost.style.top = `${e.clientY - drag.dy}px`;
  const under = document.elementFromPoint(e.clientX, e.clientY);
  const col = under && under.closest('.kb-col');
  $$('.kb-col').forEach((x) => x.classList.toggle('over', x === col));
  if (col) {
    const list = $('.kb-list', col);
    const after = [...list.querySelectorAll('.kb-card:not(.kb-ph)')].find((k) => { const r = k.getBoundingClientRect(); return e.clientY < r.top + r.height / 2; });
    if (after) { if (drag.el.nextElementSibling !== after) list.insertBefore(drag.el, after); } else if (list.lastElementChild !== drag.el) list.append(drag.el);
  }
  const w = $('#kbWrap');
  if (w) { const r = w.getBoundingClientRect(); if (e.clientX > r.right - 60) w.scrollLeft += 14; if (e.clientX < r.left + 60) w.scrollLeft -= 14; }
});
document.addEventListener('pointerup', () => {
  if (!drag) return;
  const d = drag;
  drag = null;
  if (!d.on) return;
  const col = d.el.closest('.kb-col');
  const next = d.el.nextElementSibling;
  d.ghost.remove();
  document.body.classList.remove('dragging');
  justDragged = true;
  setTimeout(() => { justDragged = false; }, 60);
  if (col) moveCard(d.id, col.dataset.col, next ? next.dataset.card : null); else dmBoard();
});
document.addEventListener('click', (e) => {
  const c = e.target.closest('.kb-card');
  if (!c || e.target.closest('button') || justDragged || c.classList.contains('kb-ghost')) return;
  DM.card = c.dataset.card; cardModal();
});
document.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('kb-card')) { e.preventDefault(); DM.card = e.target.dataset.card; cardModal(); } });

function listView(b) {
  const mine = (c) => DM.who === 'all' || c.who.includes(DM.who);
  const row = (c) => { const done = c.list.filter((x) => x.d).length; const d = isDone(b, c); return `<div class="lt-r"><button class="chk${d ? ' on' : ''}" data-act="lsToggle" data-card="${c.id}" role="checkbox" aria-checked="${d}" aria-label="${esc(c.title)}">${d ? ic('check', 14, '#fff', 3) : ''}</button>
    <button class="lt-main" data-act="openCard" data-card="${c.id}"><span class="lt-t" style="${d ? 'text-decoration: line-through; color: var(--mute);' : ''}">${esc(c.title)}</span>${c.desc ? `<span class="small muted lt-d">${esc(c.desc)}</span>` : ''}</button>
    <span class="lt-c lt-due">${d ? '<span class="mute small">Fait</span>' : dueChip(b, c) || '<span class="mute small">Sans date</span>'}</span>
    <span class="lt-c lt-prog">${c.list.length ? `<span class="kb-prog" style="width: 64px;"><i style="width: ${done / c.list.length * 100}%; background: ${b.color};"></i></span><span class="small muted">${done}/${c.list.length}</span>` : '<span class="mute small">Aucune</span>'}</span>
    <span class="lt-c avs">${c.who.map((w) => avatar(w, 26)).join('')}</span></div>`; };
  const todo = b.cards.filter((c) => !isDone(b, c) && mine(c)).sort((x, y) => (x.due || 9e15) - (y.due || 9e15));
  const done = b.cards.filter((c) => isDone(b, c) && mine(c));
  const group = (t, dot, cs, add) => `<section class="lt-g"><header class="lt-gh"><span class="kb-dot" style="background: ${dot};"></span><b>${t}</b><span class="kb-n">${cs.length}</span></header>${cs.map(row).join('') || `<p class="small muted" style="padding: 14px 18px;">${add ? 'Rien à faire. Bravo.' : 'Rien de terminé pour l’instant.'}</p>`}${add ? `<button class="lt-add" data-act="addTask" data-col="${b.cols[0].id}">${ic('plus', 16)}Ajouter une tâche</button>` : ''}</section>`;
  $('#dmContent').innerHTML = `<div class="row wrap" style="margin-bottom: 14px; gap: 10px;"><span class="small muted">Tâches de</span><div class="seg">${[['all', 'Tout le monde'], ...b.members.map((m) => [m, m === 'adam' ? 'Moi' : M(m).name.split(' ')[0]])].map(([v, l]) => `<button class="${DM.who === v ? 'on' : ''}" data-act="ltWho" data-v="${v}">${l}</button>`).join('')}</div></div>
    <div class="lt-head"><span></span><span>Tâche</span><span>Échéance</span><span>Étapes</span><span>Qui</span></div>
    <div class="col" style="gap: 14px;">${group('À faire', b.color, todo, true)}${group('Fait', 'var(--lio)', done, false)}</div>`;
}
ACT.ltWho = (el) => { DM.who = el.dataset.v; listView(B()); };
ACT.lsToggle = (el) => { const b = B(); const c = b.cards.find((x) => x.id === el.dataset.card); moveCard(c.id, isDone(b, c) ? b.cols[0].id : (b.cols.find((x) => x.done) || b.cols[b.cols.length - 1]).id); };

const same = (a, z) => a && z && a.toDateString() === z.toDateString();
const hh = (t) => t.replace(':', ' h ');
function calView(b) {
  if (!DM.day) DM.day = today0();
  const m = DM.cal || new Date(today0().getFullYear(), today0().getMonth(), 1);
  DM.cal = m;
  const first = new Date(m.getFullYear(), m.getMonth(), 1);
  const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  const items = (d) => [...EVENTS.filter((e) => e.board === b.id && same(e.date, d)).map((e) => ({ t: `${hh(e.time)} ${e.title}`, cls: 'ev', act: `data-act="openEvent" data-e="${e.id}"` })), ...b.cards.filter((c) => same(c.due, d)).map((c) => ({ t: c.title, cls: isDone(b, c) ? 'dn' : 'tk', act: `data-act="openCard" data-card="${c.id}"` }))];
  const label = m.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const up = [...EVENTS.filter((e) => e.board === b.id && e.date >= today0()).map((e) => ({ d: e.date, t: e.title, s: `${hh(e.time)} · ${e.place}`, ev: 1, id: e.id })), ...b.cards.filter((c) => c.due && c.due >= today0() && !isDone(b, c)).map((c) => ({ d: c.due, t: c.title, s: 'Tâche à finir', id: c.id }))].sort((x, y) => x.d - y.d).slice(0, 6);
  $('#dmContent').innerHTML = `<div class="cv-grid"><div class="card cv-main">
      <div class="row wrap" style="margin-bottom: 12px; gap: 8px;"><button class="ib" data-act="calM" data-d="-1" aria-label="Mois précédent">${ic('left')}</button><b class="t3 cv-month">${label.charAt(0).toUpperCase() + label.slice(1)}</b><button class="ib" data-act="calM" data-d="1" aria-label="Mois suivant">${ic('right')}</button><button class="btn ghost sm" data-act="calToday">Aujourd’hui</button><span class="grow"></span><span class="cal-key ev">Rendez-vous</span><span class="cal-key tk">Tâche</span></div>
      <div class="cal cal-wd">${['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => `<span>${d}</span>`).join('')}</div>
      <div class="cal">${days.map((d) => { const its = items(d); return `<div class="cal-d${d.getMonth() !== m.getMonth() ? ' out' : ''}${same(d, today0()) ? ' is-today' : ''}${its.length ? ' has' : ''}${isMob() && same(d, DM.day) ? ' sel' : ''}"><button class="cal-n" data-act="${isMob() ? 'calPick' : 'addEvent'}" data-date="${iso(d)}" aria-label="${isMob() ? 'Voir' : 'Ajouter quelque chose'} le ${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}"><span>${d.getDate()}</span><span class="cal-plus">${ic('plus', 13)}</span></button>${its.slice(0, 2).map((x) => `<button class="cal-i ${x.cls}" ${x.act}>${esc(x.t)}</button>`).join('')}${its.length > 2 ? `<span class="tiny muted" style="padding-left: 4px;">+${its.length - 2}</span>` : ''}</div>`; }).join('')}</div>
      ${isMob() ? `<div class="cv-agenda"><div class="row" style="gap: 8px;"><b class="grow">${DM.day.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^./, (x) => x.toUpperCase())}</b><button class="btn sec sm" data-act="addEvent" data-date="${iso(DM.day)}">${ic('plus', 16)}Ajouter</button></div>${items(DM.day).map((x) => `<button class="cv-ag-i ${x.cls}" ${x.act}><i></i><span class="grow">${esc(x.t)}</span>${ic('right', 16)}</button>`).join('') || '<p class="small muted" style="margin-top: 8px;">Rien ce jour-là.</p>'}</div>` : '<p class="tiny muted" style="margin-top: 10px;">Clique sur un jour pour y ajouter un rendez-vous ou une tâche.</p>'}</div>
    <aside class="card cv-side"><b class="t3" style="font-size: 17px;">À venir</b><div class="col" style="gap: 8px; margin-top: 12px;">${up.map((x) => `<button class="cv-up" data-act="${x.ev ? 'openEvent' : 'openCard'}" ${x.ev ? `data-e="${x.id}"` : `data-card="${x.id}"`}><span class="cv-day ${x.ev ? 'ev' : 'tk'}"><b>${x.d.getDate()}</b>${x.d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</span><span class="grow"><b style="font-weight: 600; display: block;">${esc(x.t)}</b><span class="tiny muted">${esc(x.s)}</span></span></button>`).join('') || '<p class="small muted">Rien de prévu.</p>'}</div><button class="btn sec full" data-act="addEvent" style="margin-top: 14px;">${ic('plus', 16)}Ajouter</button></aside></div>`;
}
ACT.calM = (el) => { DM.cal = new Date(DM.cal.getFullYear(), DM.cal.getMonth() + Number(el.dataset.d), 1); calView(B()); };
ACT.calPick = (el) => { DM.day = fromIso(el.dataset.date); calView(B()); };
ACT.calToday = () => { DM.cal = new Date(today0().getFullYear(), today0().getMonth(), 1); calView(B()); };

ACT.openB = (el) => { DM.fade = true; DM.board = el.dataset.b; DM.view = innerWidth <= 600 ? 'list' : 'board'; DM.who = 'all'; dmBoard(); scrollTo(0, 0); };
ACT.dmBack = () => { DM.board = null; dmHome(); };
ACT.dmView = (el) => { DM.fade = true; DM.view = el.dataset.v; dmBoard(); };
ENTER.demarches = () => { DM.fade = true; if (params.board) { DM.board = params.board; DM.view = params.view || (innerWidth <= 600 ? 'list' : 'board'); } if (DM.board) dmBoard(); else dmHome(); params = {}; };

const whoChips = (sel, members) => members.map((m) => `<button class="chip${sel.includes(m) ? ' on' : ''}" data-act="pickWho" data-m="${m}">${avatar(m, 22)}${m === 'adam' ? 'Moi' : esc(M(m).name.split(' ')[0])}</button>`).join('');
ACT.pickWho = (el) => el.classList.toggle('on');
const pickedWho = () => $$('[data-act="pickWho"].on').map((x) => x.dataset.m);
ACT.addTask = (el) => {
  const b = B();
  const col = (el && el.dataset.col) || b.cols[0].id;
  modal(`${mHead('Nouvelle tâche')}<label><span class="flabel">Ce qu’il faut faire</span><input class="field" id="ntTitle" placeholder="Envoyer le certificat de scolarité"></label>
    <div><span class="flabel">Où la ranger</span><div class="seg" id="ntCol" style="flex-wrap: wrap;">${b.cols.map((c) => `<button class="${c.id === col ? 'on' : ''}" data-act="ntCol" data-v="${c.id}">${esc(c.t)}</button>`).join('')}</div></div>
    <label><span class="flabel">Pour quand</span><input class="field" type="date" id="ntDue" value="${iso(inDays(7))}"></label>
    <div><span class="flabel">Qui s’en occupe</span><div class="row wrap" style="gap: 8px;">${whoChips(['adam'], b.members)}</div></div>
    <div class="modal-f"><button class="btn ghost" data-act="close">Annuler</button><button class="btn pri" data-act="ntOk">Ajouter la tâche</button></div>`);
};
ACT.ntCol = (el) => $$('#ntCol button').forEach((x) => x.classList.toggle('on', x === el));
ACT.ntOk = () => {
  const t = $('#ntTitle').value.trim();
  if (!t) { $('#ntTitle').focus(); return toast('Écris ce qu’il faut faire'); }
  const c = K(null, $('#ntCol .on').dataset.v, t, null, pickedWho().length ? pickedWho() : ['adam']);
  c.due = fromIso($('#ntDue').value);
  B().cards.push(c);
  closeModal(); dmBoard(); toast('Tâche ajoutée');
};
ACT.addEvent = (el) => {
  const d = (el && el.dataset.date) || iso(today0());
  modal(`${mHead('Ajouter au calendrier')}<div><span class="flabel">C’est quoi ?</span><div class="seg" id="aeType"><button class="on" data-act="aeType" data-v="rdv">${ic('calendar', 16)}Un rendez-vous</button><button data-act="aeType" data-v="task">${ic('check', 16)}Une tâche</button></div></div>
    <label><span class="flabel">Titre</span><input class="field" id="aeTitle" placeholder="Rendez-vous orthophoniste"></label>
    <div class="row wrap" style="gap: 12px; align-items: flex-end;"><label class="grow" style="min-width: 150px;"><span class="flabel">Date</span><input class="field" type="date" id="aeDate" value="${d}"></label><label class="grow ae-rdv" style="min-width: 120px;"><span class="flabel">Heure</span><input class="field" type="time" id="aeTime" value="10:00"></label></div>
    <label class="ae-rdv"><span class="flabel">Lieu</span><input class="field" id="aePlace" placeholder="Adresse ou salle"></label>
    <div class="modal-f"><button class="btn ghost" data-act="close">Annuler</button><button class="btn pri" data-act="aeOk">Ajouter</button></div>`);
};
ACT.aeType = (el) => { $$('#aeType button').forEach((x) => x.classList.toggle('on', x === el)); $$('.ae-rdv').forEach((x) => { x.hidden = el.dataset.v !== 'rdv'; }); $('#aeTitle').placeholder = el.dataset.v === 'rdv' ? 'Rendez-vous orthophoniste' : 'Envoyer le formulaire'; };
ACT.aeOk = () => {
  const t = $('#aeTitle').value.trim();
  if (!t) { $('#aeTitle').focus(); return toast('Donne un titre'); }
  const date = fromIso($('#aeDate').value) || today0();
  if ($('#aeType .on').dataset.v === 'rdv') EVENTS.push({ id: `e${kN++}`, date, time: $('#aeTime').value || '10:00', title: t, place: $('#aePlace').value.trim() || 'Lieu à préciser', board: DM.board });
  else { const c = K(null, B().cols[0].id, t, null, ['adam']); c.due = date; B().cards.push(c); }
  DM.cal = new Date(date.getFullYear(), date.getMonth(), 1);
  closeModal(); dmBoard(); toast('Ajouté. Tu auras un rappel la veille.');
};
ACT.openEvent = (el) => {
  const e = EVENTS.find((x) => x.id === el.dataset.e);
  modal(`${mHead('Rendez-vous')}<label><span class="flabel">Titre</span><input class="field" id="evTitle" value="${esc(e.title)}"></label><div class="row wrap" style="gap: 12px;"><label class="grow" style="min-width: 150px;"><span class="flabel">Date</span><input class="field" type="date" id="evDate" value="${iso(e.date)}"></label><label class="grow" style="min-width: 120px;"><span class="flabel">Heure</span><input class="field" type="time" id="evTime" value="${e.time}"></label></div><label><span class="flabel">Lieu</span><input class="field" id="evPlace" value="${esc(e.place)}"></label>
    <div class="modal-f" style="justify-content: space-between;"><button class="btn bad sm" data-act="evDel" data-e="${e.id}">${ic('trash', 16)}Supprimer</button><button class="btn pri" data-act="evSave" data-e="${e.id}">Enregistrer</button></div>`);
};
ACT.evSave = (el) => { const e = EVENTS.find((x) => x.id === el.dataset.e); e.title = $('#evTitle').value.trim() || e.title; e.date = fromIso($('#evDate').value) || e.date; e.time = $('#evTime').value || e.time; e.place = $('#evPlace').value.trim(); closeModal(); dmBoard(); toast('Rendez-vous enregistré'); };
ACT.evDel = (el) => { if (el.dataset.ok !== '1') { el.dataset.ok = '1'; el.innerHTML = `${ic('trash', 16)}Confirmer`; return; } EVENTS.splice(EVENTS.findIndex((x) => x.id === el.dataset.e), 1); closeModal(); dmBoard(); };

function cardModal() {
  const b = B();
  const c = b.cards.find((x) => x.id === DM.card);
  if (!c) return;
  const done = c.list.filter((x) => x.d).length;
  modal(`<div class="modal-h"><input class="field cm-title" id="cmName" value="${esc(c.title)}" aria-label="Titre de la carte"><button class="ib" data-act="close" aria-label="Fermer">${ic('x')}</button></div>
    <div class="row wrap" style="gap: 12px;"><label class="grow" style="min-width: 150px;"><span class="flabel">Échéance</span><input class="field" type="date" id="cmDue" value="${iso(c.due)}"></label><label class="grow" style="min-width: 150px;"><span class="flabel">Colonne</span><select class="field" id="cmCol">${b.cols.map((x) => `<option value="${x.id}" ${x.id === c.col ? 'selected' : ''}>${esc(x.t)}</option>`).join('')}</select></label></div>
    <div><span class="flabel">Qui s’en occupe</span><div class="row wrap" style="gap: 8px;">${b.members.map((m) => `<button class="chip${c.who.includes(m) ? ' on' : ''}" data-act="cmWho" data-m="${m}">${avatar(m, 22)}${m === 'adam' ? 'Moi' : esc(M(m).name.split(' ')[0])}</button>`).join('')}</div></div>
    <div><div class="row" style="margin-bottom: 6px;"><span class="flabel grow" style="margin: 0;">Description</span><button class="btn ai sm" data-act="cmAi">${ic('sparkle', 16)}Rédiger par IA</button></div><textarea class="field" id="cmDesc" placeholder="Ce qu’il faut faire, en quelques mots">${esc(c.desc)}</textarea></div>
    <div><div class="row" style="margin-bottom: 8px;"><span class="flabel grow" style="margin: 0;">Checklist · ${done} sur ${c.list.length}</span><button class="btn ghost sm" data-act="cmSteps">${ic('sparkle', 16)}Proposer les étapes</button></div>
      <div class="col" style="gap: 6px;">${c.list.map((x, i) => `<div class="row"><button class="chk${x.d ? ' on' : ''}" data-act="cmChk" data-i="${i}" role="checkbox" aria-checked="${x.d}" aria-label="${esc(x.t)}">${x.d ? ic('check', 14, '#fff', 3) : ''}</button><span class="grow" style="${x.d ? 'text-decoration: line-through; color: var(--mute);' : ''}">${esc(x.t)}</span><button class="kb-arrow" data-act="cmRm" data-i="${i}" aria-label="Retirer ${esc(x.t)}">${ic('x', 14)}</button></div>`).join('')}</div>
      <input class="field" id="cmNew" placeholder="Ajouter un élément, puis Entrée" style="margin-top: 10px;"></div>
    <div class="modal-f" style="justify-content: space-between;"><button class="btn bad sm" data-act="cmDel">${ic('trash', 16)}Supprimer</button><div class="row wrap" style="gap: 8px;"><button class="btn sec" data-act="cmMail">${ic('mail', 16)}Écrire le mail</button><button class="btn pri" data-act="close">Terminé</button></div></div>`);
}
ACT.openCard = (el) => { DM.card = el.dataset.card; cardModal(); };
const CC = () => B() && B().cards.find((x) => x.id === DM.card);
document.addEventListener('input', (e) => { if (e.target.id !== 'cmName' && e.target.id !== 'cmDesc') return; const c = CC(); if (!c) return; if (e.target.id === 'cmName') c.title = e.target.value; else c.desc = e.target.value; });
document.addEventListener('change', (e) => { if (!['cmDue', 'cmCol', 'cmName', 'cmDesc'].includes(e.target.id)) return; const c = CC(); if (!c) return; if (e.target.id === 'cmDue') c.due = fromIso(e.target.value); if (e.target.id === 'cmCol') c.col = e.target.value; dmBoard(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'cmNew' && e.target.value.trim()) { CC().list.push({ t: e.target.value.trim(), d: false }); cardModal(); dmBoard(); setTimeout(() => $('#cmNew').focus(), 60); } });
ACT.cmWho = (el) => { const c = CC(); const m = el.dataset.m; c.who = c.who.includes(m) ? c.who.filter((x) => x !== m) : [...c.who, m]; if (!c.who.length) c.who = [m]; cardModal(); dmBoard(); };
ACT.cmChk = (el) => { const it = CC().list[Number(el.dataset.i)]; it.d = !it.d; if (it.d) addXp(5, 'élément coché'); cardModal(); dmBoard(); };
ACT.cmRm = (el) => { CC().list.splice(Number(el.dataset.i), 1); cardModal(); dmBoard(); };
ACT.cmDel = (el) => { if (el.dataset.ok !== '1') { el.dataset.ok = '1'; el.innerHTML = `${ic('trash', 16)}Confirmer`; return; } const b = B(); b.cards = b.cards.filter((x) => x.id !== DM.card); closeModal(); dmBoard(); toast('Carte supprimée'); };
ACT.cmMail = () => { const c = CC(); closeModal(); go('mails', { context: c.title }); };
function stepFor(b, c) {
  const cat = CATALOG[b.type] || CATALOG.autre;
  const stop = ['pour', 'avec', 'dans', 'trois', 'service', 'handicap', 'mes', 'les', 'des'];
  const w = c.title.toLowerCase().split(/[^a-zà-ÿ]+/).filter((x) => x.length > 3 && !stop.includes(x));
  let best = cat.steps[0]; let sc = -1;
  cat.steps.forEach((s) => { const n = w.reduce((a, x) => a + (s[0].toLowerCase().includes(x) ? 2 : 0) + (`${s[1]} ${s[2].join(' ')}`.toLowerCase().includes(x) ? 1 : 0), 0); if (n > sc) { sc = n; best = s; } });
  return { cat, s: best };
}
ACT.cmAi = (el) => {
  const b = B(); const c = CC();
  const { cat, s } = stepFor(b, c);
  const text = `${s[1]}${s[2].length ? ` À préparer : ${s[2].join(', ')}.` : ''}${cat.src ? ` Source : ${cat.src}.` : ''}`;
  const t = $('#cmDesc');
  el.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>Lio écrit';
  let i = 0;
  setTimeout(() => { const iv = setInterval(() => { i = Math.min(text.length, i + 3); t.value = text.slice(0, i); if (i >= text.length) { clearInterval(iv); c.desc = text; el.innerHTML = `${ic('sparkle', 16)}Rédiger par IA`; dmBoard(); } }, 18); }, 500);
};
ACT.cmSteps = () => { const b = B(); const c = CC(); const { s } = stepFor(b, c); (s[2].length ? s[2] : ['Lire la consigne officielle', 'Préparer les documents', 'Envoyer et garder une preuve']).forEach((t) => { if (!c.list.some((x) => x.t === t)) c.list.push({ t, d: false }); }); cardModal(); dmBoard(); };

const RIGHT = { edit: ['Peut modifier', 'Coche les étapes, ajoute des tâches et des rendez-vous.'], view: ['Peut seulement voir', 'Voit les cartes et le calendrier, sans rien changer.'] };
let shRole = 'Un proche';
let shRight = 'view';
function shareModal() {
  const b = B();
  const others = MEMBERS.filter((m) => m.id !== 'adam');
  const inside = others.filter((m) => b.members.includes(m.id));
  const out = others.filter((m) => !b.members.includes(m.id));
  modal(`${mHead('Partager cette démarche')}
    <div class="sh-info">${ic('lock', 18)}<span>Les personnes ajoutées voient <b>seulement « ${esc(b.name)} »</b>. Ni ton coffre, ni tes autres démarches.</span></div>
    <div><span class="flabel">Qui a accès</span><div class="col" style="gap: 8px;">
      <div class="sh-row">${avatar('adam', 38)}<div class="grow"><b>Toi</b><div class="small muted">Tu décides de tout</div></div><span class="pill">Propriétaire</span></div>
      ${inside.map((m) => { const r = b.rights[m.id] || 'view'; return `<div class="sh-row">${avatar(m.id, 38)}<div class="grow" style="min-width: 140px;"><b>${esc(m.name)}</b><div class="small muted">${m.role}</div></div><div class="sh-ctrl"><div class="seg">${Object.entries(RIGHT).map(([k, [l]]) => `<button class="${r === k ? 'on' : ''}" data-act="shRight" data-m="${m.id}" data-v="${k}">${l === 'Peut modifier' ? 'Modifie' : 'Voit'}</button>`).join('')}</div><button class="ib" data-act="shRemove" data-m="${m.id}" aria-label="Retirer l’accès de ${esc(m.name)}" title="Retirer l’accès">${ic('x', 18)}</button></div></div>`; }).join('')}
    </div><p class="tiny muted" style="margin-top: 8px;"><b>Modifie</b> : coche et ajoute. <b>Voit</b> : regarde sans rien changer.</p></div>
    <div class="sh-invite">${out.length ? `<span class="flabel">Ajouter en un clic</span><div class="row wrap" style="gap: 8px; margin-bottom: 14px;">${out.map((m) => `<button class="chip" data-act="shAdd" data-m="${m.id}">${avatar(m.id, 22)}${esc(m.name.split(' ')[0])} · ${m.role}</button>`).join('')}</div>` : ''}
      <span class="flabel">Inviter quelqu’un d’autre</span>
      <input class="field" id="shMail" type="email" placeholder="adresse@exemple.fr" aria-label="Adresse e-mail">
      <div class="col" style="gap: 8px; margin-top: 10px;">${Object.entries(RIGHT).map(([k, [l, d]]) => `<button class="sh-opt${shRight === k ? ' on' : ''}" data-act="shPick" data-v="${k}"><span class="sh-radio"></span><span><b>${l}</b><span class="small muted" style="display: block;">${d}</span></span></button>`).join('')}</div>
      <button class="btn pri full" data-act="shInvite" style="margin-top: 12px;">${ic('send', 16)}Envoyer l’invitation</button></div>`);
}
ACT.share = () => shareModal();
ACT.shRight = (el) => { B().rights[el.dataset.m] = el.dataset.v; shareModal(); toast(`${M(el.dataset.m).name.split(' ')[0]} ${el.dataset.v === 'edit' ? 'peut maintenant modifier' : 'peut seulement voir'}`); };
ACT.shRemove = (el) => { const b = B(); b.members = b.members.filter((x) => x !== el.dataset.m); b.cards.forEach((c) => { c.who = c.who.filter((w) => w !== el.dataset.m); if (!c.who.length) c.who = ['adam']; }); dmBoard(); shareModal(); toast('Accès retiré tout de suite'); };
ACT.shAdd = (el) => { const b = B(); b.members.push(el.dataset.m); b.rights[el.dataset.m] = 'view'; dmBoard(); shareModal(); toast(`${M(el.dataset.m).name.split(' ')[0]} voit maintenant cette démarche`); };
ACT.shPick = (el) => { shRight = el.dataset.v; $$('.sh-opt').forEach((x) => x.classList.toggle('on', x === el)); };
ACT.shInvite = () => { const v = $('#shMail').value.trim(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { $('#shMail').focus(); return toast('L’adresse e-mail n’a pas l’air complète'); } closeModal(); toast(`Invitation envoyée à ${v}`); addXp(20, 'invitation envoyée'); };

ACT.newBoard = (el) => {
  const pre = (el && el.dataset.type) || 'examens';
  modal(`${mHead('Nouvelle démarche')}<div><span class="flabel">Quelle démarche ?</span><div class="col" style="gap: 8px;" id="nbTypes">${Object.entries(CATALOG).map(([k, v]) => `<button class="sh-opt${k === pre ? ' on' : ''}" data-act="nbType" data-k="${k}"><span class="sh-radio"></span><span class="grow"><b>${esc(v.name)}</b></span><span class="nb-tag" style="background: ${v.color};">${v.tag}</span></button>`).join('')}</div></div>
    <label><span class="flabel">Nom</span><input class="field" id="nbName" value="${esc(CATALOG[pre].name)}"></label>
    <div class="sh-info lio">${ic('sparkle', 18)}<span>Lio prépare les premières cartes à partir des sources officielles. Tu peux tout modifier.</span></div>
    <div class="modal-f"><button class="btn ghost" data-act="close">Annuler</button><button class="btn pri" data-act="nbCreate">Créer la démarche</button></div>`);
  $('#nbTypes').dataset.k = pre;
};
ACT.nbType = (el) => { $$('#nbTypes .sh-opt').forEach((c) => c.classList.toggle('on', c === el)); $('#nbTypes').dataset.k = el.dataset.k; $('#nbName').value = CATALOG[el.dataset.k].name; };
ACT.nbCreate = () => {
  const k = $('#nbTypes').dataset.k;
  const cat = CATALOG[k];
  const b = { id: `b${kN++}`, type: k, name: $('#nbName').value.trim() || cat.name, color: cat.color, members: ['adam'], rights: {}, cols: COLS(), cards: cat.steps.map((s, i) => K(null, i ? 'todo' : 'doing', s[0], 7 + i * 10, ['adam'], s[2].map((d) => [d, 0]), s[1])) };
  BOARDS.push(b);
  closeModal();
  DM.board = b.id; DM.view = 'board'; dmBoard();
  addXp(10, 'démarche créée');
};
