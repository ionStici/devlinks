import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadAvatarProvider } from './upload-avatar.provider';
import { DeleteFromAwsProvider } from './delete-from-aws.provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadsService {
  constructor(
    private readonly uploadAvatarProvider: UploadAvatarProvider,
    private readonly deleteFromAwsProvider: DeleteFromAwsProvider,
    private readonly configService: ConfigService,
  ) {}

  public async uploadAvatar(avatar: Express.Multer.File) {
    const key = await this.uploadAvatarProvider.uploadAvatar(avatar);
    return `${this.configService.get('bucket.awsCloudfrontUrl')}/${key}`;
  }

  public async deleteAvatar(existingImageUrl: string) {
    try {
      const cloudfrontUrl = this.configService.get('bucket.awsCloudfrontUrl');
      const key = existingImageUrl.replace(`${cloudfrontUrl}/`, '');
      return this.deleteFromAwsProvider.deleteAvatar(key);
    } catch {
      throw new BadRequestException('Invalid image URL format');
    }
  }
}
