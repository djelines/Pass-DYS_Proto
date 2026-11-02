const ENTER = {};
let params = {};
const NAVOF = { accueil: 'accueil', demarches: 'demarches', mails: 'accueil', lio: 'lio', lire: 'lio', calculer: 'lio', reformuler: 'lio', organiser: 'lio', ecrire: 'lio', entrainer: 'lio', lieux: 'lieux', annuaire: 'lieux', coffre: 'coffre', besoins: 'besoins' };
function show(id) {
  if (!$(`.screen[data-id="${id}"]`)) id = 'accueil';
  $$('.screen').forEach((s) => s.classList.toggle('on', s.dataset.id === id));
  $$('[data-nav]').forEach((d) => { const on = d.dataset.nav === NAVOF[id]; d.classList.toggle('on', on); if (on) d.setAttribute('aria-current', 'page'); else d.removeAttribute('aria-current'); });
  $$('.menu').forEach((m) => { m.hidden = true; });
  closeModal();
  if (location.hash.slice(1) !== id) history.replaceState(null, '', `#${id}`);
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  scrollTo(0, 0);
  document.body.classList.toggle('on-map', id === 'lieux');
  if (ENTER[id]) ENTER[id]();
  topbar();
}
const cur = () => ($('.screen.on') || {}).dataset?.id;
function go(id, p = {}) { params = p; show(id); }
ACT.go = (el) => go(el.dataset.to);
addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id !== cur()) show(id); });
document.addEventListener('DOMContentLoaded', () => show(location.hash.slice(1) || 'accueil'));

