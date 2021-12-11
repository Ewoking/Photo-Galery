
// LAUNCH EVERY TIME PHOTOS ARE BEING EDITED IN '...src/assets/photos' FOLDER


const fs = require('fs');
const path = require('path');

const getAllPics = () => {
    fs.readdir(path.join(__dirname,'../assets/photos'), function(err,files) {
        fs.writeFile(path.join(__dirname,'../assets/filenames.json'), JSON.stringify({filenames: files }), err => {
            if(err) return console.log("an error occured : ", err)
            console.log("filenames aquired");
        })
    });
}
getAllPics();