const authModel = require('../model/authModel');

exports.loginCtrl = async (req, res) => {
    const result = await authModel.loginUser(req);
    return res.json(result);
}

exports.regUser = async (req, res) => {
    const result = await authModel.regUser(req);
    return res.json(result);
}

exports.getPassCode = async (req, res) => {
    const result = await authModel.getPassCode(req);
    if (result.length === 0) {
        return res.json(false);
    } else {
        const passCode = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        await authModel.setPassCode(req, passCode)
        return res.json(true)
    }
}

exports.checkPassCode = async (req, res) => {
    const result = await authModel.getPassCode(req);
    if (result.length === 0 || req.body.passCode !== result[0].pass) {
        return res.json(false);
    } else {
        await authModel.setPassCode(req, null)
        return res.json(true);
    }
}

exports.resetPwd = async (req, res) => {
    await authModel.resetPwd(req)
    return res.json('success')
}

exports.getUserCtrl = async (req, res) => {
    const result = await authModel.getUser(req);
    const end = req.body.count * req.body.page > result.length ? result.length : req.body.count * req.body.page;
    var _result = [];
    for (var idx = req.body.count * (req.body.page - 1); idx < end; idx++) {
        _result.push(result[idx]);
    }

    const totalPage = result.length % req.body.count === 0 ? Math.floor(result.length / req.body.count) : Math.floor(result.length / req.body.count) + 1

    return res.json({
        result: _result,
        totalPage: totalPage
    });
}

exports.delUserCtrl = async (req, res) => {
    await authModel.delUser(req);
    return true;
}