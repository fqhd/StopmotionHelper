let video = document.querySelector("#video");
let button = document.querySelector("#snapButton");
let display = document.querySelector("#display");

let constraints = {
	audio: false,
	video: true
};

navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
	let videoTracks = stream.getVideoTracks();
	console.log("Got video tracks: " + videoTracks[0].label);
	window.stream = stream;
	video.srcObject = stream;
}).catch(function(error){
	// Display an error message
	console.log("Something went wrong in the video");
});

button.addEventListener("click", function(){
	let canvas = document.createElement("canvas");
	canvas.width = 640;
	canvas.height = 480;
	let ctx = canvas.getContext("2d");
	ctx.drawImage(video, 0, 0, 640, 480);
	let dataURI = canvas.toDataURL("image/jpeg");
	display.style.setProperty('--datauri', `url(${dataURI})`);
});