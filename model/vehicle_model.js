module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define('vehicle', {
        
        VehicleCode: {
            primaryKey: true,
            type: Sequelize.TEXT(10),
        },
        VehicleName: {
            type: Sequelize.TEXT(50),
        },
        VehicleColor: {
            type: Sequelize.TEXT(50),
        },
        VehiclePrice: {
            type: Sequelize.NUMBER,
        },
        VehcTypeCode: {
            type: Sequelize.TEXT(10),
        },
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
    return Vehicle;
}