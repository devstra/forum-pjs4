const express = require('express');
const db = require('../../db/index.js');
const bcrypt = require('bcrypt');
const Joi = require("Joi");

require('dotenv').config();
const jwt = require("jsonwebtoken");



const usersTable = db.get('users');
usersTable.createIndex('username', { unique: true });

//Variable utilisé pour générer le mot de passe hashé
const saltRounds = 10;


//Le shéma va être utilisé avec la libs Joi elle vérifie que le json recu lors de l'inscription contient bien tout les champs requie
//Ici on dit qu'on doit avoir un username (max 30 char),un password,un email
const schema = Joi.object().keys({
    username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]*$)/).min(3).max(30).required(),
    password: Joi.string().trim().min(6).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
});


//Router est une classe qui nous permet de crée des routes isolé
const router = express.Router();



router.get('/', (resq, resp) => {

    resp.json({
        message: "You are on router !"
    });
})


// La route qu'on viendra frapper pour crée un nouvel utilisateur
router.post('/signup', (request, response, next) => {

    //On retrouve dans request.body le json qui nous a été envoyé depuis le client
    console.log(request.body);


    //On utilise Joi pour valider le format du JSON
    const result = Joi.validate(request.body, schema);

    console.log(result.error);

    if (result.error == null) {
        //Test si l'username est déjà utilisé
        usersTable.findOne({ username: request.body.username })
            .then(user => {
                if (user) {
                    response.json({
                        message: 'Utilisateur existe déjà'
                    });
                } else {
                    //On va donc ici insérer les données dans la base mais avant on hash le mdp
                    bcrypt.hash(request.body.password, saltRounds).then(function (hash) {

                        //Donnée manquante date de naissance et lien pour l'image du profil et langue parlé
                        var data = {
                            username: request.body.username,
                            password: hash,
                            email: request.body.email,
                            date_creation: new Date()
                        };
                        //On insert dans la base
                        usersTable.insert(data)
                            .then(function (tuple) {
                                delete data.password

                                //On répond en disant que tout s'est bien passé
                                response.json({
                                    message: 'I got you!',
                                    insertion: data
                                });
                            });
                    });
                }
            })

    } else {
        response.status(406);
        response.json({
            message: 'Format incorrect',
            error : result.error
        })
    }



});


router.post('/signin', (request, response, next) => {

    console.log(request.body);

    //Faire de la gestion d'erreur si des champs ne sont pas présent


    //On cherche dans la table user une ligne avec la l'username qui colle
    usersTable.findOne({ username: request.body.username })
        .then((user) => {
            console.log(user);
            //Le if (user) vérifie si on a un résultat à notre requête
            if (user) {

                console.log(user)
                //On utilise le module bcrypt pr tester si le mot de passe que le gars
                //a taper colle avec la version hasher dans la BDD
                bcrypt.compare(request.body.password, user.password)
                    .then((res) => {


                        //Si on à un resulat sa veut dire que c'est bon
                        if (res) {

                            //Generation of token 
                            //On encode l'id de l'user dans le token ainsi que son username
                            const payload = {
                                id: user._id,
                                username: user.username
                            };
                            //On définit un date d'expiration (1 jours de validité)
                            const expireTime = {
                                expiresIn: '1d'
                            };
                            console.log(process.env.TOKEN_SECRET);


                            // On génère le token à l'aide du TOKEN SECRET qui est à protéger ABSOLUMENT
                            //Car si on le perd on pourra générer des faux token d'accès
                            jwt.sign(payload, process.env.TOKEN_SECRET, expireTime, (err, token) => {
                                console.log(err)
                                
                                if (err) {
                                    response.status(422);
                                    response.json({
                                        message: "Please try later the server is on maintenance"
                                    })
                                } else {

                                    //On va également renvoyé des info sur l'utilisateur on supprime donc les champs
                                    //trop comprometant avant de renvoyé

                                    delete user.password;

                                    response.json({
                                        message: "Clear",
                                        token,
                                        user
                                    });
                                }
                            });
                        } else {
                            response.status(422);
                            response.json({
                                message: "Nom d'utillisateur ou mot de passe incorrect"
                            });
                        }
                    })
            } else {
                response.status(422);
                response.json({
                    message: "Nom d'utillisateur ou mot de passe incorrect"
                });
            }
        });

});




module.exports = router;
