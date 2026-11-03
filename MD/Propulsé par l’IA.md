# Propulsé par l’IA

## Le Compagnon — un avatar, plusieurs "modes" dys

Même personnage, même voix, même personnalité — mais ce qu'il fait change selon le profil renseigné à l'inscription :

**Mode dyslexie** 

Scanne un texte, le lit à voix haute en simplifiant, répond en direct : "répète plus lentement", "explique ce mot", "résume en une phrase".

**Mode dyscalculie**

La personne scanne un problème de maths, une facture, un tableau de chiffres, une addition à faire — le compagnon **décompose le calcul à voix haute étape par étape**, comme s'il l'expliquait à côté de toi, plutôt que de juste donner le résultat. On peut lui demander "recommence plus lentement", "pourquoi cette étape", "donne-moi juste le total sans le détail" selon le besoin du moment.

**Mode dysphasie** (trouble du langage oral)

Ici le sens s'inverse un peu : la personne **parle** à voix haute une idée mal formulée, le compagnon reformule proprement à l'oral en retour — utile avant d'appeler quelqu'un, de répondre en cours, ou de reformuler une pensée avant un rendez-vous.

**Mode dyspraxie**

Moins sur la lecture, plus sur la **décomposition d'une tâche du quotidien en étapes orales simples** — "comment je fais pour...", et le compagnon égrène étape par étape à voix haute, avec possibilité de demander "répète l'étape 2" sans repartir du début.

**Mode dysgraphie**

Dictée vocale assistée : la personne parle, le compagnon retranscrit à l'écrit en corrigeant syntaxe et structure — proche du rédacteur de mails qu'on avait, mais intégré dans la même interface conversationnelle plutôt qu'un outil séparé.

## Intégré dans le préparateur d'entretien (feature 3)

Le même compagnon devient le partenaire d'entraînement : au lieu d'un formulaire à remplir avant un rdv, la personne **discute à voix haute avec le compagnon** qui joue le rôle du recruteur, du médecin, ou du référent handicap fac — pose des questions probables, laisse reformuler, corrige gentiment la formulation en direct ("essaie de dire ça plus court", "reformule sans dire je suis nul en maths"). Ça devient un vrai entraînement oral plutôt qu'un exercice écrit — beaucoup plus utile pour quelqu'un qui bloque justement à l'oral sous stress.

**Techniquement** : même brique conversationnelle partout (reconnaissance vocale + LLM avec un prompt système qui change de "mode" selon le profil + synthèse vocale), un seul avatar animé, contexte différent selon l'écran où on l'ouvre. Pas 5 outils séparés, un seul compagnon qui change de casquette.