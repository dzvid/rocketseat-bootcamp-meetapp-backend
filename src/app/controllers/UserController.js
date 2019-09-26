import User from '../models/User';

class UserController {
  /**
   * Create a new user. Returns id, name and email of the user created.
   * If the user already exists, returns an error message.
   */
  async store(req, res) {
    // Checks if user already exists in the application
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // Verify if user exists in database
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // If user does not exist, register user in the application
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  /**
   * Update user information (PUT /users)
   */
  async update(req, res) {
    const { email, oldPassword } = req.body;
    // Retrieve current user from database
    const user = await User.findByPk(req.userId);

    // In case user wants to update email, check if email field was declared and
    // if its already in use by another user
    if (email && email !== user.email) {
      const userEmailExists = await User.findOne({
        where: { email },
      });

      if (userEmailExists) {
        return res.status(400).json({ error: 'User email already in use' });
      }
    }

    // In case user wants to udpate the password, verify if user old password matchs current password
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old password does not match' });
    }

    // Updates user information
    const { id, name, email: userEmail } = await user.update(req.body);

    return res.json({ id, name, email: userEmail });
  }
}

export default new UserController();
