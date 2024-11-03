import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';

@Injectable()
export class UploadAvatarProvider {
  private readonly MAX_FILE_SIZE = 750000; // 759KB
  private readonly ALLOWED_MIME_TYPES = [
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ] as const;

  constructor(private readonly uploadToAwsProvider: UploadToAwsProvider) {}

  public async uploadAvatar(avatar: Express.Multer.File) {
    if (!this.ALLOWED_MIME_TYPES.includes(avatar.mimetype as any)) {
      throw new BadRequestException(
        `Supported image types: ${this.ALLOWED_MIME_TYPES.map((type) => type.split('/')[1]).join(', ')}`,
      );
    }
    if (avatar.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(
        `The image is too large. Maximum size is ${this.MAX_FILE_SIZE / 1000}KB`,
      );
    }

    try {
      return await this.uploadToAwsProvider.avatarUpload(avatar);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
