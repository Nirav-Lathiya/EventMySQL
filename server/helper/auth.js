const jwt = require('jsonwebtoken');
const APIError = require('./APIErrors')

const createJWT = (data) => {
   let token = jwt.sign(data, 'secret', {
       expiresIn:'1d'
   });

   return token;
}

const verifyJWT = async(token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', (err,decoded) => {
            if(err){
              reject(err)
            }
            resolve(decoded)
        })
    })
}

const authorize = async (req, res, next) => {
    try {
      let token;
      let error;
      if (req.headers.authorization) {
        if (
          typeof req.headers.authorization !== 'string' ||
          req.headers.authorization.indexOf('Bearer ') === -1
        ) {
          error = 'bad authorization';
        } else {
          token = req.headers.authorization.split(' ')[1];
        }
      } else {
        error = 'token not provided';
      }
  
      if (!token && error) {
        return next(new APIError(error, httpStatus.UNAUTHORIZED, true));
      }
  
      return jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err || !decoded || !decoded.userId) {
          return next(new APIError('bad token', httpStatus.UNAUTHORIZED, true));
        }
        const userObj = await user.findOne({ _id: decoded.userId });
        if (!userObj)
          return next(new APIError('user not found', httpStatus.NOT_FOUND, true));
        if (!userObj.activeSessions.includes(token))
          return next(
            new APIError(
              'Session expired. you have been logged out, please log in again!',
              httpStatus.UNAUTHORIZED,
              true
            )
          );
  
        req.user = userObj;
        return next();
      });
    } catch (err) {
      return next(
        new APIError(err.message, httpStatus.INTERNAL_SERVER_ERROR, true, err)
      );
    }
  };

  module.exports = {
      createJWT,
      verifyJWT,
      authorize,
  }
  

