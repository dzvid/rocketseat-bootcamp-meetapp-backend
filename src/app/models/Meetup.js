import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        banner_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    // Return the model initizalized
    return this;
  }

  // Create relationships
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      key: 'id',
      as: 'organizer',
    });
    this.belongsTo(models.File, {
      foreignKey: 'banner_id',
      key: 'id',
      as: 'banner',
    });
  }
}

export default Meetup;
