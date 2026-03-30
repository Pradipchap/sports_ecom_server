import fs from "fs";
import path from "path";

const uploadsPrefix = "/uploads/";

export const isLocalUploadUrl = (imageUrl?: string | null) =>
  Boolean(imageUrl && imageUrl.includes(uploadsPrefix));

export const removeLocalUpload = (imageUrl?: string | null) => {
  if (!isLocalUploadUrl(imageUrl)) {
    return;
  }

  const fileName = imageUrl!.split(uploadsPrefix)[1];
  if (!fileName) {
    return;
  }

  const absolutePath = path.join(process.cwd(), "uploads", fileName);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};
