
	async function getAcss () {
		if (localStorage.getItem("acss")) return localStorage.getItem("acss");
		let acss2 = await fetch("acss.min.js"),
			str = await acss2.text()
		console.log("acss fetched !")
		return str;
	}
	async function runAcss () {
		let acssStr = await getAcss ()
		eval(acssStr);
		localStorage.setItem("acss", acssStr)
	}
	runAcss ();