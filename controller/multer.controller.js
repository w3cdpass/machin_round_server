const multer = require("multer")
const Task = require('../model/Task');

// const object = {
//   a: "some string",
//   b: 42,
//   c: false,
// };

// console.log(Object.values(object))
const storage = (filePath) => multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, filePath)
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const uploads = multer({ storage: storage('./uploads') });
const tmp = multer({ storage: storage('./uploads/tmp') })
exports.fileUploads = async (req, res) => {
    try {
        const { id } = req.params;
        // const tmpStore = req.query;

        // const query = {
        //     ...tmpStore
        // }
        // console.log(query.tmp)
        const uploader = req.query.tmp === true ? tmp.single('profileImage') : uploads.single('profileImage');
        uploader(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }


            const uploadsFiles = await Task.findByIdAndUpdate(id,
                { file: req.file?.filename },
                { new: true })
            res.status(201).json({ status: 'success', uploadedFilename: uploadsFiles })
        });
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

