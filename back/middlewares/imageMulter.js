const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.match(/\.([^.]*$)$/)[0];
        cb(null, Date.now() + extension);
    },
});

const fileFilter = (req, file, cb) => {
    if (/image.*$/.test(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Arquivo enviado não é uma imagem!"), false);
    }
};

module.exports = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter,
});