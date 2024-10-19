module.exports = (sequelize, Sequelize) => {
    const VehcType = sequelize.define('vehctype', {
        
        VehcTypeCode: {
            primaryKey: true,
            type: Sequelize.TEXT(50),
        },
        VehcTypeName: {
            type: Sequelize.TEXT,
        },
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
    return VehcType;
}