const TITLES = { accueil: 'Accueil', demarches: 'Démarches', mails: 'Écrire un mail', lio: 'Lio', lire: 'Lire', calculer: 'Calculer', reformuler: 'Reformuler', organiser: 'Organiser', ecrire: 'Écrire', entrainer: 'S’entraîner', lieux: 'Autour de moi', annuaire: 'Annuaire', coffre: 'Coffre', besoins: 'Ma carte', reglages: 'Réglages' };
const PARENT = { mails: 'accueil', lio: 'accueil', lire: 'lio', calculer: 'lio', reformuler: 'lio', organiser: 'lio', ecrire: 'lio', entrainer: 'lio', annuaire: 'lieux', reglages: 'accueil' };
const scrolled = () => document.body.classList.toggle('scrolled', scrollY > 64);
addEventListener('scroll', scrolled, { passive: true });
function topbar() {
  const id = cur();
  let t = TITLES[id] || '';
  let back = !!PARENT[id];
  if (id === 'demarches' && DM.board && B()) { t = B().name; back = true; }
  if (id === 'coffre' && CF.folder) { t = folderName(CF.folder); back = true; }
  if ((id === 'besoins' || id === 'coffre') && innerWidth <= 600) back = true;
  if (id === 'lio' && innerWidth <= 600) back = false;
  $('#tbTitle').textContent = t;
  document.title = `${t || 'Accueil'} · Pass’Dys`;
  $('.tb-back').hidden = !back;
  document.body.classList.toggle('has-back', back);
  scrolled();
}
ACT.back = () => { const id = cur(); if (id === 'demarches' && DM.board) { ACT.dmBack(); scrollTo(0, 0); return; } if (id === 'coffre' && CF.folder) { ACT.cfRoot(); scrollTo(0, 0); return; } go(PARENT[id] || 'accueil'); };
const QUICK = [
  ['mail', 'Écrire un mail', 'Lio rédige pour toi', '#FBE7A1', '#8A6412', 'go:mails'],
  ['book', 'Lire un document', 'Lio lit et explique', '#D2E2F6', '#3B64A8', 'go:lire'],
  ['upload', 'Ranger un document', 'Dans ton coffre', '#BDE8E2', '#2F7F77', 'upload'],
  ['plus', 'Nouvelle démarche', 'Lio prépare les étapes', '#DCD6F7', '#6552C9', 'newdem'],
  ['expand', 'Montrer ma carte', 'En plein écran', '#D2E2F6', '#34475F', 'bsShow'],
  ['pin', 'Autour de moi', 'Lieux près de toi', '#F9CDB7', '#B4533A', 'go:lieux'],
  ['health', 'Annuaire', 'Soignants près de toi', '#BDE8E2', '#2F7F77', 'go:annuaire'],
  ['sparkle', 'Tous les outils', 'Calculer, reformuler…', '#F1EEE8', '#34475F', 'go:lio'],
  ['vault', 'Mon coffre', 'Tes documents', '#FCF3DA', '#8A6412', 'go:coffre'],
];
ACT.quick = () => {
  const o = modal(`<div class="modal-h"><span class="row" style="gap: 12px;"><span class="qk-face">${$('.tb-face').innerHTML}</span><h2>Que veux-tu faire ?</h2></span><button class="ib" data-act="close" aria-label="Fermer">${ic('x')}</button></div>
    <div class="hm-input" style="padding: 6px 6px 6px 16px;"><input id="qkAsk" placeholder="Dis-le avec tes mots" aria-label="Demander à Lio" style="flex: 1; border: 0; background: transparent; outline: none; font-size: 16px; min-height: 44px; color: var(--ink);"><button class="lio-mic" style="background: #34475F;" data-act="qkMic" aria-label="Parler à Lio">${ic('mic', 22, '#fff')}</button></div>
    <div class="qk-grid">${QUICK.map(([i, t, d, bg, c, a]) => `<button class="qk" data-act="qk" data-a="${a}"><span class="qk-ic" style="background: ${bg}; color: ${c};">${ic(i, 22)}</span><span><b>${t}</b><span class="tiny muted">${d}</span></span></button>`).join('')}</div>`);
  $('.modal', o).classList.add('qk-modal');
};
ACT.qk = (el) => {
  const a = el.dataset.a;
  closeModal();
  if (a.startsWith('go:')) return go(a.slice(3));
  if (a === 'upload') return ACT.upload();
  if (a === 'bsShow') return ACT.bsShow();
  if (a === 'newdem') { go('demarches'); ACT.dmBack(); ACT.newBoard({ dataset: {} }); }
};
ACT.qkMic = (el) => { el.classList.add('rec'); toast('Lio t’écoute…'); setTimeout(() => { el.classList.remove('rec'); closeModal(); go('mails', { idea: 'je voudrais demander un rendez-vous au service handicap', recip: 'Service handicap' }); }, 1500); };
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'qkAsk' && e.target.value.trim()) { const v = e.target.value.trim().toLowerCase(); closeModal(); if (/mail|écrire|ecrire/.test(v)) go('mails', { idea: e.target.value.trim(), recip: 'Service handicap' }); else if (/lire|texte|document/.test(v)) go('lire'); else if (/calcul|compter|euro/.test(v)) go('calculer'); else if (/lieu|bibli|ortho|près/.test(v)) go('lieux'); else go('lio'); } });

function addXp(n, why) {
  if (!SET.game) { toast(why.charAt(0).toUpperCase() + why.slice(1)); return; }
  toast(`+${n} XP · ${why}`, true);
}

