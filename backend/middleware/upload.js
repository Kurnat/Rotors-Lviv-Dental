const moment = require('moment');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cd) {
    cb(null, 'uploads/');
  },
  filename(req, file, cd) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    cb(null, `${date}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cd) => {
  console.log(file);
  console.log('fileFilter');
 if(file.mimetype === `image/png` || file.mimetype === `image/jpeg` || file.mimetype === `image/jpg` || file.mimetype === `image/svg`) {
  cd(null, true);
 }  else {
   cb(null, false);
 }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

module.exports = multer({storage, fileFilter, limits});
