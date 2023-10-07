import multer, { diskStorage, Field } from "multer";

const storage = diskStorage({
  destination: (_, file, cb) => {
    cb(null, `/tmp/uploads`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 10mb, you can change as needed.
  },
});

const uploadSingleFieldAndFile = (fieldName: string) => {
  return upload.single(fieldName);
};

const uploadSingleFieldAndMultipleFiles = (fieldName: string, maxCount?: number) => {
  return upload.array(fieldName, maxCount);
};

const uploadMultipleFieldsAndFiles = (fields: Field[]) => {
  return upload.fields(fields);
};

export { uploadSingleFieldAndFile, uploadSingleFieldAndMultipleFiles, uploadMultipleFieldsAndFiles };
