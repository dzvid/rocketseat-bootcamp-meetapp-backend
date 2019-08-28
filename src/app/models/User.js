import Sequelize, { Model } from 'sequelize';

// Library for encrypt User password
import bcrypt from 'bcryptjs';

class User extends Model {
  // Method called automatically by sequelize
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Hashs user password and stores it
    // Executed automatically when user is created (store) or updated (update)
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    // Returns the model that was initialized (an instance)
    return this;
  }

  // Checks if a given user password matches with the stored password
  // Return true if it matches, otherwise false
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
