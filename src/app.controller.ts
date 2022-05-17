import { Controller, Post, UseInterceptors, UploadedFile, HttpCode} from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

@ApiTags('Upload image')
@Controller('upload')
export class AppController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async save(@UploadedFile() image: Express.Multer.File): Promise<string> {
    return this.uploadService.save(image);
  }
}
