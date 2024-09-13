import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

import { config } from '../config';
import { useQueryData, useImage } from '../hooks';

export const PageEditor: React.FC = () => {
	const { imageId } = useParams();
	const { queryData, setQueryData } = useQueryData();
	const { meta } = useImage(imageId);

	const width = queryData?.width ?? meta?.width;
	const height = queryData?.height ?? meta?.height;
	const isGreyscale = queryData?.greyscale === true;
	const blur = queryData?.blur ?? 0;

	const query = [];
	if ( isGreyscale ) {
		query.push('grayscale');
	}
	if ( blur > 0 ) {
		query.push(`blur=${blur}`);
	}

	const imageUrl = `${config.imagesBaseAPI}/id/${imageId}/${width}/${height}${query.length ? `?${query.join('&')}` : '' }`;

	console.log(meta, imageUrl);

	if ( !imageId ) {
		return <Navigate to="/pages/list" replace />;
	}
	if ( !meta ) {
		return <div className="editor">Loading...</div>;
	}

	const previewStyle = meta ? { backgroundImage: `url(${imageUrl})` } : {};

	return <div className="editor">
		<div className="tools">
			<h4>Editor</h4>
			<Link to={{
				pathname: '/pages/list',
				query: queryData,
			}}>Back to gallery { queryData.p ? <>page {queryData.p}</> : null}</Link>

			<p>
				Width:
				<input type="number" value={width} onChange={ev => setQueryData({width: +ev.target.value})} min="1" max={meta.width} />
				<button onClick={() => setQueryData({width: null})}>max</button>
			</p>
			<p>
				Height:
				<input type="number" value={height} onChange={ev => setQueryData({height: +ev.target.value})} min="1" max={meta.height} />
				<button onClick={() => setQueryData({height: null})}>max</button>
			</p>
			<p>
				Blur:
				<input type="number" value={blur} onChange={ev => setQueryData({blur: +ev.target.value})} min={config.blurMinMax[0]} max={config.blurMinMax[1]} />
				<button onClick={() => setQueryData({blur: null})}>reset</button>
			</p>
			<p>
				Greyscale:
				<input type="checkbox" checked={isGreyscale} onChange={ev => setQueryData({ greyscale: isGreyscale ? null : true }) } />
			</p>
		</div>
		<div className="preview" style={previewStyle}/>
	</div>;
}
