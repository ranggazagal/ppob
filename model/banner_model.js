module.exports = (sequelize, Sequelize) => {
    const Banner = sequelize.define('banner_ppob', {
        banner_id: {
            primaryKey: true,
            type: Sequelize.NUMBER(11),
        },
        banner_name: {
            type: Sequelize.TEXT,
        },
        banner_image: {
            type: Sequelize.TEXT,
        },
        banner_description: {
            type: Sequelize.TEXT,
        },
        is_active: {
            type: Sequelize.NUMBER(1),
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName:true,
    });
    return Banner;
}