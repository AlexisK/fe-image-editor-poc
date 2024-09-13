
export interface ImageMeta {
	id: number;
	author: string;
}

export type ImageData = ImageMeta & {
	previewUrl: string;
}
