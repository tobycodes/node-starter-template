import "multer";

export type FileUploadResponse = {
  fileLocation: string;
  fileKey: string;
};

export interface IFileStorageService {
  saveFile(file: Express.Multer.File): Promise<FileUploadResponse>;
  deleteFile(fileKey: string): Promise<boolean>;
}
