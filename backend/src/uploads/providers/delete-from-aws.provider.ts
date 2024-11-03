import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class DeleteFromAwsProvider {
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

  public async deleteAvatar(key: string) {
    try {
      const deleteParams = {
        Bucket: this.configService.get('bucket.awsBucketName'),
        Key: key,
      };
      await this.s3.deleteObject(deleteParams).promise();
    } catch (error) {
      if (error.code === 'NoSuchKey') {
        throw new NotFoundException('Image not found in S3');
      }
      throw new RequestTimeoutException(error);
    }
  }
}
