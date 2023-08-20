const ffmpeg = require('ffmpeg') //video processing library
const fs = require('fs')

class Converter{

    /**
     * Converts video to audio
     * @param {string} video - path to the video file 
     * @param {string} folder - save folder
     */
    constructor(video='', folder='tmp/'){
        this.video = video
        this.folder = folder
        this.convertedPath = '' //path of the audio file after video conversion
    }

    /**
     * Extracts file name from path
     * @returns {string}
     */
    GetFileName(){
        let name = this.convertedPath.split("/")
        console.log(name)
        return name[name.length - 1]
    }

    /**
     * Removes the last extension from file
     * @param {String} path 
     * @returns {string} newPath - the path without the last extension
     */
    NoExt(path){
        let newPath = path.split('.')
        newPath.pop() //remove the last file extension for saving purposes
        newPath = newPath.join('')

        return newPath
    }


    /**
     * Gives the file a unique name and concatenates the desired extension
     * @param {string} path 
     * @param {string} format 
     * @returns this.convertedPath
     */
    NameFile(path, format=".mp3"){
        let i = 1;

        path = this.NoExt(path)

        this.convertedPath = path + format
        while (this.FileExists(this.convertedPath)){
            this.convertedPath = `${path}_${i + format}`

            i++;
        }

        //console.log(this.convertedPath)
        return this.convertedPath
    }


    /**
     * Verify the existence of a file
     * @param {string} path 
     * @returns {boolean, number} True if the file exists, False if it doesn't, -1 if error
     */
    FileExists(path){

        try {

            if (fs.existsSync(path))
                return true
            else
                return false

        } catch (error) {
            console.error(error)
            return -1
        }

    }

    /**
     * Converts video to audio (mp3)
     * @param {string} video
     * @returns {none}
     */

    ConvertToAudio(video=this.video){

        return new Promise((resolve, reject) => {

                try {
                    new ffmpeg(video, (err, vid) => {

                        if (!err) {
                            console.log('The video is ready to be processed');
                        } else {
                            console.error('Error: ' + err);
                        }

                        vid
                        .setVideoFormat('mp3')
                        .save(this.NameFile(video), (error, audio) => {
                            if (!error){
                                console.log('Video file: ' + audio);
                                resolve(69) //code 69 because why the fuck not
                            }else {
                                console.log("Cannot save file")
                            }
                        })


                    });
                } catch (e) {
                    console.log(e.code);
                    console.log(e.msg);

                    reject(0);
                }
            })
    }
    

}

module.exports = Converter