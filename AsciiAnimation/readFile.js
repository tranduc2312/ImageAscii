var fs = require('fs');

function readFile(file){
	return new Promise(callback => {
		var time = setTimeout(function() {
			//process.stdout.write('\033c');
			//console.clear();
			callback(fs.readFileSync(file, 'utf8'));
		},1000/50);
	});
}

async function main() {
	var files = fs.readdirSync('txt4');
	for (const image of files) {
		console.log(await readFile('txt4/'+image));
	}
}
main();
