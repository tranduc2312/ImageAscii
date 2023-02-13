var fs = require('fs');

function read() {
	return new Promise((resolve,reject) => {
		fs.readFile('image.txt','utf8', function(err,data) {
			var lines = data.split(/\r?\n/);
			var i = 0;
			console.log('read file success');
			resolve('main');
		});
		// var id = setInterval(function(){
			// if (i == lines.length - 1) { clearInterval(id); }
			// else {
				// console.log(lines[i]);
				// i++;
			// }
		// },30);			
	});
}

function read2() {
	var data = fs.readFileSync('image.txt','utf8');
	if (data != null || data != '') console.log('read ok');
}

async function read3() {
	var a = () => {
		return new Promise(resolve => {
		fs.readFile('image.txt','utf8', function(err,data) {
			var lines = data.split(/\r?\n/);
			var i = 0;
			console.log('read file success');
			resolve('main');
		});	});
	}
	console.log(await a());
}


async function main() {
	var a = await read();
	// a.then(data => {
		// console.log(data);
	// });
	console.log(a);
}
read3();