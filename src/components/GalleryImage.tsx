import React from 'react';
import { useNavigate } from "react-router-dom";

import { ImageData } from '../types';
import { config } from '../config';
import { useQueryData } from '../hooks';

export interface GalleryImageProps {
	imageData: ImageData;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({ imageData }) => {
	const { queryData } = useQueryData();
	const navigate = useNavigate();
	const {x: width, y: height } = config.imagePreviewSize;

	return <div className="galleryImage" onClick={() => navigate(`/pages/editor/${imageData.id}${queryData?.p ? `?p=${queryData.p}` : ''}`)}>
		<img
			src={imageData.previewUrl}
			width={width}
			height={height}
			alt={`Image ID: ${imageData.id}, created by ${imageData.author}`}
		/>
		<div className="info">
			<p>Author: {imageData.author}</p>
		</div>
	</div>;
}