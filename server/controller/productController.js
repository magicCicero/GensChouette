const productModel = require('../model/productModel')

exports.addProductCtrl = async (req, res) => {
    const result = await productModel.addProduct(req);
    return res.json(result);
}

exports.getProductByUserIDCtrl = async (req, res) => {
    const result = await productModel.getProductByUserID(req);
    const end = req.body.count * req.body.page > result.length ? result.length : req.body.count * req.body.page;
    var _result = [];
    for (var idx = req.body.count * (req.body.page - 1); idx < end; idx++) {
        _result.push(result[idx]);
    }

    return res.json({
        result: _result,
        totalPage: Math.floor(result.length / req.body.count) + 1
    });
}

exports.deleteProductCtrl = async (req, res) => {
    const result = await productModel.deleteProduct(req);
    return res.json(result)
}

exports.editProductCtrl = async (req, res) => {
    const result = await productModel.editProduct(req);
    return res.json(result)
}

exports.getProductCtrl = async (req, res) => {
    const result = await productModel.getProduct(req);
    return res.json(result)
}

exports.getProductByProductIDCtrl = async (req, res) => {
    const result = await productModel.getProductByProductID(req);
    return res.json(result)
}