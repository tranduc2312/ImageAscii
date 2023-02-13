const extractFrames = require('ffmpeg-extract-frames')

async function extract() {
	var offset = [];
	for (var i = 1 ; i < 13000; i+=1000/30) {
		offset.push(i);
	}
	var ok = await extractFrames({
		input: 'videos/download2.mp4',
		output:'frames/frame-%00i.jpg'
		,offsets: offset
	});
	console.log(ok);
}

extract();
