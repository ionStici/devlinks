import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get('bucket.awsRegion'),
      credentials: {
        accessKeyId: this.configService.get('bucket.awsAccessKeyId'),
        secretAccessKey: this.configService.get('bucket.awsSecretAccessKey'),
      },
    });
  }

  public async avatarUpload(image: Express.Multer.File) {
    try {
      const uploadParams = {
        Bucket: this.configService.get('bucket.awsBucketName'),
        Body: image.buffer,
        Key: this.generateFilename(image),
        ContentType: image.mimetype,
      };
      const uploadResult = await this.s3.upload(uploadParams).promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFilename(file: Express.Multer.File) {
    const baseName = path
      .parse(file.originalname)
      .name.replace(/\s+/g, '')
      .trim();
    const extension = path.extname(file.originalname);
    const uniqueId = uuidv4();
    const timestamp = Date.now();
    return `${baseName}-${timestamp}-${uniqueId}${extension}`;
  }
}
