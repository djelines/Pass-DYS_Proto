const ML = { step: 0, recip: '', name: '', goal: '', idea: '', tone: 'cordial', len: 'normal', context: '', mail: null };
const ML_R = [['Professeur', 'school'], ['Service handicap', 'shield'], ['Scolarité', 'file'], ['Employeur', 'users'], ['RH ou référent handicap', 'hands'], ['Soignant', 'health'], ['MDPH', 'folder']];
const ML_G = [['amenagement', 'Demander un aménagement'], ['rdv', 'Demander un rendez-vous'], ['relance', 'Relancer'], ['besoins', 'Expliquer mes besoins'], ['absence', 'Prévenir d’une absence'], ['merci', 'Remercier']];
const ML_T = [['formel', 'Formel', 'Pour une administration'], ['cordial', 'Cordial', 'Poli et chaleureux'], ['simple', 'Simple', 'Court et direct']];
const ML_EX = ['je voulais savoir comment on fait pour avoir le tiers temps aux partiels de decembre parce que au bac je l’avais et je sais pas si c’est automatique', 'j’ai envoyé un mail le 2 octobre pour mes aménagements et j’ai pas de réponse', 'je voudrai un logiciel de dictée et les consignes par écrit parce que à l’oral je perds des infos'];
function mlCompose() {
  const s = ML;
  const formal = s.tone === 'formel' || s.recip === 'MDPH';
  const simple = s.tone === 'simple';
  const nm = s.name.trim();
  const hello = formal ? (/^(madame|monsieur|docteur)/i.test(nm) ? `${nm},` : 'Madame, Monsieur,') : nm ? `Bonjour ${nm},` : 'Bonjour,';
  let raw = s.idea.trim().replace(/\b(euh+|heu+|bah|ben|genre|du coup|en fait|voilà|tu vois)\b,?/gi, '').replace(/^\s*bonjour[,\s]*/i, '');
  [[/\bje peux pas\b/gi, 'je ne peux pas'], [/\bje sais pas\b|\bj['’]sais pas\b/gi, 'je ne sais pas'], [/\bj['’]?ai pas\b/gi, 'je n’ai pas'], [/\bc['’]?est pas\b/gi, 'ce n’est pas'], [/\by['’]?a\b/gi, 'il y a'],
    [/\bje voulais savoir comment on fait pour\b/gi, 'je souhaiterais savoir comment'], [/\bparce que au bac je l['’]avais et\b/gi, 'car j’en bénéficiais au bac et'], [/\bparce que à\b/gi, 'car à'], [/\bparce que au\b/gi, 'parce qu’au'],
    [/\bje voudrai\b/gi, 'je souhaiterais'], [/\bdecembre\b/gi, 'décembre'], [/\bdes infos\b/gi, 'des informations'], [/\bje doit\b/gi, 'je dois'], [/\bdavoir\b/gi, 'd’avoir'], [/\bsvp\b/gi, 's’il vous plaît'],
    [/\b(ma|mes) (dyslexie|dyscalculie|dysorthographie|dysgraphie|dyspraxie|dysphasie)\b/gi, 'mes besoins spécifiques'], [/\bje suis (multi)?dys\w*/gi, 'j’ai des besoins spécifiques']].forEach(([a, b]) => { raw = raw.replace(a, b); });
  const sentences = raw.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter((x) => x.length > 2).map((x) => { x = x.charAt(0).toUpperCase() + x.slice(1); return /[.!?]$/.test(x) ? x : `${x}.`; });
  const work = s.recip === 'Employeur' || s.recip === 'RH ou référent handicap';
  const intro = {
    amenagement: work ? 'Je me permets de vous écrire au sujet d’un aménagement de mon poste.' : 'Je me permets de vous écrire au sujet des aménagements pour mes examens.',
    rdv: `Je souhaiterais prendre rendez-vous avec vous${s.recip === 'Soignant' ? ' pour un bilan' : ''}.`,
    relance: 'Je reviens vers vous au sujet de ma demande, restée sans réponse à ce jour.',
    besoins: 'Je souhaite vous présenter quelques besoins qui m’aident à travailler dans de bonnes conditions.',
    absence: 'Je vous informe que je ne pourrai pas être présent au prochain rendez-vous.',
    merci: 'Je tenais à vous remercier pour votre aide.',
  }[s.goal] || '';
  const close = { amenagement: 'Je peux vous transmettre les justificatifs, notamment mon bilan.', rdv: 'Je suis disponible en semaine.', relance: 'Pourriez-vous me dire où en est ma demande ?', besoins: 'Je reste disponible pour en parler.', absence: 'Pourriez-vous me proposer une autre date ?', merci: '' }[s.goal] || '';
  const polite = formal ? 'Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.' : simple ? 'Merci beaucoup,' : 'Je vous remercie par avance.\nBien cordialement,';
  const short = s.len === 'court' || simple;
  const p = [hello, '', intro + (s.context && !short ? ` Cela concerne : ${s.context.charAt(0).toLowerCase()}${s.context.slice(1).replace(/\.$/, '')}.` : '')];
  if (sentences.length) p.push('', (short ? sentences.slice(0, 2) : sentences).join(' '));
  if (close && !short) p.push('', close);
  p.push('', polite, `${PROFIL.prenom} ${PROFIL.nom}`);
  const subj = { amenagement: work ? 'Aménagement de poste' : 'Aménagement d’examens', rdv: 'Demande de rendez-vous', relance: 'Relance de ma demande', besoins: 'Mes besoins', absence: 'Absence au prochain rendez-vous', merci: 'Merci' }[s.goal] || 'Ma demande';
  return { subject: `${subj} · ${PROFIL.prenom} ${PROFIL.nom}`, body: p.join('\n') };
}
function mlRender() {
  const s = ML;
  const bar = `<div class="wz-steps">${[0, 1, 2, 3].map((i) => `<i class="${i <= Math.min(s.step, 3) ? 'd' : ''}"></i>`).join('')}</div>`;
  const ctx = s.context ? `<p class="small" style="margin-bottom: 16px;"><span class="pill dem">${ic('kanban', 13)}${esc(s.context)}</span></p>` : '';
  const back = s.step ? `<button class="btn ghost" data-act="mlBack">${ic('left', 18)}Retour</button>` : '';
  const nav = (ok, label = 'Continuer') => `<div class="wz-nav">${back}<span class="grow"></span><button class="btn pri lg" data-act="mlNext" ${ok ? '' : 'disabled style="opacity: .45;"'}>${label} ${ic('arrow', 18)}</button></div>`;
  let h = '';
  if (s.step === 0) h = `${ctx}<p class="lbl">Étape 1 sur 4</p><h2 class="wz-q">À qui tu écris ?</h2><div class="wz-opts">${ML_R.map(([r, i]) => `<button class="wz-opt${s.recip === r ? ' on' : ''}" data-act="mlPick" data-k="recip" data-v="${r}">${ic(i, 20)}${r}</button>`).join('')}</div><label style="display: block; margin-top: 18px; max-width: 420px;"><span class="flabel">Son nom <span class="muted" style="font-weight: 400;">(facultatif)</span></span><input class="field" id="mlName" value="${esc(s.name)}" placeholder="Madame Lefèvre"></label>${nav(!!s.recip)}`;
  if (s.step === 1) h = `${ctx}<p class="lbl">Étape 2 sur 4</p><h2 class="wz-q">Pourquoi ?</h2><div class="wz-opts">${ML_G.map(([k, l]) => `<button class="wz-opt${s.goal === k ? ' on' : ''}" data-act="mlPick" data-k="goal" data-v="${k}">${l}</button>`).join('')}</div>${nav(!!s.goal)}`;
  if (s.step === 2) h = `${ctx}<p class="lbl">Étape 3 sur 4</p><h2 class="wz-q">Ton idée, avec tes mots.</h2><p class="muted">Écris comme tu parles. Les fautes, ce n’est pas grave.</p><div class="row" style="margin-top: 20px; align-items: flex-start;"><textarea class="field" id="mlIdea" style="min-height: 150px; font-size: 17px;">${esc(s.idea)}</textarea><button class="lio-mic" style="background: #34475F;" data-act="mlMic" aria-label="Dicter mon idée">${ic('mic', 22, '#fff')}</button></div><div class="row wrap small" style="margin-top: 12px; gap: 6px;"><span class="muted">Exemples :</span>${ML_EX.map((t, i) => `<button class="btn ghost sm" data-act="mlEx" data-i="${i}" style="color: var(--dem);">${['Tiers temps', 'Relance', 'Au travail'][i]}</button>`).join('')}</div>${nav(true)}`;
  if (s.step === 3) h = `${ctx}<p class="lbl">Étape 4 sur 4</p><h2 class="wz-q">Quel ton ?</h2><div class="wz-opts">${ML_T.map(([k, l, d]) => `<button class="wz-opt${s.tone === k ? ' on' : ''}" data-act="mlPick" data-k="tone" data-v="${k}" style="flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px; min-height: 76px;">${l}<span class="small muted" style="font-weight: 400;">${d}</span></button>`).join('')}</div><div class="row" style="margin-top: 18px;"><span class="small muted">Longueur</span><div class="seg"><button class="${s.len === 'court' ? 'on' : ''}" data-act="mlPick" data-k="len" data-v="court">Court</button><button class="${s.len === 'normal' ? 'on' : ''}" data-act="mlPick" data-k="len" data-v="normal">Normal</button></div></div><div class="wz-nav">${back}<span class="grow"></span><button class="btn ai lg" data-act="mlGen">${ic('sparkle', 18)}Rédiger avec Lio</button></div>`;
  if (s.step === 4) h = s.mail ? `<div class="row wrap" style="margin-bottom: 16px;"><span class="small muted grow">À : <b style="color: var(--ink);">${esc(s.recip)}${s.name ? ` · ${esc(s.name)}` : ''}</b></span><button class="btn ghost sm" data-act="mlBack">${ic('left', 16)}Modifier</button><button class="btn ghost sm" data-act="mlReset">Nouveau mail</button></div>
      <div class="ml-paper"><input class="ml-subj" id="mlSubj" value="${esc(s.mail.subject)}" aria-label="Objet"><textarea class="ml-body" id="mlBody" aria-label="Texte du mail"></textarea></div>
      <div class="row wrap" style="margin-top: 18px;"><button class="btn pri" data-act="mlCopy">${ic('copy', 18)}Copier</button><button class="btn sec" data-act="mlListen">${ic('volume', 18)}Écouter</button><span class="grow"></span><button class="chip" data-act="mlVar" data-v="court">Plus court</button><button class="chip" data-act="mlVar" data-v="formel">Plus formel</button><button class="chip" data-act="mlVar" data-v="simple">Plus simple</button></div>`
    : `<div class="row" style="justify-content: center; padding: 60px 0; color: var(--lio); font-weight: 600; gap: 12px;"><span class="typing"><i></i><i></i><i></i></span>Lio écrit ton mail…</div>`;
  $('#wz').innerHTML = (s.step < 4 ? bar : '') + `<div class="fade">${h}</div>`;
  if (s.step === 4 && s.mail) {
    const t = $('#mlBody');
    let i = 0;
    const full = s.mail.body;
    const iv = setInterval(() => { i = Math.min(full.length, i + 6); t.value = full.slice(0, i); if (i >= full.length) clearInterval(iv); }, 14);
  }
}
document.addEventListener('input', (e) => { if (e.target.id === 'mlName') ML.name = e.target.value; if (e.target.id === 'mlIdea') ML.idea = e.target.value; });
ACT.mlPick = (el) => { ML[el.dataset.k] = el.dataset.v; mlRender(); if (el.dataset.k === 'recip' || el.dataset.k === 'goal') setTimeout(() => { if (ML.step < 2) { ML.step++; mlRender(); } }, 220); };
ACT.mlNext = () => { if (ML.step === 0 && !ML.recip) return; if (ML.step === 1 && !ML.goal) return; ML.step = Math.min(3, ML.step + 1); mlRender(); };
ACT.mlBack = () => { ML.step = ML.step === 4 ? 3 : Math.max(0, ML.step - 1); mlRender(); };
ACT.mlReset = () => { Object.assign(ML, { step: 0, recip: '', name: '', goal: '', idea: '', tone: 'cordial', len: 'normal', context: '', mail: null }); mlRender(); };
ACT.mlEx = (el) => { ML.idea = ML_EX[Number(el.dataset.i)]; mlRender(); };
ACT.mlMic = (el) => { el.classList.add('rec'); toast('Lio t’écoute…'); setTimeout(() => { el.classList.remove('rec'); ML.idea = ML_EX[0]; mlRender(); }, 1500); };
ACT.mlGen = () => { ML.step = 4; ML.mail = null; mlRender(); setTimeout(() => { ML.mail = mlCompose(); mlRender(); addXp(15, 'mail écrit avec Lio'); }, 900); };
ACT.mlVar = (el) => { const v = el.dataset.v; if (v === 'court') ML.len = 'court'; else ML.tone = v; ML.mail = mlCompose(); mlRender(); };
ACT.mlCopy = () => copy(`${$('#mlSubj').value}\n\n${$('#mlBody').value}`, 'Mail copié. Colle-le dans ta messagerie.');
ACT.mlListen = () => speak($('#mlBody').value);
ENTER.mails = () => {
  if (params.context || params.recip || params.idea) {
    Object.assign(ML, { step: 0, recip: '', name: '', goal: '', idea: '', tone: 'cordial', len: 'normal', mail: null });
    ML.context = params.context || '';
    if (params.recip) { ML.recip = params.recip; ML.step = 1; }
    if (params.goal) { ML.goal = params.goal; ML.step = 2; }
    if (params.idea && params.recip && !params.goal) ML.step = 1;
    if (params.name) ML.name = params.name;
    if (params.idea) ML.idea = params.idea;
    if (params.context && !params.recip) { ML.recip = 'Service handicap'; ML.step = 1; }
  }
  params = {};
  mlRender();
};
