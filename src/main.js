let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let video = document.querySelector("#video");

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
	navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
		video.srcObject = stream;
	});
}

document.getElementById("snap").addEventListener("click", () => {
	context.drawImage(video, 0, 0, 640, 480);
	downloadImage(canvas.toDataURL());
})

async function downloadImage(imageSrc) {
	const image = await fetch(imageSrc)
	const imageBlog = await image.blob()
	const imageURL = URL.createObjectURL(imageBlog)

	const link = document.createElement('a')
	link.href = imageURL
	link.download = 'image file name here'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}