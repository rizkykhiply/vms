// Import Modules
const multer = require('multer');
const appRoot = require('app-root-path');

// Import Config
const { UPLOAD_FILE } = require('../config/constant.conf');
const { validateRandomChar, validateTime } = require('../config/helper.conf');

// Define Upload Middleware
const uploadMiddleware = (file) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${appRoot}/..${UPLOAD_FILE}`);
        },
        filename: (req, file, cb) => {
            const filename = `${validateTime({ request: new Date(), type: 'date-time-2' })}_${validateRandomChar(5, 'alphanumeric')}`;
            cb(null, `${filename}.${file.originalname.split('.')[1]}`);
        },
    });

    const fileFilter = (req, file, cb) => {
        if (file.fieldname === 'file' && !file.originalname.match(/\.(xlsx|csv)$/i)) {
            return cb(new Error('File not allowed'));
        }
        if (file.fieldname === 'image' && !file.originalname.match(/\.(jpe?g|png)$/i)) {
            return cb(new Error('Image not allowed'));
        }

        cb(null, true);
    };

    const uploadMedia = multer({
        storage,
        fileFilter,
    }).single(file);

    return async (req, res, next) => {
        try {
            uploadMedia(req, res, (error) => {
                if (!req.file) {
                    return res.status(400).send({
                        statusCode: 400,
                        message: error?.message || 'Bad Request',
                    });
                }

                return next();
            });
        } catch (error) {
            next(error);
        }
    };
};

// Export Upload Middleware
module.exports = {
    uploadMiddleware,
};
