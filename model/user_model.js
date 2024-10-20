module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user_ppob', {
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
        user_profile_image: {
            type: Sequelize.NUMBER(1),
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName:true,
    });
    return User;
}