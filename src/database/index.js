import Sequelize from 'sequelize';
// Import all our models
import User from '../app/models/User';
import File from '../app/models/File';

// Import the database configuration
import databaseConfig from '../config/database';

// Group all models in a array
const models = [User, File];

// Model loader: Connects to the database and loads all the models (maps bd tables to Models)
class Database {
  constructor() {
    this.init();
  }

  init() {
    // Connects to the database
    this.connection = new Sequelize(databaseConfig);

    // Load our models
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
