/* rooter config
  use express router
 /api/product removed
 app.use is replaced by app.get()
*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('../middleware/pictureFileManagerMiddleWare');

router.get('/product', productController.addProduct);
router.post('/product', multer, productController.createProductWithImg);

router.post('/', multer, productController.createProduct);
router.get('/',productController.getAllProduct);

router.get('/file', productController.form);
router.post('/fileupload', productController.upload);

router.get('/:id', productController.getOneProduct);
router.put('/:id', productController.modifyProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;

//https://app.getpostman.com/join-team?invite_code=6b57d37bbb05605ceb731ab7de705db3
