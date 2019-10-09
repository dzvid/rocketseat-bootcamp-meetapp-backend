import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        modelName: 'subscriptions',
      }
    );

    // Return initialized model
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meetup, {
      foreignKey: 'meetup_id',
      as: 'meetup',
      key: 'id',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      key: 'id',
    });
  }
}

export default Subscription;
