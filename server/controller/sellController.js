const sellModel = require('../model/sellModel')
const { parseISO, differenceInDays } = require('date-fns');

exports.getSellByUserIDCtrl = async (req, res) => {
    const result = await sellModel.getSellByUserID(req);
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

function isDateOverflowTwoWeeks(dateString) {
    const sellDate = new Date(dateString)
    const currentDate = new Date();
    const timeDifference = Math.abs(sellDate - currentDate);
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference < 14;
}

exports.getSellInfoByBuyerIDCtrl = async (req, res) => {
    const result = await sellModel.getSellInfoByBuyerID(req);
    const end = req.body.count * req.body.page > result.length ? result.length : req.body.count * req.body.page;
    var _result = [];
    if (result) {
        for (var idx = req.body.count * (req.body.page - 1); idx < end; idx++) {
            result[idx].coolingOff = isDateOverflowTwoWeeks(result[idx].sellDate)
            _result.push(result[idx]);
        }
    }

    return res.json({
        result: _result,
        totalPage: Math.floor(result.length / req.body.count) + 1
    });
}

exports.getSellInfoCtrl = async (req, res) => {
    const result = await sellModel.getSellInfo(req);
    const end = req.body.count * req.body.page > result.length ? result.length : req.body.count * req.body.page;
    var _result = [];
    if (result) {
        for (var idx = req.body.count * (req.body.page - 1); idx < end; idx++) {
            _result.push(result[idx]);
        }
    }

    return res.json({
        result: _result,
        totalPage: Math.floor(result.length / req.body.count) + 1
    })
}

exports.changeCoolingOffStateCtrl = async (req, res) => {
    const result = await sellModel.changeCoolingOffState(req)
    if(result) {
        return true;
    } else {
        return false;
    }
}