const fs = require("fs") //file system module
const axios = require("axios") //promise-based HTTP Client lib
const fileUpload = require("express-fileupload") //file upload lib, used in the /transcribe route
const Converter = require('../converter')
const express = require('express')
const path = require('path')
const router = express.Router()

router.use(
  fileUpload()
);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/../views/index.html')) //file upload form 
});

router.post('/transcribe', (req, res, next) => {

  var video = req.files.video //video to be processed

  console.log(video)


  //Saves the video file in the tmp folder
  fs.writeFile(path.join(__dirname, `../tmp/${video.name}`), video.data, err => {
    if (err) {
      console.error("Error Code:")
      console.error(err);
    }
  })
  
  let convert = new Converter(path.join(__dirname, `../tmp/${video.name}`)) //initializes the constructor

  /**
   * Converts the video file to audio (mp3) with ConvertToAudio
   * 
   * Sends the GET request right after the completion of the convertion with parameter "audio_file" (will be used in the python server)
   */
  convert.ConvertToAudio().then((code) => {
      
    axios
      .get(`http://127.0.0.1:5000?audio_file=${convert.GetFileName()}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(`Error! => ${error}`)
      })
  })
})


module.exports = router
