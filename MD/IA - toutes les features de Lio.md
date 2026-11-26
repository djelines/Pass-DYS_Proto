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
| Texte (missions 1, 3 à 13) | Mistral : Ministral 3 8B, et Mistral Small 4 pour les mails, les devoirs et le jeu de rôle | parmi les moins chers (Ministral 3 8B : 0,15 $ par million de jetons ; Small 4 : 0,15 $ en entrée, 0,60 $ en sortie), français, hébergé en Europe : important pour des données de santé de mineurs |
| Photos (2) | Mistral OCR 4 | 4 $ pour 1 000 pages (2 $ en traitement différé ou avec l'ancien OCR 3) |
| Voix (15) | Voxtral TTS (Mistral), voix du téléphone en secours | voix naturelle, environ 16 $ par million de caractères |
| Dictée (14) | dictée du téléphone, Voxtral en secours | gratuite |
| Correction (6) | LanguageTool | libre et gratuit |
| Jour du jury | Claude Haiku 5.5 possible | payé à l'usage, aucun abonnement ; quelques euros pour 2 h ; cite ses sources |

Tarifs relevés en novembre 2026, sur des sites tiers : à revérifier sur la page officielle de Mistral avant le jury.

On n'entraîne pas l'IA : un modèle entraîné continue d'inventer des faits. On lui donne les bonnes informations à chaque question.

## Ce que ça coûte

Mistral est payé à l'usage : chaque appel est facturé selon le nombre de jetons envoyés et reçus. Il n'y a pas d'abonnement.

| Action | Taille estimée | Coût estimé |
|---|---|---|
| Une question texte | environ 1 600 jetons envoyés (consigne, exemples, fiche, question) et 200 reçus | environ 0,0003 $, soit à peu près 3 000 questions pour 1 $ |
| Une photo lue | 1 page | 0,004 $ |
| Un texte lu à voix haute par Voxtral | 1 000 caractères | 0,016 $, soit environ 50 questions texte |

Exemple : 1 000 utilisateurs qui posent 10 questions par jour, cela fait environ 90 $ par mois de texte. S'ils écoutent aussi deux textes de 1 000 caractères par jour avec Voxtral, il faut ajouter environ 960 $ par mois. **La voix coûte beaucoup plus cher que le texte.**

Pour garder la maîtrise des coûts :

- **Voix du téléphone par défaut**, gratuite ; Voxtral réservé à la version payante.
- **Une limite de questions par jour et par utilisateur** (@nestjs/throttler, déjà prévu dans la stack).
- **Un cache des réponses communes** (« c'est quoi un PAP ») si les coûts le justifient.
- **Pour le jury** : l'offre gratuite de Mistral (Experiment) suffit, mais Mistral peut utiliser les requêtes pour entraîner ses modèles. Ça va avec des données fictives, pas avec de vrais utilisateurs.

## Comment s'y mettre

1. **Rassembler les fiches officielles** : une fiche courte par sujet (PAP, MDPH 95, RQTH, tiers temps…), avec son lien source.
2. **Écrire une consigne par mission** : ce que Lio doit faire et ne jamais faire.
3. **Écrire 10 à 20 exemples par mission** : une entrée, la bonne réponse. Par exemple, 20 mails modèles. Ces exemples sont envoyés au modèle à chaque appel pour lui montrer le résultat attendu (few-shot) : le modèle lui-même n'est pas modifié, il n'y a pas d'entraînement.
4. **Coder une seule brique IA dans NestJS** : la même pour toutes les missions, avec la consigne, les exemples et les fiches de la mission. Prévoir de pouvoir changer de fournisseur (Mistral ou Claude) sans toucher au reste.
5. **Tester** : 20 cas par mission, relancés à chaque modification.
