# CLAUDE.md — Licornes

> Site web magique pour Andrea (3 ans) et Suzanne (6 ans).

---

## Contexte du projet

### Client
- **Nom** : Projet personnel (nièces de Michel)
- **URL** : licornes.kupfer.cloud
- **Hébergement** : VPS2 via Dokploy
- **Langue** : Français uniquement

### Description
Site interactif et ludique sur le thème des licornes, avec des activités adaptées à deux tranches d'âge : 3 ans (Andrea) et 6 ans (Suzanne).

### Public cible
- **Andrea (3 ans)** : Contenu simple, gros boutons, sons, couleurs vives
- **Suzanne (6 ans)** : Mini-jeux, histoires, création, quiz

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Nuxt 3 + TypeScript |
| UI | Tailwind CSS (thème licorne personnalisé) |
| Animations | GSAP + CSS Animations |
| Audio | Howler.js (sons et musique) |
| Canvas | Fabric.js (coloriage) |
| Stockage | LocalStorage (sauvegardes locales) |
| Images | @nuxt/image (WebP optimisé) |

### Pas besoin de :
- Base de données (tout en local/statique)
- Authentification
- i18n multilingue (FR uniquement)
- Prisma

---

## Architecture des pages

```
pages/
├── index.vue              # Accueil - Choix du profil (Andrea/Suzanne)
├── andrea/                # Section 3 ans
│   ├── index.vue          # Menu Andrea
│   ├── coloriage.vue      # Coloriage tactile
│   ├── sons.vue           # Licornes qui font des sons
│   ├── album.vue          # Galerie d'images
│   └── comptines.vue      # Petites chansons
├── suzanne/               # Section 6 ans
│   ├── index.vue          # Menu Suzanne
│   ├── histoires/         # Histoires interactives
│   │   ├── index.vue      # Liste des histoires
│   │   └── [slug].vue     # Histoire dynamique
│   ├── jeux/              # Mini-jeux
│   │   ├── index.vue      # Liste des jeux
│   │   ├── memory.vue     # Memory des licornes
│   │   ├── etoiles.vue    # Attrape les étoiles
│   │   └── labyrinthe.vue # Labyrinthe arc-en-ciel
│   ├── createur.vue       # Créateur de licorne
│   └── quiz.vue           # Quiz magique
└── partage/               # Contenu commun
    ├── monde.vue          # Carte du royaume
    └── surprise.vue       # Surprise du jour
```

---

## Charte graphique

### Couleurs (thème Licorne)

```css
:root {
  /* Couleurs principales */
  --rose-licorne: #FF69B4;      /* Hot Pink */
  --violet-magique: #9B59B6;    /* Violet */
  --bleu-ciel: #87CEEB;         /* Sky Blue */
  --turquoise: #40E0D0;         /* Turquoise */

  /* Arc-en-ciel */
  --arc-rouge: #FF6B6B;
  --arc-orange: #FFA500;
  --arc-jaune: #FFD93D;
  --arc-vert: #6BCB77;
  --arc-bleu: #4D96FF;
  --arc-violet: #9B59B6;

  /* Neutres magiques */
  --blanc-nuage: #FFF8F0;
  --dore: #FFD700;
  --argent: #C0C0C0;
}
```

### Typographies
- **Titres** : Police fantaisie arrondie (Bubblegum Sans ou similaire)
- **Texte** : Police lisible et douce (Quicksand)

### Principes UI enfants
- Boutons XXL (min 60px tactile)
- Coins très arrondis (border-radius: 24px+)
- Ombres douces et colorées
- Animations de rebond (bounce)
- Feedback sonore sur chaque action
- Pas de texte pour Andrea (icônes uniquement)

---

## Fonctionnalités MVP

### Priorité 1 — Lancement

- [x] Page d'accueil avec choix du profil
- [x] Section Andrea : Coloriage tactile
- [x] Section Andrea : Sons des licornes
- [x] Section Suzanne : Créateur de licorne
- [x] Section Suzanne : Memory

### Priorité 2 — Enrichissement

- [x] Section Andrea : Album photos
- [x] Section Andrea : Comptines
- [x] Section Suzanne : Histoires interactives (1 histoire)
- [x] Section Suzanne : Quiz magique
- [ ] Carte du royaume (commun)

### Priorité 3 — Bonus

- [ ] Section Suzanne : Labyrinthe
- [ ] Section Suzanne : Attrape les étoiles
- [ ] Surprise du jour
- [ ] Mode nuit / berceuse

---

## Assets à créer/trouver

### Images
- [ ] Licornes (différents styles, poses)
- [ ] Arrière-plans (château, forêt, arc-en-ciel, nuages)
- [ ] Éléments décoratifs (étoiles, cœurs, fleurs)
- [ ] Icônes pour navigation

### Sons
- [ ] Hennissement de licorne
- [ ] Magie / étincelles
- [ ] Sons de succès (fanfare, applaudissements)
- [ ] Musique de fond douce
- [ ] Comptines

---

## Commandes

```bash
# Développement
npm run dev

# Build
npm run build

# Prévisualisation build
npm run preview
```

---

## Déploiement

| Environnement | URL | Branche |
|---------------|-----|---------|
| Production | licornes.kupfer.cloud | `main` |

### Workflow
```
Code local → git push → GitHub → Dokploy auto-deploy (VPS2)
```

---

## Notes techniques

### Accessibilité enfants
- Navigation au clavier pour les parents
- Pas de publicités ni liens externes
- Pas de formulaires ni données personnelles
- Mode plein écran pour tablette

### Performance
- Images optimisées WebP
- Lazy loading des assets
- Préchargement des sons
- Cache agressif (site statique)

---

*Projet Licornes v1.0 — 30 janvier 2026*
