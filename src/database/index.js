import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Delivery from '../app/models/Delivery';
import Order from '../app/models/Order';

const models = [User, Recipient, Delivery, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
