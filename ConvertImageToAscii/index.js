var jimp = require('jimp');
var fs = require('fs');

var map = {'40':'m','64':'d','80':'h','90':'y',
	   '118':'s','130':'o','150':'+','160':'/',
       	   '185':':','200':'-','225':'.','237':'`','255':' '};



function convertImage(imagePath,width) {
	jimp.read(imagePath)
	.then(data => {	return resizeImage(data, width, false); })
	.then(data => {	return convertImgToText(data);         })
	.then(text => {	fs.writeFileSync('txt/image.txt',text);    });
}	

function convertImgToText(data){
	var text = '';
	var w = data.bitmap.width;
	var h = data.bitmap.height;
	for (var i=0; i < h; i+=2) {
		//var line = '';
		for(var j=0; j < w; j++) {
			var color = jimp.intToRGBA(data.getPixelColor(j,i));
			//console.log(color);
			var rate = color.b;
			var temp = '';
			for (const[k,v] of Object.entries(map)){
				if (rate <= k) { temp = v; break; }
			}
			//line += temp;
			text += temp;
			process.stdout.write(temp);
			temp = '';
		}
		//console.log(line);
		//line = '';
		console.log();
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

function getPixelColor(imagePath){
	var text = '';
	jimp.read(imagePath, function(err, data) {
		
		var w = data.bitmap.width;
		var h = data.bitmap.height;
		
	 	for (var i=0; i < h; i++) {
			for(var j=0; j < w; j++) {
				var color = jimp.intToRGBA(data.getPixelColor(j,i));
				var rate = color.r;
				var temp = '';
				for (const[k,v] of Object.entries(map)){
					if (rate < k) { temp = v; break; }
				}
				text += temp;
				process.stdout.write(temp);
				temp = '';
			}
			console.log();
			text += '\n'
		}
	 });
	 return text;
}

function invertImage(imagePath,width) {
	jimp.read(imagePath, function(err,data) {
		if (err) console.log(err);
		else {
			var w = data.bitmap.width;
			var h = data.bitmap.height;
			var rate = width/w;
			data.resize(w*rate,h*rate)
				.quality(72)
				.greyscale()
				.invert()
				.write('images/duc.jpg');
		}
	});
}
				
				

//'Diana Pozharskaya.jpg'
//convertImage('images/Diana Pozharskaya.jpg',200);
convertImage('images/_MG_2285.JPG', 300);
//getPixelColor('duc.jpg');
//convertImage();
