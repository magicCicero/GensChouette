const runQuery = require('../utils/database');;

exports.loginUser = async (req) => {
    console.log(req.body.email, " <<<  req.body.email");
    const connect = await runQuery();
    const [rows, fields] = await connect.query('SELECT * FROM user WHERE email = ? AND pwd = ?', [req.body.email, req.body.pwd])
    if (rows.length === 0) {
        return false;
    } else {
        return rows;
    }
}

exports.regUser = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('INSERT INTO user (name, email, phone, pwd, permission) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.email, req.body.phone, req.body.pwd, req.body.role])
    if (rows.length === 0) {
        return false;
    } else {
        return rows;
    }
}

exports.getPassCode = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('SELECT * FROM user WHERE email = ?', [req.body.email])
    return rows;
}

exports.setPassCode = async (req, passCode) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('UPDATE user SET pass = ? WHERE email = ?', [passCode, req.body.email])
    return rows;
}

exports.resetPwd = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('UPDATE user SET pwd = ? WHERE email = ?', [req.body.pwd, req.body.email])
    return rows;
}

exports.getUser = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('SELECT * FROM user');
    return rows
}

exports.delUser = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('DELETE FROM user WHERE id = ?', [req.body.id])
    return rows
}