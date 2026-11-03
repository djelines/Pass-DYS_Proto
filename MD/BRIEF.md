# BRIEF

# Dys'Pass — contexte du projet

> **À coller ou à joindre en début de conversation** avec un nouvel assistant, pour qu'il sache de quoi il s'agit sans que j'aie à tout réexpliquer.
> 

---

## Qui je suis

Inès Charfi, étudiante en **Bachelor Concepteur Développeur d'Applications** (niveau 6, RNCP 37873) à Coding Factory. **Mon frère est multidys** — moi je ne le suis pas. J'ai grandi à côté de ses difficultés, et j'ai vu mes parents s'épuiser sur les démarches. Dys'Pass est mon projet de fin d'année, et il passe devant un jury.

**Conventions à respecter quand on travaille ensemble** : on parle français, sans emoji nulle part — ni dans les documents, ni dans l'interface. Le persona étudiant s'appelle **Adam** (jamais Karim, c'est l'ancien nom).

---

## Le projet en trois phrases

Dys'Pass est un **compagnon numérique pour les personnes dys** — dyslexie, dyscalculie, dysphasie, dyspraxie, dysgraphie — qui les accompagne **du collège jusqu'à l'emploi**, et embarque le parent quand il y en a un.

Le point de différenciation : les outils existants s'arrêtent au bac. À la fac il faut tout refaire, au travail ça s'appelle la RQTH, et personne ne prévient. Dys'Pass suit **la personne**, pas l'établissement.

Principe fondateur : on affiche **des besoins concrets, jamais un diagnostic**.

---

## Les 5 features — toutes font partie du projet, aucune n'est optionnelle

1. **Carte de besoins** personnalisable selon l'étape de vie (collège, lycée, études sup., travail), partagée par QR code, lien daté ou PDF.
2. **Carte des ressources dys** : orthophonistes, bibliothèques adaptées, dispositifs ULIS, services handicap, centres de bilan pour adultes, associations (FFDys). Collaborative, avec modération.
3. **Préparateur d'entretien** (l'IA joue le recruteur, le médecin, le référent handicap) **+ annuaire de spécialistes** filtré par spécialité.
4. **Assistant démarches — le cœur du projet.** PAP, PPS, MDPH, aménagement d'examens, RQTH, aménagement de poste : chaque démarche devient une quête avec étapes, échéances, rappels, kanban partagé avec le parent, et sources officielles citées. Inclut un **rédacteur de mails** : la personne dit en ses mots, l'IA reformule selon le destinataire.
5. **Coffre documentaire** chiffré : bilans, notifications MDPH, PAP, PPS, RQTH, comptes rendus. Partage révocable.

**Plus le compagnon « Lio »** : un seul avatar, une seule brique technique (reconnaissance vocale + LLM avec prompt système par mode + synthèse vocale), six casquettes — lire, calculer, reformuler, organiser, écrire, s'entraîner.

**Plus le socle** : confort de lecture réglable (police dys, taille, espacement, contraste, lecture vocale), partage parent révocable, gamification discrète (points, niveaux, séries).

---

## Les personas

|  | Situation | Besoin |
| --- | --- | --- |
| **Léa**, 14 ans | Collégienne | Bibliothèque adaptée, PAP qui avance |
| **Adam**, 20 ans | Étudiant en licence | Aménagement d'examens à la fac |
| **Sofia**, 27 ans | Salariée | RQTH + mail à l'employeur |
| **Amadou**, 45 ans | Parent de Léa | Suivre les démarches sans s'épuiser |

---

## Trois murs techniques déjà tranchés — ne pas les rouvrir

- **Pas d'API Doctolib** (réservée aux partenaires accrédités) → Annuaire Santé de la CNAM + lien sortant vers la fiche.
- **Pas de certification HDS** pour un projet étudiant → données fictives en démonstration, et mention explicite « HDS non implémenté en MVP, prérequis identifié pour la production ».
- **Pas d'API « bibliothèques dys »** → croisement [data.gouv.fr](http://data.gouv.fr/) + Bibliothèques Sonores, puis curation manuelle.

---

## La direction artistique

