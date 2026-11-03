# Base de données

**PostgreSQL** pour tout, sans NoSQL (validé par les référents le 9 oct. 2026). Les données sans schéma fixe, comme les conversations avec Lio, vont dans des colonnes JSONB.

## Socle · comptes et profil

| Table | Colonnes principales |
| --- | --- |
| `utilisateur` | email · mot_de_passe_hash (Argon2id) · role (titulaire, parent, admin) · email_verifie_le · tentatives_echouees · supprime_le |
| `session` | utilisateur · jeton_rafraichissement_hash · appareil · expire_le · revoque_le |
| `jeton` | type (verif_email, reset_mdp, invitation) · hash · expire_le · utilise_le |
| `profil` | utilisateur · prenom · etape_vie (college, lycee, superieur, travail) · difficultes[] · casquette_lio |
| `historique_etape_vie` | utilisateur · etape_vie · depuis_le |
| `preference_lecture` | utilisateur · police · taille · espacement · contraste · fond · voix · vitesse |
| `consentement` | utilisateur · type (cgu, donnees_sante, traitement_ia) · version · accepte_le |
| `partage` | proprietaire · invite · portee[] (quetes, taches, documents, carte) · peut_modifier · statut · expire_le |

`historique_etape_vie` porte le concept du projet : on garde la trace du passage collège → fac → travail, et les démarches proposées changent avec.

## Feature 1 · Carte de besoins

| Table | Colonnes principales |
| --- | --- |
| `besoin` | libelle · categorie (en cours, en examen, au travail) · etapes_vie[] · ordre |
| `carte_besoins` | utilisateur · etape_vie · maj_le |
| `besoin_carte` | carte · besoin (ou libelle_personnalise) · actif · ordre |
| `lien_partage_carte` | carte · jeton · destinataire · expire_le · revoque_le · nb_consultations |

## Feature 2 · Carte des ressources

| Table | Colonnes principales |
| --- | --- |
| `lieu` | nom · categorie (sante, bibliotheque, association, ulis, service_handicap, centre_bilan) · adresse · lat · lng · horaires · services[] · source (data_gouv, osm, communaute) · verifie |
| `contribution_lieu` | lieu · utilisateur · type (ajout, correction, signalement) · contenu · statut · traitee_le |

## Feature 3 · Entretien et annuaire

| Table | Colonnes principales |
| --- | --- |
| `praticien` | rpps · nom · specialite · adresse · lat · lng · lien_prise_rdv · rafraichi_le (cache de l'Annuaire Santé) |
| `rendez_vous` | utilisateur · quete · praticien · titre · lieu · debut_le · prepare |

Les sessions d'entraînement elles-mêmes vont dans la table `entrainement` (JSONB).

## Feature 4 · Démarches, le cœur

| Table | Colonnes principales |
| --- | --- |
| `demarche` | slug · titre · description · etapes_vie[] · duree_semaines · xp_total · sources |
| `demarche_etape` | demarche · ordre · titre · explication · explication_simplifiee (pré-générée) · documents_attendus · delai_jours · xp |
| `quete` | utilisateur · demarche · statut (en_cours, en_attente, terminee, abandonnee) · etape_courante · echeance |
| `quete_etape` | quete · demarche_etape · statut · fait_le · note |
| `tache` | utilisateur · quete · titre · colonne (a_faire, en_cours, en_attente, fait) · position · assignee · echeance |
| `document_requis` | quete_etape · libelle · document · fourni_le |
| `brouillon_mail` | utilisateur · quete_etape · destinataire_type · ton · objet · contenu · envoye_le |
| `rappel` | utilisateur · cible (tache, etape, rendez-vous) · declenche_le · canal · envoye_le |

Distinction importante : `demarche` et `demarche_etape` sont **le catalogue**, identique pour tous. `quete` et `quete_etape` sont **l'instance** d'une personne.

## Feature 5 · Coffre

| Table | Colonnes principales |
| --- | --- |
| `document` | utilisateur · nom · categorie (bilan, mdph, pap_pps, fac, rqth) · chemin_stockage · taille · type_mime · hash · iv · tag_auth · supprime_le |
| `document_partage` | document · partage · accorde_le · revoque_le |

Le fichier vit dans R2, chiffré. La base ne stocke que les métadonnées et les clés de déchiffrement.

## Feature 7 · Progression et notifications

| Table | Colonnes principales |
| --- | --- |
| `evenement_xp` | utilisateur · type (etape_terminee, document_ajoute, entrainement, lieu_propose) · points · reference |
| `badge` / `badge_utilisateur` | code · libelle · condition · obtenu_le |
| `notification` | utilisateur · type · titre · lien · lue_le |
| `abonnement_push` | utilisateur · endpoint · cles · revoque_le |

Le niveau, le total d'XP et la série **ne sont pas stockés** : ils se recalculent depuis `evenement_xp`. Une seule source de vérité.

## Données sans schéma fixe (JSONB)

| Table | Colonnes principales | Conservation |
| --- | --- | --- |
| `conversation` | utilisateur · mode · contexte · messages (JSONB) | 12 mois |
| `entrainement` | utilisateur · scenario · deroule (JSONB : questions, réponses, retours) · score | 12 mois |
| `journal_audit` | utilisateur · action · cible · ip · cree_le | 24 mois |
| `appel_ia` | mode · fournisseur · jetons · duree_ms · depuis_cache (sans le contenu) | 12 mois |
| `import` | source · lignes_lues · erreurs (JSONB) | — |

Une tâche planifiée purge chaque nuit ce qui dépasse la durée de conservation.

Le journal d'audit est ton meilleur argument sur les données de santé : tu peux répondre « qui a consulté ce bilan, et quand ». Le rôle Postgres de l'API n'a que `INSERT` et `SELECT` sur cette table : personne ne peut réécrire l'historique depuis l'application → CP 7, droits d'accès.

## Règles à ne pas rater

- **Révoquer un partage** coupe, dans la même transaction, les partages de documents liés et réassigne au titulaire les tâches du parent.
- **Supprimer un compte** efface tout en cascade ; le journal d'audit reste, anonymisé.
- **Un document rattaché à une quête en cours** ne peut pas être purgé sans avertissement.
- **Suppression douce partout** (`supprime_le`), purge définitive à 30 jours.

## Index

email (unique) · session (utilisateur, expire_le) · quete (utilisateur, statut) · tache (utilisateur, colonne, position) · document (utilisateur, categorie) · lieu (lat, lng) · lien_partage_carte (jeton) · evenement_xp (utilisateur, date)

## Jeux d'essai

`prisma/seed.ts` recrée les 4 personas : Léa (collège, PAP, reliée à Amadou), Karim (licence, aménagement d'examens à l'étape 3), Sofia (RQTH, mail à écrire), Amadou (parent). C'est le jeu de la démo et des tests.

## Ce que ça couvre

| CP | Preuve |
| --- | --- |
| CP 7 | MCD, schéma Prisma, migrations, droits d'accès, jeux d'essai |
| CP 8 | Requêtes paramétrées, transactions, requêtes sur JSONB |
| CP 6 | Catalogue et instance séparés, règles dans le domaine |
| CP 9 | Jeux d'essai rejoués dans la CI |