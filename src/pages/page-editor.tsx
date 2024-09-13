import React from 'react';
import { useParams, Navigate, Link  } from 'react-router-dom';

import { config } from '../config';
import { useQueryData, useImage } from '../hooks';
import { downloadFileByUrl } from '../utils';

export const PageEditor: React.FC = () => {
	const { imageId } = useParams();
	const { queryData, setQueryData } = useQueryData();
	const { meta } = useImage(imageId);

	const width = +(queryData?.width ?? meta?.width ?? 1);
	const height = +(queryData?.height ?? meta?.height ?? 1);
	const isGreyscale = !!queryData?.greyscale;
	const blur = +(queryData?.blur ?? 0);


	const query = [];
	if ( isGreyscale ) {
		query.push('grayscale');
	}
	if ( blur > 0 ) {
		query.push(`blur=${blur}`);
	}


	if ( !imageId ) {
		return <Navigate to="/pages/list" replace />;
	}
	if ( !meta ) {
		return <div className="editor">Loading...</div>;
	}

	const imageUrl = `${config.imagesBaseAPI}/id/${imageId}/${width}/${height}${query.length ? `?${query.join('&')}` : '' }`;
	const imageFileName = `image_${imageId}_${width}_${height}_${query.join('&')}`;
	const downloadImageMeta = {...meta, width, height };

	// original preview is shown while current settings load, therefore we have a nice preview
	const currentPreviewStyle = { backgroundImage: `url(${imageUrl})` };

	return <div className="editor">
		<div className="tools">
			<h4>Editor</h4>
			<Link to={`/pages/list${ queryData.p ? `?p=${queryData.p}` : ''}`}>
				Back to gallery { queryData.p ? <>page {queryData.p}</> : null}
			</Link>

			<p>
				Author: <strong>{meta.author}</strong>
			</p>

			<br />

			<p>
				Width:
				<input type="number" value={width} onChange={ev => setQueryData({width: +ev.target.value})} min="1" max={meta.width} />
				<button className="small" onClick={() => setQueryData({width: null})}>reset</button>
			</p>
			<p>
				Height:
				<input type="number" value={height} onChange={ev => setQueryData({height: +ev.target.value})} min="1" max={meta.height} />
				<button className="small" onClick={() => setQueryData({height: null})}>reset</button>
			</p>
			<p>
				Blur:
				<input type="number" value={blur} onChange={ev => setQueryData({blur: +ev.target.value})} min={config.blurMinMax[0]} max={config.blurMinMax[1]} />
				<button className="small" onClick={() => setQueryData({blur: null})}>reset</button>
			</p>
			<p>
				Greyscale:
				<input type="checkbox" checked={isGreyscale} onChange={() => setQueryData({ greyscale: isGreyscale ? null : true }) } />
			</p>

			<br />

			<h5>Download:</h5>
			<div className="downloadBlock">
				<button onClick={() => downloadFileByUrl(imageUrl, imageFileName, downloadImageMeta, 'jpg') }>JPG</button>
				<button onClick={() => downloadFileByUrl(imageUrl, imageFileName, downloadImageMeta, 'png') }>PNG</button>
				<button onClick={() => downloadFileByUrl(imageUrl, imageFileName, downloadImageMeta, 'gif') }>GIF</button>
				<button onClick={() => downloadFileByUrl(imageUrl, imageFileName, downloadImageMeta, 'bmp') }>BMP</button>
				<button onClick={() => downloadFileByUrl(imageUrl, imageFileName, downloadImageMeta, 'webp') }>WEBP</button>
			</div>
		</div>
		<div className="preview">
			<div className="previewLayer current" style={currentPreviewStyle}/>
			<div className="previewLayer">Loading...</div>
		</div>
	</div>;
}
