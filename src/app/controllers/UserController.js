// Import User model
import User from '../models/User';

class UserController {
  // Cadastro de usuário (POST /users)
  async store(req, res) {
    // TODO - Validate input
    // Get user data from request body
    const { name, email, password } = req.body;

    // SAVE USER TO DATABASE
    // Checks if user already exists (verify if user email is in the database)
    const userExists = await User.findOne({ where: { email } });

    // If user exists, returns error message
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // If user does not exist, register user in the application
    // and returns some user info to frontend (at the moment to generate session token)
    // { name, email, password }) -> req.body
    const user = await User.create({ name, email, password_hash: password });

    return res.json({ id: user.id, name, email });
  }
}

export default new UserController();
