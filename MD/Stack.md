# Stack

TypeScript partout, une seule base PostgreSQL, tout sur Docker.

## DEV (phase actuelle, tout en local)

| Rôle | Outil | CP |
| --- | --- | --- |
| Environnement | Docker Compose | CP 1 |
| Front | React + Vite + TypeScript, en PWA (vite-plugin-pwa) | CP 2 |
| Style et accessibilité | Tailwind + Base UI | CP 2 |
| Navigation, appels API, formulaires | React Router, TanStack Query, React Hook Form | CP 2 |
| Carte des ressources | Leaflet + OpenStreetMap | CP 2 |
| Back | NestJS (TypeScript) | CP 3, CP 6 |
| Validation | Zod, partagé front et back (`packages/shared`) | CP 3 |
| Sécurité | argon2, @nestjs/jwt, helmet, @nestjs/throttler | CP 3, CP 6 |
| Base de données | PostgreSQL + Drizzle (ou Prisma, TypeORM, Kysely) | CP 7, CP 8 |
| Gestion de la base | Adminer | CP 7 |
| Cache | Redis (réponses IA communes à tous) | CP 6 |
| Tests | Vitest, Supertest, Playwright, axe-core | CP 9 |
| Intégration continue | GitHub Actions | CP 11 |
| Suivi de projet | GitHub Projects + commits réguliers | CP 4 |
| Maquettes | Figma + prototype | CP 5 |

## PROD (plus tard)

| Rôle | Outil | Coût |
| --- | --- | --- |
| Serveur | VPS avec Docker Compose | environ 5 € / mois |
| HTTPS | Caddy | 0 |
| Base de données | PostgreSQL sur le VPS, sauvegarde chaque nuit copiée hors du VPS | 0 |
| Gestion de la base | Adminer, jamais public, accès par tunnel SSH | 0 |
| Cache | Redis sur le VPS, non exposé | 0 |
| Fichiers | Cloudflare R2 | 0 jusqu'à 10 Go |
| Mails | Resend | offre gratuite |
| IA | API Claude, petit modèle | à l'usage |
| Déploiement | GitHub Actions en SSH | 0 |
| App sur les stores (si besoin) | Capacitor, même code React | 99 $ / an Apple, 25 $ une fois Google |
| Documents de santé (vrai lancement) | Hébergeur certifié HDS (liste ANS, esante.gouv.fr) | sur devis |

## APP (si l'application passe en premier)

Le même code React devient une application téléphone avec Capacitor, et reste utilisable sur PC. Le back et la base ne changent pas.

| Rôle | Outil | Coût |
| --- | --- | --- |
| Application iOS et Android | Capacitor (même code React) | 0 |
| Version PC | Le même code en PWA, installable depuis Chrome ou Edge (ou Tauri pour un vrai logiciel à installer) | 0 |
| Notifications | @capacitor/push-notifications (Firebase pour Android, Apple pour iOS) | 0 |
| Appareil photo | @capacitor/camera | 0 |
| Dictée | Module de reconnaissance vocale pour Capacitor, à tester tôt | 0 |
| Jetons de connexion | Stockage sécurisé du téléphone (Keychain iOS, Keystore Android) | 0 |
| Compilation | Xcode (Mac) pour iOS, Android Studio pour Android | 0 |
| Publication | Google Play, puis App Store | 25 $ une fois Google, 99 $ / an Apple |

## Règles

- **PostgreSQL seul** : validé par les référents le 9 oct. 2026. Les données sans schéma fixe (conversations avec Lio) vont en JSONB.
- **Redis pour le cache uniquement** : on y garde les réponses de l'IA identiques pour tous (explications de démarches, définitions comme « c'est quoi un PAP »), avec une durée d'expiration. Jamais de données personnelles : pas de mail rédigé, pas de contenu du coffre, rien qui contienne un prénom ou un diagnostic.
- **Prêt pour Capacitor** : notifications, appareil photo et dictée isolés dans `lib/`, un fichier chacun ; connexion qui ne dépend pas uniquement des cookies.
- **VPS sécurisé** : SSH par clé uniquement, pare-feu, fail2ban, mises à jour système automatiques.
- **Données de santé** : données fictives pour le jury, mention « HDS non implémenté en MVP ».

[Arborescence](Arborescence.md)

[Base de données](Base%20de%20donn%C3%A9es.md)
