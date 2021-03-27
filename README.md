# Comment installer/utiliser ce repo?

Après avoir cloner ce repository sur votre pc, ouvrer une fenetre cmd dans ce dossier et faite des `cd` pour etre dans le dossier Serveur ou le dossier client.
Ensuite, éxecutez la commande `npm install` pour installer toutes les dépendances automatiquement. Il faut avoir installer node.js au préalable pour que ça fonctionne bien sur.

J'ai mis à jour le fichier package.json avec les bonnes dépendances donc normalement y'aura pas d'erreurs.

/!\ Le front et le back ont été séparé dans deux dossiers du coup il faudra aussi éxecuter `npm install` dans l'autre dossier (client ou Serveur) si vous voulez travailler sur les deux.

# Lancer le serveur

Pour lancer le serveur il suffit de se positionner dans le dossier Serveur dans un fenetre cmd et d'entrer `npm start`
Le serveur doit se lancer sur le port 3000 normalement.

# Lancer le serveur de développement Vue (front-end)

Pour lancer il suffit de se positionner dans le dossier client cette fois-ci et d'entrer `npm run serve`
Le serveur doit se lancer sur `http://localhost:8080`.


# Installer des nouvelles lib/dépendances

Pour ajouter des libs au projet installez-les avec la commande `npm install <nom_du_package> --save` pour qu'ils soit également ajouter commen dépendaces au fichiers package.js.
Ca évitera de perdre du temps à installer toutes les dépendances une par une quoi.