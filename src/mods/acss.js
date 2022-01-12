const fs = require("fs"),
	path = require("path"),
	wf = require("async-waterfall"),
	{minify} = require ("terser"),
	paths = {
		data : path.join(__dirname, "..", "static", "public", "acss", "mods","data.js"),
		hlpr : path.join(__dirname, "..", "static", "public", "acss", "mods","hlpr.js"),
		main : path.join(__dirname, "..", "static", "public", "acss", "main.js"),
		config : path.join(__dirname, "..", "static", "public", "acss", "mods", "config.js"),
		acss : path.join(__dirname, "..", "static", "public", "acss", "acss.js"),
		acssmin : path.join(__dirname, "..", "static", "public", "acss.min.js"),
		loadacss : path.join(__dirname, "..", "static", "public", "loadacss.js")
	} 

const env = process.env.NODE_ENV == "production" ? "pro" : "dev";
function init () {
	
	wf([
		function (cb) {
			write(paths.acss, "", cb);
		},
		function (cb) {
			write(paths.acssmin, "", cb)
		},
		function (cb) {
			read (paths.data, cb);
		},
		function (cb) {
			read(paths.hlpr, cb);
		},
		function (cb) {
			read(paths.main, cb);
		},
		function (cb) {
			read(paths.config, cb);
		}
	], (err,result) => {
		if(err ) console.log(err);
		compress();
	})
}
function write (file, txt= "", cb) {
	fs.writeFile(file, txt, (err) => {
		if (err) console.log(err);
		cb()
	})
}
function read ( file, cb ){
	fs.readFile(file, (err, data) =>{
		if (err) return cb(err);
		append(data, cb)
	})
}
function append ( data, cb ) {
	fs.appendFile(paths.acss, data, (err) => {
		if( err ) return cb(err);
		cb( null );
	})
}

async function compress () {
	wf([
			function (cb) {
				fs.readFile (paths.acss, (e1, txt) => {
					if (e1) return cb(e1)
					cb( null, txt)
				})
			},
			async function (txt, cb) {
				let minified_txt = await minify(txt.toString());
				cb (null, minified_txt.code);
			}
		], (e, data)  => {
		if (e) return console.log(e);
		fs.writeFile(paths.acssmin, data, (err) =>{
			if (err) return console.log(err)
			console.log("acss appended and compressed !")
			loadacss_config ()
		})
	})
}

async function loadacss_config () {
	let acss_url = env == "pro" ? "https://cdn2132.herokuapp.com/acss.min.js" : "http://localhost:9000/acss.min.js";
	let loadacss_body = `async function runAcss (){
	let acssBody;
	if ( localStorage.getItem("acss")) acssBody = localStorage.getItem("acss");
	else {
		acssBody = await fetch("${acss_url}"),
		acssBody = await acssBody.text();
		localStorage.setItem ("acss", acssBody)
		console.log("fetched acss from cdn -> localStorage")
	}
	if(acssBody) eval(acssBody)
}
runAcss ()`
	let minified_txt = await minify(loadacss_body);
	write(paths.loadacss, minified_txt.code, () => console.log("loadacss is configed acc. to", env))
}

exports.init = init;