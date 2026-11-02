# Critères du titre CDA

## AT 1 — Développer une application sécurisée

- [ ]  **CP 1 · Environnement de travail** — Docker, Git, IDE → *preuve : Dockerfile + README d'installation*
- [ ]  **CP 2 · Interfaces utilisateur** — front responsive, RGAA, RGPD → *preuve : code front + rapport d'accessibilité*
- [ ]  **CP 3 · Composants métier** — API, POO, code défensif, documenté en anglais → *preuve : code + tests unitaires*
- [ ]  **CP 4 · Gestion de projet** — backlog, sprints, commits réguliers → *preuve : board + historique Git + comptes rendus*

## AT 2 — Concevoir et développer une application organisée en couches

- [ ]  **CP 5 · Analyser et maquetter** — fait : constat, personas, 5 features, 17 écrans, prototype cliquable
- [ ]  **CP 6 · Architecture logicielle** — couches présentation / métier / données, stratégie de sécurité, éco-conception → *preuve : schéma + dossier de conception*
- [ ]  **CP 7 · Base de données relationnelle** — MCD, MPD, droits d'accès, jeux d'essai → *preuve : schémas + scripts SQL*
- [ ]  **CP 8 · Accès aux données SQL** — requêtes préparées, transactions. Pas de NoSQL : les référents ont validé PostgreSQL seul (9 oct. 2026) → *preuve : code d'accès aux données*

## AT 3 — Préparer le déploiement

- [ ]  **CP 9 · Plan de tests** — unitaires, intégration, sécurité → *preuve : plan écrit + rapports*
- [ ]  **CP 10 · Documenter le déploiement** — procédure et scripts → *preuve : documentation de déploiement*
- [ ]  **CP 11 · DevOps / CI** — pipeline, conteneurs, livrable automatisé → *preuve : fichier CI qui tourne*

## Livrables

- [ ]  Dossier de projet écrit, 40 à 60 pages
- [ ]  Diaporama de présentation
- [ ]  Veille sur les vulnérabilités (ANSSI, OWASP)
- [ ]  Dossier professionnel : 1 à 3 exemples par activité-type, rédigés au « je »

## Jalons

- [ ]  **Déc. 2026** — base de données, authentification, une feature complète et testée
- [ ]  **4 et 11 fév. 2027** — point d'étape : 2 ou 3 features codées, CI en place, premières fiches rédigées
- [ ]  **24 et 25 mai 2027** — rendu final du dossier professionnel
- [ ]  Examen : 2 h 15 — présentation 40 min, entretien technique 45 min, questionnaire 30 min, entretien final 20 min

## Points de vigilance

- [ ]  Données de santé : pseudonymisation, chiffrement, données fictives en démo, mention « HDS non implémenté en MVP »
- [ ]  L'appel à une API d'IA ne compte pas comme composant métier — les règles métier, c'est le moteur de quêtes, les échéances, le partage avec le parent
- [ ]  Projet solo : garder des traces de collaboration (entretiens utilisateurs, retours des référents)
- [ ]  Écrire les fiches du dossier après chaque feature, pas à la fin