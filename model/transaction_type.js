module.exports = (sequelize, Sequelize) => {
    const TransactionTypePPOB = sequelize.define('transaction_type_ppob', {
        transcation_type_id: {
            primaryKey: true,
            type: Sequelize.NUMBER(11),
        },
        transcation_type_code: {
            type: Sequelize.TEXT,
        },
        transcation_type_operate: {
            type: Sequelize.NUMBER(1),
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName:true,
    });
    return TransactionTypePPOB;
}