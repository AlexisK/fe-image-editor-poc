import React from 'react';
import { config } from '../config';

import { ImageData, ImageMeta } from '../types';

export const useImage = (id: number) => {
	const [meta, setImageMeta] = React.useState<ImageMeta|null>(null);

	React.useEffect(() => {
		if ( !id ) {
			// TODO: proper handling
			console.error(`useImage was triggered without image id!`);
			return;
		}

		const url = `${config.imagesBaseAPI}/id/${id}/info`;

		fetch(url)
			.then(r => r.json())
			.then(meta => setImageMeta(meta))
			.catch(err => {
				// handle errors mechanism here?
				console.error(err);
			});

		return () => {};
	}, [id]);

	return {meta};
}
