const fs = require("fs")
const axios = require("axios")
const fileUpload = require("express-fileupload")
const Converter = require('../converter')
const express = require('express')
const http = require('http')
const path = require('path')
const router = express.Router()

router.use(
  fileUpload()
);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/../views/index.html'))
});

router.post('/transcribe', (req, res, next) => {

  console.log(req.files.audio)

  var audio = req.files.audio.name

  fs.writeFile(path.join(__dirname, `../tmp/${audio}`), req.files.audio.data, err => {
    if (err) {
      console.error("Error Code:")
      console.error(err);
    }
  })
  
  let convert = new Converter(path.join(__dirname, `../tmp/${audio}`))
  
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
