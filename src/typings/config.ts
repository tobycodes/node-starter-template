export type Config = {
  app: {
    port: number;
    clientUrl: string;
    timeout: number;
    coredump?: boolean;
  };
  db: {
    url: string;
  };
  aws: {
    s3BucketName: string;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
};
