const cloudinary = require("cloudinary").v2;

async function postAvatar(picturePath, id) {
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
    public_id: id,
  };

  try {
    console.log(id);
    const destroy = await cloudinary.uploader.destroy(id, {
      resource_type: "raw",
    });
    console.log(destroy);
    const result = await cloudinary.uploader.upload(picturePath, options);

    return { result, success: true };
  } catch (error) {
    return { error: error, success: false };
  }
}

module.exports = { postAvatar };