function toggleMenu(id, btn) {
  const m = $(`#${id}`);
  const open = m.hidden;
  $$('.menu').forEach((x) => { x.hidden = true; });
  m.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
}
ACT.menu = (el) => toggleMenu('meMenu', el);
ACT.notifs = (el) => {
  $('#notifMenu').innerHTML = `<div class="row" style="padding: 8px 12px;"><b class="grow">Rappels</b><button class="btn ghost sm" data-act="readAll">Tout lu</button></div>${[
    ['clock', 'Échéance dans 4 jours', 'Rassembler trois documents', 'b1'],
    ['calendar', 'Rendez-vous jeudi, 10 h', 'Service handicap, bureau 104', 'b1'],
    ['check', 'Samir a coché une étape', 'Bilan orthophonique', 'b1'],
  ].map(([i, t, s, b]) => `<button class="menu-i" data-act="openBoard" data-b="${b}" style="align-items: flex-start; padding: 10px 12px; min-height: 0;"><span style="width: 34px; height: 34px; border-radius: 10px; background: var(--dem-bg); color: var(--dem); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${ic(i, 17)}</span><span><b style="font-weight: 600; display: block;">${t}</b><span class="small muted">${s}</span></span></button>`).join('')}`;
  toggleMenu('notifMenu', el);
};
ACT.readAll = () => { $('#notifDot').hidden = true; $('#notifMenu').hidden = true; toast('Rappels marqués comme lus'); };
document.addEventListener('click', (e) => { if (!e.target.closest('.menu, [data-act="menu"], [data-act="notifs"]')) $$('.menu').forEach((m) => { m.hidden = true; }); });
ACT.say = (el) => speak(el.dataset.t);
ACT.upload = () => { go('coffre'); setTimeout(() => $('#file').click(), 100); };
ACT.openBoard = (el) => go('demarches', { board: el.dataset.b, view: el.dataset.view });
ACT.mic = (el) => {
  if (el.classList.contains('rec')) return;
  el.classList.add('rec');
  toast('Lio t’écoute…');
  setTimeout(() => {
    el.classList.remove('rec');
    if (cur() === 'lio') go('reformuler'); else toast('Compris. Dans la vraie app, ta voix est transcrite ici.');
  }, 1800);
};

