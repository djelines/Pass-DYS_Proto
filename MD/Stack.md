# Stack

Choix techniques de Pass'Dys, avec pour chaque brique la raison du choix et celle des alternatives écartées.

Principe directeur : **un seul langage (TypeScript) du front au back**, une architecture en couches imposée par le framework, et le moins de services possible au départ.

---

## Application (front)

| Brique | Choix | Pourquoi lui | Pourquoi pas les autres |
| --- | --- | --- | --- |
| Framework | **SvelteKit** en mode application monopage (adaptateur statique, sans rendu serveur) | Code court et lisible, proche du HTML du prototype ; le mode statique est indispensable pour Capacitor | React : plus verbeux. Next.js : pensé pour le rendu serveur, mal adapté à Capacitor |
| Version | **Svelte 5** (`$props()`, `$state()`) | Syntaxe actuelle | Svelte 4 (`export let`, stores) : ancienne syntaxe, à refuser dans le code généré |
| Application téléphone | **Capacitor + PWA** | Un seul code pour le web, l'iPhone et Android ; le CSS du prototype se réutilise ; accès natif à la voix, aux notifications et aux fichiers | React Native : pas de CSS, prototype à refaire. Flutter : langage Dart en plus, version web mal lue par les lecteurs d'écran |
| Composants | **Bits UI** (sans style imposé) + **CSS à variables** | Accessibilité gérée (clavier, lecteur d'écran) ; police, taille et espacement dys réglés en changeant quelques variables | Bibliothèques stylées : leur style va contre la charte (ombres, dégradés) |
| Données serveur | **TanStack Query** (version Svelte) | Gère le cache, le chargement et les erreurs | Le faire soi-même : beaucoup de code fragile |
| Formulaires | **Zod** + formulaires Svelte classiques | Mêmes règles de validation au front et au back | Bibliothèque de formulaires dédiée : inutile ici |
| Carte | **MapLibre + OpenStreetMap** | Gratuit, sans clé, compatible avec le prototype | Google Maps : payant, question RGPD |

---

## Back

| Brique | Choix | Pourquoi lui | Pourquoi pas les autres |
| --- | --- | --- | --- |
| Framework | **NestJS** | Impose les couches contrôleur, service et accès aux données : compétence évaluée au titre CDA | Express : aucune structure. FastAPI (Python) : rien n'impose de couches |
| Langage | **TypeScript** | Même langage que le front, types et schémas partagés | Python : un deuxième langage à expliquer en entretien |
| Authentification | **Passport (JWT) + argon2** | Chaque étape s'explique ; fonctionne sur le web et dans l'application (jeton, pas seulement des cookies) | Auth0, Clerk : boîte noire payante, rien à montrer au jury |
| Rappels | **@nestjs/schedule** | Simple, sans service en plus | BullMQ : demande Redis, inutile au début |
| Limitation des abus | **@nestjs/throttler** | Compteurs en mémoire, suffisant avec un seul serveur | Redis : utile seulement avec plusieurs serveurs |
| IA | **Interface « fournisseur d'IA »**, avec Mistral ou Claude derrière | Changer de fournisseur sans toucher au métier ; Mistral est hébergé en Europe, utile pour des données de mineurs | Appels directs partout : impossible à faire évoluer |
| Fichiers du coffre | **Stockage compatible S3** (MinIO en local, R2 plus tard) + chiffrement AES-256-GCM | Même code en local et en production ; le chiffrement est fait par l'application | Fichiers dans la base : alourdit la base et les sauvegardes |

---

## Base de données

| Brique | Choix | Pourquoi lui | Pourquoi pas les autres |
| --- | --- | --- | --- |
| Base | **PostgreSQL** | Relationnelle, solide, JSONB pour les conversations avec Lio ; validée par les référents | MySQL : moins complet. MongoDB : refusé par les référents |
| ORM | **Drizzle** | Proche du SQL, le jury voit du vrai SQL ; migrations en TypeScript | Prisma : son propre langage cache le SQL. TypeORM : maintenance irrégulière |
| Gestion | **Adminer** | Léger, un conteneur Docker | pgAdmin : plus lourd sans gain. En production, jamais ouvert sur Internet : accès par tunnel SSH uniquement |
| Cache | **Pas de Redis au début** | Un service de moins à maintenir et à expliquer | À ajouter seulement si les coûts d'IA ou le nombre de serveurs le justifient |

---

## Infrastructure et qualité

| Brique | Choix | Pourquoi lui |
| --- | --- | --- |
| Organisation du code | **Un seul dépôt avec pnpm workspaces** (`app/`, `api/`, `shared/`) | Types et schémas Zod partagés entre front et back |
| Local | **Docker Compose** (PostgreSQL, Adminer, MinIO) | Tout se lance en une commande |
| Production | **VPS en France** (OVH ou Scaleway) + **Caddy** | HTTPS automatique ; données en France ; offres HDS disponibles chez ces hébergeurs pour un vrai lancement |
| Tests | **Vitest** (unitaires), **Supertest** (API), **Playwright + axe** (parcours et accessibilité) | Couvre le plan de tests du titre, avec des tests d'accessibilité cohérents avec le sujet |
| Qualité du code | **ESLint + Prettier** | Code propre et uniforme |
| CI/CD | **GitHub Actions** | Le dépôt y est déjà |

---

## NestJS + Svelte face aux autres combinaisons

| | FastAPI + SvelteKit | NestJS + React | **NestJS + SvelteKit** |
| --- | --- | --- | --- |
| Langages à maîtriser | 2 | 1 | **1** |
| Types partagés front/back | Non | Oui | **Oui** |
| Architecture en couches | À construire soi-même | Imposée | **Imposée** |
| Lisibilité du front | Bonne | Plus verbeux | **Bonne** |
| Composants accessibles prêts | Peu | Nombreux | **Moins qu'avec React** |
| Qualité du code généré par l'IA | Correcte | Meilleure | **Correcte, vigilance Svelte 5** |

---

## Résumé rapide

| Brique | Rôle |
| --- | --- |
| TypeScript | Langage du front et du back |
| SvelteKit | Front en mode application monopage |
| NestJS | Back en trois couches |
| PostgreSQL | Base de données |
| Drizzle | Requêtes et migrations |
| Adminer | Voir et modifier la base |
| Zod | Validation partagée |
| Docker Compose | Lancer PostgreSQL et Adminer |
| Git + GitHub | Versionner le code, suivre le board |
| pnpm (workspaces) | Paquets et organisation `app/`, `api/`, `shared/` |
| Bits UI | Composants accessibles |
| TanStack Query | Appels à l'API depuis le front |
| Passport (JWT) + argon2 | Connexion et mots de passe |
| Vitest + Supertest | Tests unitaires et tests de l'API |
| ESLint + Prettier | Qualité du code |
| GitHub Actions | Tests à chaque push |
| MapLibre | Carte des ressources |
| MinIO, puis R2 | Coffre documentaire |
| @nestjs/schedule | Rappels des démarches |
| SDK du fournisseur d'IA, derrière l'interface | Lio et rédacteur de mails |
| Capacitor | Passage en application téléphone |
| Playwright + axe | Tests de parcours et d'accessibilité |
| VPS + Caddy | Mise en ligne |
