//import pic from '../assets/photos'


const convertRemToPixels = (rem) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const getColNumber = (picWidth) => {
    const gallery = document.querySelector('.gallery');
    if(!gallery) return 0;
    const galWitdh = parseFloat(getComputedStyle(gallery).width);
    return Math.ceil(galWitdh / convertRemToPixels(picWidth));
}


module.exports = {
    convertRemToPixels,
    getColNumber
}