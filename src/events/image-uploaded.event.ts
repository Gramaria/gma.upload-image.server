export class ImageUploadedEvent {
    id: string;
    file: string;
    ext: string;

    constructor (data) {
        this.id = data.id;
        this.file = data.file;
        this.ext = data.ext;
    }
}