let hmTo = 'Service handicap';
ENTER.accueil = () => {
  const now = new Date();
  const d = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  $('#hoDate').textContent = d.charAt(0).toUpperCase() + d.slice(1);
  $('#hoHello').textContent = now.getHours() >= 18 ? 'Bonsoir' : 'Bonjour';
  const tasks = [];
  BOARDS.forEach((b) => b.cards.forEach((c) => { if (!isDone(b, c)) tasks.push({ b, c }); }));
  tasks.sort((x, y) => (x.c.due || 9e15) - (y.c.due || 9e15));
  const week = tasks.filter(({ c }) => c.due && (c.due - today0()) / DAY <= 7).length;
  const rdv = EVENTS.filter((e) => e.date >= today0()).sort((x, y) => x.date - y.date)[0];
  $('#hoSum').textContent = `${week ? `${week} chose${week > 1 ? 's' : ''} à faire cette semaine` : 'Rien d’urgent cette semaine'}${rdv ? `. Prochain rendez-vous ${relDay(rdv.date)} à ${rdv.time.replace(':00', ' h').replace(':', ' h ')}.` : '.'}`;
  phHome();
  $('#acCard').innerHTML = idCard(innerWidth <= 600 ? 2 : 4, false, true);
  const open = BOARDS.filter((b) => progress(b).done < progress(b).total).length;
  $('#acShort').innerHTML = [
    ['demarches', 'kanban', 'Démarches', `${open} en cours`, '#E9EFF8', '#3B64A8'],
    ['lio', 'sparkle', 'Lio', 'Lire, écrire, calculer', '#E6F3F1', '#2F7F77'],
    ['lieux', 'pin', 'Autour de moi', 'Lieux et soignants', '#FBEBE5', '#B4533A'],
    ['coffre', 'vault', 'Coffre', `${FILES.length} documents`, '#FCF3DA', '#8A6412'],
  ].map(([to, i, t, s2, bg, c]) => `<button class="ac-tile" data-act="go" data-to="${to}"><span class="ac-ic" style="background: ${bg}; color: ${c};">${ic(i, 22)}</span><span><b>${t}</b><span class="small muted">${s2}</span></span></button>`).join('');
  $('#hmTasks').innerHTML = tasks.slice(0, 4).map(({ b, c }) => `<div class="ac-row"><button class="chk" data-act="hmDone" data-b="${b.id}" data-c="${c.id}" role="checkbox" aria-checked="false" aria-label="Marquer « ${esc(c.title)} » comme fait"></button><button class="grow" data-act="openBoard" data-b="${b.id}" style="text-align: left; min-width: 0;"><span class="ac-t">${esc(c.title)}</span><span class="row tiny muted" style="gap: 6px;"><span class="hm-dot" style="background: ${b.color};"></span>${esc(b.name)}</span></button>${c.due ? dueChip(b, c) : ''}</div>`).join('') || '<p class="muted small" style="padding: 12px 0;">Tout est fait. Rien ne presse.</p>';
  $('#hmDocs').innerHTML = [...FILES].sort((x, y) => x.age - y.age).slice(0, 4).map((f) => `<button class="ac-row" data-act="cfOpen" data-id="${f.id}">${fileIcon(f, 40)}<span class="grow" style="min-width: 0;"><span class="ac-t">${esc(f.name)}</span><span class="tiny muted">${folderName(f.folder)} · ${ago(f.age)}</span></span>${ic('right', 16)}</button>`).join('');
};
ACT.hmFocus = () => { const t = $('#hmIdea'); t.closest('.ac-box').scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(() => t.focus({ preventScroll: true }), 350); };
function phHome() {
  if (!$('#phCard')) return;
  $('#phHello').textContent = new Date().getHours() >= 18 ? 'Bonsoir' : 'Bonjour';
  const act = bsActive();
  $('#phCard').innerHTML = `<button class="ph-pass" data-act="bsShow" aria-label="Montrer ma carte en grand"><span class="ph-pass-l"><span class="ph-k">${LOGO}Carte de besoins</span><b>${esc(bsName())}</b><span class="ph-needs">${act.slice(0, 2).map(([t]) => `<span>${esc(t)}</span>`).join('')}${act.length > 2 ? `<span class="ph-more">+ ${act.length - 2} autre${act.length > 3 ? 's' : ''}</span>` : ''}</span></span><span class="ph-qr">${qr(76)}</span><span class="ph-tap">${ic('expand', 16)}Touche pour la montrer en grand</span></button>`;
  const tasks = [];
  BOARDS.forEach((b) => b.cards.forEach((c) => { if (!isDone(b, c)) tasks.push({ b, c }); }));
  tasks.sort((x, y) => (x.c.due || 9e15) - (y.c.due || 9e15));
  $('#phTasks').innerHTML = tasks.slice(0, 3).map(({ b, c }) => `<div class="ph-row"><button class="chk" data-act="hmDone" data-b="${b.id}" data-c="${c.id}" role="checkbox" aria-checked="false" aria-label="Marquer « ${esc(c.title)} » comme fait"></button><button class="grow ph-row-t" data-act="openBoard" data-b="${b.id}" data-view="list"><b>${esc(c.title)}</b><span class="small muted">${esc(b.name)}</span></button>${c.due ? dueChip(b, c) : ''}</div>`).join('') || '<p class="small muted" style="padding: 14px 16px;">Tout est fait.</p>';
  const e = EVENTS.filter((x) => x.date >= today0()).sort((x, y) => x.date - y.date)[0];
  $('#phRdv').innerHTML = e ? `<button class="ph-rdv" data-act="openBoard" data-b="${e.board}" data-view="cal"><span class="cv-day ev"><b>${e.date.getDate()}</b>${e.date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</span><span class="grow"><b>${esc(e.title)}</b><span class="small muted">${relDay(e.date)} à ${e.time.replace(':00', ' h').replace(':', ' h ')} · ${esc(e.place)}</span></span>${ic('right', 18)}</button>` : '<p class="small muted">Aucun rendez-vous prévu.</p>';
}
ACT.hmTo = (el) => { hmTo = el.dataset.v; $$('#hmTo .chip').forEach((c) => c.classList.toggle('on', c === el)); };
ACT.hmIdeaPick = (el) => { const t = { 'Demander le tiers temps': 'je voudrais demander le tiers temps pour mes partiels de décembre', 'Décaler un rendez-vous': 'je peux pas venir au rendez-vous de jeudi, est-ce qu’on peut le décaler', 'Relancer sans réponse': 'j’ai envoyé un mail il y a deux semaines et j’ai pas eu de réponse' }[el.dataset.v]; $('#hmIdea').value = t; $('#hmIdea').focus(); };
ACT.hmMic = (el) => { el.classList.add('rec'); toast('Lio t’écoute…'); setTimeout(() => { el.classList.remove('rec'); $('#hmIdea').value = 'je voudrais savoir comment on fait pour avoir le tiers temps aux partiels de decembre parce que au bac je l’avais'; }, 1600); };
ACT.hmWrite = () => { const idea = $('#hmIdea').value.trim(); if (!idea) { $('#hmIdea').focus(); toast('Écris d’abord ton idée, avec tes mots'); return; } go('mails', { idea, recip: hmTo }); $('#hmIdea').value = ''; };
ACT.hmDone = (el) => { const b = BOARDS.find((x) => x.id === el.dataset.b); const c = b.cards.find((x) => x.id === el.dataset.c); c.col = (b.cols.find((x) => x.done) || b.cols[b.cols.length - 1]).id; c.list.forEach((x) => { x.d = true; }); addXp(20, 'tâche terminée'); ENTER.accueil(); };

