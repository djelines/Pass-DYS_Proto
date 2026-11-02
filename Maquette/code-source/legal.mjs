import { ic, logo } from './icons.mjs';

const SECTIONS = [
  ['mentions', 'Mentions légales', 'file'],
  ['cgu', 'Conditions d’utilisation', 'check'],
  ['cgv', 'Conditions de vente', 'card'],
  ['confidentialite', 'Confidentialité et RGPD', 'shield'],
  ['cookies', 'Cookies', 'settings'],
  ['accessibilite', 'Accessibilité (RGAA)', 'eye'],
  ['ethique', 'Éco-conception et éthique', 'heart'],
  ['contact', 'Contact', 'mail'],
];
const sec = (id, title, body) => `<section class="lg-sec" id="${id}" aria-labelledby="${id}-t"><h2 id="${id}-t">${title}</h2>${body}</section>`;
const box = (t, body) => `<div class="lg-box"><b>${t}</b>${body}</div>`;

export const legalBody = (w) => `
<a class="skip" href="#lgMain">Aller au contenu</a>
<header class="topbar"><a class="brand" href="index.html" aria-label="Pass’Dys, retour au site">${logo(30)}<span>Pass’Dys</span></a><span class="tb-space"></span><a class="btn ghost sm" href="application.html#accueil">${ic('left', 16)}Retour à l’application</a></header>
<div class="lg-wrap">
  <nav class="lg-toc" aria-label="Sommaire"><p class="lbl">Sommaire</p>${SECTIONS.map(([id, t, i]) => `<a href="#${id}">${ic(i, 18)}${t}</a>`).join('')}<button class="btn sec full" data-act="cookies" style="margin-top: 14px;">${ic('settings', 18)}Gérer mes cookies</button></nav>
  <main class="lg-main" id="lgMain" tabindex="-1">
    <h1 class="t1">Informations légales</h1>
    <p class="lead">Tout ce qu’il faut savoir sur Pass’Dys, écrit simplement. Mise à jour le 7 octobre 2026.</p>
    <p class="lg-note">${ic('alert', 18)}<span>Pass’Dys est un prototype de projet de fin d’études. Les personnes, lieux et documents affichés sont fictifs. Les éléments entre crochets seront complétés à la mise en ligne.</span></p>

    ${sec('mentions', 'Mentions légales', `
      ${box('Éditrice', '<p>Pass’Dys, projet de fin d’études réalisé par Inès Charfi dans le cadre du Bachelor Concepteur Développeur d’Applications.</p><p>Directrice de la publication : Inès Charfi.</p><p>Contact : contact@passdys.fr</p>')}
      ${box('Hébergement', '<p>[Nom, adresse et téléphone de l’hébergeur, à compléter à la mise en ligne.] Les données de santé seront confiées à un hébergeur certifié HDS (Hébergeur de Données de Santé).</p>')}
      ${box('Propriété et crédits', '<p>Textes, illustrations et personnage de Lio : © 2026 Pass’Dys.</p><ul><li>Fond de carte : © les contributeurs d’OpenStreetMap, licence ODbL.</li><li>Carte interactive : Leaflet, licence BSD.</li><li>Polices : Lexend, Atkinson Hyperlegible, Andika, Inter Tight, Caveat (Google Fonts) et OpenDyslexic, toutes sous licence libre SIL OFL.</li></ul>')}`)}

    ${sec('cgu', 'Conditions générales d’utilisation', `
      <p>En créant ton compte, tu acceptes ces conditions. Elles expliquent ce que Pass’Dys fait pour toi, et ce que tu t’engages à faire.</p>
      ${box('1. À quoi sert Pass’Dys', '<p>Pass’Dys t’aide dans tes démarches liées à un trouble dys : aménagements, dossiers, rendez-vous, documents, carte de besoins. Lio, le compagnon, aide à lire, écrire, calculer, reformuler et s’organiser.</p>')}
      ${box('2. Ce que Pass’Dys ne fait pas', '<ul><li>Pass’Dys ne pose aucun diagnostic et ne remplace pas un professionnel de santé.</li><li>Lio peut se tromper : relis toujours un mail avant de l’envoyer.</li><li>Les démarches officielles se font sur les sites officiels (MDPH, service-public.fr). Pass’Dys t’y prépare.</li></ul>')}
      ${box('3. Ton compte', '<p>L’inscription est gratuite. Tu choisis un mot de passe d’au moins 8 caractères et tu le gardes pour toi. Avant 15 ans, un parent doit donner son accord.</p>')}
      ${box('4. Partager avec tes proches', '<p>Tu choisis qui voit chaque démarche et chaque document. Tu peux retirer un accès à tout moment, et il s’arrête tout de suite.</p>')}
      ${box('5. Bonne conduite', '<p>Tu n’ajoutes que des documents qui te concernent, ou concernent ton enfant si tu es parent. Tu ne détournes pas le service.</p>')}
      ${box('6. Changements', '<p>Si ces conditions changent, tu es prévenu dans l’application avant qu’elles ne s’appliquent.</p>')}
      ${box('7. Droit applicable', '<p>Le droit français s’applique. En cas de désaccord, on cherche d’abord une solution à l’amiable.</p>')}`)}

    ${sec('cgv', 'Conditions générales de vente', `
      <p>Pass’Dys est <b>entièrement gratuit</b> : il n’y a rien à acheter, donc pas de paiement, pas d’abonnement et pas de données bancaires.</p>
      <p>Si une offre payante existe un jour, ses conditions de vente (prix, droit de rétractation de 14 jours, remboursement) seront publiées ici avant toute commande.</p>`)}

    ${sec('confidentialite', 'Politique de confidentialité (RGPD)', `
      ${box('Qui est responsable de tes données', '<p>Pass’Dys, représenté par Inès Charfi. Pour toute question : dpo@passdys.fr</p>')}
      ${box('Ce qu’on garde', '<ul><li>Ton compte : prénom, e-mail, mot de passe chiffré.</li><li>Ta situation (école, études, travail) et tes besoins. <b>Jamais de diagnostic.</b></li><li>Tes démarches, tâches et rendez-vous.</li><li>Les documents de ton coffre, chiffrés.</li><li>Tes réglages d’affichage, gardés sur ton appareil.</li></ul>')}
      ${box('Pourquoi', '<p>Uniquement pour faire marcher le service que tu utilises. Rien n’est vendu, rien ne sert à la publicité.</p>')}
      ${box('Données de santé', '<p>Un bilan ou un certificat peut contenir des informations de santé. Elles ne sont gardées qu’avec ton accord explicite, donné quand tu ajoutes le document, et tu peux le retirer en supprimant le document.</p>')}
      ${box('Qui les voit', '<p>Toi, et seulement les personnes que tu autorises, document par document. Le journal des accès, dans les réglages, montre qui a consulté quoi et quand.</p>')}
      ${box('Combien de temps', '<ul><li>Tant que ton compte est actif.</li><li>Effacées après 3 ans sans connexion, avec un message avant.</li><li>Les liens de ta carte de besoins expirent seuls : 24 heures, 7 jours ou 30 jours.</li></ul>')}
      ${box('Lio', '<p>Quand tu parles à Lio, il ne reçoit ni ton profil ni tes documents : seulement le texte que tu lui donnes.</p>')}
      ${box('Tes droits', '<p>Tu peux voir, corriger, exporter ou effacer tes données, et t’opposer à leur utilisation :</p><ul><li>Réglages, puis « Exporter mes données » ou « Supprimer mon compte » ;</li><li>ou par e-mail à dpo@passdys.fr. On répond sous un mois.</li></ul><p>Si tu n’es pas satisfait, tu peux saisir la CNIL sur cnil.fr.</p>')}`)}

    ${sec('cookies', 'Cookies', `
      <p>Pass’Dys ne dépose aucun cookie de publicité ni de pistage. Voici tout ce qui est enregistré dans ton navigateur :</p>
      <div class="lg-table" role="region" aria-label="Liste des éléments enregistrés" tabindex="0"><table><thead><tr><th scope="col">Nom</th><th scope="col">À quoi ça sert</th><th scope="col">Durée</th><th scope="col">Ton accord</th></tr></thead><tbody>
        <tr><td>passdys:reglages</td><td>Retenir tes réglages : police, taille, thème, son</td><td>Jusqu’à ce que tu les effaces</td><td>Pas besoin, nécessaire</td></tr>
        <tr><td>passdys:profil</td><td>Afficher ton prénom</td><td>Jusqu’à ta déconnexion</td><td>Pas besoin, nécessaire</td></tr>
        <tr><td>passdys:cookies</td><td>Retenir tes choix sur cette page</td><td>6 mois</td><td>Pas besoin, nécessaire</td></tr>
        <tr><td>Mesure d’audience</td><td>Compter les pages vues, de façon anonyme</td><td>13 mois maximum</td><td>Oui, désactivée par défaut</td></tr>
      </tbody></table></div>
      <button class="btn pri" data-act="cookies">${ic('settings', 18)}Gérer mes choix</button>`)}

    ${sec('accessibilite', 'Déclaration d’accessibilité', `
      <p>Pass’Dys s’engage à rendre son application accessible, conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005. Cette déclaration s’applique à l’application Pass’Dys, sur ordinateur, tablette et téléphone.</p>
      ${box('État de conformité', '<p><b>Non conforme</b> au RGAA 4.1 : aucun audit officiel n’a encore été réalisé. Cette déclaration repose sur une auto-évaluation du prototype. Un audit est prévu avant la mise en ligne.</p>')}
      ${box('Ce qui est déjà en place', '<ul><li>Lien « Aller au contenu » au début de chaque page.</li><li>Navigation complète au clavier, avec un contour visible sur l’élément actif. Échap ferme les fenêtres.</li><li>Fenêtres qui gardent le focus et le rendent à la fermeture.</li><li>Étiquettes pour lecteur d’écran sur les boutons, interrupteurs et icônes. Titre de page qui change à chaque écran.</li><li>Taille du texte et espacement réglables dans l’application, en plus du zoom du navigateur. Aucune information donnée par la couleur seule.</li><li>Polices adaptées aux dys, dont OpenDyslexic, règle et masque de lecture, liens soulignés, grand curseur.</li><li>Animations réduites à la demande, et le réglage de l’appareil est respecté.</li><li>Aucun son ni lecture automatique. Thème clair, sombre et contraste renforcé.</li><li>Zones à toucher d’au moins 44 pixels sur téléphone.</li></ul>')}
      ${box('Contenus pas encore accessibles', '<ul><li>La carte interactive : la liste des lieux et l’annuaire donnent les mêmes informations sans la carte.</li><li>Le glisser-déposer du tableau des démarches : les flèches de chaque carte, la vue Liste et le choix de la colonne dans la fiche font la même chose.</li><li>Le QR code de la carte de besoins : un lien à copier le remplace.</li><li>La dictée vocale est simulée dans le prototype.</li></ul>')}
      ${box('Établissement de cette déclaration', `<p>Établie le 7 octobre 2026. Technologies utilisées : HTML, CSS, JavaScript. Tests prévus avec les lecteurs d’écran NVDA (Windows), VoiceOver (macOS et iPhone) et TalkBack (Android).</p>`)}
      ${box('Signaler un problème', '<p>Si tu n’arrives pas à accéder à un contenu ou à un service, écris à accessibilite@passdys.fr. On te répond, et on te propose une autre façon d’y accéder.</p>')}
      ${box('Voies de recours', '<p>Si tu nous as signalé un problème et que la réponse ne te convient pas, tu peux contacter le Défenseur des droits :</p><ul><li>par le formulaire en ligne sur defenseurdesdroits.fr ;</li><li>par téléphone au 09 69 39 00 00 ;</li><li>auprès d’un délégué près de chez toi ;</li><li>par courrier, gratuit, sans timbre : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07.</li></ul>')}`)}

    ${sec('ethique', 'Éco-conception et éthique', `
      ${box('Sobriété', `<ul><li>L’application pèse ${w.app}, l’inscription ${w.insc} et le site ${w.site}, chacun sous le seuil d’1 Mo.</li><li>Aucune photo ni vidéo : les icônes et illustrations sont dessinées dans le code.</li><li>La carte ne charge que les environs de Cergy.</li><li>Le coffre affiche l’espace utilisé.</li></ul>`)}
      ${box('Outils libres', '<p>La carte utilise Leaflet et OpenStreetMap, deux projets libres, plutôt qu’un service fermé.</p>')}
      ${box('Respect de ton attention', '<ul><li>Points et niveaux désactivables : version simple, sans points ni niveaux.</li><li>Rappels dans l’application et par e-mail réglables séparément.</li><li>Pas de défilement sans fin, pas de notification pour te faire revenir.</li></ul>')}
      ${box('Inclusion', '<p>Pass’Dys est pensé pour les personnes dys et leurs proches : écrit court, une idée par phrase, formulaires en étapes, carte de besoins sans diagnostic.</p>')}`)}

    ${sec('contact', 'Contact', `<ul class="lg-contact"><li>${ic('mail', 18)}Question générale : contact@passdys.fr</li><li>${ic('shield', 18)}Données personnelles : dpo@passdys.fr</li><li>${ic('eye', 18)}Accessibilité : accessibilite@passdys.fr</li></ul>`)}
  </main>
</div>`;

