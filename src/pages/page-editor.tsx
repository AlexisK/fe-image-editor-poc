import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { config } from '../config';
import { useQueryData, useImage } from '../hooks';

export const PageEditor: React.FC = () => {
	const { imageId } = useParams();
	const { queryData, setQueryData } = useQueryData();
	const { meta } = useImage(imageId);

	const width = queryData?.width ?? meta?.width;
	const height = queryData?.height ?? meta?.height;
	const isGreyscale = queryData?.greyscale === "true";
	const blur = queryData?.blur ?? 0;

	const query = [];
	if ( isGreyscale ) {
		query.push('greyscale');
	}
	if ( blur > 0 ) {
		query.push(`blur=${blur}`);
	}

	const imageUrl = `${config.imagesBaseAPI}/id/${imageId}/${width}/${height}${query.length ? `?${query.join('&')}` : '' }`;

	console.log(meta, imageUrl);

	if ( !imageId ) {
		return <Navigate to="/pages/list" replace />;
	}

	const previewStyle = meta ? { backgroundImage: `url(${imageUrl})` } : {};

	return <div className="editor">
		<div className="tools">
			<p>Width: <input type="number" value={width} onChange={ev => setQueryData({width: +ev.target.value})} /></p>
			<p>Height: <input type="number" value={height} onChange={ev => setQueryData({height: +ev.target.value})} /></p>
			<p>Blur: <input type="number" value={blur} onChange={ev => setQueryData({blur: +ev.target.value})} /></p>
		</div>
		<div className="preview" style={previewStyle}/>
	</div>;
}
