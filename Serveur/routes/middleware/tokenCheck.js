const jwt = require('jsonwebtoken');

function checkTokenSetUser(request, response, next) {
    //We get the token from the header if this if a post request et from params if this is a get request
    const header = request.get('authorization');
    const getRequestToken = request.query.token
    // console.log(request.query);    
    // console.log(getRequestToken);


    if (header && header.split(' ').length > 1 || getRequestToken ) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenVerified) => {
            if (err) {
                console.log(err);
                response.status(400);
                response.json({
                    "message" : "token expire",
                    err
                });
                next();
            } else {
                //if token is not expired
                //  console.log(tokenVerified);

                if (tokenVerified.iat < tokenVerified.exp) {
                    request.user = tokenVerified;
                };
            }

            next();
        });
    } else {
        next(new Error('You are not allowed on this server!'));
    }
}


function isLogginIn(request, response, next) {

    if (request.user) {
        next();
    } else {
        const error = new Error('unautorized');
        response.status(401);
        response.json({
            message: error.message
        });
    }
}


function checkTokenInSocket(socket, next) {
    const token = socket.handshake.query.token;
    if (!token) {
        //if we there are no token in socket we banish the id
        socket.conn.close();
        next(new Error('You are not allowed on this server!'));
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenVerified) => {
            if (err) {

                console.log(err);

            } else {
                //if token is not expired
                //  console.log(tokenVerified);

                if (tokenVerified.iat < tokenVerified.exp) {
                    socket.user = {
                        "username": tokenVerified.username,
                        "id": tokenVerified.id
                    };
                    // console.log("Socket user")
                    // console.log(socket.user);
                };
            }

            next();
        });
    }
    next();
}


module.exports = {
    checkTokenSetUser,
    isLogginIn,
    checkTokenInSocket
};