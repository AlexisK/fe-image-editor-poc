
export interface ImageMeta {
	id: number;
	author: string;
	width: number;
	height: number;
}

export type ImageData = ImageMeta & {
	previewUrl: string;
}
