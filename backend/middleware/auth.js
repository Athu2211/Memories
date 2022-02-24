import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //checking the token if it is valid
        //to perform further actions with that user
        const token = req.headers.authorization.split(" ")[1];
        //Manual sign in token
        //length of google sign in token is greater than 500
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            //gives data from each token 
            decodedData = jwt.verify(token, 'testingSoNoSeparateEnv');

            req.userId = decodedData ?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData ?.sub;
            //sub is the name for id in google
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;