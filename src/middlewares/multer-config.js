import multer from 'multer'

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_')
    callback(null, new Date().toISOString().replace(/:/g, '-') + '_' + name)
  }
});

export default multer({storage: storage}).single('imageUrl')