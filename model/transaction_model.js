module.exports = (sequelize, Sequelize) => {
    const Trx = sequelize.define('transaction', {
        TrxCode: {
            primaryKey: true,
            type: Sequelize.NUMBER,
        },
        VehcTypeCode: {
            type: Sequelize.TEXT(10),
        },
        VehicleCode: {
            type: Sequelize.TEXT(10),
        },
        Price: {
            type: Sequelize.NUMBER,
        },
        BookingDate: {
            type: Sequelize.DATE,
        },
        WaitingInDays: {
            type: Sequelize.NUMBER,
        },
        PathFile: {
            type: Sequelize.TEXT,
        },
        Phone: {
            type: Sequelize.TEXT(15),
        },
        Email: {
            type: Sequelize.TEXT(50),
        },
        Name: {
            type: Sequelize.TEXT(50),
        },
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        freezeTableName:true
    });
    return Trx;
}