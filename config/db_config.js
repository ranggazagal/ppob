module.exports = {
    HOST: 'mysql.railway.internal',
    USER: 'root',
    PASSWORD: 'PyTNSKKFXFdGGHAbuOdZInbRwWTfJDmk',
    DB: 'railway',
    dialect: 'mysql',
    PORT:'3306',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}
