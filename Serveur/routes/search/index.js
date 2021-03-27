const express = require('express');
const db = require('../../db/index.js');

require('dotenv').config();



const usersTable = db.get('users');
usersTable.createIndex('username', { unique: true });
//Router est une classe qui nous permet de crée des routes isolé
const router = express.Router();



/**
 * Fonction qui cherche dans la base des personne dont le nom commence par le 'term' (peut être une chaine de charactère)
 * @param {*} term 
 */
function searchFriend(term, filter) {
    if(!filter){
        filter =  {}
    }
    return new Promise((resolve, reject) => {
        var query = {
            username: {
                $regex: "^" + term, // ^ veut dire que le mot doit commencer par l'expression qui suit
                $options: 'm' //i: ignore case, m: multiline, etc
            }
        };


        usersTable.find(query, { limit: (filter.max ? filters.max : 10) })
            .then((users) => {

                data = [];
                users.forEach(element => {
                    data.push({
                        username: element.username,
                        email: element.email,
                        image_url: element.image_url
                    })
                });
                resolve(data);
            })
            .catch(err => reject(err));
    });
}



router.get('/', (request, response, next) => {


    if (!request.query.term) {
        next(Error("Il manque pamarètre 'term'"));
        return;
    }

    searchFriend(request.query.term)
        .then(data => {
            response.json({
                data
            });
        })

})


module.exports = router;
