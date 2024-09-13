export const config = {
	imagesBaseAPI: 'https://picsum.photos',
	imagesPerPage: 20,
	imagePreviewSize: { x: 240, y: 160 },
	apiFirstPageIndex: 1, // page 1 is the first collection, sending page 0 will give the same result
	blurMinMax: [0, 10],
	mimeTypesEncoding: {
		jpg: ['image/jpeg', 0.8], //80% quality jpeg compression
		png: ['image/png'],
		gif: ['image/gif'],
		bmp: ['image/bmp'],
		webp: ['image/webp'],
	}
};