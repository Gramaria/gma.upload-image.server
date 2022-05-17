export class ImageCompletedEvent {
    id: string;

    constructor (data) {
        this.id = data.id;
    }
}