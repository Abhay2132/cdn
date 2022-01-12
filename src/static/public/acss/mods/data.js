const prop1 = {
	p: "padding",
	m: "margin",
	rc: "border-radius",
	d: "display",
	bdr: "border",
	t: "text-align",
	w: "width",
	h: "height",
	f: "font-size",
	bg: "background",
	clr: "color",
	out: "outline",
	gtc: "grid-template-columns",
	gtr: "grid-template-rows",
	ff: "font-family",
	btm: "bottom",
	top: "top",
	left: "left",
	right: "right",
	ovrflw: "overflow",
	ovrflwX : "overflow-x",
	ovrflwY : "overflow-y",
	pos: "position",
	vcblt: "visibility",
	trns: "transition",
	bdr: "border",
	transf : "transform",
	fw : "font-weight",
	lst : "list-style",
	usr : "user-select",
	mh : "max-height",
	mw : "max-width",
	minw : "min-width",
	minh : "min-height",
	txtdc : "text-decoration",
	opct : "opacity",
	flxwrp : "flex-wrap",
	jc : "justify-content",
	ai : "align-items",
	ws : "white-space",
	gg : "grid-gap",
	bs : "box-shadow",
	crsr : "cursor",
	zi : "z-index",
	wrdbrk : "word-break"
}

const prop2 = {
	T: "-top",
	B: "-bottom",
	L: "-left",
	R: "-right",
	lg: "", //lg for Linear Gradient
	rgba: "", // rgba for aplha value in text
	C: "-color",
	S: "-size"
}

const val = {
	xxs: "1px",
	xs: "3px",
	s: "5px",
	l: "15px",
	xl: "20px",
	xxl: "25px",
	xxxl: "30px",
	no: "none",
	b: "block",
	ib: "inline-block",
	flx: "flex",
	iflx: "inline-flex",
	c: "center",
	lft: "left",
	r: "right",
	"100": "100%",
	"0" : "0%",
	drk: "#333",
	grd : "grid",
	n: "0px",
	ig: "inline-grid",
	hdn: "hidden",
	a: "auto",
	abs: "absolute",
	rel: "relative",
	vcbl: "visible",
	transp: "transparent",
	wrp : "wrap",
	spcb : "space-between",
	fxd : "fixed",
	nw : "nowrap",
	pntr : "pointer",
	scrl : "scroll",
	def : "default",
	brkall : "break-all",
	"flxs" : "flex-start"
}

const def = "10px";

const spProp = {
	flxWrp : {
		"flex-wrap" : "wrap"
	},
	"f-c-c": {
		display: "flex",
		"flex-direction": "column",
		"justify-content": "center"
	},
	"f-r-c": {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "center"
	},
	"fsb": {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between"
	},
	bb: {
		"box-sizing": "border-box"
	},
	bnw: {
		"background-color": "#0095FF",
		color: "white"
	},
	dnw: {
		"background-color": "#333",
		color: "white"
	},
	lthm : {
		"background-color": "#fff",
		color: "#333",
		"border-color" : "#333"
	},
	bdr: {
		"border": "1px solid"
	},
	"trns-txt": {
		background: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/990140/download.png)   -20px -20px fixed",
		"-webkit-text-fill-color": "transparent",
		"-webkit-background-clip": "text"
	},
	flxwrp: {
		"flex-wrap": "wrap"
	},
	dwnArw: {
		border: "10px solid rgba(0,0,0,0)",
		display: "inline-block",
		"border-top-color": "#333",
		position: "relative",
		top: "0.5rem"
	},
	toc : {
		"transform-origin" : "50% 50%"
	},
	tof : {
		"transform-origin" : "0% 50%"
	},
	st : {
		transition : "0.3s"
	},
	midl : {
		display : "flex",
		"justify-content" : "center",
		"align-items" : "center"
	},
	btn_off : {
		border : "1px solid",
		"border-radius" : "5px",
		"box-shadow" : "0px 4px 0px #555",
		transform : "translateY(0px)"
	},
	btn_on : {
		border : "1px solid",
		"border-radius" : "5px",
		"box-shadow" : "0px 2px 0px #555",
		transform : "translateY(2px)"
	},
	not_btn : {
		border : "0px solid",
		"border-radius" : "5px",
		"box-shadow" : "0px 0px 0px transparent",
		transform : "translateY(0px)"
	},
	carousel : {
		"scroll-snap-type" : "x mandatory",
		"scroll-behavior" : "smooth"
	},
	slide : {
		"scroll-snap-align" : "center",
		"flex-shrink" : 0
	},
	vc : {
		display : "flex",
		"align-items" : "center"
	},
	"blrbg" : {
		"backdrop-filter" : "blur(5px)"
	}
}

var keys = {
	prop1: Object.keys(prop1),
	prop2: Object.keys(prop2),
	val: Object.keys(val),
	spProp: Object.keys(spProp)
}

function onload(func, ...args) {
	// log('in onload')
	setTimeout(function () {
		if (document.readyState == "interactive" || document.readyState == "complete") {
			return func(...args);
		} else {
			onload(func, ...args);
		}
	}, 0);
}

