/*
  to do
    1 - install & require npm
    2 - select mime types
    3 - configure picture file storage destination
    4 - configure picture file name
    5 - export module
*/


const multer = require('multer');
const storagePath = 'uploads/img';

const MIME_TYPES_ALLOWED_EXTENTIONS = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/heic': 'png'
};

function generateName(fileName, extension)
{
  const name = fileName.split(' ').join('_');
  return name + Date.now() +'.'+ extension;
}


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, storagePath);
  },
  filename: (req, file, callback) => {
    const extention = MIME_TYPES_ALLOWED_EXTENTIONS[file.mimetype];
    const imgName = generateName(file.originalname, extention);
    callback(null, imgName);
  }
});

module.exports = multer({storage: storage}).single('image');
