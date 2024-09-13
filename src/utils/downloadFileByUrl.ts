// download file as binary
export function downloadFileByUrl(url: string, name: string) {
	fetch(url)
		.then(resp => resp.blob())
		.then(blob => {
			const blobUri = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = blobUri;
			a.style = "display: none";
			if (name && name.length) a.download = name;
			document.body.appendChild(a);
			a.click();
		})
		.catch(err => {
			//proper handling?
			console.error(err);
		});
}