# Arborescence

Monorepo : un seul dépôt, relié par les workspaces npm (`"workspaces": ["api", "web", "shared"]` dans le `package.json` racine).

```
pass-dys/
├─ package.json          workspaces + scripts : dev, build, test, lint
├─ docker-compose.yml    postgres · redis · adminer
├─ .env.example
├─ .github/workflows/    ci.yml
├─ shared/               types et schémas Zod
├─ api/                  NestJS
│  ├─ drizzle/           migrations SQL + seed
│  └─ src/
│     ├─ <feature>/
│     └─ common/         database, cache, ai, mail, security
└─ web/                  React + Vite (PWA)
   └─ src/
      ├─ <feature>/
      ├─ components/     boutons, champs, Lio
      └─ lib/            api, notifications, camera, speech
```

## Une feature = un nom, côté API et côté web

| Feature | Nom |
| --- | --- |
| Socle : compte, profil, RGPD | `account` |
| Lien avec le parent | `sharing` |
| 1 · Carte de besoins | `needs` |
| 2 · Carte des ressources dys | `resources` |
| 3 · Préparateur d'entretien et annuaire | `interview` |
| 4 · Assistant démarches | `procedures` |
| 5 · Coffre documentaire | `vault` |
| 6 · Lio | `lio` |
| 7 · XP et badges | `progress` |
| 7 · Rappels et notifications | `reminders` |

## Une feature, back et front

```
api/src/procedures/                  web/src/procedures/
├─ procedures.controller.ts          ├─ ProceduresPage.tsx     l'écran
├─ procedures.service.ts             ├─ components/            ses morceaux d'écran
├─ procedures.repository.ts          └─ procedures.api.ts      appels à l'API
├─ procedures.schema.ts
└─ procedures.spec.ts
```

## Règles

- **Controller → service → repository** : le controller ne touche jamais la base, le repository ne contient aucune règle métier.
- **`components/` à la racine de `web/src`** : seulement ce qui sert à plusieurs features. Le reste vit dans la feature.
- **`common/` et `lib/` isolent ce qui est remplaçable** : IA, cache, mail côté API ; fonctions du téléphone côté web, prêtes pour Capacitor.