const WORDS = {
  'aménagement': '« Aménagement », c’est une aide pendant l’examen : plus de temps, un ordinateur ou une salle au calme.',
  convocation: '« Convocation », c’est le papier qui te dit où et quand venir.',
  notification: '« Notification », c’est la lettre officielle qui confirme une décision.',
  'tiers temps': '« Tiers temps », c’est un tiers de temps en plus. Pour 3 heures d’examen, tu as 1 heure de plus.',
};
document.addEventListener('click', (e) => { const w = e.target.closest('#readText .word'); if (!w) return; $('#lireSay').textContent = WORDS[w.dataset.w]; });
ACT.readAloud = () => speak($('#readText').innerText);
ACT.rate = (el) => { $$('button', el.parentElement).forEach((b) => b.classList.toggle('on', b === el)); voiceRate = Number(el.dataset.v); };
ACT.resume = () => { const t = 'En résumé : arrive 15 minutes en avance en salle B204, avec ta convocation et ta notification.'; $('#lireSay').textContent = t; };
ACT.simplify = () => { const t = 'Version simple : tu as un aménagement. Viens 15 minutes avant. Va en salle B204. Prends ta convocation et ta notification.'; $('#lireSay').textContent = t; };
let syllOn = false;
ACT.syll = (el) => {
  const box = $('#readText');
  if (!box.dataset.orig) box.dataset.orig = box.innerHTML;
  syllOn = !syllOn;
  el.classList.toggle('pri', syllOn); el.classList.toggle('sec', !syllOn);
  if (!syllOn) { box.innerHTML = box.dataset.orig; return; }
  const V = 'aeiouyéèêëàâîïôûœ';
  const cut = (w) => w.replace(new RegExp(`([^${V}]*[${V}]+(?:[^${V}](?=[^${V}]))?)`, 'gi'), '$1|').split('|').filter(Boolean);
  const paint = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType !== 3) return paint(n);
    const s = document.createElement('span');
    s.innerHTML = n.textContent.split(/(\s+)/).map((w) => (/^\s*$/.test(w) ? w : cut(w).map((x, i) => `<span style="color: ${i % 2 ? '#B4533A' : '#3B64A8'};">${esc(x)}</span>`).join(''))).join('');
    n.replaceWith(s);
  });
  paint(box);
};
ACT.ruler = (el) => {
  const box = $('#readText');
  const on = !box.dataset.ruler;
  box.dataset.ruler = on ? '1' : '';
  el.classList.toggle('pri', on); el.classList.toggle('sec', !on);
  box.style.maxHeight = on ? '2.1em' : '';
  box.style.overflow = on ? 'hidden' : '';
  box.style.borderBlock = on ? '2px solid #97D4D0' : '';
};

