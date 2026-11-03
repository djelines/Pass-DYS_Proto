# Dys'Pass

Pour chaque feature : **l'idée**, **le but**, **ce qu'on voit à l'écran**, et **pourquoi ça compte**.

---

## 1 · Carte de besoins

**L'idée.** Un profil que la personne configure elle-même, avec des besoins concrets plutôt qu'un diagnostic affiché : « j'ai besoin qu'on me lise les consignes », « laissez-moi le temps de recopier », « j'ai besoin des supports de cours à l'avance ».

**Le but.** Ne plus avoir à se justifier oralement, dans l'instant, devant un professeur ou un employeur — et ne jamais exposer une étiquette médicale pour obtenir une aide simple.

**À l'écran.** Un sélecteur d'étape de vie — collège, lycée, études supérieures, travail — et une liste de besoins qu'on active. Les besoins proposés changent selon l'étape. Un aperçu de la carte, puis trois façons de la partager : QR code, lien privé daté, PDF imprimable.

**Pourquoi ça compte.** Un lycéen et un salarié n'ont pas les mêmes besoins à formuler. Mais l'un comme l'autre a besoin de pouvoir le faire **sans discours**.

---

## 2 · Carte des ressources dys

**L'idée.** Une carte collaborative qui recense ce qui existe autour de soi : orthophonistes, bibliothèques avec supports adaptés, établissements avec dispositifs ULIS, services handicap universitaires, centres de bilan pour adultes, associations comme la FFDys.

**Le but.** Rendre visible une offre qui existe mais que personne ne trouve — surtout les centres de bilan pour adultes, point noir absolu quand on sait combien de dys sont diagnostiqués tardivement, parfois à trente ans.

**À l'écran.** Une carte avec des filtres par catégorie, la fiche d'un lieu avec sa distance et son itinéraire, la source affichée pour chaque entrée, et la possibilité de proposer un lieu — qui passe en modération.

**Pourquoi ça compte.** Il n'existe aucune base « lieux dys » toute faite. La valeur vient du croisement entre les données ouvertes et les contributions de la communauté.

---

## 3 · Préparateur d'entretien et annuaire de spécialistes

**L'idée.** Un outil qui aide à mettre des mots sur son vécu **avant** un rendez-vous clé : bilan orthophonique, rendez-vous au service handicap, entretien d'embauche, démarche RQTH. Couplé à un annuaire de professionnels filtré par spécialité.

**Le but.** Préparer à l'oral plutôt que remplir un formulaire. Quelqu'un qui bloque justement à l'oral sous stress a besoin de s'entraîner, pas d'écrire.

**À l'écran.** Un scénario à choisir, puis une conversation où Lio joue le recruteur, le médecin ou le référent handicap : il pose les questions probables, laisse reformuler, et corrige doucement — « essaie plus court », « reformule sans dire que tu es nulle en maths ». À côté, l'annuaire, avec un lien vers la prise de rendez-vous du praticien.

**Pourquoi ça compte.** C'est le moment où tout se joue, et c'est celui que personne n'accompagne.

---

## 4 · Assistant démarches — le cœur du projet

**L'idée.** Une IA qui décompose les démarches complexes — PAP, PPS, notification MDPH, aménagement d'examens, RQTH, aménagement de poste — en étapes claires, avec échéances et rappels, sous forme de liste partagée et de vue kanban.

**Le but.** Transformer un dossier de vingt pages et six interlocuteurs en **une action à faire aujourd'hui**.

**À l'écran.**

- Un catalogue de démarches, filtré par étape de vie.
- Chaque démarche devient une **quête** : des étapes, les documents attendus, une échéance, des rappels.
- Un **kanban partagé** avec le parent : à faire, en cours, en attente de réponse, fait.
- Chaque étape cite ses **sources officielles**.

