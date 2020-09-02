// const express = require('express');
// const colors = require('colors');
// const crypto = require('crypto');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');


// const mongoose = require('mongoose');
// // Create storage engine
// const path = require('path');
// const assert = require('assert');


// // Lead env vars
// require('dotenv').config({
//   path: './config/config.env'
// });

// const app = express();

// let greadFs = function () {
//   const optionsDB = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }

//   const conn = mongoose.createConnection(process.env.MONGO_URI, optionsDB);


//   // Init gridfsstream
//   let gfs;

//   conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
//     console.log('Mongo createConnection was opened'.cyan)
//   });


//   const storage = new GridFsStorage({
//     url: process.env.MONGO_URI,
//     options: {
//       useUnifiedTopology: true
//     },
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads',
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });

//   const upload = multer({
//     storage
//   });

//   app.post('/api/v1/uploads', upload.single('img'), async (req, res) => {
//     res.status(200).json({
//       success: true,
//       data: req.file
//     });
//   })

//   app.get('/api/v1/files', async (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//       // Check if files
//       console.log(files);
//       if (!files || !files.length) {
//         return res.status(404).json({
//           success: false,
//           message: 'Зображення не знайденно.'
//         });
//       }

//       return res.status(200).json(files);
//     });
//   })


//   app.get('/api/v1/files/:filename', async (req, res) => {
//     gfs.files.findOne({
//       filename: req.params.filename
//     }, (err, file) => {
//       // Check if files
//       if (!file || !file.length) {
//         return res.status(404).json({
//           success: false,
//           message: 'Зображення не знайденно.'
//         });
//       }

//       console.log(`${req.protocol}://${req.get('host')}/api/v1/image/${file.filename}`);
//       res.status(200).json({
//         filename: `${req.protocol}://${req.get('host')}/api/v1/image/${file.filename}`
//       });
//     })

//   });


//   app.get('/api/v1/image/:filename', async (req, res) => {
//     gfs.files.findOne({
//       filename: req.params.filename
//     }, (err, file) => {
//       // Check if files
//       console.log(req.protocol, req.host.red, req.url);
//       if (!file || !file.length) {
//         return res.status(404).json({
//           success: false,
//           message: 'Зображення не знайденно.'
//         });
//       }

//       if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png' || file.contentType === 'image/jpng') {
//         const readstream = gfs.createReadStream(file.filename);
//         readstream.pipe(res);
//       } else {
//         res.status(404).json({
//           err: 'not an image'
//         });
//       }
//     })
//   });
// }

// module.exports = greadFs;