const CALC = [['Le prix total', '3 × 32,50', '97,50 €'], ['Ce qui est remboursé', '97,50 × 0,6', '58,50 €'], ['Ce que tu paies', '97,50 − 58,50', '39,00 €']];
let calcN = 1;
function paintCalc() {
  $('#calcSteps').innerHTML = CALC.map(([l, c, r], i) => { const st = i < calcN ? 2 : i === calcN ? 1 : 0; return `<div class="row" style="padding: 16px 20px; border-radius: 14px; gap: 18px; ${st === 1 ? 'background: var(--car-bg);' : ''} ${st === 0 ? 'opacity: .4;' : ''}"><span style="width: 40px; height: 40px; border-radius: 50%; background: ${st === 2 ? '#2F7F77' : st === 1 ? '#8A6412' : 'var(--line)'}; color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center;">${st === 2 ? ic('check', 18, '#fff', 3) : i + 1}</span><div><div class="small muted">${l}</div><div style="font-family: var(--title); font-weight: 700; font-size: clamp(22px, 3vw, 28px); font-variant-numeric: tabular-nums;">${c} <span style="color: var(--car);">= ${st === 0 ? '?' : r}</span></div></div></div>`; }).join('');
}
ENTER.calculer = () => { calcN = 1; paintCalc(); };
ACT.calcNext = () => { if (calcN < CALC.length) { calcN++; paintCalc(); if (calcN === CALC.length) addXp(10, 'calcul compris'); } else { calcN = 1; paintCalc(); } };
ACT.calcSay = () => { const old = voiceRate; voiceRate = 0.7; speak('Trois fois trente-deux euros cinquante, ça fait quatre-vingt-dix-sept euros cinquante. On en rembourse soixante pour cent : cinquante-huit euros cinquante. Il te reste trente-neuf euros.'); voiceRate = old; };

ACT.sayRef = () => speak($('#refPhrase').textContent);
ACT.refShort = (el) => { const short = el.dataset.s !== '1'; $('#refPhrase').textContent = short ? '« Je dois apporter mes papiers du bac jeudi ? »' : '« Pour le rendez-vous de jeudi, dois-je apporter mes documents du bac ? »'; el.dataset.s = short ? '1' : ''; el.textContent = short ? 'Version complète' : 'Plus court'; };

const ORG = ['Mettre la carte étudiante dans le sac', 'Prendre deux stylos', 'Remplir la gourde', 'Mettre le casque anti-bruit', 'Vérifier la salle : B204'];
let orgI = 0;
function paintOrg() {
  $('#orgNow').textContent = orgI < ORG.length ? ORG[orgI] : 'Ton sac est prêt.';
  $('#orgCount').textContent = `${Math.min(orgI, ORG.length)} sur ${ORG.length}`;
  $('#orgBar').style.width = `${orgI / ORG.length * 100}%`;
  $('#orgDots').innerHTML = ORG.map((t, i) => `<button class="btn ${i === orgI ? 'pri' : i < orgI ? 'ai' : 'sec'}" style="min-width: 52px; min-height: 52px;" data-act="orgGo" data-i="${i}" aria-label="Étape ${i + 1} : ${t}">${i < orgI ? ic('check', 18, 'currentColor', 2.6) : i + 1}</button>`).join('');
}
ENTER.organiser = () => { orgI = 0; paintOrg(); };
ACT.orgDone = () => { if (orgI < ORG.length) { orgI++; paintOrg(); if (orgI >= ORG.length) addXp(20, 'routine terminée'); } };
ACT.orgSay = () => speak($('#orgNow').textContent);
ACT.orgGo = (el) => { orgI = Number(el.dataset.i); paintOrg(); };
ACT.ecrMail = () => go('mails', { idea: 'je voudrais savoir si ce serait possible d’avoir les sujets en avance car je dois les lire plusieurs fois', recip: 'Professeur', goal: 'amenagement' });

