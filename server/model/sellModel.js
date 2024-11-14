const runQuery = require("../utils/database");

exports.getSellByUserID = async (req) => {
  const connect = await runQuery();
  const [rows, fields] = await connect.query(
    "SELECT sell.productID, sell.sellSize, sell.sellReview, sell.sellDate, sell.buyUserID, sell.buyUserName, sell.sellUserID, sell.sellUserName, sell.coolingOff AS coolingOffState, product.img, product.brand, product.intro, product.size, product.review, product.type, product.sex, product.price, product.matchType, product.casual, product.preprice, product.userID, product.date FROM sell LEFT JOIN product ON sell.productID = product.id WHERE sell.sellUserID = ? ORDER BY sell.id DESC",
    [req.body.userID]
  );
  if (rows.length === 0) {
    return false;
  } else {
    return rows;
  }
};

exports.getSellInfoByBuyerID = async (req) => {
  const connect = await runQuery();
  const [rows, fields] = await connect.query(
    "SELECT sell.productID, sell.sellSize, sell.sellReview, sell.sellDate, sell.buyUserID, sell.buyUserName, sell.sellUserID, sell.sellUserName, sell.coolingOff AS coolingOffState, product.img, product.brand, product.intro, product.size, product.review, product.type, product.sex, product.price, product.matchType, product.casual, product.preprice, product.userID, product.date FROM sell LEFT JOIN product ON sell.productID = product.id WHERE sell.buyUserID = ? ORDER BY sell.id DESC",
    [req.body.userID]
  );
  if (rows.length === 0) {
    return false;
  } else {
    return rows;
  }
};

exports.getSellInfo = async (req) => {
  const connect = await runQuery();
  const [rows, fields] = await connect.query(
    "SELECT sell.productID, sell.sellSize, sell.sellReview, sell.sellDate, sell.buyUserID, sell.buyUserName, sell.sellUserID, sell.sellUserName, sell.coolingOff AS coolingOffState, sell.coolingOff, product.img, product.brand, product.intro, product.size, product.review, product.type, product.sex, product.price, product.matchType, product.casual, product.preprice, product.userID, product.date FROM sell LEFT JOIN product ON sell.productID = product.id ORDER BY sell.id DESC"
  );
  if (rows.length === 0) {
    return false;
  } else {
    return rows;
  }
};

exports.changeCoolingOffState = async (req) => {
  const connect = await runQuery();
  const [rows, fields] = await connect.query('UPDATE sell SET coolingOff = ? WHERE id = ?', [req.body.value, req.body.id]);
    if (rows) {
        return true;
    } else {
        return false;
    }
};
