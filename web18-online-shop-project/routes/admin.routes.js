const express = require('express');

const adminController = require('../controllers/admin.controller');

const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();


router.get('/products', adminController.getProducts); // path: /admin/products

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);

// 파일을 업로드하기 위해서는 form의 enctype="multipart/form-data"이므로, express.urlencoded()가 더 이상 작동하지 않아, 우리가 입력한 데이터를 req.body에 parsing하여 저장할 수 없는데, 이때는 반드시 multer미들웨어를 추가하도록 해야한다.
router.post('/products/:id', imageUploadMiddleware, adminController.updateProduct);

// 단일 물품 삭제
// router.post('/products/:id/delete', adminController.deleteProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Manage Orders 페이지 가져오기
router.get('/orders', adminController.getOrders);

// Manage Orders의 주문 status 업데이트
router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;