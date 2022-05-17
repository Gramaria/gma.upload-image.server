import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerService } from './logger/logger.service';
import { UploadService } from './upload.service';
import { ProcessingService } from './processing/processing.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot({wildcard: true})],
  controllers: [AppController],
  providers: [LoggerService, UploadService, ProcessingService],
})
export class AppModule {}
