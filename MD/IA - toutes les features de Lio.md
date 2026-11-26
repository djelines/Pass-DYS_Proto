# IA : les missions de Lio

D'après le prototype en ligne (https://djelines.github.io/Pass-DYS_Proto/).

## Les missions

| # | Mission | Où | Ce que fait Lio |
|---|---|---|---|
| 1 | Comprendre et orienter | Demander à Lio | comprend une demande, même avec des fautes, et ouvre le bon outil |
| 2 | Lire une photo | Lire, Devoirs, Calculer | récupère le texte d'une photo ou d'un PDF |
| 3 | Résumer | Lire | résume un document en une phrase |
| 4 | Simplifier | Lire, Devoirs | réécrit un texte en phrases courtes |
| 5 | Expliquer un mot | Lire, Devoirs | explique un mot difficile en une phrase |
| 6 | Corriger | Écrire | corrige un texte dicté et explique chaque faute |
| 7 | Reformuler | Reformuler | remet une idée orale au propre, en version longue et courte |
| 8 | Rédiger un mail | Écrire un mail | écrit le mail à partir du destinataire, de l'objectif, de l'idée et du ton |
| 9 | Découper en étapes | Organiser, Démarches | transforme une tâche en petites étapes à cocher |
| 10 | Expliquer un calcul | Calculer | extrait le calcul, le fait faire au serveur, l'explique pas à pas |
| 11 | Guider un devoir | Faire mes devoirs | explique la consigne, donne des indices, ne fait jamais le devoir |
| 12 | Jeu de rôle | S'entraîner | joue le recruteur ou le médecin et conseille après chaque réponse |
| 13 | Répondre sur les démarches | Demander à Lio, Démarches | répond à partir des fiches officielles et cite la source |
| 14 | Dicter | tous les micros | transforme la voix en texte |
| 15 | Lire à voix haute | tous les « Écouter » | lit avec une voix naturelle |

## Quelle IA et pourquoi

| Besoin | IA | Pourquoi |
|---|---|---|
| Texte (missions 1, 3 à 13) | Mistral : Ministral 3 8B, et Mistral Small 4 pour les mails, les devoirs et le jeu de rôle | parmi les moins chers (de 0,15 à 0,60 $ par million de jetons), français, hébergé en Europe : important pour des données de santé de mineurs |
| Photos (2) | Mistral OCR | 2 $ pour 1 000 pages |
| Voix (15) | Voxtral TTS (Mistral) | voix naturelle, au niveau d'ElevenLabs selon Mistral, 3 à 4 fois moins chère |
| Dictée (14) | dictée du téléphone, Voxtral en secours | gratuite |
| Correction (6) | LanguageTool | libre et gratuit |
| Jour du jury | Claude Haiku 5.5 possible | payé à l'usage, aucun abonnement ; quelques euros pour 2 h ; cite ses sources |

On n'entraîne pas l'IA : un modèle entraîné continue d'inventer des faits. On lui donne les bonnes informations à chaque question.

## Comment s'y mettre

1. **Rassembler les fiches officielles** : une fiche courte par sujet (PAP, MDPH 95, RQTH, tiers temps…), avec son lien source.
2. **Écrire une consigne par mission** : ce que Lio doit faire et ne jamais faire.
3. **Écrire 10 à 20 exemples par mission** : une entrée, la bonne réponse. Par exemple, 20 mails modèles. C'est ce qui « entraîne » Lio.
4. **Coder une seule brique IA dans NestJS** : la même pour toutes les missions, avec la consigne, les exemples et les fiches de la mission. Prévoir de pouvoir changer de fournisseur (Mistral ou Claude) sans toucher au reste.
5. **Tester** : 20 cas par mission, relancés à chaque modification.
