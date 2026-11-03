# Difficulté

## 1. Bibliothèques adaptées

Y'a pas d'API unique "bibliothèques dys" toute faite, mais plusieurs bases exploitables : **data.gouv.fr** recense les bibliothèques publiques avec leurs services (certaines indiquent "facile à lire", fonds adaptés). Le réseau **Bibliothèques Sonores** (association Valentin Haüy / ADSN) référence les points d'accès aux livres audio. Rien de tout ça n'est aussi précis que ce que tu veux (spécifiquement dys), donc ta vraie valeur ajoutée reste de croiser/enrichir ces sources avec des critères propres à toi — pas de tout construire depuis zéro, mais pas du 100% prêt à l'emploi non plus.

## 2. Doctolib / annuaire médecins

Je te le confirme clairement, on l'avait déjà vu : l'accès à l'API Doctolib nécessite une accréditation préalable réservée aux partenaires agréés, pas ouverte à un développeur indépendant. Aucune excuse ("projet étudiant", "entrepreneurial") ne débloque ça — c'est un accord commercial B2B, pas une autorisation qu'on demande par mail. Ce que tu PEUX faire reste ce qu'on avait posé : **Annuaire Santé** (API officielle CNAM, gratuite, infos statiques : nom, adresse, spécialité) + lien cliquable vers la fiche Doctolib du praticien pour qu'il consulte lui-même les créneaux. Pas de disponibilité affichée directement dans ton app, point final.

## 3. Certification HDS — non, concrètement pas possible pour toi maintenant, et aucun argument ne change ça

Je préfère être direct plutôt que de te laisser espérer un email magique : ce n'est pas une autorisation à demander, c'est un audit mené par un organisme indépendant accrédité par le COFRAC, avec des mois de préparation, un corpus documentaire exigeant, et une mobilisation qui dépasse largement les seuls pôles sécurité — pas juste une case à cocher. La procédure se déroule en deux étapes — audit documentaire puis audit sur site — et le certificat, une fois obtenu, est valable trois ans avec un audit de surveillance chaque année.</cite> Ça coûte plusieurs milliers/dizaines de milliers d'euros et implique une structure déjà installée (hébergement pro, process de sécurité formalisés) — inaccessible à un projet étudiant, peu importe l'excuse invoquée. Aucun statut "entrepreneurial" ou "étudiant" ne donne un accès simplifié — c'est la même exigence pour tout le monde.

**Ce que tu fais à la place, concrètement pour Claude Code :** tu codes le coffre documentaire avec Supabase normalement, tu génères des **données fictives** pour la démo (faux bilans, faux PAP), et dans le pitch tu dis explicitement "hébergement HDS non implémenté en MVP, prérequis identifié pour un passage en production" — ça montre que tu maîtrises le sujet réglementaire sans prétendre l'avoir résolu. C'est même plus crédible auprès d'un jury qu'un mensonge qui se ferait démonter à la première question technique.

Donc oui, tout le reste (les 5 features, l'assistant IA, le kanban, le rédacteur de mails) est réalisable avec Claude Code sans blocage majeur — les 3 seuls murs durs sont : pas de disponibilités Doctolib en temps réel, pas de vraie certif HDS, et la carte des bibliothèques qui demande un vrai travail de curation plutôt qu'un simple appel API.