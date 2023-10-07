import { getDataSource } from "@components/db/data-source";

import { Image } from "./image.model";
import { IFileStorageService } from "@lib/file-storage/types";
import { S3Service } from "@lib/file-storage";

const ImageRepo = getDataSource().getRepository(Image);

export class ImageService {
  constructor(private fileStorage: IFileStorageService) {}

  public async createImage(image: Express.Multer.File) {
    const { fileLocation, fileKey } = await this.fileStorage.saveFile(image);
    const newImage = new Image();

    newImage.url = fileLocation;
    newImage.key = fileKey;

    await ImageRepo.save(newImage);

    return newImage;
  }

  public async getImageById(id: number) {
    return await ImageRepo.findOneBy({ id });
  }

  public async deleteImageById(id: number) {
    const image = await this.getImageById(id);

    if (!image) {
      return false;
    }

    await this.fileStorage.deleteFile(image.key);
    await ImageRepo.delete(image);

    return true;
  }

  public async deleteImageByKey(key: string) {
    const image = await ImageRepo.findOneBy({ key });

    if (!image) {
      return false;
    }

    await this.fileStorage.deleteFile(image.key);
    await ImageRepo.delete(image);

    return true;
  }

  public async deleteImageByUrl(url: string) {
    const image = await ImageRepo.findOneBy({ url });

    if (!image) {
      return false;
    }

    await this.fileStorage.deleteFile(image.key);
    await ImageRepo.delete(image);

    return true;
  }

  public async exists(id: number) {
    const image = await this.getImageById(id);

    return !!image;
  }
}

const imageService = new ImageService(new S3Service());

export { imageService };
