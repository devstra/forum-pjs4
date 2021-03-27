const express = require('express');
const db = require('../../db/index.js');
const monk = require("monk");

require('dotenv').config();



const postTable = db.get('posts');
const userTable = db.get('users');
//Router est une classe qui nous permet de crée des routes isolé
const router = express.Router();



/**
 * Fonction qui cherche dans la base des personne dont le nom commence par le 'term' (peut être une chaine de charactère)
 * @param {*} term 
 */
function getPost(filters) {
    return new Promise((resolve, reject) => {
        if (!filters)
            filters = {};
        //On trie selon les date de création (décroissant => plus récent au plus vieux)
        //On limit aussi le nombre de réponse (on met a 10 par défaut si rien n'est spécifié)

        postTable.find({}, { sort: { date_creation: -1 }, limit: (filters.max ? filters.max : 15) })
            .then((data) => {
                data.forEach((element, index, array) => {
                    //On va aussi rajouter les information de la personne qui a posté le message
                    userTable.findOne({ "_id": monk.id(element.posteur)})
                        .then(user => {

                            if (user) {
                                element.posteur = {
                                    username: user.username,
                                    image_url: user.image_url
                                }
                            } else {
                                // console.log("User not found");
                                //Default
                                element.posteur = {
                                    username: "Unknow",
                                    image_url: "http://dummyimage.com/150x150.jpg/5fa2dd/ffffff"
                                }
                            }
                            if (index == data.length - 1) {
                                resolve(data);
                                return;
                            }
                        })
                    
                        // console.log(index);
                });
            })
            .catch(err => reject(err));
    });
}

router.get('/actualite', (request, response, next) => {


    getPost(request.body.filters)
        .then(data => {

            response.json({
                data: data
            });
        })


})


module.exports = router;
