# Pass'Dys

Compagnon numérique pour les personnes dys (dyslexie, dyscalculie, dysphasie, dyspraxie, dysgraphie), du primaire jusqu'à l'emploi. Le parent peut suivre et aider quand il y en a un.

Projet de fin d'année d'Inès Charfi, Bachelor Concepteur Développeur d'Applications (RNCP 37873), Coding Factory.

Prototype en ligne : https://djelines.github.io/Pass-DYS_Proto/Maquette/

## Le problème

Les aménagements obtenus à l'école (PAP, PPS) s'arrêtent au bac. À la fac il faut tout refaire, au travail cela devient la RQTH, et personne ne prévient. Les familles portent seules des démarches longues et dispersées.

Pass'Dys suit la personne, pas l'établissement. Principe fondateur : afficher des besoins concrets, jamais un diagnostic.

## Les fonctionnalités

1. **Carte de besoins** selon l'étape de vie, partagée par QR code, lien daté ou PDF.
2. **Carte des ressources dys** : orthophonistes, bibliothèques adaptées, ULIS, services handicap, centres de bilan, associations. Collaborative, avec modération.
3. **Préparateur d'entretien** (l'IA joue le recruteur, le médecin ou le référent handicap) et **annuaire de spécialistes**.
4. **Assistant démarches**, le cœur du projet : PAP, PPS, MDPH, aménagement d'examens, RQTH, aménagement de poste. Chaque démarche a ses étapes, échéances, rappels, un tableau partagé avec le parent et les sources officielles. Inclut un **rédacteur de mails** qui reformule selon le destinataire.
5. **Coffre documentaire** chiffré avec partage révocable.

Autour de ces fonctionnalités :
- **Lio**, le compagnon : reconnaissance vocale, modèle de langage et synthèse vocale, en six modes (lire, calculer, reformuler, organiser, écrire, s'entraîner).
- **Le socle** : confort de lecture réglable (police dys, taille, espacement, contraste, lecture vocale), partage parent révocable, gamification discrète.

## Choix techniques

Front React + TypeScript (Vite), installable en PWA. Back NestJS en trois couches. PostgreSQL seul, avec Drizzle. Docker, CI/CD, tests. L'IA est derrière une couche d'abstraction pour pouvoir changer de fournisseur sans toucher au métier.

Ce qui a été écarté, et pourquoi :
- **Doctolib** : API réservée aux partenaires accrédités. Remplacé par l'Annuaire Santé de la CNAM et un lien vers la fiche.
- **Hébergement HDS** : hors de portée d'un projet étudiant. La démonstration utilise des données fictives ; HDS reste un prérequis pour une mise en production.
- **API de bibliothèques dys** : elle n'existe pas. Remplacée par un croisement data.gouv.fr et Bibliothèques Sonores, puis une sélection manuelle.

## Contenu du dépôt

| Dossier | Contenu |
| --- | --- |
| `Maquette/` | Le prototype HTML : vitrine, inscription, application, informations légales. Sources dans `Maquette/code-source/`, détails dans `Maquette/LISEZMOI.md`. |
| `Pitch/` | Le pitch et le dossier Design Thinking (PDF), le lien du projet. |
| `MD/` | Les notes de cadrage : brief, idée, fonctionnalités, arborescence, base de données, stack, critères du titre CDA. |
| `Image/` | Le logo Lio (SVG et PNG). |

## Limites du prototype

Données fictives. IA et micro simulés. La carte couvre Cergy, Pontoise et les communes voisines. Pas d'audit RGAA réalisé, la déclaration d'accessibilité le précise.

## Calendrier

- Points d'étape : 4 et 11 février 2027
- Rendu final : 24 et 25 mai 2027
