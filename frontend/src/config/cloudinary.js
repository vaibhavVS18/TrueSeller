// utils/cloudinary.js
export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing in environment variables");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: data }
  );

  if (!res.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const uploadData = await res.json();
  return uploadData.secure_url;
};
