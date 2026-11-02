const LCAT = {
  lib: ['Bibliothèques', '#3B64A8', 'library'], ortho: ['Orthophonistes', '#B4533A', 'health'], asso: ['Associations', '#6552C9', 'hands'],
  ulis: ['Dispositifs ULIS', '#8A6412', 'school'], handi: ['Services handicap', '#2F7F77', 'shield'], bilan: ['Centres de bilan', '#34475F', 'target'],
};
const HRS = { lib: ['Fermé', '10:00–19:00', '10:00–19:00', '10:00–20:00', '10:00–19:00', '10:00–18:00', '13:00–18:00'], cab: ['09:00–19:00', '09:00–19:00', '09:00–19:00', '09:00–19:00', '09:00–17:00', 'Fermé', 'Fermé'], asso: ['Fermé', '14:00–18:00', 'Fermé', '14:00–20:00', 'Fermé', '10:00–13:00', 'Fermé'], ecole: ['08:30–16:30', '08:30–16:30', '08:30–12:00', '08:30–16:30', '08:30–16:30', 'Fermé', 'Fermé'], fac: ['09:00–17:00', '09:00–17:00', '09:00–17:00', '09:00–17:00', '09:00–16:00', 'Fermé', 'Fermé'] };
const PL = [
  [1, 'Médiathèque des Tilleuls', 'lib', 49.0386, 2.0772, 4.7, 214, '2 place des Tilleuls, Cergy', 'lib', ['Livres audio', 'Format DAISY', 'Gros caractères', 'Personnel formé'], [['Inès M.', 5, 'Le rayon livres audio est super. On m’a montré comment emprunter en DAISY.'], ['Paul R.', 5, 'Salle calme parfaite pour réviser.']]],
  [2, 'Bibliothèque des Linandes', 'lib', 49.0452, 2.0573, 4.5, 98, '5 rue des Linandes, Cergy', 'lib', ['Livres audio', 'Postes avec synthèse vocale'], [['Jules D.', 5, 'Les postes avec synthèse vocale m’ont aidé pour mes fiches.']]],
  [3, 'Médiathèque des Bords de l’Oise', 'lib', 49.0498, 2.0985, 4.4, 156, '14 quai de l’Oise, Pontoise', 'lib', ['Livres audio', 'Club lecture facile'], [['Nora B.', 4, 'Le club lecture facile du mercredi est top.']]],
  [4, 'Cabinet d’orthophonie des Chênes', 'ortho', 49.0322, 2.069, 4.8, 64, '27 avenue des Chênes, Cergy', 'cab', ['Bilans adultes', 'Secteur 1', 'Tiers payant'], [['Camille T.', 5, 'Bilan adulte fait à 24 ans, très à l’écoute.']]],
  [5, 'Orthophonie du Port', 'ortho', 49.0285, 2.059, 4.6, 41, '8 rue du Port, Cergy', 'cab', ['Enfants et ados', 'Secteur 1'], [['Amadou A.', 5, 'Ma fille y va depuis un an, beaucoup de progrès.']]],
  [6, 'Cabinet des Linandes', 'ortho', 49.0466, 2.0532, 4.3, 27, '3 allée des Linandes, Cergy', 'cab', ['Adultes', 'Téléconsultation'], [['Hugo F.', 4, 'Bon suivi, trois semaines d’attente.']]],
  [7, 'Association Dys’Oise', 'asso', 49.04, 2.0812, 4.9, 132, '15 rue de la Gare, Cergy', 'asso', ['Permanence le jeudi', 'Aide au dossier MDPH', 'Groupe de parents'], [['Samir C.', 5, 'Ils m’ont aidé à remplir le dossier MDPH en une soirée.'], ['Léa A.', 5, 'On se sent compris.']]],
  [8, 'Café des parents dys', 'asso', 49.052, 2.042, 4.6, 58, '40 rue du Hazay, Cergy', 'asso', ['Rencontres le samedi'], [['Nadia C.', 5, 'Un lieu pour souffler entre parents.']]],
  [9, 'Collège des Cerisiers · ULIS', 'ulis', 49.0255, 2.041, 4.2, 19, '6 rue des Cerisiers, Vauréal', 'ecole', ['ULIS collège', 'AESH présents'], [['Karine V.', 4, 'Équipe ULIS très investie.']]],
  [10, 'École du Parc · ULIS', 'ulis', 49.056, 2.03, 4.1, 12, '22 rue du Parc, Cergy', 'ecole', ['ULIS école', 'Petits effectifs'], []],
  [11, 'Relais handicap · Campus des Chênes', 'handi', 49.0338, 2.0718, 4.4, 77, '33 boulevard du Port, Cergy', 'fac', ['Aménagements d’examens', 'Preneurs de notes'], [['Adam C.', 4, 'Réponse rapide par mail, rendez-vous dans la semaine.']]],
  [12, 'Mission handicap · Campus Saint-Martin', 'handi', 49.0507, 2.0935, 4.0, 33, '2 rue Saint-Martin, Pontoise', 'fac', ['Matériel en prêt'], [['Inès C.', 4, 'Prêt d’ordinateur pour les partiels.']]],
  [13, 'Centre de bilan adultes Saint-Christophe', 'bilan', 49.043, 2.041, 4.5, 46, '74 rue de la Croix, Cergy', 'cab', ['Bilans adultes', 'Neuropsychologie'], [['Sofia R.', 5, 'Diagnostiquée à 27 ans ici. Tout a pris du sens.']]],
  [14, 'Centre de référence des apprentissages', 'bilan', 49.0595, 2.069, 4.3, 88, '149 avenue de la Palette, Osny', 'fac', ['Bilans pluridisciplinaires', 'Enfants et adultes'], [['Amadou A.', 4, 'Long à obtenir, mais très complet.']]],
].map(([id, name, cat, lat, lng, rating, count, addr, h, feats, rev]) => ({ id, name, cat, lat, lng, rating, count, addr, h: HRS[h], feats, rev: rev.map(([a, r, t]) => ({ a, r, t })), tel: `01 99 00 ${20 + id} ${10 + id * 3}` }));
const HOME = [49.0365, 2.0745];
const LI = { cat: 'all', tab: 'tous', q: '', sel: null, fav: new Set([7]), recent: [11, 4], map: null, mk: {}, hours: false, stars: 0 };
const km = (a, b) => { const r = Math.PI / 180, x = Math.sin((b[0] - a[0]) * r / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin((b[1] - a[1]) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); };
const fkm = (d) => (d < 1 ? `${Math.round(d * 20) * 50} m` : `${d.toFixed(1).replace('.', ',')} km`);
const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
function openNow(p) {
  const n = new Date(); const di = (n.getDay() + 6) % 7; const m = n.getHours() * 60 + n.getMinutes();
  const pr = (s) => (s === 'Fermé' ? null : s.split('–').map((x) => { const [h, mm] = x.split(':').map(Number); return h * 60 + mm; }));
  const t = pr(p.h[di]);
  if (t && m >= t[0] && m < t[1]) return [true, `Ouvert · ferme à ${p.h[di].split('–')[1].replace(':', ' h ')}`];
  if (t && m < t[0]) return [false, `Fermé · ouvre à ${p.h[di].split('–')[0].replace(':', ' h ')}`];
  for (let k = 1; k < 8; k++) { const j = (di + k) % 7; if (p.h[j] !== 'Fermé') return [false, `Fermé · ouvre ${k === 1 ? 'demain' : JOURS[j]}`]; }
  return [false, 'Fermé'];
}
const stars = (r, s = 13) => Array.from({ length: 5 }, (_, i) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" style="flex-shrink:0"><path d="${P.star.match(/d="([^"]+)"/)[1]}" fill="${i < Math.round(r) ? '#E3A21A' : 'none'}" stroke="${i < Math.round(r) ? '#E3A21A' : 'var(--mute)'}" stroke-width="1.6" stroke-linejoin="round"></path></svg>`).join('');
function photo(p, h = 170) {
  const c = LCAT[p.cat][1];
  const sky = ['#DCEBF5', '#F6E7D6', '#E4EEE3'][p.id % 3];
  const w = 380;
  const win = Array.from({ length: 4 }, (_, i) => `<rect x="${84 + i * 57}" y="${h * .34}" width="34" height="${h * .15}" rx="3" fill="#BFD3E2"></rect><rect x="${84 + i * 57}" y="${h * .56}" width="34" height="${h * .15}" rx="3" fill="#BFD3E2"></rect>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="${w}" height="${h}" fill="${sky}"></rect><circle cx="${w * .88}" cy="${h * .18}" r="${h * .08}" fill="#FBE7A1"></circle><rect x="${w * .14}" y="${h * .22}" width="${w * .72}" height="${h * .66}" fill="#F4EDE1"></rect>${win}<rect x="${w * .14}" y="${h * .14}" width="${w * .72}" height="${h * .09}" rx="4" fill="${c}"></rect><rect x="${w * .45}" y="${h * .66}" width="${w * .1}" height="${h * .22}" rx="3" fill="${c}"></rect><rect y="${h * .88}" width="${w}" height="${h * .12}" fill="#CFC9BD"></rect><circle cx="${w * .06}" cy="${h * .8}" r="${h * .12}" fill="#9CC59A"></circle><circle cx="${w * .95}" cy="${h * .82}" r="${h * .1}" fill="#9CC59A"></circle></svg>`;
}
function liData() {
  let l = PL.map((p) => ({ ...p, d: km(HOME, [p.lat, p.lng]) }));
  if (LI.tab === 'fav') l = l.filter((p) => LI.fav.has(p.id));
  if (LI.tab === 'rec') l = LI.recent.map((id) => l.find((p) => p.id === id)).filter(Boolean);
  if (LI.cat !== 'all') l = l.filter((p) => p.cat === LI.cat);
  if (LI.q) l = l.filter((p) => `${p.name} ${p.addr} ${LCAT[p.cat][0]}`.toLowerCase().includes(LI.q));
  return LI.tab === 'rec' ? l : l.sort((a, b) => a.d - b.d);
}
function liPanel() {
  const l = liData();
  const head = `<div class="mp-head"><div class="row"><div class="grow"><h2 style="font-size: 23px;">Autour de moi</h2><span class="small muted">${l.length} lieu${l.length > 1 ? 'x' : ''}</span></div><button class="ib" data-act="mpToggle" aria-label="Masquer le panneau" title="Masquer le panneau">${ic('sidebar')}</button></div>
    <label class="mp-search">${ic('search', 18)}<input id="mpQ" placeholder="Rechercher un lieu, une adresse…" value="${esc(LI.q)}" aria-label="Rechercher"></label>
    <div class="mp-tabs">${[['tous', 'Tous'], ['fav', 'Favoris'], ['rec', 'Récents']].map(([k, t]) => `<button class="${LI.tab === k ? 'on' : ''}" data-act="mpTab" data-t="${k}">${t}</button>`).join('')}</div>
    <div class="chips"><button class="chip${LI.cat === 'all' ? ' on' : ''}" data-act="mpCat" data-c="all">${ic('grid', 15)}Tout afficher</button>${Object.entries(LCAT).map(([k, [t, , i]]) => `<button class="chip${LI.cat === k ? ' on' : ''}" data-act="mpCat" data-c="${k}">${ic(i, 15)}${t}</button>`).join('')}</div></div>`;
  let body;
  const p = LI.sel && PL.find((x) => x.id === LI.sel);
  if (p) {
    const [o, ot] = openNow(p);
    const di = (new Date().getDay() + 6) % 7;
    body = `<div class="mp-list"><div class="pl-photo">${photo(p)}<button class="ib" data-act="mpBack" aria-label="Retour à la liste" style="position: absolute; left: 12px; top: 12px; background: var(--surf); border-radius: 50%; width: 38px; height: 38px;">${ic('left', 18)}</button></div>
      <div style="padding: 16px 16px 4px;"><h3 style="font-size: 21px;">${esc(p.name)}</h3><div class="row small" style="gap: 6px; margin-top: 4px;"><b>${String(p.rating).replace('.', ',')}</b><span class="row" style="gap: 1px;">${stars(p.rating)}</span><span class="muted">(${p.count})</span></div><div class="small muted">${LCAT[p.cat][0]} · ${fkm(km(HOME, [p.lat, p.lng]))}</div></div>
      <div class="pl-acts"><a class="pl-act" href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}" target="_blank" rel="noopener"><span class="c" style="background: var(--navy); border-color: var(--navy); color: var(--onnavy);">${ic('nav', 18)}</span>Itinéraire</a><button class="pl-act" data-act="mpFav"><span class="c" style="${LI.fav.has(p.id) ? 'color: var(--lio); border-color: var(--lio);' : ''}">${ic('bookmark', 18)}</span>${LI.fav.has(p.id) ? 'Enregistré' : 'Enregistrer'}</button><button class="pl-act" data-act="mpShare"><span class="c">${ic('share', 18)}</span>Partager</button><button class="pl-act" data-act="mpCall"><span class="c">${ic('phone', 18)}</span>Appeler</button></div>
      <div class="pl-row">${ic('pin', 18, 'var(--aut)')}<span>${esc(p.addr)}</span></div>
      <button class="pl-row" data-act="mpHours" style="width: 100%; text-align: left;">${ic('clock', 18, 'var(--aut)')}<span class="grow"><b style="color: ${o ? 'var(--ok)' : 'var(--bad)'}; font-weight: 600;">${ot.split(' · ')[0]}</b> · ${ot.split(' · ')[1] || ''}</span>${ic(LI.hours ? 'up' : 'down', 16)}</button>
      ${LI.hours ? `<div style="padding: 0 16px 8px 48px;">${JOURS.map((j, i) => `<div class="row small" style="justify-content: space-between; ${i === di ? 'font-weight: 700;' : ''}"><span>${j.charAt(0).toUpperCase() + j.slice(1)}</span><span>${p.h[i].replace(/:/g, ' h ').replace('–', ' – ')}</span></div>`).join('')}</div>` : ''}
      <div class="pl-row">${ic('phone', 18, 'var(--aut)')}<span>${p.tel}</span></div>
      <div style="padding: 8px 16px 14px;"><div class="row wrap" style="gap: 6px;">${p.feats.map((f) => `<span class="pill lio">${esc(f)}</span>`).join('')}</div></div>
      <div style="padding: 14px 16px; border-top: 1px solid var(--line2);"><div class="row"><b class="grow">Avis</b><button class="btn ghost sm" data-act="mpWrite">${ic('edit', 15)}Écrire un avis</button></div>
        <div id="mpForm" hidden style="margin-top: 10px;"><div class="row" style="gap: 2px;" id="mpStars">${[1, 2, 3, 4, 5].map((n) => `<button data-act="mpStar" data-n="${n}" aria-label="${n} étoile${n > 1 ? 's' : ''}">${stars(n <= LI.stars ? 5 : 0, 26).split('</svg>')[n - 1]}</svg></button>`).join('')}</div><textarea class="field" id="mpTxt" placeholder="Ce qui t’a aidé" style="min-height: 80px; margin-top: 8px;"></textarea><button class="btn pri sm" data-act="mpPub" style="margin-top: 8px;">Publier</button></div>
        ${p.rev.map((r) => `<div style="margin-top: 14px;"><div class="row small" style="gap: 8px;"><span class="av" style="background: #D2E2F6;">${r.a.split(' ').map((x) => x[0]).join('')}</span><b>${esc(r.a)}</b><span class="row" style="gap: 1px;">${stars(r.r, 12)}</span></div><p class="small" style="margin-top: 6px;">${esc(r.t)}</p></div>`).join('') || '<p class="small muted" style="margin-top: 8px;">Pas encore d’avis.</p>'}</div>
      <p class="tiny mute" style="padding: 0 16px 16px;">Données fictives de démonstration.</p></div>`;
  } else {
    body = `<div class="mp-list">${l.map((x) => { const [o, ot] = openNow(x); return `<button class="mp-item" data-act="mpSel" data-id="${x.id}" data-hov="${x.id}"><span class="mp-ico" style="background: ${LCAT[x.cat][1]};">${ic(LCAT[x.cat][2], 19, '#fff', 2)}</span><span class="grow"><b style="font-weight: 600; display: block;">${esc(x.name)}</b><span class="small muted">${LCAT[x.cat][0]} · ${fkm(x.d)}</span><span class="row small" style="gap: 6px; margin-top: 2px;"><span style="color: ${o ? 'var(--ok)' : 'var(--bad)'}; font-weight: 600;">${ot.split(' · ')[0]}</span><span class="muted">· ${String(x.rating).replace('.', ',')}</span>${ic('star', 13, '#E3A21A')}</span></span>${LI.fav.has(x.id) ? ic('bookmark', 16, 'var(--lio)') : ''}</button>`; }).join('') || `<div class="empty"><span class="circle">${ic('map', 24)}</span><b style="color: var(--ink);">Aucun résultat</b><span class="small">Aucun lieu ne correspond à ces critères.</span></div>`}</div>`;
  }
  $('#mpPanel').innerHTML = `<button class="mp-grab" data-act="mpGrab" aria-label="Agrandir ou réduire la liste"><i></i></button>${head}${body}`;
  liMarkers();
}
function liMarkers() {
  if (!LI.map) return;
  Object.values(LI.mk).forEach((m) => m.remove());
  LI.mk = {};
  liData().forEach((p) => {
    const sel = p.id === LI.sel;
    const m = L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', html: `<div class="pin${sel ? ' sel' : ''}" style="background: ${LCAT[p.cat][1]};">${ic(LCAT[p.cat][2], 16, '#fff', 2.2)}</div>`, iconSize: [34, 34], iconAnchor: [17, 17] }), title: p.name, riseOnHover: true, zIndexOffset: sel ? 1000 : 0 }).addTo(LI.map);
    m.bindTooltip(p.name, { direction: 'top', offset: [0, -16] });
    m.on('click', () => liSelect(p.id));
    LI.mk[p.id] = m;
  });
}
function liSelect(id) {
  LI.sel = id; LI.hours = false; LI.stars = 0;
  LI.recent = [id, ...LI.recent.filter((x) => x !== id)].slice(0, 6);
  $('#mpPanel').classList.remove('closed');
  if (innerWidth <= 600) $('#mpPanel').classList.add('full');
  $('.mp-open').hidden = true;
  const p = PL.find((x) => x.id === id);
  const off = innerWidth > 760 ? [0, -0.012] : [-0.006, 0];
  if (LI.map) LI.map.flyTo([p.lat + off[0], p.lng + off[1]], Math.max(LI.map.getZoom(), 14.5), { duration: 0.6 });
  liPanel();
}
ENTER.lieux = () => {
  liPanel();
  if (LI.map) { setTimeout(() => LI.map.invalidateSize(), 50); return; }
  if (!window.L) { $('#map').innerHTML = '<p class="muted" style="padding: 40px 40px 40px 420px;">La carte n’a pas pu se charger.</p>'; return; }
  const bounds = L.latLngBounds([49.005, 1.985], [49.075, 2.125]);
  LI.map = L.map('map', { zoomControl: false, minZoom: innerWidth > 900 ? 14 : 13, maxZoom: 17, maxBounds: bounds, maxBoundsViscosity: 1, zoomSnap: 0.5 }).setView([49.04, innerWidth > 760 ? 2.058 : 2.072], 14);
  L.tileLayer('tuiles/{z}/{x}/{y}.png', { minZoom: 13, maxZoom: 17, maxNativeZoom: 15, bounds, attribution: '© les contributeurs d’OpenStreetMap' }).addTo(LI.map);
  L.control.zoom({ position: 'topright', zoomInTitle: 'Zoomer', zoomOutTitle: 'Dézoomer' }).addTo(LI.map);
  LI.map.attributionControl.setPrefix('Leaflet');
  L.marker(HOME, { icon: L.divIcon({ className: '', html: '<div class="pin-me"></div>', iconSize: [20, 20], iconAnchor: [10, 10] }), keyboard: false }).addTo(LI.map).bindTooltip('Toi', { direction: 'top', offset: [0, -10] });
  setTimeout(() => LI.map.invalidateSize(), 80);
  liMarkers();
};
ACT.mpSel = (el) => liSelect(Number(el.dataset.id));
ACT.mpGrab = () => $('#mpPanel').classList.toggle('full');
ACT.mpBack = () => { if (innerWidth <= 600) $('#mpPanel').classList.remove('full'); LI.sel = null; liPanel(); };
ACT.mpTab = (el) => { LI.tab = el.dataset.t; LI.sel = null; liPanel(); };
ACT.mpCat = (el) => { LI.cat = el.dataset.c; LI.sel = null; liPanel(); };
ACT.mpToggle = () => { const p = $('#mpPanel'); const closed = !p.classList.contains('closed'); p.classList.toggle('closed', closed); $('.mp-open').hidden = !closed || innerWidth <= 760; };
ACT.mpFav = () => { const id = LI.sel; if (LI.fav.has(id)) { LI.fav.delete(id); toast('Retiré de tes favoris'); } else { LI.fav.add(id); addXp(5, 'lieu enregistré'); } liPanel(); };
ACT.mpShare = () => { const p = PL.find((x) => x.id === LI.sel); copy(`${p.name}, ${p.addr}`, 'Adresse copiée'); };
ACT.mpCall = () => { const p = PL.find((x) => x.id === LI.sel); copy(p.tel, `Numéro copié : ${p.tel}`); };
ACT.mpHours = () => { LI.hours = !LI.hours; liPanel(); };
ACT.mpWrite = () => { const f = $('#mpForm'); f.hidden = !f.hidden; };
ACT.mpStar = (el) => { LI.stars = Number(el.dataset.n); $$('#mpStars button').forEach((b, i) => { b.innerHTML = stars(i < LI.stars ? 5 : 0, 26).split('</svg>')[i] + '</svg>'; }); };
ACT.mpPub = () => { if (!LI.stars) return toast('Choisis une note de 1 à 5 étoiles'); const p = PL.find((x) => x.id === LI.sel); p.rev.unshift({ a: `${PROFIL.prenom} ${PROFIL.nom[0]}.`, r: LI.stars, t: $('#mpTxt').value.trim() || 'Lieu utile.' }); p.count++; liPanel(); addXp(10, 'avis publié'); };
document.addEventListener('input', (e) => { if (e.target.id === 'mpQ') { LI.q = e.target.value.trim().toLowerCase(); const pos = e.target.selectionStart; LI.sel = null; liPanel(); const n = $('#mpQ'); n.focus(); n.setSelectionRange(pos, pos); } });
document.addEventListener('mouseover', (e) => { const h = e.target.closest && e.target.closest('[data-hov]'); if (!h || !LI.mk[h.dataset.hov]) return; LI.mk[h.dataset.hov].openTooltip(); });
