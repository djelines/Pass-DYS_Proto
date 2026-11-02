(() => {
  const KEY = 'passdys:cookies';
  const MAX = 182 * 86400000;
  const read = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); return v && Date.now() - v.at < MAX ? v : null; } catch (e) { return null; } };
  const save = (audience) => { try { localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), audience })); } catch (e) { return null; } return true; };
  const css = `
.ck { position: fixed; z-index: 2000; left: 20px; bottom: 20px; width: min(520px, calc(100vw - 40px)); background: var(--surf, #FFFFFF); color: var(--ink, #1D2B3A); border: 1px solid var(--line, #E7E3DB); border-radius: 22px; padding: 22px; font-family: 'Lexend', 'Segoe UI', sans-serif; font-size: 15px; line-height: 1.55; text-align: left; }
.ck h2 { margin: 0 0 8px; font-family: 'Inter Tight', 'Lexend', sans-serif; font-size: 20px; letter-spacing: -.02em; color: var(--ink, #1D2B3A); }
.ck p { margin: 0; color: var(--sub, #5E6B7C); }
.ck a { color: var(--dem, #3B64A8); text-underline-offset: 3px; }
.ck-acts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px; }
.ck-acts .ck-wide { grid-column: 1 / -1; }
.ck button { font: inherit; font-weight: 600; min-height: 48px; border-radius: 14px; cursor: pointer; border: 1.5px solid #34475F; background: transparent; color: var(--ink, #1D2B3A); padding: 0 14px; }
.ck button.ck-pri { background: #34475F; color: #FFFFFF; }
.ck button:focus-visible, .ck a:focus-visible { outline: 3px solid #3B64A8; outline-offset: 2px; }
.ck-cat { display: flex; align-items: flex-start; gap: 14px; padding: 14px 0; border-top: 1px solid var(--line, #E7E3DB); }
.ck-cat b { display: block; color: var(--ink, #1D2B3A); }
.ck-cat span.s { display: block; font-size: 13.5px; color: var(--sub, #5E6B7C); }
.ck-sw { flex-shrink: 0; width: 50px; height: 30px; border-radius: 99px; border: 0 !important; background: #C9C4BA !important; position: relative; padding: 0 !important; min-height: 0 !important; }
.ck-sw::after { content: ''; position: absolute; top: 4px; left: 4px; width: 22px; height: 22px; border-radius: 50%; background: #FFFFFF; transition: left .15s; }
.ck-sw[aria-checked="true"] { background: #2F7F77 !important; }
.ck-sw[aria-checked="true"]::after { left: 24px; }
.ck-sw:disabled { opacity: .6; cursor: not-allowed; }
@media (max-width: 600px) { .ck { left: 0; right: 0; bottom: 0; width: 100%; border-radius: 22px 22px 0 0; padding: 18px 16px calc(16px + env(safe-area-inset-bottom, 0px)); } }
`;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.append(st);
  let box = null;
  const close = () => { if (box) { box.remove(); box = null; } };
  const LEGAL = 'informations.html';
  function banner() {
    close();
    box = document.createElement('section');
    box.className = 'ck';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-labelledby', 'ckT');
    box.innerHTML = `<h2 id="ckT">Tes choix pour les cookies</h2>
      <p>Pass’Dys garde seulement ce qui sert à fonctionner : rester connecté et retenir tes réglages. Si tu es d’accord, une mesure d’audience anonyme nous aide à améliorer l’application. Jamais de publicité, jamais de pistage. <a href="${LEGAL}#cookies">En savoir plus</a></p>
      <div class="ck-acts"><button data-ck="non">Tout refuser</button><button class="ck-pri" data-ck="oui">Tout accepter</button><button class="ck-wide" data-ck="perso">Choisir moi-même</button></div>`;
    document.body.append(box);
  }
  function prefs() {
    close();
    const cur = read();
    box = document.createElement('section');
    box.className = 'ck';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-labelledby', 'ckT');
    box.innerHTML = `<h2 id="ckT">Choisir moi-même</h2>
      <div class="ck-cat"><span style="flex: 1;"><b>Nécessaires</b><span class="s">Rester connecté, garder tes réglages et tes choix. Toujours actifs : l’application ne marche pas sans.</span></span><button class="ck-sw" role="switch" aria-checked="true" aria-label="Nécessaires, toujours actifs" disabled></button></div>
      <div class="ck-cat"><span style="flex: 1;"><b>Mesure d’audience anonyme</b><span class="s">Compter les pages vues, sans savoir qui tu es. Désactivée tant que tu ne l’actives pas.</span></span><button class="ck-sw" id="ckAud" role="switch" aria-checked="${cur && cur.audience ? 'true' : 'false'}" aria-label="Mesure d’audience anonyme"></button></div>
      <div class="ck-acts"><button data-ck="non">Tout refuser</button><button class="ck-pri" data-ck="save">Enregistrer</button></div>
      <p style="margin-top: 12px; font-size: 13.5px;">On te redemandera dans 6 mois. Tu peux changer d’avis à tout moment dans les réglages.</p>`;
    document.body.append(box);
    box.querySelector('#ckAud').focus();
  }
  const say = (m) => { const t = document.getElementById('toast'); if (typeof toast === 'function') toast(m); else if (t) { t.textContent = m; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2400); } };
  document.addEventListener('click', (e) => {
    const sw = e.target.closest('#ckAud');
    if (sw) { sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); return; }
    const b = e.target.closest('[data-ck]');
    if (b) {
      const k = b.dataset.ck;
      if (k === 'perso') return prefs();
      if (k === 'oui') { save(true); close(); return say('Merci. Mesure d’audience anonyme activée.'); }
      if (k === 'non') { save(false); close(); return say('C’est noté : seulement le nécessaire.'); }
      if (k === 'save') { const on = document.getElementById('ckAud').getAttribute('aria-checked') === 'true'; save(on); close(); return say('Tes choix sont enregistrés.'); }
    }
    const open = e.target.closest('[data-act="cookies"]');
    if (open) { e.preventDefault(); prefs(); return; }
    const lg = e.target.closest('[data-legal]');
    if (lg) { e.preventDefault(); location.href = `${LEGAL}#${lg.dataset.legal}`; }
  });
  window.passdysCookies = prefs;
  const MAP = { 'Accessibilité': 'accessibilite', 'Confidentialité': 'confidentialite', Contact: 'contact', 'politique de confidentialité': 'confidentialite', 'conditions d’utilisation': 'cgu' };
  const wire = () => {
    document.querySelectorAll('span.tab, span[style*="underline"]').forEach((el) => {
      const k = MAP[el.textContent.trim()];
      if (k && !el.dataset.legal) { el.dataset.legal = k; el.setAttribute('role', 'link'); el.setAttribute('tabindex', '0'); el.style.cursor = 'pointer'; }
    });
  };
  const start = () => { wire(); if (!read()) banner(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  document.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.legal) { e.preventDefault(); e.target.click(); } });
})();
