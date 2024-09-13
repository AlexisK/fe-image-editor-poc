import React from 'react';
import { config } from '../config';

import { ImageData, ImageMeta } from '../types';

export const useImagesList = (page: number) => {
	const [imagesData, setImagesData] = React.useState<ImageData[]>([]);

	React.useEffect(() => {
		const pageNormalized = page ?? 0;
		const url = `${config.imagesBaseAPI}/v2/list?page=${pageNormalized}&limit=${config.imagesPerPage}`;

		fetch(url)
			.then(r => r.json())
			.then(( data: ImageMeta[] ) => {
				setImagesData(data.map(meta => ({
					...meta,
					previewUrl: `${config.imagesBaseAPI}/id/${meta.id}/${config.imagePreviewSize.x}/${config.imagePreviewSize.y}`,
				} as ImageData)))
			})
			.catch(err => {
				// handle errors mechanism here?
				console.error(err);
			});

		return () => {};
	}, [page]);

	return imagesData;
}
