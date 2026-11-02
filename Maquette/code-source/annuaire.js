const PROS = [
  ['Claire Durand', 'Orthophoniste', '12 rue de la Croix, Cergy', 1.4, 'Enfants et adultes', 1, 1, 1],
  ['Hugo Petit', 'Neuropsychologue', '40 avenue des Chênes, Cergy', 2.6, 'Adultes', 0, 0, 1],
  ['Sarah Benamar', 'Ergothérapeute', '8 rue du Port, Cergy', 0.9, 'Enfants', 1, 1, 0],
  ['Julie Martin', 'Orthophoniste', '3 allée des Linandes, Cergy', 0.4, 'Enfants', 1, 1, 0],
  ['Thomas Lefèvre', 'Psychomotricien', '55 boulevard de l’Oise, Cergy', 1.1, 'Enfants', 0, 0, 1],
  ['Amina Diallo', 'Orthoptiste', '20 rue de la Gare, Cergy', 1.9, 'Enfants et adultes', 1, 1, 1],
  ['Dr Paul Lemoine', 'Médecin généraliste', '7 place des Tilleuls, Cergy', 0.6, 'Enfants et adultes', 1, 1, 1],
  ['Nadia Haddad', 'Psychologue', '9 rue des Linandes, Cergy', 1.2, 'Adultes', 0, 0, 1],
  ['Élise Robert', 'Orthophoniste', '18 rue du Hazay, Cergy', 1.3, 'Adultes', 1, 1, 1],
  ['Léna Moreau', 'Ergothérapeute', '26 rue du Port, Cergy', 1.0, 'Adultes', 1, 0, 1],
  ['Centre de référence des apprentissages', 'Centre de bilan', '149 avenue de la Palette, Osny', 4.1, 'Enfants et adultes', 1, 1, 1],
  ['Sophie Blanc', 'Orthophoniste', '11 rue Saint-Martin, Pontoise', 1.7, 'Enfants', 1, 1, 1],
  ['Marc Girard', 'Neuropsychologue', '74 rue de la Croix, Cergy', 4.6, 'Enfants et adultes', 0, 0, 0],
  ['Chloé Vincent', 'Orthoptiste', '14 quai de l’Oise, Pontoise', 1.6, 'Adultes', 1, 1, 1],
].map(([name, spec, addr, dist, pub, s1, tiers, newP], i) => ({ id: i + 1, name, spec, addr, dist, pub, s1: !!s1, tiers: !!tiers, newP: !!newP, tel: `01 99 00 ${60 + i} ${12 + i * 4}` }));
const SPEC_C = { Orthophoniste: ['#B4533A', '#FBEBE5'], Neuropsychologue: ['#6552C9', '#EFEDFB'], Ergothérapeute: ['#2F7F77', '#E6F3F1'], Psychomotricien: ['#8A6412', '#FCF3DA'], Orthoptiste: ['#3B64A8', '#E9EFF8'], Psychologue: ['#6552C9', '#EFEDFB'], 'Médecin généraliste': ['#34475F', '#ECEFF3'], 'Centre de bilan': ['#3B64A8', '#E9EFF8'] };
const AN = { spec: 'Tous', q: '', f: new Set(), fav: new Set([1]) };
const FILTERS = [['s1', 'Secteur 1'], ['tiers', 'Tiers payant'], ['newP', 'Nouveaux patients'], ['fav', 'Mes favoris']];
function anRender() {
  const specs = ['Tous', ...Object.keys(SPEC_C)];
  $('#anSpecs').innerHTML = specs.map((s) => `<button class="chip${AN.spec === s ? ' on' : ''}" data-act="anSpec" data-s="${s}">${s}</button>`).join('');
  $('#anFilters').innerHTML = FILTERS.map(([k, l]) => `<button class="chip${AN.f.has(k) ? ' on' : ''}" data-act="anF" data-k="${k}">${AN.f.has(k) ? ic('check', 14, 'currentColor', 2.6) : ''}${l}</button>`).join('');
  const l = PROS.filter((p) => (AN.spec === 'Tous' || p.spec === AN.spec) && (!AN.q || `${p.name} ${p.spec} ${p.addr}`.toLowerCase().includes(AN.q)) && [...AN.f].every((k) => (k === 'fav' ? AN.fav.has(p.id) : p[k]))).sort((a, b) => a.dist - b.dist);
  $('#anCount').textContent = `${l.length} soignant${l.length > 1 ? 's' : ''} près de chez toi`;
  $('#anList').innerHTML = l.map((p) => { const [c, bg] = SPEC_C[p.spec]; return `<div class="an-card"><span class="an-ini" style="background: ${bg}; color: ${c};">${p.name.replace(/^Dr /, '').split(' ').map((x) => x[0]).join('').slice(0, 2)}</span><div class="grow"><div class="row wrap" style="gap: 8px;"><b style="font-family: var(--title); font-size: 17px;">${esc(p.name)}</b><span class="pill" style="background: ${bg}; color: ${c};">${p.spec}</span></div><p class="small muted" style="margin-top: 2px;">${esc(p.addr)} · ${String(p.dist).replace('.', ',')} km · ${p.pub}</p><div class="row wrap small" style="gap: 6px; margin-top: 8px;">${p.s1 ? '<span class="pill">Secteur 1</span>' : '<span class="pill">Secteur 2</span>'}${p.tiers ? '<span class="pill">Tiers payant</span>' : ''}${p.newP ? '<span class="pill lio">Nouveaux patients</span>' : ''}</div>
    <div class="row wrap" style="gap: 6px; margin-top: 12px;"><a class="btn sec sm" href="https://annuaire.sante.fr" target="_blank" rel="noopener">${ic('external', 15)}Prendre rendez-vous</a><button class="btn ghost sm" data-act="anCall" data-id="${p.id}">${ic('phone', 15)}Appeler</button><button class="btn ghost sm" data-act="anLio">${ic('target', 15)}Préparer avec Lio</button><button class="btn ghost sm" data-act="anMail" data-id="${p.id}">${ic('mail', 15)}Écrire</button></div></div>
    <button class="ib" data-act="anFav" data-id="${p.id}" aria-label="${AN.fav.has(p.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}" style="color: ${AN.fav.has(p.id) ? 'var(--aut)' : 'var(--mute)'};"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="${P.heart.match(/d="([^"]+)"/)[1]}" fill="${AN.fav.has(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"></path></svg></button></div>`; }).join('') || `<div class="empty"><span class="circle">${ic('search', 22)}</span><b style="color: var(--ink);">Personne ne correspond</b><span class="small">Retire un filtre pour voir plus de soignants.</span></div>`;
}
ACT.anSpec = (el) => { AN.spec = el.dataset.s; anRender(); };
ACT.anF = (el) => { const k = el.dataset.k; if (AN.f.has(k)) AN.f.delete(k); else AN.f.add(k); anRender(); };
ACT.anFav = (el) => { const id = Number(el.dataset.id); if (AN.fav.has(id)) AN.fav.delete(id); else { AN.fav.add(id); toast('Ajouté à tes favoris'); } anRender(); };
ACT.anCall = (el) => { const p = PROS.find((x) => x.id === Number(el.dataset.id)); copy(p.tel, `Numéro copié : ${p.tel}`); };
ACT.anLio = () => go('entrainer', { scenario: 'Orthophoniste' });
ACT.anMail = (el) => { const p = PROS.find((x) => x.id === Number(el.dataset.id)); go('mails', { recip: 'Soignant', goal: 'rdv', name: p.name }); };
document.addEventListener('input', (e) => { if (e.target.id === 'anSearch') { AN.q = e.target.value.trim().toLowerCase(); anRender(); } });
ENTER.annuaire = anRender;
