import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { path } from 'app-root-path';
import { ensureDir, writeFile, readFile, unlink } from 'fs-extra';
import * as sharp from 'sharp';
import { getGenSizes } from 'src/configs/image.config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImageCompletedEvent } from 'src/events/image-completed.event';
import { ImageUploadedEvent } from 'src/events/image-uploaded.event';

@Injectable()
export class ProcessingService {

    constructor(private eventEmitter: EventEmitter2) {}

    @OnEvent('image.uploaded')
    async convert(payload: ImageUploadedEvent) {

        const imagesFolder = `${path}/images/${payload.id}`;
        await ensureDir(imagesFolder);

        const originalFileBuffer = await readFile(payload.file);

        for (const genSize of getGenSizes) {

            await sharp(originalFileBuffer)
                .resize(genSize.width, genSize.height)
                .toBuffer()
                .then(async (outputBuffer) => {
                    const generatedFile = `${imagesFolder}/${payload.id}_${genSize.width}X${genSize.height}${payload.ext}`;
                    await writeFile(generatedFile, outputBuffer);
                });
        }

        await unlink(payload.file);

        this.eventEmitter.emit(
            'image.completed',
            new ImageCompletedEvent({
                id: payload.id
            }),
        );
    }
}
