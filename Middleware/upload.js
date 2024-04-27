const multer = require('multer')
//image connection
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_"+ Date.now() +"_" + file.originalname);
    }
});
const upload = multer({
    storage:fileStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            console.log('image inserted');
          cb(null, true);
        } else {
          cb(null, false);
          console.log('image not inserted');
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
});
module.exports = upload;