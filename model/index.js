const dbConfig = require('../config/db_config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
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

// define semua models yang ada pada aplikasi
db.vechtype = require('./vehctype_model')(sequelize, Sequelize);
db.vehicle = require('./vehicle_model')(sequelize, Sequelize);
db.transaction = require('./transaction_model')(sequelize, Sequelize);
module.exports = db;
