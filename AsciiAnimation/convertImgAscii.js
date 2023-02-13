var jimp = require('jimp');
var fs = require('fs');

var map = {'40':'m','64':'d','80':'h','90':'y',
	   '118':'s','130':'o','150':'+','160':'/',
       	   '185':':','200':'-','225':'.','237':'`','255':' '};


function convertImage(imagePath,width) {
	return new Promise((resolve) => {
		var filename = imagePath.split("/")[1].split(".")[0];
		jimp.read(imagePath)
		.then(data => {	return resizeImage(data, width, true); })
		.then(data => {	return convertImgToText(data);         })
		.then(text => {	
			fs.writeFileSync('txt/'+filename+'.txt',text); 
			resolve('done: ' + filename + '.txt');
		});
	});
}	

function convertImgToText(data){
	var text = '';
	var w = data.bitmap.width;
	var h = data.bitmap.height;
	for (var i=0; i < h; i+=4) { // i+=1,2,3,4 tuy theo khoang cach dong
		for(var j=0; j < w; j++) {
			var color = jimp.intToRGBA(data.getPixelColor(j,i));
			var rate = color.b;
			var temp = '';
			for (const[k,v] of Object.entries(map)){
				if (rate <= k) { temp = v; break; }
			}
			text += temp;
			temp = '';
		}
		text += '\n'
	}
	return text;
}

function resizeImage(data ,width, invertFlg) {
	var w = data.bitmap.width;
	var h = data.bitmap.height;
	var r1 = width/w;
	var r2 = h/w;
	if (invertFlg) 
		return data.resize(w*r1,h*r1*r2).quality(72).greyscale().invert();
	else return data.resize(w*r1,h*r1*r2).quality(72).greyscale();
}	
				
async function run() {
	var dir = './txt';

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	var files = fs.readdirSync('frames');
	//files.forEach(image => { khong the dung await in forEach but
	for (const image of files) {
	    //var filename = ('frames/' + image).split("/")[1].split(".")[0];
		//console.log(filename);
		var ok = await convertImage('frames/' + image,80);
		console.log(ok);
	}
}

run();

