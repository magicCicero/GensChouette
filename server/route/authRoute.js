const router = require('express').Router();
const authController = require("../controller/authController");

router.post('/loginUser', authController.loginCtrl);
router.post('/regUser', authController.regUser);
router.post('/getPassCode', authController.getPassCode);
router.post('/checkPassCode', authController.checkPassCode);
router.post('/resetPwd', authController.resetPwd);
router.post('/getUser', authController.getUserCtrl);
router.post('/delUser', authController.delUserCtrl)

module.exports = router;