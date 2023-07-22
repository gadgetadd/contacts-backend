const multer = require('multer');
const path = require("path");

const tempDir = path.join(__dirname, '../', 'temp');

const supportedMimeTypes = ["image/jpeg", "image/png"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        const { _id } = req.user;
        cb(null, `avatar-${_id}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (!supportedMimeTypes.includes(file.mimetype)) {
        return cb(null, false);
    }
    cb(null, true);
}

const upload = multer({ storage, fileFilter });

module.exports = upload;