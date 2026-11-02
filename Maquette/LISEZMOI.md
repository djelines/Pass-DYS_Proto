# Pass'Dys · prototype

Ouvre `index.html` dans un navigateur. Tout est responsive (ordinateur, tablette, téléphone).

- `index.html` : la vitrine.
- `inscription.html` : connexion, création de compte, 4 questions (étape de vie, difficultés, confort de lecture, version avec ou sans points et son), écran final.
- `application.html` : l'espace d'Adam Charfi.
- `informations.html` : mentions légales, conditions d'utilisation, conditions de vente, confidentialité (RGPD), cookies, déclaration d'accessibilité (RGAA), éco-conception et contact.
- `tuiles/` : le fond de carte de Cergy et Pontoise (OpenStreetMap, zooms 12 à 15), servi avec le prototype.
- `polices/` : la police OpenDyslexic (licence SIL OFL).

## Modifier
Les sources sont dans `code-source/`. Après une modification : `node build.mjs` depuis `code-source/`.

- `style.css` : charte, mode clair et sombre, mises en page responsive. Le bloc `max-width: 600px` à la fin ne concerne que le téléphone.
- `icons.mjs`, `build.mjs` : icônes, Lio, et le contenu des pages.
- `core.js` : actions, fenêtres accessibles, voix, réglages partagés, guide de lecture.
- `consent.js` : bandeau cookies, commun aux quatre pages.
- `legal.mjs` : contenu de la page d'informations légales.
- `onboarding.mjs` : ajouts à l'inscription (question points et son, version téléphone).
- `app.js` (navigation, accueil, Lio), `demarches.js`, `mails.js`, `lieux.js`, `annuaire.js`, `coffre.js`, `besoins.js`, `reglages.js`.

## Limites
Données fictives. IA et micro simulés. La carte couvre Cergy, Pontoise et les communes voisines. Le prototype n'a pas été audité RGAA : la déclaration le dit.
