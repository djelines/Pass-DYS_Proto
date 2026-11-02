import { P } from './icons.mjs';

const svg = (d, s = 24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="#3E3A63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0;">${d}</svg>`;
const RADIO_ON = 'background: #7CC5BF;"><div style="width: 10px; height: 10px; border-radius: 50%; background: #3E3A63;"></div></div>';
const RADIO_OFF = 'background: transparent;"></div>';
const postit = (g, v, label, icon, bg, fold, rot, delay, on) => `<div class="pop" style="animation-delay: ${delay}s;"><div class="pi" data-g="${g}" data-v="${v}" style="width: 190px; height: 170px; box-sizing: border-box; background: ${bg}; padding: 20px; transform: rotate(${rot}deg); ${on ? 'outline: 2.5px solid #3E3A63; outline-offset: -2.5px;' : ''}"><div class="fold" style="background: ${fold};"></div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;"><div style="width: 50px; height: 50px; border-radius: 50%; background: #F8F6F1; border: 1.5px solid #3E3A63; display: flex; align-items: center; justify-content: center;">${svg(icon)}</div><div class="rd" style="width: 26px; height: 26px; border-radius: 50%; border: 1.8px solid #3E3A63; box-sizing: border-box; display: flex; align-items: center; justify-content: center; ${on ? RADIO_ON : RADIO_OFF}</div>
        <div class="h" style="font-size: 28px; letter-spacing: -0.035em; margin-top: 42px; line-height: 1;">${label}</div></div></div>`;

export const MOBILE = `<style>
body.mflow #fit { width: 100% !important; height: auto !important; margin-top: 0 !important; overflow: visible !important; }
body.mflow #stage { position: relative !important; width: 100% !important; transform: none !important; }
body.mflow .screen.on > div:first-child { width: 100% !important; height: auto !important; min-height: 100vh; min-height: 100dvh; overflow: hidden !important; padding-bottom: 40px; box-sizing: border-box; }
body.mflow .screen.on > div:first-child > div[style*="position: absolute"] { display: none !important; }
body.mflow .up { white-space: normal !important; }
body.mflow [style*="padding: 30px 64px"] { padding: 16px !important; gap: 10px; }
body.mflow [style*="padding: 30px 64px"] > div:first-child .h { display: none; }
body.mflow [style*="gap: 70px"] { gap: 16px !important; }
body.mflow [style*="font-size: 104px"] { font-size: 44px !important; }
body.mflow [style*="font-size: 36px; font-weight: 600"] { font-size: 22px !important; }
body.mflow .screen.on .fade[style*="font-size: 18px"] { padding: 0 20px; text-align: center; }
body.mflow [style*="gap: 22px; margin-top: 50px"] { flex-wrap: wrap !important; justify-content: center !important; gap: 14px !important; padding: 0 12px; margin-top: 28px !important; }
body.mflow .pi { width: 150px !important; height: 136px !important; padding: 14px !important; }
body.mflow .pi .h { font-size: 21px !important; margin-top: 26px !important; }
body.mflow [style*="width: 1046px"] { width: 100% !important; padding: 0 16px; flex-wrap: wrap; gap: 12px; margin-top: 30px !important; box-sizing: border-box; }
body.mflow [style*="width: 1046px"] .hand { display: none; }
body.mflow .jeu-groups { flex-direction: column !important; align-items: center !important; gap: 26px !important; margin-top: 26px !important; }
body.mflow .jeu-groups > div > div:last-child { gap: 14px !important; }
body.mflow [style*="grid-template-columns: 620px"] { display: block !important; }
body.mflow [style*="grid-template-columns: 620px"] > div:first-child { height: auto; padding: 18px 16px 22px; }
body.mflow [style*="grid-template-columns: 620px"] > div:first-child > * { position: static !important; }
body.mflow [style*="grid-template-columns: 620px"] > div:first-child > div:first-child,
body.mflow [style*="grid-template-columns: 620px"] > div:first-child > .sway,
body.mflow [style*="grid-template-columns: 620px"] > div:first-child > .bob,
body.mflow [style*="grid-template-columns: 620px"] > div:first-child > svg,
body.mflow [style*="grid-template-columns: 620px"] > div:first-child > div[style*="left: 400px"] { display: none !important; }
body.mflow [style*="grid-template-columns: 620px"] .h.fade { margin-top: 16px; font-size: 19px !important; }
body.mflow [style*="grid-template-columns: 620px"] .h.fade span { font-size: 36px !important; }
body.mflow [style*="padding: 70px 130px 0 110px"] { padding: 22px 16px 40px !important; }
body.mflow [style*="font-size: 96px"] { font-size: 52px !important; }
body.mflow [style*="font-size: 34px; font-weight: 600"] { font-size: 22px !important; }
body.mflow [style*="margin-top: 44px"] { margin-top: 24px !important; }
body.mflow .btn, body.mflow .btn2 { white-space: normal; text-align: center; }
body.mflow [style*="padding: 20px 110px 0"] { padding: 4px 16px 0 !important; }
body.mflow [style*="font-size: 84px"] { font-size: 40px !important; }
body.mflow [style*="grid-template-columns: 640px"] { display: block !important; margin-top: 18px !important; }
body.mflow [style*="grid-template-columns: 640px"] > div:last-child { margin-top: 26px; }
body.mflow [style*="grid-template-columns: 640px"] > div:last-child > div[style*="position: absolute"] { display: none; }
body.mflow [style*="grid-template-columns: 640px"] [style*="font-size: 23px"] { font-size: 18px !important; }
body.mflow [style*="justify-content: space-between; gap: 20px; padding: 15px 0"] { flex-wrap: wrap; gap: 10px !important; }
body.mflow .seg span { padding-left: 11px !important; padding-right: 11px !important; }
body.mflow [style*="margin-top: 36px; animation-delay: .6s"] { gap: 12px; flex-wrap: wrap; }
body.mflow [style*="grid-template-columns: 420px"] { display: block !important; padding: 10px 16px 0 !important; }
body.mflow [style*="grid-template-columns: 420px"] > .pop { display: none !important; }
body.mflow [style*="font-size: 120px"] { font-size: 54px !important; }
body.mflow [style*="font-size: 40px; font-weight: 600"] { font-size: 24px !important; }
body.mflow [style*="font-size: 120px"] + svg { display: none; }
body.mflow [style*="gap: 20px; margin-top: 36px"] { flex-wrap: wrap; }
</style>`;

export const FIT = `function mobileFit() {
  const on = innerWidth <= 900;
  document.body.classList.toggle('mflow', on);
  if (!on) return false;
  stage.style.transform = 'none';
  fitBox.style.width = '100%';
  fitBox.style.height = 'auto';
  fitBox.style.marginTop = '0';
  return true;
}
function fit() {
  if (mobileFit()) return;`;

const SCRIPT = `
const JEU = { game: '1', sound: '0' };
function saveJeu() { try { const k = 'passdys:reglages'; const cur = JSON.parse(localStorage.getItem(k) || '{}'); localStorage.setItem(k, JSON.stringify({ ...cur, game: JEU.game === '1', sound: JEU.sound === '1' })); } catch (e) { return null; } return true; }
function paintJeu() {
  $$('[data-id="jeu"] .pi').forEach((p) => {
    const on = JEU[p.dataset.g] === p.dataset.v;
    p.style.outline = on ? '2.5px solid #3E3A63' : 'none';
    p.style.outlineOffset = '-2.5px';
    const r = $('.rd', p);
    r.style.background = on ? '#7CC5BF' : 'transparent';
    r.innerHTML = on ? '<div style="width: 10px; height: 10px; border-radius: 50%; background: #3E3A63;"></div>' : '';
  });
  const t = $('[data-sound]');
  if (t) { const on = JEU.sound === '1'; t.firstElementChild.style.left = on ? '27px' : '3px'; t.style.background = on ? '#97D4D0' : '#F8F6F1'; }
}
hooks.enter.jeu = paintJeu;
hooks.enter.reglages = paintJeu;
const PRIMAIRE = { font: 'andika', size: '1.16', space: '3', fond: 'jaune', voice: '0.75' };
const STAGE = { Primaire: 'Primaire', 'Collège': 'Collège', 'Lycée': 'Lycée', 'Études sup.': 'Étudiant', 'Vie active': 'Salarié', 'Je suis parent': 'Parent' };
const SUBS = { Primaire: 'Les aides et démarches de l’école primaire', 'Collège': 'Les aides et démarches du collège', 'Lycée': 'Les démarches du lycée et du bac', 'Études sup.': 'Les démarches de la fac et des examens', 'Vie active': 'Les démarches liées au travail', 'Je suis parent': 'Les démarches pour ton enfant' };
const CONF = {};
JEU.etape = 'Études sup.';
function confPicked(el) {
  const sp = el.closest('[data-id="reglages"] .seg span');
  if (sp) {
    const l = txt(sp); const i = [...sp.parentElement.children].indexOf(sp);
    const F = { Lexend: 'lexend', Atkinson: 'atkinson', Andika: 'andika', Standard: 'system' };
    if (F[l]) CONF.font = F[l];
    else if (l === 'A') CONF.size = ['1', '1', '1.08', '1.16'][i];
    else if (['Normal', 'Aéré', 'Très aéré'].includes(l)) CONF.space = String(i + 1);
    else if (['Lente', 'Normale', 'Rapide'].includes(l)) CONF.voice = ['0.75', '0.92', '1.15'][i];
    return;
  }
  const sw = el.closest('[data-id="reglages"] div[title]');
  if (sw) { CONF.fond = { 'Crème': 'creme', 'Bleu pâle': 'bleu', 'Jaune pâle': 'jaune', 'Gris doux': 'gris' }[sw.title] || 'creme'; return; }
  if (el.closest('[data-id="reglages"] div[style*="width: 56px"]:not([data-sound])')) CONF.hc = !CONF.hc;
}
function primaireHint() {
  const h = $$('[data-id="situation"] .hand').find(Boolean);
  if (h) h.textContent = JEU.etape === 'Primaire' ? 'réglages adaptés au primaire : texte plus grand, police Andika' : 'une seule réponse · modifiable plus tard';
}
document.addEventListener('click', (e) => {
  if (!e.target.closest) return;
  confPicked(e.target);
  const pi = e.target.closest('[data-id="situation"] .pi');
  if (pi) { JEU.etape = txt($('.h', pi)); primaireHint(); }
}, true);
const saveAll = () => {
  try {
    const k = 'passdys:reglages';
    const cur = JSON.parse(localStorage.getItem(k) || '{}');
    const base = JEU.etape === 'Primaire' ? PRIMAIRE : {};
    localStorage.setItem(k, JSON.stringify({ ...cur, ...base, ...CONF, game: JEU.game === '1', sound: JEU.sound === '1' }));
    const pk = 'passdys:profil';
    localStorage.setItem(pk, JSON.stringify({ ...JSON.parse(localStorage.getItem(pk) || '{}'), stage: STAGE[JEU.etape] || 'Étudiant' }));
  } catch (e) { return null; }
  return true;
};
hooks.enter.pret = (t) => {
  saveAll();
  const h = $$('.hand', t).find((x) => /points/.test(txt(x))); if (h) h.style.display = JEU.game === '1' ? '' : 'none';
  const rows = $$('.row', t).filter((r) => r.style.padding);
  const set = (r, a, b) => { const d = $$('div', r).filter((x) => x.style.fontSize === '18px' || x.style.fontSize === '14px'); if (d[0]) d[0].textContent = a; if (d[1]) d[1].textContent = b; };
  if (rows[0]) set(rows[0], JEU.etape === 'Études sup.' ? 'Études supérieures' : JEU.etape, SUBS[JEU.etape] || '');
  const F = { andika: 'Andika', atkinson: 'Atkinson', system: 'Police standard', lexend: 'Lexend' };
  const font = CONF.font || (JEU.etape === 'Primaire' ? 'andika' : 'lexend');
  const big = (CONF.size || (JEU.etape === 'Primaire' ? '1.16' : '1')) !== '1';
  if (rows[2]) set(rows[2], F[font] + ' · ' + (big ? 'texte grand' : 'texte normal') + (JEU.sound === '1' ? ' · voix activée' : ' · son coupé'), JEU.etape === 'Primaire' ? 'Réglages adaptés au primaire, modifiables à tout moment' : 'Modifiable dans tes réglages');
};
`;

export function onboard(s) {
  const section = (id) => s.match(new RegExp(`<section class="screen" data-id="${id}">[\\s\\S]*?</section>`))[0];
  s = s.replace(/<svg style="position: absolute; left: 10px; right: 10px; top: 50%; margin-top: -6px;" width="220" height="12" viewBox="0 0 220 12" aria-hidden="true">/g,
    '<svg style="position: absolute; left: 13px; top: 50%; margin-top: -6px; width: calc(100% - 26px); height: 12px;" viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true">');
  s = s.replace(/Question (\d) sur 3/g, 'Question $1 sur 4');

  const regl = section('reglages');
  const doneCircle = regl.match(/<div class="" style="position: relative; width: 26px; height: 26px;[^>]*background: #34475F;[^>]*>[\s\S]*?<\/svg><\/div>/)[0];
  const sit = section('situation');
  const pulse = sit.match(/<div class="pulse"[^>]*>1<\/div>/)[0];
  let jeu = sit
    .replace('data-id="situation"', 'data-id="jeu"')
    .replace(/id="qs"/, 'id="qj"').replace('url(#qs)', 'url(#qj)').replace(/id="q2s"/, 'id="q2j"').replace('url(#q2s)', 'url(#q2j)')
    .replace(/(<\/svg>\n    )<div class="pulse"[^\n]*/, `$1${doneCircle.repeat(3)}${pulse.replace('>1<', '>4<')}`)
    .replace('Question 1 sur 4', 'Question 4 sur 4')
    .replace('Aujourd’hui,', 'Dernière question :')
    .replace('tu en es où ?', 'des points ?')
    .replace('Pass’Dys te propose les démarches qui te concernent.', 'Des points et des niveaux quand tu avances. Si ça te met la pression, on n’en met pas.')
    .replace('une seule réponse · modifiable plus tard', 'tout se change plus tard dans les réglages')
    .replace(/>Continuer <svg/, '>Terminer <svg');
  const a = jeu.indexOf('<div style="display: flex; gap: 22px; margin-top: 50px; align-items: flex-start;">');
  const z = jeu.indexOf('<div class="fade" style="display: flex; justify-content: space-between; align-items: center; width: 1046px;');
  const group = (title, inner) => `<div><div class="cap" style="color: #5E6B7C; text-align: center; margin-bottom: 18px;">${title}</div><div style="display: flex; gap: 22px; justify-content: center;">${inner}</div></div>`;
  jeu = `${jeu.slice(0, a)}<div class="jeu-groups" style="display: flex; gap: 70px; margin-top: 46px; align-items: flex-start;">
      ${group('Les points et les niveaux', postit('game', '1', 'Oui, des points', P.trophy, '#FBE7A1', '#EFD27A', -3, 0.35, true) + postit('game', '0', 'Non merci', P.check, '#D2E2F6', '#AFC8EA', 2, 0.43, false))}
      ${group('Le son', postit('sound', '1', 'Son activé', P.volume, '#BDE8E2', '#93D3CA', -2, 0.51, false) + postit('sound', '0', 'Son coupé', P.volx, '#F9CDB7', '#EDAE92', 3, 0.59, true))}
    </div>
    ${jeu.slice(z)}`;
  s = s.replace(regl, regl.replace(/>Terminer <svg/, '>Continuer <svg')
    .replace('<div style="font-size: 17px; font-weight: 600;">Lecture à voix haute</div>', '<div style="font-size: 17px; font-weight: 600;">Son et lecture à voix haute</div><div style="font-size: 13px; color: #5E6B7C; margin-top: 1px;">Coupé par défaut</div>')
    .replace(/<div style="width: 56px; height: 32px; border-radius: 999px; border: 1.5px solid #3E3A63; box-sizing: border-box; background: #7CC5BF; position: relative; cursor: pointer;"><div style="position: absolute; top: 3px; right: 3px;/,
      '<div data-sound role="switch" title="Son" style="width: 56px; height: 32px; border-radius: 999px; border: 1.5px solid #3E3A63; box-sizing: border-box; background: #F8F6F1; position: relative; cursor: pointer;"><div style="position: absolute; top: 3px; left: 3px; transition: left .2s;'));
  const pret = section('pret');
  s = s.replace(pret, pret.replace(/<div class="pulse"[^>]*>4<\/div>/, doneCircle));
  s = s.replace('<section class="screen" data-id="pret">', `${jeu}\n<section class="screen" data-id="pret">`);
  s = s.replace("const FLOW = ['compte', 'situation', 'besoins', 'reglages', 'pret'];", "const FLOW = ['compte', 'situation', 'besoins', 'reglages', 'jeu', 'pret'];");
  s = s.replace("function speak(text) {\n", "function speak(text) {\n  if (typeof JEU !== 'undefined' && JEU.sound !== '1') { toast('Le son est coupé'); return; }\n");
  s = s.replace("{ voiceRate = [0.75, 1, 1.25][idx]; speak('Voici ma voix.'); }", '{ voiceRate = [0.75, 1, 1.25][idx]; }');
  s = s.replace("on('[data-id=\"reglages\"] div[style*=\"width: 56px\"]', (el) => {", () =>
    `on('[data-sound]', () => { JEU.sound = JEU.sound === '1' ? '0' : '1'; paintJeu(); toast(JEU.sound === '1' ? 'Son activé' : 'Son coupé'); });
on('[data-id="jeu"] .pi', (el) => { JEU[el.dataset.g] = el.dataset.v; paintJeu(); });
on('[data-id="reglages"] div[style*="width: 56px"]:not([data-sound])', (el) => {`);
  s = s.replace('start(\'compte\');', () => `${SCRIPT}start('compte');`);
  const sec = (id) => s.match(new RegExp(`<section class="screen" data-id="${id}">[\\s\\S]*?</section>`))[0];
  const situ = sec('situation');
  const empty = situ.match(/<div class="" style="position: relative; width: 26px; height: 26px;[^>]*background: #F8F6F1;[^>]*><\/div>/)[0];
  const done = sec('besoins').match(/<div class="" style="position: relative; width: 26px; height: 26px;[^>]*background: #34475F;[^>]*>[\s\S]*?<\/svg><\/div>/)[0];
  const pulseTpl = situ.match(/<div class="pulse"[^>]*>1<\/div>/)[0];
  const stepper = (n) => [1, 2, 3, 4].map((i) => (i < n ? done : i === n ? pulseTpl.replace('>1<', `>${i}<`) : empty)).join('');
  const restep = (id, n) => { const a = sec(id); s = s.replace(a, a.replace(/(<\/svg>\n    )<div class="[^"]*" style="position: relative; width: (?:26|34)px[^\n]*/, (m, p1) => `${p1}${stepper(n)}`).replace(/Question \d sur 4/, `Question ${n} sur 4`)); };
  restep('reglages', 1);
  restep('situation', 2);
  restep('besoins', 3);
  const first = sec('situation').match(/<div class="pop" style="animation-delay: 0\.35s;"><div class="pi "[\s\S]*?Collège<\/div><\/div><\/div>/)[0];
  const prim = first.replace('Collège', 'Primaire').replace(/background: #D2E2F6/, 'background: #E4DDF5').replace(/background: #AFC8EA/, 'background: #C9BDEB').replace('rotate(-3deg)', 'rotate(2.5deg)').replace(/<svg width="24"[\s\S]*?<\/svg>/, `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3E3A63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0;">${P.school}</svg>`);
  s = s.replace(first, `${prim}${first.replace('animation-delay: 0.35s', 'animation-delay: 0.39s')}`);
  s = s.replace("const FLOW = ['compte', 'situation', 'besoins', 'reglages', 'jeu', 'pret'];", "const FLOW = ['compte', 'reglages', 'situation', 'besoins', 'jeu', 'pret'];");
  s = s.replace("if (label === 'Créer mon compte') show('situation');", "if (label === 'Créer mon compte') show('reglages');");
  s = s.replace(/(<section class="screen" data-id="reglages">)/, (m) => m);
  return s;
}
