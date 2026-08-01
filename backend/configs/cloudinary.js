import { v2 as cloudinary } from "cloudinary";

const cloudinaryConnect = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadToCloudinary = async (filePath, folder = "mywallet") => {
  return cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });
};

export default cloudinaryConnect;
