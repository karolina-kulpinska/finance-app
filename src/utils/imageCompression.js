import imageCompression from "browser-image-compression";

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
      error: "Plik jest za duży. Maksymalny rozmiar to 3 MB.",
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Nieprawidłowy format. Dozwolone: JPG, PNG, PDF.",
    };
  }

  return { valid: true };
};
