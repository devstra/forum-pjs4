
const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors')


//Permet de faire appel au variable d'environnement qu'on va déclarer dans le fichier .env (sera obligatoire pour le déploiement mais on le fait maintenant)
require('dotenv').config()


//On import nos propre module
const auth = require("./routes/auth/index.js");
const search = require("./routes/search/index.js");
const posts = require("./routes/posts/index.js");

//Import le module qui fait la vérification du token dans la requête
const checkToken = require("./routes/middleware/tokenCheck.js")



//On démarre notre application express
app = express();

//Permet à n'importe quelle client d'envoyer des requêtes à ce serveur (cors = Cross origin )
app.use(cors());

//Cela permet à notre serveur de comprendre le JSON
app.use(express.json());

//Permet l'affichage sur l'invite de commande node des requêtes entrante et response sortant (pour le débugage)
app.use(volleyball);
 






//Indique ce qu'il faut faire quand on fait une requête à notre serveur sur la route '/' (route par défaut)
app.get('/',(request,response)=> {

    //A l'intérieur de request on retrouve les données de la requête entrante
    // On utilise la variable response pour répondre à la requête client

    //Avec cette ligne on répond au client et on renvoie un json 
    //Attention cette méthode ne peut être appelé qu'une seule fois
    //On ne peut l'utiliser pour envoyer 2 donnée au client la seconde sera ignoré
    response.json({
        message : "Projet PJS4 \n" + 
         "KEITA TADJER DOUDAEV HAMDOUN CHATER CHATHIANATHAN FOUREL"
    });
});




//Si une requête vient et que c'est /auth on redirige vers le fichier ./auth/index.js
//Dans lequel on à aussi des routes de contruite
//Donc une requête avec le /auth/signup viendra frapper cette ligne a cause de /auth et ira frapper le /signup dans le 
//fichier ./auth/index.js
app.use("/auth",auth);



//A partir d'ici et plus bas toute les personnes
// qui voudront atteindre les routes d'en dessous passerons par cette fonction et devrons
//donc avoir un token dans leur requête
//Tout le reste du code hormi l'authentification sera en dessous de cette ligne
app.use(checkToken.checkTokenSetUser);


//Il sagit de la route pour les recheche d'ami 
app.use("/search",search);


//Il s'agit de la route pour récuperer les post
app.use("/posts",posts);






//Handler pour les erreur qui survient 
app.use(function errorHandler(err, request, response, next) {
    response.status(response.statusCode || 500);
    console.log("Erreur send " + err.stack);
    response.json({
        message: err.message
    })
});



//On démarre notre serveur sur le port 3000
server = app.listen( process.env.PORT || 3000 ,()=>{
    console.log("Server is running on port " + ( process.env.PORT || 3000 ) );
});
