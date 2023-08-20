const ffmpeg = require('ffmpeg')
const fs = require('fs')

class Converter{

    constructor(file='', folder='tmp/'){
        this.file = file
        this.folder = folder
        this.convertedPath = ''
    }

    GetFileName(){
        let name = this.convertedPath.split("/")
        console.log(name)
        return name[name.length - 1]
    }

    NoExt(path){
        let filename = path.split('.')
        filename.pop() //remove the last file extension for saving purposes
        filename = filename.join('')

        return filename //file name includes the temporary folder
    }

    NameFile(path, format=".mp3"){
        let i = 1;

        path = this.NoExt(path)

        this.convertedPath = path + format
        while (this.FileExists(this.convertedPath)){
            this.convertedPath = `${path}_${i + format}`

            i++;
        }

        console.log(this.convertedPath)
        return this.convertedPath
    }

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

    ConvertToAudio(file=this.file){

        return new Promise((resolve, reject) => {

                try {
                    new ffmpeg(file, (err, video) => {

                        if (!err) {
                            console.log('The video is ready to be processed');
                        } else {
                            console.error('Error: ' + err);
                        }

                        video
                        .setVideoFormat('mp3')
                        .save(this.NameFile(file), (error, file) => {
                            if (!error){
                                console.log('Video file: ' + file);
                                resolve(69)
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