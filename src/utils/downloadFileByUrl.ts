// download file as binary with recompression

import { config } from '../config';

export function downloadFileByUrl(url: string, name: string, meta: ImageMeta, mimeKey: string) { // keyof<typeof<config.mimeTypesEncoding>>
	if ( !url || !name || !meta || !config.mimeTypesEncoding[mimeKey] ) {
		throw new Error(`downloadFileByUrl validation error`);
	}
	
	const img = new window.Image();
	img.crossOrigin="anonymous";
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = meta.width;
	canvas.height = meta.height;

    img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0);
		
		const blobUri = canvas.toDataURL(...config.mimeTypesEncoding[mimeKey]);

		const a = document.createElement("a");
		a.href = blobUri;
		a.style = "display: none";
		if (name && name.length) a.download = `${name}.${mimeKey}`;
		document.body.appendChild(a);
		a.click();
    });
    img.setAttribute("src", url);
}