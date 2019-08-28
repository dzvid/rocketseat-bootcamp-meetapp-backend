import jwt from 'jsonwebtoken';

import User from '../models/User';

// JWT parameters
import authJWTConfig from '../../config/authJWT';

class SessionController {
  // Create JWT Token
  async store(req, res) {
    // Get user authentication data from request
    const { email, password } = req.body;

    // Checks user email and password exists in the application
    const user = await User.findOne({ where: { email } });

    // Checks if user credentials info are valid, if email or password does not exist (or match)
    // in the application database, returns a error message
    if (!user || !(await user.checkPassword(password))) {
      return res.status(400).json({
        error: 'User authentication failed: email or password is incorrect',
      });
    }

    // if user exist and password matches, generates JWT token passing user id as parameter
    // Extracts user info to generate JWT token.
    const { id, name } = user;

    const token = jwt.sign({ id }, authJWTConfig.secret, {
      expiresIn: authJWTConfig.expiresIn,
    });

    // Returns user (id, name, email) and the jwt token generated
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

export default new SessionController();
