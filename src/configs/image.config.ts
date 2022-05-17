import { IGenSize } from "src/processing/processing.interface";

export const imageFormats: string[] = ['jpeg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'];

export const maxFileSize: number = 1024;

export const getGenSizes: IGenSize[] = [
    {
        width: 340,
        height: 340
    },
    {
        width: 165,
        height: 165
    },
    {
        width: 60,
        height: 70
    },
];