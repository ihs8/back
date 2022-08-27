const express = require('express');
const bodyParser= require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const lodash = require('lodash');
//for models 
const fil = require("./models/file");

const fileUpload = require('express-fileupload');


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());



app.use(fileUpload());





app.get('/all', async (req, res) => {
    try {
        const files = await fil.find();
        return res.status(200).json({
          success:true,
          existingFiles:files

      });
        } catch (err) {
          res.status(500).json({ message: err.message });
          }
          });
          
          app.get('/starred', async (req, res) => {
            try {
                const files = await fil.find({isStarred:true});
                return res.status(200).json({
                  success:true,
                  existingFiles:files
        
              });
                } catch (err) {
                  res.status(500).json({ message: err.message });
                  }
                  });
                  
                  app.get('/archived', async (req, res) => {
                    try {

                        const files = await fil.find({isArchived:true});
                        return res.status(200).json({
                          success:true,
                          existingFiles:files
                
                      });
                        } catch (err) {
                          res.status(500).json({ message: err.message });
                          }
                          });
                          app.put('/starred/:id', async (req, res) => {
                            try {
                                const files = await fil.findById(req.params.id);
                                files.isStarred = true;
                                await files.save();
                                return res.status(200).json({
                                  success:true,
                                  existingFiles:files
                        
                              });
                                } catch (err) {
                                  res.status(500).json({ message: err.message });
                                  }
                                  });
                                  app.put('/archived/:id', async (req, res) => {
                                    try {

                                        const files = await fil.findById(req.params.id);
                                        files.isArchived = true;
                                        await files.save();
                                        return res.status(200).json({
                                          success:true,
                                          existingFiles:files
                                
                                      });
                                        } catch (err) {
                                          res.status(500).json({ message: err.message });
                                          }
                                          });
                                          app.put('/unstarred/:id', async (req, res) => {
                                            try {

                                                const files = await fil.findById(req.params.id);
                                                files.isStarred = false;
                                                await files.save();
                                                return res.status(200).json({
                                                  success:true,
                                                  existingFiles:files
                                        
                                              });
                                                } catch (err) {
                                                  res.status(500).json({ message: err.message });
                                                  }
                                                  });
                                                  app.put('/unarchived/:id', async (req, res) => {
                                                    try {

                                                        const files = await fil.findById(req.params.id);
                                                        files.isArchived = false;
                                                        await files.save();
                                                        return res.status(200).json({
                                                          success:true,
                                                          existingFiles:files
                                                
                                                      });
                                                        } catch (err) {
                                                          res.status(500).json({ message: err.message });
                                                          }
                                                          });
                                                          app.get('/stat', async (req, res) => {
                                                            try {
                                                                const files = await fil.find({fileType: /image/ } );
                                                                const arr = files.map(item => item.fileSize)
                                                                var sum = lodash.sum(arr);
                                                                console.log(sum);
                                                                const files2 = await fil.find({fileType:/vedio/ });
                                                                const arr2 = files2.map(item => item.fileSize)
                                                                var sum2 = lodash.sum(arr2);
                                                                console.log(sum2);
                                                                const files3 = await fil.find({fileType:/document/} );
                                                                const arr3 = files3.map(item => item.fileSize)
                                                                var sum3 = lodash.sum(arr3);
                                                                console.log(sum3);  
                                                                return res.status(200).json({
                                                                  success:true,
                                                                  success:true,
                                                                  image:(sum/1000000000).toFixed(5),
                                                                  video:(sum2/1000000000).toFixed(2),
                                                                  document:(sum3/1000000000).toFixed(2)
                                                        
                                                              });
                                                                                                                  } catch (err) {
                                                              res.status(500).json({ message: err.message });
                                                              }
                                                              });

                                                                

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {

    return res.status(400).json({ msg: 'No file uploaded' });
  }
  console.log(req.files.file.length);
  if (req.files.file.length > 1) {
    for (var i = 0; i < req.files.file.length; i++) {
      const file = req.files.file[i];
      file.mv(`${__dirname}/client/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
        // return;
        const f = {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.mimetype,
          fileDate: Date.now(),
          isStarred: false,
          isArchived: false
        }
        console.log(f);
        const file1 = new fil(f);
        file1.save().then(result => {
          console.log(result);
          if (result.fileType.includes("image")) {
            sta.create({$inc:{ Image: result.fileSize }}, function (err, small) {
              if (err) return handleError(err);
              // saved!
            }
            );
          }
          if (result.fileType.includes("video")) {
            sta.create({$inc:{ Vedio: result.fileSize }}, function (err, small) {
              if (err) return handleError(err);
              // saved!
            }
            );
          }
          if (result.fileType.includes("document")) {
            sta.create({$inc:{ Document: result.fileSize }}, function (err, small) {
              if (err) return handleError(err);
              // saved!
            }
            );
          }
  
        }).catch(err => console.log(err));
      
  
  
  
        // fil.create({
        //   fileName: file.name,
        //   fileSize: file.size,
        //   fileType: file.mimetype,
        //   fileDate: Date.now(),
        //   isStarred: false,
        //   isArchived: false
        // }, function (err, file) {
        //   if (err) return console.log(err);
        //   console.log(file);
        // }
        // );
  
  
      });
    
    }
  }
  else {
    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }})
  
      const f = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.mimetype,
        fileDate: Date.now(),
        isStarred: false,
        isArchived: false
      }
      console.log(f);
      const file1 = new fil(f);
      file1.save().then(result => {
        console.log(result);
    
    });
  } 
}
);




mongoose.connect("mongodb+srv://iheb:ihs@cluster0.rwmbpkm.mongodb.net/?retryWrites=true&w=majority",
  (err, done)=>{
    if (err){
        console.log(err)

    }
    if(done){
        console.log('base de donnee connecter avec succes!');
    }
  }
);
app.listen(5010,() => console.log("server activate"));

