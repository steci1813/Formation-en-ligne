# Site formation — Étude de marché

Ce dossier contient une première version de site autonome pour gérer une formation en ligne sans Notion.

## Ce que le site permet déjà

- Afficher les modules du cours.
- Afficher les ressources et livrables.
- Marquer une progression côté élève, enregistrée sur l'appareil.
- Déposer un livrable sous forme de lien ou commentaire.
- Ajouter des modules depuis l'espace Gestion.
- Ajouter des élèves et voir leurs derniers dépôts.
- Exporter/importer les données en JSON.

## Fichiers

- `index.html` : structure du site.
- `styles.css` : design et responsive mobile.
- `app.js` : logique, données, import/export, stockage local.
- `README.md` : explications.

## Important

Cette version est un site statique. Elle fonctionne sans serveur, mais les données sont stockées dans le navigateur via `localStorage`.

Pour une vraie formation en ligne multi-élèves avec comptes, mots de passe, base de données et dépôts centralisés, il faudra connecter le site à un backend comme Supabase, Firebase, Airtable, ou une API personnalisée.

## Mise en ligne simple

Options faciles :

1. Netlify : glisser-déposer le dossier du site.
2. Vercel : importer le dossier.
3. GitHub Pages : publier les fichiers.
4. Hébergeur classique : envoyer les fichiers dans `public_html`.

## Comment remplacer Notion

1. Ouvre l'onglet `Gestion`.
2. Modifie les infos générales.
3. Ajoute ou supprime les modules.
4. Ajoute les liens des vidéos, PDF, Drive, Canva, etc.
5. Exporte régulièrement le JSON pour garder une sauvegarde.

## Pour aller plus loin

Prochaines améliorations conseillées :

- Authentification admin.
- Espace élève avec identifiant.
- Tableau de progression centralisé.
- Dépôt de fichiers réel.
- Notifications WhatsApp ou email.
- Paiement en ligne si la formation devient payante.
