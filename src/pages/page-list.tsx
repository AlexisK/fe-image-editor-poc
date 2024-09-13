import React from 'react';
import { useSearchParams } from "react-router-dom";

import { useQueryData, useImagesList } from '../hooks';
import { GalleryImage, Paginator } from '../components';

export const PageList: React.FC = () => {
	const { queryData } = useQueryData();
	const images = useImagesList(queryData.p ?? 0);

	// TODO: investigate redraws ( vite dev mode? )

	return <div>
		<h3>Pick an image of your choice</h3>
		<Paginator />
		<div className="imagesList">
			{ images.map(imageData => <GalleryImage key={imageData.id} imageData={imageData} />) }
		</div>
		<Paginator />
	</div>;
}
