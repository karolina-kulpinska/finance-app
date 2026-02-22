import imageCompression from "browser-image-compression";
import i18n from "../i18n";

export const compressImage = async (file) => {
  const isImage = file.type.startsWith("image/");
  
  if (!isImage) {
    return file;
  }

  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: file.type,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    return file;
  }
};

export const validateFile = (file) => {
  const maxSize = 3 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

  if (file.size > maxSize) {
    return {
      valid: false,
      error: i18n.t("form.fileTooBig"),
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: i18n.t("form.invalidFileFormat"),
    };
  }

  return { valid: true };
};