export const legalCss = `
.skip { position: absolute; left: 12px; top: -60px; z-index: 3000; background: #34475F; color: #fff; padding: 12px 18px; border-radius: 12px; font-weight: 600; text-decoration: none; }
.skip:focus { top: 12px; }
.lg-wrap { max-width: 1160px; margin: 0 auto; padding: 32px max(16px, 3vw) 80px; display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 40px; align-items: start; }
.lg-toc { position: sticky; top: calc(var(--top-h) + 20px); display: flex; flex-direction: column; gap: 2px; }
.lg-toc a { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 12px; border-radius: 12px; color: var(--ink); text-decoration: none; font-weight: 500; font-size: 15px; }
.lg-toc a:hover, .lg-toc a.on { background: var(--surf2); }
.lg-main { max-width: 760px; min-width: 0; outline: none; }
.lg-main .lead { margin-top: 8px; }
.lg-note { display: flex; gap: 12px; align-items: flex-start; margin: 22px 0 6px; padding: 14px 16px; border-radius: 16px; background: var(--car-bg); color: var(--ink); font-size: 15px; }
.lg-note svg { color: var(--car); margin-top: 3px; }
.lg-sec { padding-top: 34px; scroll-margin-top: calc(var(--top-h) + 10px); }
.lg-sec h2 { font-size: 26px; margin-bottom: 14px; }
.lg-sec p { margin: 0 0 10px; line-height: 1.65; max-width: 68ch; }
.lg-sec ul { margin: 6px 0 4px; padding-left: 20px; line-height: 1.65; }
.lg-sec li { margin-bottom: 6px; }
.lg-box { background: var(--surf); border: 1px solid var(--line); border-radius: 18px; padding: 16px 18px; margin-bottom: 12px; }
.lg-box > b { display: block; font-size: 16.5px; margin-bottom: 6px; }
.lg-box p:last-child, .lg-box ul:last-child { margin-bottom: 0; }
.lg-table { overflow-x: auto; margin: 6px 0 16px; border: 1px solid var(--line); border-radius: 16px; background: var(--surf); }
.lg-table table { border-collapse: collapse; width: 100%; min-width: 560px; font-size: 14.5px; }
.lg-table th, .lg-table td { text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--line2); vertical-align: top; }
.lg-table th { background: var(--surf2); font-weight: 600; }
.lg-table tr:last-child td { border-bottom: 0; }
.lg-contact { list-style: none; padding: 0 !important; }
.lg-contact li { display: flex; align-items: center; gap: 10px; }
@media (max-width: 860px) {
  .lg-wrap { grid-template-columns: minmax(0, 1fr); gap: 10px; padding-top: 18px; }
  .lg-toc { position: static; flex-direction: row; flex-wrap: nowrap; overflow-x: auto; margin: 0 -16px; padding: 4px 16px; gap: 6px; scrollbar-width: none; }
  .lg-toc .lbl { display: none; }
  .lg-toc a { flex-shrink: 0; border: 1px solid var(--line); background: var(--surf); border-radius: 999px; min-height: 40px; font-size: 14px; }
  .lg-toc a svg { display: none; }
  .lg-toc .btn { display: none; }
  .lg-sec h2 { font-size: 22px; }
}
`;
