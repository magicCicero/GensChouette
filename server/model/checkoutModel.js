const runQuery = require("../utils/database");

exports.insertOrder = async (values) => {
    const connect = await runQuery();
    const insertOrderQuery = `
        INSERT INTO orders (
          userId, productId, orderId, status
        ) VALUES (?, ?, ?, ?)
    `;

    const [rows, fields] = await connect.query(insertOrderQuery, values);
    if (rows.length === 0) {
        return false;
    } else {
        return rows;
    }
}

exports.insertTransaction = async (values) => {
    console.log(req.body)
    const connect = await runQuery();
    const insertTransactionQuery = `
        INSERT INTO transactions (
          orderId, userId, productId, checkoutSessionId, chargePermissionId, chargeId, amount, status, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [rows, fields] = await connect.query(insertTransactionQuery, values);
    if (rows.length === 0) {
        return false;
    } else {
        return rows;
    }
}