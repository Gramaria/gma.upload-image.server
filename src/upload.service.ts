import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { v4 as uuid } from 'uuid';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImageUploadedEvent } from './events/image-uploaded.event';
import { imageFormats } from './configs/image.config';


@Injectable()
export class UploadService {

    constructor(private eventEmitter: EventEmitter2) {}

    async save(image: Express.Multer.File): Promise<string> {

        const tempFolder = `${path}/temp`;
        await ensureDir(tempFolder);

        const id: string = uuid();

        if (imageFormats.filter((element) => {
            return (image.mimetype).indexOf(element) >= 0
        }).length > 0) {

            const ext = image.originalname.substring(image.originalname.lastIndexOf('.')).toLowerCase();
            const file = `${tempFolder}/${id}${ext}`;
            await writeFile(file, image.buffer);

            this.eventEmitter.emit(
                'image.uploaded',
                new ImageUploadedEvent({
                    id: id,
                    file: file,
                    ext: ext
                }),
            );
        }

        return id;
    }
}
