import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// JWT parameters
import authJWTConfig from '../../config/authJWT';

// Middleware to process user JWT token and verify if user is logged in the
// application (authenticated) and checks if the session is still valid.
export default async (req, res, next) => {
  // Get jwt token from request headers
  const authHeader = req.headers.authorization;

  // Verify if token exists
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // If token exists, extracts and decode user token from request body
  // the jwt token in request come as a string in format "Bearer token"
  // It is necessary to extract the second argument using array destructuring assignment
  const [, token] = authHeader.split(' ');

  try {
    // Decode JWT token
    const decodedToken = await promisify(jwt.verify)(
      token,
      authJWTConfig.secret
    );

    // TODO - Check if token has expired
    // If the token was successfully decoded, we can extract user identification (id)
    // from the token and include in the request for further use
    req.userId = decodedToken.id;

    // Continues to the next middleware/route
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
