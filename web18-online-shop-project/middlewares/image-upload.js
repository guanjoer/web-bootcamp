const multer = require('multer');
const uuid = require('uuid').v4;

const upload = multer({
	storage: multer.diskStorage({
		destination: 'product-data/images',
		filename: function(req, file, cb) {
			cb(null, uuid() + '-' + file.originalname);
		}
	})
});

// input type이 file이면서, 해당 인풋 필드의 name="image"인 필드
const configuredMulterMiddlware = upload.single('image');


module.exports = configuredMulterMiddlware;