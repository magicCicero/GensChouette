const runQuery = require('../utils/database');;

exports.addProduct = async (req) => {
    console.log(req.body)
    const connect = await runQuery();
    var size = JSON.stringify(req.body.size)
    const [rows, fields] = await connect.query('INSERT INTO product (img, brand, intro, size, review, type, sex, price, matchType, casual, preprice, userID, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.file, req.body.brand, req.body.intro, size, 5, req.body.type, req.body.sex, req.body.price, req.body.matchType, req.body.casual, req.body.prePrice, req.body.userID, 0])
    if (rows.length === 0) {
        return false;
    } else {
        return rows;
    }
}

exports.getProductByUserID = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('SELECT * FROM product WHERE userID = ? AND status = 0', [req.body.userID]);
    if (rows.length === 0) {
        return [];
    } else {
        return rows;
    }
}

exports.deleteProduct = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('UPDATE product SET status = 1 WHERE id = ?', [req.body.id]);
    if (rows) {
        return true;
    } else {
        return false;
    }
}

exports.editProduct = async (req) => {
    const connect = await runQuery();
    var size = JSON.stringify(req.body.size)
    if (req.body.file) {
        const [rows, fields] = await connect.query('UPDATE product SET img = ?, brand = ?, intro = ?, size = ?, review = ?, type = ?, sex = ?, price = ?, matchType = ?, casual = ?, preprice = ? WHERE id = ?', [req.body.file, req.body.brand, req.body.intro, size, req.body.review, req.body.type, req.body.sex, req.body.price, req.body.matchType, req.body.casual, req.body.prePrice, req.body.productID])
    } else {
        const [rows, fields] = await connect.query('UPDATE product SET brand = ?, intro = ?, size = ?, review = ?, type = ?, sex = ?, price = ?, matchType = ?, casual = ?, preprice = ? WHERE id = ?', [req.body.brand, req.body.intro, size, req.body.review, req.body.type, req.body.sex, req.body.price, req.body.matchType, req.body.casual, req.body.prePrice, req.body.productID])
    }

    return true;
}

exports.getProduct = async (req) => {
    const connect = await runQuery()
    var query = 'SELECT * FROM product'
    var queryValue = []
    if (req.body.size.length !== 0) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        req.body.size.map((element, idx) => {
            if (idx !== 0) {
                query += ' OR'
            } else {
                query += ' ('
            }
            query += ' size = ?'
            queryValue.push(element)
        })
        query += ')'
    }
    if (req.body.review.length !== 0) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        req.body.review.map((element, idx) => {
            if (idx !== 0) {
                query += ' OR'
            } else {
                query += ' ('
            }
            query += ' review = ?'
            queryValue.push(element)
        })
        query += ')'
    }
    if (req.body.type.length !== 0) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        req.body.type.map((element, idx) => {
            if (idx !== 0) {
                query += ' OR'
            } else {
                query += ' ('
            }
            query += ' type = ?'
            queryValue.push(element)
        })
        query += ')'
    }

    if (req.body.sex.length !== 0) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        req.body.sex.map((element, idx) => {
            if (idx !== 0) {
                query += ' OR'
            } else {
                query += ' ('
            }
            query += ' sex = ?'
            queryValue.push(element)
        })
        query += ')'
    }

    if (req.body.matchType.length !== 0) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        req.body.matchType.map((element, idx) => {
            if (idx !== 0) {
                query += ' OR'
            } else {
                query += ' ('
            }
            query += ' matchType = ?'
            queryValue.push(element)
        })
        query += ')'
    }

    if (req.body.casual.length !== 0) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        req.body.casual.map((element, idx) => {
            if (idx !== 0) {
                query += ' OR'
            } else {
                query += ' ('
            }
            query += ' casual = ?'
            queryValue.push(element)
        })

        query += ')'
    }

    if (req.body.minPrice) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        query += ' price >= ?'
        queryValue.push(req.body.minPrice)
    }

    if (req.body.maxPrice) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        query += ' price <= ?'
        queryValue.push(req.body.maxPrice)
    }

    if (req.body.search) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        query += ' (intro LIKE ? OR brand LIKE ?)'
        queryValue.push("%" + req.body.search + '%')
        queryValue.push("%" + req.body.search + '%')
    }

    if (req.body.userID) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        query += ' userID = ?'
        queryValue.push(req.body.userID)
    }

    if (req.body.new) {
        if (queryValue.length === 0) {
            query += ' WHERE'
        } else {
            query += ' AND'
        }
        query += ' date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)'
    }

    if (req.body.discount) {
        if (queryValue.length !== 0 || req.body.new) {
            query += ' AND'
        } else {
            query += ' WHERE'
        }
        query += ' preprice != ""'
    }

    const [rows, fields] = await connect.query(query, queryValue)
    return rows
}

exports.getProductByProductID = async (req) => {
    const connect = await runQuery();
    const [rows, fields] = await connect.query('SELECT * FROM product WHERE id = ?', [req.body.id])
    return rows;
}