module.exports = (sequelize, Sequelize) => {
    const TransactionPPOB = sequelize.define('transaction_ppob', {
        transaction_id: {
            primaryKey: true,
            type: Sequelize.NUMBER(11),
        },
        transaction_code: {
            type: Sequelize.TEXT(15),
        },
        transaction_date: {
            type: Sequelize.DATE,
        },
        transaction_amount: {
            type: Sequelize.NUMBER(11),
        },
        latest_balance: {
            type: Sequelize.NUMBER(11),
        },
        updated_balance: {
            type: Sequelize.NUMBER(11),
        },
        transaction_type_id: {
            type: Sequelize.NUMBER(11),
        },
        user_id: {
            type: Sequelize.NUMBER(11),
        },
        service_id: {
            type: Sequelize.NUMBER(11),
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName:true,
    });
    return TransactionPPOB;
}