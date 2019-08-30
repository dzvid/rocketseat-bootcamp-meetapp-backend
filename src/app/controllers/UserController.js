// Import User model
import User from '../models/User';

class UserController {
  // Create (register) user (POST /users)
  async store(req, res) {
    // TODO - Validate input

    // SAVE USER TO DATABASE
    // Get user data from request body
    const { name, email, password } = req.body;

    // Checks if user already exists (verify if user email is in the database)
    const userExists = await User.findOne({ where: { email } });

    // If user exists, returns error message to client
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // If user does not exist, register user in the application
    // and returns some user info to client (at the moment to generate session token)
    // { name, email, password }) -> req.body
    const user = await User.create({ name, email, password });

    return res.json({ id: user.id, name, email });
  }

  // Update user information (PUT /users)
  async update(req, res) {
    // TODO - Verify if inputs are really valid
    // Get user information from request
    const { email, oldPassword } = req.body;

    // Retrieve current user from database
    // Check if user still exists in database
    const user = await User.findByPk(req.userId);

    // Check if email is different of current user email and if is already in use by other user
    if (email !== user.email) {
      const userEmailExists = await User.findOne({ where: { email } });

      if (userEmailExists) {
        return res.status(400).json({ error: 'User email already in use' });
      }
    }

    // Verify if user password matchs current password
    // TODO - Verify if user wants to change password
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // After validating user email and password, updates user info
    // then, returns user info: id, name and email
    // TODO - Verify what informations user wants to update and then pass only the parameters to be updated
    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
