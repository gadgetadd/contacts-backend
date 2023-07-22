const Jimp = require("jimp");
const fs = require("fs/promises");
const uploadToCloud = require('./uploadToCloud');

const processImage = async (file) => {
    const { path: tempImage } = file;
    try {
        const image = await Jimp.read(tempImage);
        image.cover(250, 250).write(tempImage);
        const publicLink = await uploadToCloud(tempImage);
        return publicLink;
    } catch {
        await fs.unlink(tempImage);
        throw new Error('Image processing error')
    };
};

module.exports = processImage; 