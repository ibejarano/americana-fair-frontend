require('dotenv').config()
module.exports = {
  publicRuntimeConfig: {
    uriUploadCloudinary: process.env.API_CLOUDINARY_UPLOAD,
  },
};
