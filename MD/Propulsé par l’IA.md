# Propulsé par l’IA

## Le compagnon : un seul Lio, les mêmes missions pour tous

Même personnage, même voix, même personnalité pour tout le monde. Lio ne change pas de « mode » selon le profil dys : il a 15 missions, rattachées aux écrans de l'application (voir « IA - toutes les features de Lio »). Ci-dessous, les missions les plus utiles pour chaque profil.

**Dyslexie** : Lire une photo (2), Résumer (3), Simplifier (4), Expliquer un mot (5), Lire à voix haute (15)

La personne scanne un texte, Lio le lit à voix haute, le simplifie, explique un mot ou le résume en une phrase.

**Dyscalculie** : Lire une photo (2), Expliquer un calcul (10)

La personne scanne un problème de maths, une facture ou un tableau de chiffres. Lio extrait le calcul, le serveur le fait, et Lio l'explique étape par étape plutôt que de donner seulement le résultat. On peut lui demander « recommence plus lentement », « pourquoi cette étape » ou « donne-moi juste le total ».

**Dysphasie** (trouble du langage oral) : Dicter (14), Reformuler (7)

La personne dit à voix haute une idée mal formulée, Lio la remet au propre, en version longue et courte. Utile avant d'appeler quelqu'un, de répondre en cours ou d'aller à un rendez-vous.

**Dyspraxie** : Découper en étapes (9)

« Comment je fais pour… » : Lio transforme la tâche en petites étapes à cocher, qu'on peut se faire relire une par une sans repartir du début.

**Dysgraphie** : Dicter (14), Corriger (6), Rédiger un mail (8)

La personne parle, le texte s'écrit, puis Lio le corrige et explique chaque faute. Pour un mail, il le rédige à partir du destinataire, de l'objectif, de l'idée et du ton.

**Faire mes devoirs** (pour tous les dys) : Guider un devoir (11)

La personne montre ou dicte la consigne, Lio l'explique pas à pas et pose des questions pour la faire avancer. Il ne fait jamais le devoir à sa place : il aide à comprendre ce qui est demandé, pas à rendre une réponse toute faite.

## Intégré dans le préparateur d'entretien : Jeu de rôle (12)

Lio devient le partenaire d'entraînement : la personne discute à voix haute avec lui pendant qu'il joue le recruteur, le médecin ou le référent handicap de la fac. Il pose les questions probables, laisse reformuler et conseille après chaque réponse (« essaie de dire ça plus court », « reformule sans dire je suis nul en maths »). C'est un entraînement oral, plus utile qu'un exercice écrit pour quelqu'un qui bloque à l'oral sous stress.

**Techniquement** : une seule brique IA dans NestJS pour toutes les missions (dictée + modèle de langage + synthèse vocale). Ce qui change d'une mission à l'autre, c'est la consigne envoyée au modèle, les exemples et les fiches officielles, pas le profil de la personne. Un seul avatar, pas 5 outils séparés.
