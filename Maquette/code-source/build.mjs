import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { P, ic, lio, logo, FONTS } from './icons.mjs';
import { MOBILE, FIT, onboard } from './onboarding.mjs';
import { legalBody, legalCss } from './legal.mjs';

const read = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');
const CSS = read('style.css');
const doc = ({ title, body, scripts, head = '', leaflet = false }) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="${FONTS}">
<style>${CSS}</style>
${leaflet ? `<style>${read('leaflet.css')}</style>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>` : ''}
${head}
</head>
<body>
${body}
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
const P = ${JSON.stringify(P)};
const LOGO = ${JSON.stringify(logo(24))};
${read('core.js')}
${scripts.map((s) => read(s)).join('\n')}
</script>
<script>${read('consent.js')}</script>
</body>
</html>
`;

const MODES = [
  ['lire', 'Lire', 'book', '#3B64A8', 'Il lit et explique un document', 'Pensé pour la dyslexie'],
  ['calculer', 'Calculer', 'calc', '#8A6412', 'Il décompose un calcul pas à pas', 'Pensé pour la dyscalculie'],
  ['reformuler', 'Reformuler', 'swap', '#6552C9', 'Il remet ton idée au propre, à l’oral', 'Pensé pour la dysphasie'],
  ['organiser', 'Organiser', 'steps', '#B4533A', 'Il découpe une tâche en étapes', 'Pensé pour la dyspraxie'],
  ['ecrire', 'Écrire', 'pen', '#2F7F77', 'Tu dictes, il corrige', 'Pensé pour la dysgraphie'],
  ['entrainer', 'S’entraîner', 'target', '#34475F', 'Il joue le recruteur ou le médecin', 'Pour les rendez-vous qui comptent'],
];
const head = (title, lead, right = '', back = '') => `<div class="page-h fade"><div>${back ? `<button class="btn ghost sm pg-back" data-act="go" data-to="${back[0]}" style="margin: 0 0 10px -10px;">${ic('left', 16)}${back[1]}</button>` : ''}<h1 class="t1">${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div>${right}</div>`;
const scr = (id, inner, cls = 'page') => `<section class="screen" data-id="${id}"><div class="${cls}">${inner}</div></section>`;
const modeHead = (k) => { const m = MODES.find((x) => x[0] === k); return head(`<span style="display: inline-flex; align-items: center; gap: 14px;"><span style="width: 48px; height: 48px; border-radius: 15px; background: ${m[3]}; display: inline-flex; align-items: center; justify-content: center;">${ic(m[2], 24, '#fff', 2)}</span>${m[1]}</span>`, `${m[4]}. <span class="pill" style="margin-left: 4px;">${m[5]}</span>`, '', ['lio', 'Lio']); };
const askBar = (k, ph) => { const m = MODES.find((x) => x[0] === k); return `<div class="lio-ask" style="margin-top: 24px;"><span class="muted grow">${ph}</span><button class="lio-mic" style="background: ${m[3]};" data-act="mic" aria-label="Parler à Lio">${ic('mic', 22, '#fff')}</button></div>`; };

const app = [
  scr('accueil', `
    <div class="ph-home">
      <h1 class="ph-hi"><span id="phHello">Bonjour</span> <span class="who">Adam</span></h1>
      <div id="phCard"></div>
      <div class="ph-links"><button class="btn sec" data-act="go" data-to="besoins">${ic('edit', 18)}Modifier</button><button class="btn sec" data-act="bsShare">${ic('qr', 18)}Partager</button></div>
      <button class="ph-mail" data-act="go" data-to="mails"><span class="ph-mail-ic">${ic('mail', 24)}</span><span class="grow"><b>Écrire un mail</b><span class="small muted">Tu expliques, Lio rédige</span></span>${ic('right', 20)}</button>
      <section class="ph-sec" aria-labelledby="phTodoT"><div class="ph-sec-h"><h2 id="phTodoT">À faire</h2><button class="btn ghost sm" data-act="go" data-to="demarches">Tout voir</button></div><div id="phTasks" class="ph-list"></div></section>
      <section class="ph-sec" aria-labelledby="phRdvT"><div class="ph-sec-h"><h2 id="phRdvT">Prochain rendez-vous</h2></div><div id="phRdv"></div></section>
    </div>
    <div class="ac-head fade"><div><p class="lbl" id="hoDate"></p><h1 class="t1"><span id="hoHello">Bonjour</span> <span class="who">Adam</span></h1><p class="lead" id="hoSum"></p></div></div>
    <nav class="ph-quick" aria-label="Actions rapides">${[['mail', 'Écrire un mail', 'hmFocus', '', '#FBE7A1', '#8A6412'], ['expand', 'Montrer ma carte', 'qk', 'bsShow', '#D2E2F6', '#34475F'], ['upload', 'Ranger un document', 'qk', 'upload', '#BDE8E2', '#2F7F77'], ['plus', 'Nouvelle démarche', 'qk', 'newdem', '#DCD6F7', '#6552C9']].map(([i, t, a, d, bg, c]) => `<button data-act="${a}"${d ? ` data-a="${d}"` : ''}><span style="background: ${bg}; color: ${c};">${ic(i, 24)}</span>${t}</button>`).join('')}</nav>
    <div class="ac-grid">
      <section class="ac-box fade" aria-labelledby="acCardT"><div class="ac-sec"><h2 class="t3" id="acCardT">Ma carte</h2><button class="btn ghost sm" data-act="go" data-to="besoins">${ic('edit', 16)}Modifier</button></div>
        <div id="acCard"></div>
        <div class="ac-acts"><button class="btn pri" data-act="bsShow">${ic('eye', 18)}Montrer en classe</button><button class="btn sec" data-act="bsShare">${ic('qr', 18)}QR code ou lien</button></div></section>
      <section class="ac-box fade" aria-labelledby="acMailT"><div class="ac-sec"><h2 class="t3" id="acMailT">Écrire un mail</h2><span class="pill lio">${ic('sparkle', 14)}Avec Lio</span></div>
        <p class="small muted" style="margin-top: -6px;">Écris comme tu parles, même avec des fautes. Lio en fait un vrai mail.</p>
        <div><span class="flabel">À qui ?</span><div class="chips" id="hmTo" style="flex-wrap: wrap;">${['Service handicap', 'Professeur', 'Scolarité', 'Employeur', 'Soignant'].map((t, i) => `<button class="chip${i ? '' : ' on'}" data-act="hmTo" data-v="${t}">${t}</button>`).join('')}</div></div>
        <div><span class="flabel">Ton idée</span><div class="hm-input"><textarea id="hmIdea" rows="3" placeholder="je voudrais demander le tiers temps pour mes partiels de décembre" aria-label="Ton idée de mail"></textarea><button class="lio-mic" style="background: #34475F;" data-act="hmMic" aria-label="Dicter">${ic('mic', 22, '#fff')}</button></div>
          <div class="row wrap" style="gap: 6px; margin-top: 10px;"><span class="tiny muted">Idées :</span>${['Demander le tiers temps', 'Décaler un rendez-vous', 'Relancer sans réponse'].map((t) => `<button class="chip sm" data-act="hmIdeaPick" data-v="${t}">${t}</button>`).join('')}</div></div>
        <button class="btn pri lg full" data-act="hmWrite" style="margin-top: auto;">${ic('sparkle', 18)}Rédiger avec Lio</button></section>
    </div>
    <section class="fade" style="margin-top: 26px;" aria-label="Raccourcis"><div class="ac-short" id="acShort"></div></section>
    <div class="ac-two">
      <section class="ac-box fade" aria-labelledby="hmTaskT"><div class="ac-sec"><h2 class="t3" id="hmTaskT">À faire bientôt</h2><button class="btn ghost sm" data-act="go" data-to="demarches">Tout voir ${ic('right', 16)}</button></div><div id="hmTasks" class="col" style="gap: 0;"></div></section>
      <section class="ac-box fade" aria-labelledby="hmDocT"><div class="ac-sec"><h2 class="t3" id="hmDocT">Derniers documents</h2><button class="btn ghost sm" data-act="go" data-to="coffre">Coffre ${ic('right', 16)}</button></div><div id="hmDocs" class="col" style="gap: 0;"></div></section>
    </div>`),

  scr('demarches', `<div id="dmHome"></div><div id="dmBoard" hidden></div>`),

  scr('mails', `${head('Rédacteur de mails', 'Quatre petites questions. Lio écrit le mail pour toi.', '', ['accueil', 'Accueil'])}<div class="wz" id="wz"></div>`),

  scr('lio', `${head('Lio', 'Ton compagnon. Une seule voix, six casquettes. Chacune est pensée pour une difficulté précise.')}
    <div class="row fade" style="gap: 20px; margin-bottom: 26px;"><div class="float">${lio(110, '#3B64A8', 'talk')}</div><div class="lio-ask"><span class="muted grow" style="font-size: 18px;">Dis-moi ce dont tu as besoin…</span><button class="lio-mic" style="background: #34475F;" data-act="mic" aria-label="Parler à Lio">${ic('mic', 22, '#fff')}</button></div></div>
    <div class="lio-modes">${MODES.map(([k, l, i, c, d, dys]) => `<button class="lio-mode" style="background: ${c};" data-act="go" data-to="${k}"><div class="row" style="justify-content: space-between; align-items: flex-start;"><span style="width: 44px; height: 44px; border-radius: 13px; background: rgba(255,255,255,.18); display: flex; align-items: center; justify-content: center;">${ic(i, 22, '#fff', 2)}</span><span class="badge">${dys}</span></div><div><div style="font-family: var(--title); font-weight: 700; font-size: 22px;">${l}</div><div style="opacity: .85; font-size: 14px; margin-top: 2px;">${d}</div></div></button>`).join('')}</div>
    <p class="small muted row" style="margin-top: 18px;">${ic('lock', 16)}Lio ne reçoit ni ton profil ni tes documents.</p>`),

  scr('lire', `${modeHead('lire')}
    <div class="card pad fade" style="max-width: 900px;"><div class="row wrap" style="justify-content: space-between;"><span class="lbl">Convocation aux partiels</span><div class="row" style="gap: 8px;"><button class="btn sec sm" data-act="syll">Syllabes en couleur</button><button class="btn sec sm" data-act="ruler">Une ligne à la fois</button></div></div>
      <div id="readText" style="font-size: clamp(19px, 2.4vw, 24px); line-height: 2; letter-spacing: .03em; word-spacing: .12em; margin-top: 14px;">Les étudiants avec un <span class="hl word" data-w="aménagement" role="button" tabindex="0">aménagement</span> arrivent <span class="hl">15 minutes avant</span>, en <span class="hl">salle B204</span>. Ils présentent leur <span class="hl word" data-w="convocation" role="button" tabindex="0">convocation</span> et la <span class="hl word" data-w="notification" role="button" tabindex="0">notification</span> du <span class="hl word" data-w="tiers temps" role="button" tabindex="0">tiers temps</span>.</div>
      <div class="row wrap" style="margin-top: 20px;"><button class="btn pri" data-act="readAloud">${ic('play', 16)}Lire à voix haute</button><div class="seg"><button class="on" data-act="rate" data-v=".75">Lent</button><button data-act="rate" data-v="1">Normal</button></div></div></div>
    <div class="row fade" style="max-width: 900px; margin-top: 20px; align-items: flex-start;"><div class="float">${lio(64, '#3B64A8', 'talk')}</div><div class="bubble grow" id="lireSay">Clique sur un mot surligné : je te l’explique en une phrase.</div></div>
    <div class="row wrap" style="margin-top: 16px;"><button class="btn sec" data-act="resume">Résumer en une phrase</button><button class="btn sec" data-act="simplify">Simplifier</button></div>`),

  scr('calculer', `${modeHead('calculer')}
    <p class="t3 fade" style="margin-bottom: 16px;">3 séances à 32,50 €, remboursées à 60 %. Combien je paie ?</p>
    <div class="card fade" style="padding: 10px; max-width: 900px;" id="calcSteps"></div>
    <div class="card pad fade" style="max-width: 900px; margin-top: 16px;"><span class="lbl">En image : sur 10 parts, 6 sont remboursées</span><div style="display: flex; height: 34px; border-radius: 10px; overflow: hidden; margin-top: 10px;">${Array.from({ length: 10 }, (_, i) => `<span style="flex: 1; background: ${i < 6 ? '#2F7F77' : '#8A6412'}; border-right: 2px solid var(--surf);"></span>`).join('')}</div><div class="row small" style="justify-content: space-between; margin-top: 8px;"><b style="color: var(--lio);">60 % remboursés</b><b style="color: var(--car);">40 % pour toi</b></div></div>
    <div class="row wrap" style="margin-top: 18px;"><button class="btn pri lg" data-act="calcNext">Étape suivante ${ic('arrow', 18)}</button><button class="btn sec lg" data-act="calcSay">${ic('replay', 18)}Répète plus lentement</button></div>`),

  scr('reformuler', `${modeHead('reformuler')}
    <div class="row fade" style="max-width: 900px; align-items: flex-start;"><span style="width: 44px; height: 44px; border-radius: 14px; background: var(--surf2); display: flex; align-items: center; justify-content: center;">${ic('mic', 20)}</span><p class="muted" style="font-size: 18px; line-height: 1.6;">« euh pour le rendez-vous de jeudi, je dois ramener genre les papiers du bac ou pas forcément »</p></div>
    <div class="card fade" style="max-width: 900px; margin-top: 18px; padding: clamp(22px, 3vw, 34px); background: var(--vio-bg); border-color: transparent;"><span class="lbl" style="color: var(--vio);">Tu peux dire</span><p class="t2" id="refPhrase" style="margin-top: 10px; font-weight: 600;">« Pour le rendez-vous de jeudi, dois-je apporter mes documents du bac ? »</p>
      <div class="row wrap" style="margin-top: 22px;"><button class="btn lg" style="background: #6552C9; color: #fff;" data-act="sayRef">${ic('volume', 18, '#fff')}Écouter</button><button class="btn sec lg" data-act="go" data-to="entrainer">M’entraîner à le dire</button><button class="btn ghost lg" data-act="refShort">Plus court</button></div></div>
    <p class="lbl" style="margin: 26px 0 10px;">Phrases prêtes à dire</p><div class="row wrap" style="gap: 8px;">${['Pouvez-vous répéter plus lentement ?', 'J’ai besoin d’un peu plus de temps pour répondre.', 'Pouvez-vous me l’écrire ?'].map((t) => `<button class="chip wrapt" data-act="say" data-t="${t}">${ic('volume', 15)}${t}</button>`).join('')}</div>
    ${askBar('reformuler', 'Redis ton idée…')}`),

  scr('organiser', `${modeHead('organiser')}
    <div class="card fade" style="max-width: 900px; padding: clamp(20px, 3vw, 32px);"><div class="row"><h2 class="t3 grow" style="font-size: 22px;">Préparer mon sac pour l’examen</h2><span class="muted" id="orgCount"></span></div><div class="bar" style="margin-top: 14px;"><i id="orgBar" style="background: #B4533A;"></i></div>
      <p id="orgNow" style="font-family: var(--title); font-weight: 700; font-size: clamp(26px, 3.4vw, 36px); letter-spacing: -.03em; margin: 26px 0;"></p>
      <div class="row wrap"><button class="btn lg" style="background: #B4533A; color: #fff; min-height: 64px; padding: 0 34px; font-size: 18px;" data-act="orgDone">${ic('check', 22, '#fff', 2.6)}C’est fait</button><button class="btn sec lg" style="min-height: 64px;" data-act="orgSay">${ic('volume', 20)}Répète</button></div>
      <p class="lbl" style="margin: 24px 0 10px;">Reprendre à l’étape…</p><div class="row wrap" id="orgDots" style="gap: 10px;"></div></div>
    <p class="small muted" style="margin-top: 14px;">Gros boutons, rien à glisser. Tu peux reprendre où tu veux.</p>`),

  scr('ecrire', `${modeHead('ecrire')}
    <div class="card fade" style="max-width: 900px; overflow: hidden;"><div style="padding: clamp(20px, 3vw, 30px); font-size: 19px; line-height: 1.9;">bonjour madame je <s style="color: var(--bad);">voudrai</s> <b style="color: var(--lio);">voudrais</b> savoir si <s style="color: var(--bad);">sa</s> <b style="color: var(--lio);">ce</b> serait possible <s style="color: var(--bad);">davoir</s> <b style="color: var(--lio);">d’avoir</b> les sujets en avance car je <s style="color: var(--bad);">doit</s> <b style="color: var(--lio);">dois</b> les lire plusieurs fois</div>
      <div class="col small muted" style="padding: 0 clamp(20px, 3vw, 30px) 20px; gap: 6px;"><span>« voudrai » devient « voudrais » : on parle de soi au conditionnel.</span><span>« sa » devient « ce » : on peut dire « cela serait ».</span><span>« doit » devient « dois » : avec « je », on écrit -s.</span></div>
      <div class="row wrap" style="padding: 0 clamp(20px, 3vw, 30px) 26px;"><button class="btn lg" style="background: #2F7F77; color: #fff;" data-act="ecrMail">${ic('mail', 18, '#fff')}En faire un mail</button><button class="btn sec lg" data-act="say" data-t="Bonjour Madame, je voudrais savoir s’il serait possible d’avoir les sujets en avance, car je dois les lire plusieurs fois.">${ic('volume', 18)}Écouter</button></div></div>
    ${askBar('ecrire', 'Dicte ce que tu veux dire…')}`),

  scr('entrainer', `${modeHead('entrainer')}
    <div class="chips fade" id="trChips">${['Service handicap', 'Orthophoniste', 'Entretien d’embauche', 'RQTH'].map((t, i) => `<button class="chip${i ? '' : ' on'}" data-act="trTopic" data-t="${t}">${t}</button>`).join('')}</div>
    <div class="row fade" style="max-width: 900px; margin-top: 22px; align-items: flex-start;"><div class="float">${lio(84, '#34475F', 'talk')}</div><div class="bubble grow"><span class="tiny muted" id="trCount">Question 1 sur 4</span><p id="trQ" style="font-size: 21px; font-weight: 600; margin-top: 4px;"></p></div></div>
    <div id="trA" style="max-width: 900px;"></div>
    <div class="row" style="max-width: 900px; margin-top: 20px; gap: 10px;"><input class="field" id="trInput" placeholder="Réponds ici, ou appuie sur le micro"><button class="lio-mic" style="background: #34475F;" data-act="trMic" aria-label="Répondre à voix haute">${ic('mic', 22, '#fff')}</button><button class="btn pri" data-act="trSend">Répondre</button></div>`),

  `<section class="screen" data-id="lieux"><div class="mp"><div id="map"></div>
    <div class="seg mp-switch"><button class="on">${ic('map', 16)}Carte</button><button data-act="go" data-to="annuaire">${ic('list', 16)}Annuaire</button></div>
    <button class="btn sec mp-open" data-act="mpToggle" hidden>${ic('sidebar', 18)}Liste</button>
    <aside class="mp-panel" id="mpPanel" aria-label="Lieux"></aside></div></section>`,

  scr('annuaire', `${head('Annuaire', 'Les professionnels près de chez toi. Tu prends rendez-vous sur leur site.', '<div class="seg"><button data-act="go" data-to="lieux">' + ic('map', 16) + 'Carte</button><button class="on">' + ic('list', 16) + 'Annuaire</button></div>')}
    <div class="mp-search fade" style="max-width: 560px;">${ic('search', 18)}<input id="anSearch" placeholder="Nom, spécialité, quartier…"></div>
    <div class="chips fade" id="anSpecs" style="margin-top: 14px;"></div>
    <div class="chips fade" id="anFilters" style="margin-top: 8px;"></div>
    <p class="small muted" id="anCount" style="margin: 18px 0 10px;"></p>
    <div class="card fade" id="anList" style="overflow: hidden;"></div>
    <p class="tiny mute" style="margin-top: 12px;">Source : Annuaire Santé (CNAM). Données fictives de démonstration.</p>`),

  scr('coffre', `<div id="cfView"></div>`),

  scr('besoins', `<div id="bsView"></div>`),

  scr('reglages', `${head('Réglages', 'Tout s’applique tout de suite, partout.')}
    <div class="card fade st-prof" style="padding: 20px 22px; margin-bottom: 20px;"><div class="row wrap"><span class="av" style="width: 56px; height: 56px; font-size: 18px; background: #97D4D0;">AC</span><div class="grow"><div class="t3"><span class="who-full">Adam Charfi</span></div><div class="small muted">Études supérieures · L2 Histoire · adam.charfi@mail.fr</div></div><button class="btn ghost sm" data-act="go" data-to="besoins">${ic('card', 16)}Ma carte de besoins</button></div></div>
    <div class="st-grid" id="stGrid"></div>`),
].join('\n');

const appBody = `
<a class="skip" href="#main">Aller au contenu</a>
<header class="topbar">
  <button class="ib tb-back" data-act="back" aria-label="Retour" hidden>${ic('left', 22)}</button>
  <a class="brand" href="#accueil" data-act="go" data-to="accueil" aria-label="Pass’Dys, accueil">${logo(30)}<span>Pass’Dys</span></a>
  <span class="tb-title" id="tbTitle" aria-hidden="true"></span>
  <nav class="tabs" aria-label="Navigation principale"><div class="tabs-in">
      <a class="tab" href="#accueil" data-act="go" data-to="accueil" data-nav="accueil">${ic('home', 18)}Accueil</a>
      <a class="tab" href="#demarches" data-act="go" data-to="demarches" data-nav="demarches">${ic('kanban', 18)}Démarches</a>
      <a class="tab" href="#lieux" data-act="go" data-to="lieux" data-nav="lieux">${ic('pin', 18)}Autour de moi</a>
      <a class="tab" href="#coffre" data-act="go" data-to="coffre" data-nav="coffre">${ic('vault', 18)}Coffre</a>
      <a class="tab" href="#besoins" data-act="go" data-to="besoins" data-nav="besoins">${ic('card', 18)}Ma carte</a>
  </div></nav>
  <span class="tb-space"></span>
  <button class="tb-lio" data-act="quick" data-nav="lio" aria-haspopup="dialog"><span class="tb-lio-f">${lio(34, '#3B64A8', 'happy')}</span>Demander à Lio</button>
  <button class="ib tb-aa" data-act="a11y" aria-label="Affichage et lecture" title="Affichage et lecture"><span aria-hidden="true">Aa</span></button>
  <button class="ib" data-act="sound" aria-label="Couper le son" title="Couper le son">${ic('volume')}</button>
  <div style="position: relative;"><button class="ib" data-act="notifs" aria-label="Rappels" aria-expanded="false">${ic('bell')}<span class="dot" id="notifDot"></span></button><div class="menu" id="notifMenu" hidden></div></div>
  <div style="position: relative;"><button class="me" data-act="menu" aria-haspopup="true" aria-expanded="false" aria-label="Mon compte"><span class="av" style="background: #97D4D0;">AC</span></button>
    <div class="menu" id="meMenu" hidden>
      <div class="row" style="padding: 10px 12px 12px;"><span class="av" style="width: 40px; height: 40px; background: #97D4D0;">AC</span><div><div style="font-weight: 600;"><span class="who-full">Adam Charfi</span></div><div class="tiny muted">adam.charfi@mail.fr</div></div></div>
      <button class="menu-i xpel" data-act="go" data-to="reglages">${ic('flame', 18)}5 jours de suite · niveau 3</button>
      <div class="menu-sep"></div>
      <button class="menu-i" data-act="theme" id="themeItem">${ic('moon', 18)}Mode sombre</button>
      <button class="menu-i" data-act="go" data-to="reglages">${ic('settings', 18)}Réglages</button>
      <a class="menu-i" href="informations.html#cgu">${ic('file', 18)}Informations légales</a>
      <div class="menu-sep"></div>
      <a class="menu-i out" href="inscription.html#connexion">${ic('logout', 18)}Se déconnecter</a>
    </div></div>
</header>
<main class="view" id="main" tabindex="-1">${app}</main>
<nav class="tabbar" aria-label="Navigation">
  <a class="tb-i" href="#accueil" data-act="go" data-to="accueil" data-nav="accueil"><span class="tb-ic">${ic('home', 22)}</span>Accueil</a>
  <a class="tb-i" href="#demarches" data-act="go" data-to="demarches" data-nav="demarches"><span class="tb-ic">${ic('kanban', 22)}</span>Démarches</a>
  <button class="tb-i tb-mid" data-act="quick" data-nav="lio" aria-label="Demander à Lio" aria-haspopup="dialog"><span class="tb-face">${lio(48, '#3B64A8', 'happy')}</span>Lio</button>
  <a class="tb-i tb-coffre" href="#coffre" data-act="go" data-to="coffre" data-nav="coffre"><span class="tb-ic">${ic('vault', 22)}</span>Coffre</a>
  <a class="tb-i tb-ph" href="#lio" data-act="go" data-to="lio" data-nav="lio"><span class="tb-ic">${ic('sparkle', 22)}</span>Outils</a>
  <a class="tb-i tb-ph" href="#lieux" data-act="go" data-to="lieux" data-nav="lieux"><span class="tb-ic">${ic('pin', 22)}</span>Autour</a>
  <a class="tb-i tb-carte" href="#besoins" data-act="go" data-to="besoins" data-nav="besoins"><span class="tb-ic">${ic('card', 22)}</span>Ma carte</a>
</nav>
<input type="file" id="file" multiple hidden>`;

writeFileSync(new URL('../application.html', import.meta.url), doc({ title: 'Pass’Dys · Mon espace', body: appBody, scripts: ['app.js', 'demarches.js', 'mails.js', 'lieux.js', 'annuaire.js', 'coffre.js', 'besoins.js', 'reglages.js'], leaflet: true }));

const BASE = new URL('../../passerelle-prototype/', import.meta.url);
const rename = (s) => s
  .replace(/passerelle\.app\/carte\/karim-b/g, 'passdys.fr/c/adam-c')
  .replace(/karim\.b@mail\.fr/g, 'adam.charfi@mail.fr')
  .replace(/PASSERELLE/g, 'PASS’DYS').replace(/Passerelle/g, 'Pass’Dys').replace(/>passerelle</g, '>Pass’Dys<')
  .replace(/Karim B\./g, 'Adam C.').replace(/Karim/g, 'Adam').replace(/>KB</g, '>AC<').replace(/L2 Droit/g, 'L2 Histoire')
  .replace(/carnet de santé/gi, '');
const site = rename(readFileSync(new URL('site.html', BASE), 'utf8'));
writeFileSync(new URL('../index.html', import.meta.url), site.replace('</body>', () => `<script>${read('consent.js')}</script>\n</body>`));
const insc = onboard(rename(readFileSync(new URL('inscription.html', BASE), 'utf8'))).replace('</head>', `${MOBILE}\n</head>`).replace('function fit() {', FIT);
writeFileSync(new URL('../inscription.html', import.meta.url), insc.replace('J’accepte les conditions et la <span', 'J’accepte les <span style="text-decoration: underline;">conditions d’utilisation</span> et la <span').replace('</body>', () => `<script>${read('consent.js')}</script>\n</body>`));
const ko = (f) => `${Math.round(readFileSync(new URL(f, import.meta.url)).length / 1024)} Ko`;
const weights = { app: ko('../application.html'), insc: ko('../inscription.html'), site: ko('../index.html') };
writeFileSync(new URL('../informations.html', import.meta.url), doc({ title: 'Informations légales · Pass’Dys', body: legalBody(weights), scripts: [], head: `<style>${legalCss}</style>` }));
console.log('ok');
