
function loadCache( aobj ) {
	let my = this;
	this.file = window.location.href.split("/")
	this.loc = "/" + this.file[this.file.length - 1]
	this.styleTag = document.createElement("style");
	this.init = function () {
		if (localStorage.getItem(my.loc)) {
			log("css cache found in localStorage !");
			document.body.insertBefore(my.styleTag, document.body.children[0]);
			my.styleTag.innerHTML = localStorage.getItem(my.loc)
			my.lscache = true;
		} else { my.lscache = false }
		
		setTimeout(() => {
			aobj.styleTag = my.styleTag;
			aobj.init({
				data: false,
				lscache: my.lscache,
				cb: function () {
					let lsc = localStorage.getItem(my.loc),
						 lscmin = lsc ? localStorage.getItem(my.loc).replace(/\s/g, "").replace(/\n/g, "") : false,
						stag = aobj.styleTag.innerHTML,
						stagmin = stag.replace(/\s/g, "").replace(/\n/g, "")
					if (lscmin != stagmin) {
						log ("css cache is outdated / invalid\nso recompiling css -> localStorage ;D")
						//document.body.appendChild(aobj.styleTag);
						document.body.parentNode.insertBefore(aobj.styleTag, document.body);
					}
					localStorage.setItem(my.loc, stag)
					timeTaken()
				}
			})
		}, 0);
	}

}

const acssobj = new acss(),
	lc = new loadCache(acssobj)
onload(lc.init)

function timeTaken() {
	let ct = ((Date.now() / 1000) - acssobj.sec).toFixed(3)
	console.log("acss compiled in ", ct, "secs")
}

