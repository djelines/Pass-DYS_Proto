const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ic = (n, s = 20, c = 'currentColor', w = 1.9) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;stroke:${c}">${P[n]}</svg>`;
const DAY = 86400000;
const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const inDays = (n) => new Date(today0().getTime() + n * DAY);
const relDay = (d) => { const n = Math.round((d - today0()) / DAY); if (n === 0) return 'aujourd’hui'; if (n === 1) return 'demain'; if (n === -1) return 'hier'; if (n > 1 && n < 7) return `dans ${n} jours`; if (n < 0) return `il y a ${-n} jours`; return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); };
const store = {
  get(k, d) { try { const v = localStorage.getItem(`passdys:${k}`); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(`passdys:${k}`, JSON.stringify(v)); } catch (e) { return null; } return v; },
};

let toastT;
function toast(msg, xp = false) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.toggle('xp', xp);
  t.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('on'), 2600);
}
function copy(text, msg) {
  const done = () => toast(msg);
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
}

let voiceRate = 0.92;
function speak(text) {
  if (!SET.sound) { toast('Le son est coupé. Réactive-le avec le bouton en haut.'); return; }
  if (!('speechSynthesis' in window)) { toast('La lecture à voix haute n’est pas disponible ici'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'fr-FR';
  u.rate = voiceRate;
  speechSynthesis.speak(u);
}

const ACT = {};
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = ACT[el.dataset.act];
  if (!fn) return;
  if (el.tagName === 'A' || el.type === 'submit') e.preventDefault();
  fn(el, e);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"], [role="checkbox"], [role="switch"]')) { e.preventDefault(); e.target.click(); }
});

let lastFocus = null;
function modal(html) {
  const had = $('.overlay');
  closeModal(true);
  if (!had) lastFocus = document.activeElement;
  const o = document.createElement('div');
  o.className = 'overlay';
  o.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  o.addEventListener('mousedown', (e) => { if (e.target === o) closeModal(); });
  document.body.append(o);
  const h = $('.modal h2', o);
  if (h) { h.id = h.id || 'mdT'; $('.modal', o).setAttribute('aria-labelledby', h.id); }
  const f = $('input, textarea, select', o) || $('button:not([data-act="close"])', o) || $('button', o);
  if (f) setTimeout(() => f.focus(), 40);
  return o;
}
function closeModal(keep) {
  const had = $$('.overlay').length;
  $$('.overlay').forEach((o) => o.remove());
  if (had && !keep && lastFocus && document.contains(lastFocus)) { lastFocus.focus(); lastFocus = null; }
}
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const m = $('.overlay .modal');
  if (!m) return;
  const items = $$('a[href], button:not([disabled]), input, textarea, select, [tabindex="0"]', m).filter((x) => x.offsetParent !== null);
  if (!items.length) return;
  const first = items[0]; const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } else if (!m.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
});
ACT.close = () => closeModal();
const mHead = (t) => `<div class="modal-h"><h2>${t}</h2><button class="ib" data-act="close" aria-label="Fermer">${ic('x')}</button></div>`;

const SET_DEF = { font: 'lexend', size: '1', space: '1', fond: 'creme', hc: false, theme: 'auto', calm: false, voice: '0.92', game: true, notif: true, mail: false, sound: true, guide: 'off', links: false, cursor: false };
const SET = { ...SET_DEF, ...store.get('reglages', {}) };
const FONT_STACK = { dys: "'OpenDyslexic', 'Lexend', sans-serif", lexend: "'Lexend', 'Segoe UI', sans-serif", atkinson: "'Atkinson Hyperlegible', 'Segoe UI', sans-serif", andika: "'Andika', 'Segoe UI', sans-serif", system: "system-ui, -apple-system, 'Segoe UI', sans-serif" };
const FOND = { creme: '#F7F6F2', bleu: '#E7EFF8', jaune: '#FBF3D6', gris: '#ECECEA' };
const isDark = () => SET.theme === 'dark' || (SET.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
function applySettings() {
  const r = document.documentElement;
  r.style.setProperty('--font', FONT_STACK[SET.font] || FONT_STACK.lexend);
  r.style.setProperty('--zoom', SET.size);
  r.classList.toggle('sp2', SET.space === '2');
  r.classList.toggle('sp3', SET.space === '3');
  if (SET.theme === 'auto') delete r.dataset.theme; else r.dataset.theme = SET.theme;
  if (!isDark() && SET.fond !== 'creme') r.style.setProperty('--bg', FOND[SET.fond]); else r.style.removeProperty('--bg');
  r.classList.toggle('hc', !!SET.hc);
  r.classList.toggle('calm', !!SET.calm);
  r.classList.toggle('nogame', !SET.game);
  r.classList.toggle('dysfont', SET.font === 'dys');
  r.classList.toggle('links-u', !!SET.links);
  r.classList.toggle('big-cursor', !!SET.cursor);
  guideMode(SET.guide);
  voiceRate = Number(SET.voice);
  $$('[data-act="sound"]').forEach((b) => { b.innerHTML = ic(SET.sound ? 'volume' : 'volx'); b.title = SET.sound ? 'Couper le son' : 'Remettre le son'; b.setAttribute('aria-label', b.title); });
  if (!SET.sound && 'speechSynthesis' in window) speechSynthesis.cancel();
  $$('[data-act="theme"]').forEach((b) => { b.innerHTML = `${ic(isDark() ? 'sun' : 'moon', 18)}${isDark() ? 'Mode clair' : 'Mode sombre'}`; });
  store.set('reglages', SET);
}
let guideEl = null;
let guideY = innerHeight / 3;
function guideMode(mode) {
  if (guideEl) { guideEl.remove(); guideEl = null; }
  if (mode !== 'regle' && mode !== 'masque') return;
  guideEl = document.createElement('div');
  guideEl.className = `rguide ${mode}`;
  guideEl.setAttribute('aria-hidden', 'true');
  guideEl.innerHTML = '<i class="rg-a"></i><i class="rg-band"></i><i class="rg-b"></i>';
  document.body.append(guideEl);
  placeGuide(guideY);
}
function placeGuide(y) {
  guideY = y;
  if (!guideEl) return;
  const h = Math.round(parseFloat(getComputedStyle(document.body).fontSize) * 2.6);
  const top = Math.max(0, y - h / 2);
  guideEl.style.setProperty('--gt', `${top}px`);
  guideEl.style.setProperty('--gh', `${h}px`);
}
addEventListener('pointermove', (e) => { if (guideEl) placeGuide(e.clientY); }, { passive: true });
addEventListener('touchmove', (e) => { if (guideEl && e.touches[0]) placeGuide(e.touches[0].clientY); }, { passive: true });
function setSetting(k, v) { SET[k] = v; applySettings(); if (typeof paintSettings === 'function') paintSettings(); }
ACT.sound = () => { setSetting('sound', !SET.sound); toast(SET.sound ? 'Son activé' : 'Son coupé'); };
ACT.theme = () => setSetting('theme', isDark() ? 'light' : 'dark');
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySettings);
applySettings();

const PROFIL = { prenom: 'Adam', nom: 'Charfi', etape: 'etudes', diff: ['lire', 'ecrire'], ...store.get('profil', {}) };
$$('.who').forEach((e) => { e.textContent = PROFIL.prenom; });
$$('.who-full').forEach((e) => { e.textContent = `${PROFIL.prenom} ${PROFIL.nom}`; });
