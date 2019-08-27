import Sequelize, { Model } from 'sequelize';

class User extends Model {
  // / Method called automatically by sequelize
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

    // Returns the model that was initialized
    return this;
  }
}

export default User;
