import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import ProductModel from './products.js';
import CustomerModel from './customers.js';
import OrderModel from './orders.js';
import UserModel from './users.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Initialize models
const Product = ProductModel(sequelize, Sequelize.DataTypes);
const Customer = CustomerModel(sequelize, Sequelize.DataTypes);
const Order = OrderModel(sequelize, Sequelize.DataTypes);
const User = UserModel(sequelize, Sequelize.DataTypes);

// Define relationships if any
Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

// Export models and sequelize connection
export {
  sequelize,
  Product,
  Customer,
  Order,
  User
};
