import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PinoLogger} from 'nestjs-pino';
import { ImageCompletedEvent } from 'src/events/image-completed.event';
import { ImageUploadedEvent } from 'src/events/image-uploaded.event';

@Injectable()
export class LoggerService {

    private logger: PinoLogger;

    constructor() {
        this.logger = new PinoLogger({})
    }

    @OnEvent('image.uploaded')
    async logUpload(payload: ImageUploadedEvent) {
        this.logger.info(`Image ${payload.id} is uploaded to ${payload.file}`);
    }

    @OnEvent('image.completed')
    async logCompleted(payload: ImageCompletedEvent) {
        this.logger.info(`Processing of image ${payload.id} is completed`);
    }
}
