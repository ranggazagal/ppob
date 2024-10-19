const dbConfig = require('../config/db_config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        operatorAlias: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
    });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user_model')(sequelize, Sequelize);
db.banner = require('./banner_model')(sequelize, Sequelize);
db.service_ppob = require('./service_model')(sequelize, Sequelize);
db.transaction_type = require('./transaction_type')(sequelize, Sequelize);
db.transaction = require('./transaction')(sequelize, Sequelize);
module.exports = db;
