module.exports = (sequelize, Sequelize) => {
    const ServicePPOB = sequelize.define('service_ppob', {
        service_id: {
            primaryKey: true,
            type: Sequelize.NUMBER(11),
        },
        service_code: {
            type: Sequelize.TEXT,
        },
        service_name: {
            type: Sequelize.TEXT,
        },
        service_icon: {
            type: Sequelize.TEXT,
        },
        service_tarif: {
            type: Sequelize.NUMBER(11),
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName:true,
    });
    return ServicePPOB;
}