**Couleurs** — fond crème `#F8F6F1`, vert d'eau `#97D4D0`, bleu nuit `#34475F`, encre `#3E3A63`, post-it `#FBE7A1`, corail `#F9CDB7`, bleu pâle `#D2E2F6`. Par rubrique : démarches `#3B64A8`, Lio `#2F7F77`, autour de moi `#B4533A`, carnet `#8A6412`, MDPH `#6552C9`.

**Typographie** — Inter Tight pour les titres, Lexend pour le texte (police lisible dys), Caveat pour les annotations manuscrites. Atkinson Hyperlegible et Andika proposées en option à l'utilisateur.

**Formes** — rayons 8 / 12 / 16 / 999 px, grille de 8, bordures 1 px `#E7E3DB`, fond blanc pour les cartes.

**Interdits** — aucune ombre portée, aucun dégradé, aucun effet verre ou néon, aucun emoji, aucune photo de banque d'images, jamais de texte blanc sur vert d'eau (contraste 1,66), jamais de vocabulaire médical affiché.

**Ton** — tutoiement, phrases courtes, une action claire. Jamais « Bravo champion ! », jamais « Veuillez compléter votre dossier ».

---

## La stack

Front **React + TypeScript**, installable sur téléphone (PWA). Back **NestJS** en architecture trois couches. **PostgreSQL** seul (SQL uniquement, validé par les référents le 9 oct. 2026), hébergé sur un VPS. **Docker**, CI/CD, tests. IA derrière une couche d'abstraction, pour pouvoir changer de fournisseur ou passer sur un modèle local sans toucher au métier.

---

## Ce qui existe déjà

- **Maquettes** : landing, 6 écrans d'inscription, 17 écrans d'application — [https://claude.ai/artifact/Fmk6UtPRzqhykjLQkik5eA](https://claude.ai/artifact/Fmk6UtPRzqhykjLQkik5eA)
- **Prototype cliquable** (les boutons marchent vraiment) — [https://claude.ai/artifact/FcBxnFzEPVNpQGZdZWuKyH](https://claude.ai/artifact/FcBxnFzEPVNpQGZdZWuKyH)
- **Charte graphique** avec contrastes mesurés — [https://claude.ai/artifact/3hfMDMeGNN6PmLMbrSeEQ9](https://claude.ai/artifact/3hfMDMeGNN6PmLMbrSeEQ9)
- **Planches de direction artistique** — [https://claude.ai/artifact/W1LY4VzQRhBAG8WYSNr6LN](https://claude.ai/artifact/W1LY4VzQRhBAG8WYSNr6LN)
- **Mon diaporama de présentation** (19 diapos : constat, idée, personas, fonctionnalités) — fait par moi, exporté en PDF
- **Deck de présentation Canva généré** — [https://www.canva.com/d/ACPq73IB2tqhvM1](https://www.canva.com/d/ACPq73IB2tqhvM1)
- **Figma** : fichier `srl7M6koBA8mdgBkkqFYAN`

*Attention : les maquettes en ligne, le Canva et le Figma portent encore l'ancien nom du projet (« Passerelle ») et parfois l'ancien prénom (« Karim »).*

**Mes documents** : `dyspass-le-projet.md` (présentation), `dyspass-pitch.md` (préparation à l'oral), `dyspass-features-detail.md`, `dyspass-stack.md`, `dyspass-architecture.md`, `dyspass-bdd.md`, `dyspass-api.md`, `dyspass-arborescence.md`, `dyspass-choix-techniques.md`, `dyspass-criteres-cda.md`.

---

## Ce qu'exige le titre CDA

Couvrir **3 activités-types et 11 compétences** : environnement de travail, interfaces, composants métier, gestion de projet, analyse et maquettage, architecture en couches, base relationnelle, accès aux données **SQL et NoSQL** (pour Pass'Dys, les référents ont validé SQL seul), plan de tests, documentation de déploiement, CI/CD.

**Livrables** : dossier écrit de 40 à 60 pages et un diaporama.
**Examen** : 2h15 — présentation 40 min, entretien technique 45 min, questionnaire 30 min (documentation technique en anglais), entretien final 20 min.
**Jalons** : point d'étape les 4 et 11 février 2027, rendu final les 24 et 25 mai 2027. Référents : Thibaud et Robin.

---

## Ce qui reste à faire

Le développement, cette année. Et des tests avec de vraies personnes dys.