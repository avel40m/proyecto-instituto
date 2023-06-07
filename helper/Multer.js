const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'public/images') // directorio de destino
    },
    filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now() + '.jpg') // nombre del archivo
    }
 });
 
 const upload = multer({ storage: storage });
module.exports = upload;