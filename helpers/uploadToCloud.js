const cloudinary = require('cloudinary').v2;

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
    secure: true,
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

const uploadToCloud = async (image) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    const result = await cloudinary.uploader.upload(image, options);
    return result.secure_url;
};

module.exports = uploadToCloud;