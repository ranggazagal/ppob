module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        
        user_id: {
            primaryKey: true,
            type: Sequelize.NUMBER(11),
        },
        user_first_name: {
            type: Sequelize.TEXT,
        },
        user_last_name: {
            type: Sequelize.TEXT,
        },
        user_password: {
            type: Sequelize.TEXT,
        },
        user_email: {
            type: Sequelize.TEXT,
        },
        is_active: {
            type: Sequelize.NUMBER(1),
        },
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
        freezeTableName:true,
    });
    return User;
}