**Et le rédacteur de mails.** La personne dit ce qu'elle veut exprimer avec ses mots ; l'IA le reformule dans un registre correct, adapté au destinataire — professeur, employeur, administration. C'est l'un des blocages les plus fréquents et les plus lourds pour une personne dyslexique.

**Pourquoi ça compte.** C'est là que se joue la fatigue des familles. Tout le reste de l'application gravite autour.

---

## 5 · Coffre documentaire

**L'idée.** Un espace centralisé pour stocker bilans orthophoniques, notifications MDPH, PAP, PPS, notifications RQTH, comptes rendus universitaires.

**Le but.** Ne plus chercher dans des mails et des photos éparpillées à chaque nouvelle démarche, à chaque rentrée.

**À l'écran.** Des dossiers par catégorie, l'ajout par photo ou par fichier, le rattachement d'un document à l'étape d'une quête, et le partage avec le parent — révocable à tout moment.

**Pourquoi ça compte.** Les documents sont chiffrés, et un journal garde la trace de qui a consulté quoi. Sur des données de santé, c'est la base.

---

## 6 · Lio, le compagnon — un avatar, plusieurs modes

**L'idée.** Même personnage, même voix, même personnalité. Ce qu'il fait change selon le profil renseigné à l'inscription.

| Mode | Ce qu'il fait |
| --- | --- |
| **Dyslexie** | Scanne un texte, le lit à voix haute en simplifiant, répond en direct : « répète plus lentement », « explique ce mot », « résume en une phrase » |
| **Dyscalculie** | Décompose un calcul, une facture, un tableau **étape par étape à voix haute**, plutôt que de donner le résultat sec |
| **Dysphasie** | Le sens s'inverse : la personne **parle** une idée mal formulée, Lio la reformule proprement à l'oral — avant d'appeler, de répondre en cours, d'entrer en rendez-vous |
| **Dyspraxie** | Découpe une tâche du quotidien en étapes simples, et sait reprendre à l'étape 2 sans tout recommencer |
| **Dysgraphie** | Dictée vocale assistée : la personne parle, Lio retranscrit en corrigeant syntaxe et structure |
| **Entraînement** | Joue le rôle du recruteur, du médecin ou du référent handicap (voir feature 3) |

**Le but.** Un seul compagnon qui change de casquette, pas cinq outils séparés à apprendre.

**Techniquement.** La même brique partout : reconnaissance vocale, modèle de langage avec un prompt système qui change selon le mode, synthèse vocale. Un seul avatar, un contexte différent selon l'écran où on l'ouvre.

---

## 7 · Le socle, invisible mais décisif

**Le confort de lecture.** Police adaptée aux dys, taille, espacement, contraste, fond coloré, lecture à voix haute, vitesse de la voix. Réglé une fois à l'inscription, appliqué partout.

**Le partage avec le parent.** Le parent voit ce que la personne décide de montrer : les quêtes, les tâches, les documents, la carte. Elle peut tout révoquer d'un geste.

**La gamification, discrète.** Des points à chaque étape franchie, un niveau, une série de jours, quelques badges. Assez pour encourager, jamais assez pour infantiliser.

---

## Les quatre parcours à montrer

| Persona | Le parcours de démonstration |
| --- | --- |
| **Léa**, 14 ans | Demande de PAP + trouver une bibliothèque adaptée |
| **Adam**, 20 ans | Aménagement d'examens à la fac, étape par étape |
| **Sofia**, 27 ans | Demande de RQTH + mail à l'employeur écrit avec Lio |
| **Amadou**, parent | Suivi des démarches de Léa et coffre partagé |

---

## Ce qui est volontairement exclu

- **Pas de disponibilités de rendez-vous en temps réel.** L'API Doctolib est réservée aux partenaires accrédités : on affiche les coordonnées officielles et un lien sortant.
- **Pas de certification HDS.** Hors de portée d'un projet étudiant : données fictives en démonstration, et le prérequis identifié pour un passage en production.
- **Aucun diagnostic affiché.** Jamais, nulle part, même en interne à l'écran.