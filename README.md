# landrytchouela.com

Portfolio bilingue en un seul fichier HTML. Tout le texte est dans `content.mjs`.

## Mettre à jour le site

1. Modifier `content.mjs`. Après un stage : retirer `current: true`, ajuster `site.intro`, `site.availability` et `site.updated`, ajouter le nouveau stage en tête de `jobs`.
2. Lancer `npm ci && node build.mjs` pour vérifier le résultat dans `public/index.html`.
3. Pousser sur `main`. L'action GitHub reconstruit le site et publie `public/` sur la branche `deploy`, que Hostinger sert dans `public_html`.

## Structure

- `content.mjs` : tout le contenu FR/EN
- `src/styles.css`, `src/app.js` : style et démo du lien de données
- `static/` : `.htaccess`, `404.html`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og.png`
- `public/` : le site généré, à ne pas modifier à la main

## Règles de contenu

- Ni adresse ni téléphone sur le site public.
- Pas de photo ni de chiffre inventés.
- « Ingénieur » est un titre réservé au Québec : garder « étudiant en génie ».
