//On import le module monk qui permet de communiquer avec la base de donnée MongoDB
const monk = require('monk');


//L'objet DB représente notre connection avec la base 
//C'est dessus qu'on fera les .insert ou find


// const db = monk(process.env.MONGO_URI || 'mongodb+srv://adminpjs4:pjs4base@clusterpjs4-foh5q.mongodb.net/pjs4?retryWrites=true&w=majority');
const db = monk('mongodb+srv://pjs4user:nRu24L0UDpYUVYCm@clusterpjs4-foh5q.mongodb.net/pjs4');

module.exports = db;
