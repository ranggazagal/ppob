module.exports = (sequelize, Sequelize) => {
    const TransactionTypePPOB = sequelize.define('transaction_type_ppob', {
        transaction_type_id: {
            primaryKey: true,
            type: Sequelize.NUMBER(11),
        },
        transaction_type_code: {
            type: Sequelize.TEXT,
        },
        transaction_type_operate: {
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