const cloudinary = require("cloudinary").v2;

async function postPicture(picturePath) {
  // config cloudinary with credentials before upload
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(picturePath, options);

    return { result, success: true };
  } catch (error) {
    return { error: error, success: false };
  }
}

module.exports = { postPicture };
