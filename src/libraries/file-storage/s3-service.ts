import S3 from "aws-sdk/clients/s3";
import config from "config";

import { Config } from "@typings/config";

import { IFileStorageService, FileUploadResponse } from "./types";

const awsConfig = config.get<Config["aws"]>("aws");

class S3Service implements IFileStorageService {
  private s3: S3;
  private bucketName: string;

  constructor() {
    this.bucketName = awsConfig.s3BucketName;
    this.s3 = new S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });
  }

  async getFile(fileKey: string): Promise<Buffer> {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    return this.s3
      .getObject(params)
      .promise()
      .then((data) => data.Body as Buffer);
  }

  async saveFile(file: Express.Multer.File): Promise<FileUploadResponse> {
    const params = {
      Bucket: this.bucketName,
      Key: file.filename,
      Body: file.buffer,
      ACL: "public-read",
    };

    const { Location, Key } = await this.s3.upload(params).promise();

    return { fileLocation: Location, fileKey: Key };
  }

  async deleteFile(file: string): Promise<boolean> {
    const params = {
      Bucket: this.bucketName,
      Key: file,
    };

    const { DeleteMarker } = await this.s3.deleteObject(params).promise();

    return !!DeleteMarker;
  }
}

export { S3Service };
