import jwt from 'jsonwebtoken';

import User from '../models/User';

// JWT config parameters
import authJWTConfig from '../../config/authJWT';

class SessionController {
  /**
   * Creates a new JWT Token for an user, then returns it to the client.
   */
  async store(req, res) {
    // Get user authentication data from request
    const { email, password } = req.body;

    // Checks user email and password exists in the application
    const user = await User.findOne({ where: { email } });

    // Checks if user credentials info are valid,
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