const TR = {
  'Service handicap': ['Qu’est-ce qui vous gêne le plus pendant les examens ?', 'Quels aménagements aviez-vous au bac ?', 'Avez-vous un bilan récent ?', 'Qu’est-ce qui vous aiderait le plus ?'],
  Orthophoniste: ['Depuis quand avez-vous des difficultés à lire ?', 'Dans quelles situations c’est le plus dur ?', 'Qu’avez-vous déjà essayé ?', 'Qu’attendez-vous de ce bilan ?'],
  'Entretien d’embauche': ['Présentez-vous en quelques mots.', 'Parlez-moi d’une réussite dont vous êtes fier.', 'Comment vous organisez-vous ?', 'Avez-vous des questions ?'],
  RQTH: ['Qu’est-ce qui est difficile au travail ?', 'Qu’est-ce qui vous aiderait au quotidien ?', 'En avez-vous parlé à votre employeur ?', 'Que souhaitez-vous demander ?'],
};
const TR_EX = { 'Service handicap': 'Lire les consignes vite, et le bruit dans la salle.', Orthophoniste: 'Depuis le CP, surtout quand le texte est long.', 'Entretien d’embauche': 'J’ai organisé la collecte de mon association.', RQTH: 'Les mails longs, je dois les relire plusieurs fois.' };
let trTopic = 'Service handicap';
let trI = 0;
function trPaint() { $('#trCount').textContent = `Question ${trI + 1} sur 4`; $('#trQ').textContent = TR[trTopic][trI]; }
ENTER.entrainer = () => { if (params.scenario && TR[params.scenario]) trTopic = params.scenario; $$('#trChips .chip').forEach((c) => c.classList.toggle('on', c.dataset.t === trTopic)); trI = 0; $('#trA').innerHTML = ''; trPaint(); };
ACT.trTopic = (el) => { trTopic = el.dataset.t; $$('#trChips .chip').forEach((c) => c.classList.toggle('on', c === el)); trI = 0; $('#trA').innerHTML = ''; trPaint(); };
function trFeedback(a) {
  const words = a.trim().split(/\s+/).length;
  if (/\b(nul|nulle|bête|idiot|incapable)\b/i.test(a)) return ['Tu peux dire autrement', 'Évite de parler de toi en négatif. Par exemple : « J’ai besoin de plus de temps pour lire. »'];
  if (/dyslex|dyscalc|dysorth|dyspra|dysphas|dysgraph/i.test(a)) return ['Tu peux dire autrement', 'Tu n’es pas obligé de nommer ton trouble. Parle de ce qui t’aide.'];
  if (words > 40) return ['Tu peux dire plus court', 'Garde une seule idée. Tu pourras préciser si on te le demande.'];
  if (words < 4) return ['Tu peux ajouter un exemple', 'Un exemple concret aide la personne à comprendre.'];
  return ['Ce qui va', 'Clair et précis. Tu peux ajouter ce qui t’aide.'];
}
ACT.trSend = () => {
  const inp = $('#trInput');
  const a = inp.value.trim() || TR_EX[trTopic];
  const [t, f] = trFeedback(a);
  $('#trA').innerHTML = `<div class="row" style="justify-content: flex-end; margin-top: 16px;"><div class="bubble me" style="max-width: 70%;">${esc(a)}</div></div><div class="row" style="margin-top: 12px; padding: 14px 18px; border-radius: 16px; background: ${t === 'Ce qui va' ? 'var(--lio-bg)' : 'var(--car-bg)'};"><div class="grow"><b style="display: block;">${t}</b><span class="small">${f}</span></div></div>`;
  inp.value = '';
  if (trI < 3) { trI++; setTimeout(trPaint, 1400); } else { $('#trCount').textContent = 'Entraînement terminé'; $('#trQ').textContent = 'Quatre réponses claires. Tu es prêt pour le rendez-vous.'; addXp(25, 'entraînement terminé'); }
};
ACT.trMic = (el) => { el.classList.add('rec'); setTimeout(() => { el.classList.remove('rec'); $('#trInput').value = TR_EX[trTopic]; }, 1500); };
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'trInput') ACT.trSend(); });
