import html2canvas from "html2canvas";

export const exportImage = async () => {
	const element = document.getElementById('export');

	const canvas = await html2canvas(element!, {
		backgroundColor: '#ffffff',
		scale: 1,
	})

	const dataUrl = canvas.toDataURL('image/png');
	const link = document.createElement('a');

	link.href = dataUrl;
	link.download = 'export.png';
	link.click();
}

export const sendImage = async (uuid: string) => {
	const element = document.getElementById('export');

	const canvas = await html2canvas(element!, {
		backgroundColor: '#ffffff',
		scale: 1,
	})

	canvas.toBlob(async(blob) => {
		const formData = new FormData();
		formData.append('image', blob!, 'canvas.png');

		const res = await fetch('http://192.168.1.12:3000/upload', {
			method: 'POST',
			body: formData,
		});

		await fetch('http://192.168.1.12:3000/uuid', {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ uuid }),
		});

		const result = await res.json();
		console.log(result)
	}, 'image/png')
}