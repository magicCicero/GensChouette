const router = require('express').Router();
const productController = require('../controller/productController')

router.post('/addProduct', productController.addProductCtrl);
router.post('/getProductByUserID', productController.getProductByUserIDCtrl);
router.post('/deleteProduct', productController.deleteProductCtrl);
router.post('/editProduct', productController.editProductCtrl);
router.post('/getProduct', productController.getProductCtrl)
router.post('/getProductByProductID', productController.getProductByProductIDCtrl)

module.exports = router;