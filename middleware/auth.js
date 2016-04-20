var jwt = require('jwt-simple'),
    moment = require('moment');

/*
* Login Required Middleware
*/
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = null;

  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired.' });
  }
  //Attaches the user's ID to all requests, so it is accessible in all user controllers on the server side
  req.user_id = payload.user_id;
  //Next means it's all good, keep going. If you don't hit next, that means that the application stopped somewhere.
  //Next moves on to the next function chained in the request:
  // app.get('/api/me', auth.ensureAuthenticated, (NEXT) usersCtrl.showCurrentUser);
  next();
}

/*
* Generate JSON Web Token
*/
function createJWT(user) {
  var payload = {
    user_id: user._id, // required by satellizer
    displayName: user.displayName,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  createJWT: createJWT
};
