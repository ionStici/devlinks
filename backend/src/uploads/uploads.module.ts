import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import bucketConfig from './config/bucket.config';
import { DeleteFromAwsProvider } from './providers/delete-from-aws.provider';
import { UploadAvatarProvider } from './providers/upload-avatar.provider';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { UploadsService } from './providers/uploads.service';

@Module({
  imports: [ConfigModule.forFeature(bucketConfig)],
  providers: [
    UploadsService,
    UploadAvatarProvider,
    UploadToAwsProvider,
    DeleteFromAwsProvider,
  ],
  exports: [UploadsService],
})
export class UploadsModule {}
