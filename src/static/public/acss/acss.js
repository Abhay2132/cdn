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
	wwrp : "word-wrap",
	gg : "grid-gap",
	bs : "box-shadow",
	crsr : "cursor",
	zi : "z-index",
	wrdbrk : "word-break",
	flxDir : "flex-direction"
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
	"flxs" : "flex-start",
	"brkw" : "break-word"
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

function hlpr () {
	let me = this
	this.jsonBeautify = function(jsn, name, spc) {
		if (!spc) spc = 2;
		if(!name) name = "json"
  if (typeof jsn === "object")
    jsn = JSON.stringify(jsn)
		var str = "",
			s = 0
		if (name.length) {
			str = name + " = ";
		}
		let comma = false
		for (let a of jsn) {
			if(a === '"') comma = comma ? false : true;
			
			if (a === "{" || a === "[") {
				s += spc
				str += a + "\n" + me.space(s)
			} else
			if (a === "}" || a === "]") {
				s -= spc;
				str += "\n" + me.space(s) + a
			} else
			if (a === ",") {
					str += comma ? a : (a+"\n" + me.space(s))
			} else {
				str += a
			}
		}
		return str;
	}
	this.space = function(n) {
		str = ""
		while (n--) {
			str += " "
		}
		return str
	}
/*_______________________________________________*/
	this.rndmStrGen  = function (length) {
	length = length ? length : 5
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
	}
/*_______________________________________________*/
	this.cls_spliter  = function ( cls_str, sk = ","){
        let str = "",
            brac = 0,
            cls_arr = new Array ();
        for(let a of cls_str ){
            if( a === "(") brac ++; else
            if( a === ")") brac --;
            
            if( sk == (a) && brac == 0 ){
                cls_arr.push(str) 
                str = ""
            } else str += a
        }
        cls_arr.push(str)
        
        return (cls_arr)
    }
/*_______________________________________________*/
	this.obj_merger  = function (obj_arr){
		let merged_obj = {}
		for(let obj of obj_arr)
			for (let k in obj)
				merged_obj[k] = obj[k]
				
		return merged_obj;
	}
	
	this.chd_clsname_gen  = function (c, t_id){
		let brac_i = c.indexOf("(")
		var chd_c = c.substring(0, brac_i);	// #id > div_span
		let chd_tags = chd_c.length > 3 ? chd_c.split("-")[1].split("_").join(",") : "*"; // convert div_hr_p -> div , hr , p
		let req_c = t_id + " > " + chd_tags;
		return req_c;
	}
	
	this.replaceAll  = function (str,letr, replacer = " "){
		if( ! str ) return false;
		let result = "";
		for(let a of str){
			if( a === letr ) result += replacer;
			else result += a;
		}
		return result;
	}
	
	this.transf_val_parser  = function (v, debug) {
		var parsed_val = ""
		
			if( v.includes("a") ){
				for(let i of v.split("a") ){
					parsed_val += me.transf_val_parser (i) + " ";
				}
			} else
			if ( v.startsWith ("y") && v.endsWith("p")){
				v = v.replace("_", "-"); // y_3p means -3px in y
				parsed_val = "translateY(" + v.substring(1, v.length) + "x)";
			} else 
			if ( v.startsWith ("x") && v.endsWith("p")){
				v = v.replace("_", "-"); // x_3p means -3px in x
				parsed_val = "translateX(" + v.substring(1, v.length) + "x)";
			} else 
			if ( v.startsWith ("r") ){
				v = v.replace("r", "rotate(");
				parsed_val = v + "deg)";
			} else
			if ( v.startsWith("s") ) {
				v = v.replace("d", ".");
				v = v.replace("s", "scale(");
				parsed_val = v + ")";
			}
			
			if( debug ) console.log("transf-parser : " + v +" -> " + parsed_val);
			return parsed_val;
	}
/*_______________________________________________*/
	this.get_chd_idntfyr  = function ( tag ,db ) {
		let tid = tag.id || false ,
			tcls = tag.className.split(" ") || new Array()
		
		if (db ) log( "tcls" , ":" , tcls)
		if ( tid ){ return { tid : tid , s : "#" };}
		for ( c of tcls ) {
			if ( c == "debug" ||  ! c || (c.startsWith ("mb(") || c.startsWith ("chd(") || c.startsWith ("pc(") || c.startsWith ("tb(")) && c.endsWith(")") )
				continue 
			if(! keys.prop1.includes(c.split("-")[0]) && ! keys.spProp.includes(c) ){
					tid = c; 
					if (db ) log ("! keys.prop1.includes(c) :",  c )
					break;
			}
		}
		if (db ) console.log ( "tid : ", tid);
		return { tid : tid, s : "." }
	}
	
}

const log = (...args ) => console.log (...args);

"use strict"
function acss () {
	const me = this;
	
	this.config = function ( data, cb ){
    for( let key in data ) if( ! me[key] ) me[key] = data[key];
    if (typeof cb == "function") cb();
	}
	this.config ({
	hlpr : new hlpr(),
    prop1: prop1,
    prop2: prop2,
    val: val,
    def: def,
    def_bdr: "1px solid",
    spProp: spProp,
    added: new Array(),
    keys: {},
    pc_brkpnt: "768px",
    tab_brkpnt: "600px",
    respStyle: "",
    classes : 0,
    dd: "", // debug Data
	styleTag : document.createElement("style")});
    /*__________________________________________*/
    this.respStyleGen = function(cls_arr, bp, db, mb = false) {
		let mmx = mb ? "max" : "min";
        let str = "\n@media only screen and ("+mmx+"-width:" + bp + ") {";
        for (let clsObj of cls_arr) {
            str += me.genCls(clsObj.tid , clsObj.s_defs, 2, clsObj.s)
        }
        str += "}\n"
        if (db) {
            console.log("(respStyleGen) " + str);
        }
        return str
    }
    /*__________________________________________*/
    this.cv = function(clsObj, debug) { // cv means class validater
        if (Object.keys(clsObj).length < 1 || clsObj === {}) return false;
        for (let prop in clsObj) {
            if (!(clsObj[prop])) return false;
        }
        return true;
    }
    /*__________________________________________*/
    this.genCls = function(c, c_def, spc = 0, s="." ) {
        var str = "\n" + me.hlpr.space(spc) + s + c + " {\n";
        for (let prop in c_def) {
            str += "  " + me.hlpr.space(spc + spc) + prop + " : " + c_def[prop] + " ;\n"
        }
        str += me.hlpr.space(spc) + "}\n";
        return str
    }
    /*__________________________________________*/
    this.addStyle = function(c, c_def, debug, s=".") {
        var str = me.genCls(c, c_def, 0, s);
        me.styleTag.innerHTML += str;
        me.classes ++;
        if (debug && str) me.dd["class_generated"] += str.replace(/\r?\n|\r/g, "")
        if (typeof cb === "function") cb();
    }
    /*__________________________________________*/
    this.config = function(data, cb) {
        if (typeof data === "object") {
            for (let key in data) {
                if (Object.keys(acss).includes(key)) acss[key] = data[key]
            }
        }
        if (typeof cb === "function") cb()
    }
    /*__________________________________________*/
    this.init = function( { data ,cb,  cf, lscache } ) {
    	me.timer = {}
		me.sec = Date.now()/1000
        //log("in me.init, lscache : ", lscache)
    	if ( typeof cache_init != "undefined" ){
    		let ci = cache_init;    		    
			console.log (cache_init )
    		if ( ci === true ) return;
    	}
        if (data) me.config(data)
        me.keys = {
            prop1: Object.keys(me.prop1),
            prop2: Object.keys(me.prop2),
            val: Object.keys(me.val),
            spProp: Object.keys(me.spProp)
        }

        if( ! lscache) document.body.appendChild(me.styleTag)
        else me.styleTag = document.createElement("style");

        me.domScanner(document.body)

        if (me.respStyle.length) {
            me.styleTag.innerHTML += me.respStyle;
        }
        if (typeof cb === "function") cb();
     //   console.log (me.timer )
    }
    /*__________________________________________*/
    this.domScanner = function(b) {
        let bc = b.children;
        let cls = b.className.split(" ");
        me.apply_acss(b, cls, cls.includes("debug"))
        if (bc.length) me.childLooper(bc)
    }
    /*__________________________________________*/

    this.childLooper = function(tags) {
        for (let tag of tags) {
        	let s = ("" + ((Date.now () / 1000) - me.sec )).split(".")[0]
            if ( Object.keys(me.timer).includes(s) )
				 me.timer[s].push( tag.tagName + ":" + tag.id );
			else
				me.timer[s] = new Array( tag.tagName + ":" + tag.id );
				
        	let cls = typeof tag.getAttribute("class") == "string" ? tag.getAttribute("class").split(" ") : false;
            if ( ! cls ) continue;
            me.apply_acss(tag, cls, cls.includes("debug"))
            let tc = tag.children
            if (tc.length) me.childLooper(tc)
        }
    }
    /*__________________________________________*/
    this.c_def_gen = function(c, debug = false, isChild = false) {
        var c_def = {};
        if (me.keys.spProp.includes(c)) {
            if( ! isChild ) me.added.push(c);
            return me.spProp[c]
        }
        var cp = c.split("-"); //cp means class parts like t-c => t,c
        let x = cp[0],
            y = cp[1],
            z = cp[2],
            v = cp[3]
        if (cp.length == 1 && me.keys.prop1.includes(x)) {
            c_def[me.prop1[x]] = me.def;
        }
        if (cp.length == 2 && me.keys.prop1.includes(x)) {
            if (me.keys.val.includes(y)) c_def[me.prop1[x]] = me.val[y];
            else
            if (me.keys.prop2.includes(y)) c_def[me.prop1[x] + me.prop2[y]] = x == "bdr" ? me.def_bdr : me.def;
            else
            if (me.valParser(cp, debug)) c_def[me.prop1[x]] = me.valParser(cp)
        }
        if (cp.length == 3 && me.keys.prop1.includes(x) && me.keys.prop2.includes(y)) {
            if (me.keys.val.includes(z)) c_def[me.prop1[x] + me.prop2[y]] = me.val[z];
            else
            if (me.valParser(cp, debug) && me.keys.prop2.includes(y)) c_def[me.prop1[x] + me.prop2[y]] = me.valParser(cp)
        }

        return c_def;
    }
    /*__________________________________________*/
    this.apply_acss = function(tag, cls = false, debug = false, t_id = false, rf = false, s = "#") { //rf : return flag
		cls = cls ? cls : typeof tag.getAttribute("class") == "string" ? tag.getAttribute("class").split(" ") : false;
		if ( ! cls ) return;
		debug = cls.includes("debug")
        if (debug) {
            me.dd = {
                cls: cls.join(", "),
                class_generated: "",
                parsed_val: new Array(),
                invalid_cls : new Array()
            }
        }
        var mqCls_arr = new Array (),
            mqClsObjs = new Array()
        for (let c of cls) {
			
            if (c.startsWith("pc(") && c.endsWith(")")) {
                me.mq(tag, c, me.pc_brkpnt, debug)
          	  if ( ! me.added.includes(c)) me.added.push(c)
                continue;
            }
            if (c.startsWith("tb(") && c.endsWith(")")) {
                me.mq(tag, c, me.tab_brkpnt, debug)
          	  if ( ! me.added.includes(c)) me.added.push(c)
                continue;
            }
            if (c.startsWith("mb(") && c.endsWith(")")) {
                me.mq(tag, c, me.tab_brkpnt, debug, true)
          	  if ( ! me.added.includes(c)) me.added.push(c)
                continue;
            }
            if (c.startsWith("chd") && c.endsWith(")")) {
                let c_df = me.chd_styler(tag, c, debug, t_id, rf)
                if (t_id) mqClsObjs.push(c_df);
          	  if ( ! me.added.includes(c)) me.added.push(c)
                continue;
            }
            if (c.startsWith("hbr") && c.endsWith(")")) {
                let c_df = me.hbr_styler(tag, c, debug, t_id, rf)
                if (t_id) mqClsObjs.push(c_df);
          	  if ( ! me.added.includes(c)) me.added.push(c)
                continue;
            }
			if ( (t_id == false) && (me.added.includes(c) || c == "debug")) continue;
            var c_def = me.c_def_gen(c, debug)

            if (t_id) {
                mqCls_arr.push(c_def)
                continue;
            }
            if (!(me.cv(c_def, debug))) {
                if (debug) me.dd.invalid_cls.push(c)
                continue;
            }
            if ( ! me.added.includes(c)) me.added.push(c)
            me.addStyle(c, c_def, debug)
        }
        if (t_id && rf ) {
            if (mqCls_arr.length > 0) mqClsObjs.push({
                tid: t_id,
                s_defs: me.hlpr.obj_merger(mqCls_arr),
                s : s
            });
            return mqClsObjs
        }

        if (debug) {
            let ddname = tag.id.length > 1 ? tag.id : tag.tagName;
            console.log("(debug)" + me.hlpr.jsonBeautify(me.dd, ddname))
        }
    }
    /*__________________________________________*/

    this.chd_styler = function(tag, c, debug = false, t_id = false, rf = false) {
    	let chd_idntfyr = me.hlpr.get_chd_idntfyr (tag)
    	if ( ! chd_idntfyr.tid ) return console.error (" chd_styler error :", tag.tagName, "has no id or unique class for children" )
    	let s = chd_idntfyr.s
        let brac_i = c.indexOf("(")
        let tid = t_id || chd_idntfyr.tid
        let req_c = me.hlpr.chd_clsname_gen(c, tid)
        let cl = c.substring(brac_i + 1, c.length - 1)
        let cls = me.hlpr.cls_spliter(cl) //cl.split(",")
        var chd_cls = {};
		if (debug ) log( c )
        for (let i of cls) {
            if (i.startsWith("chd") && i.endsWith(")")) {
        		if ( debug ) console.log( " startsWith(chd) : " , i )
                me.chd_styler(tag, i, debug, req_c)
                continue;
            } else
            if (i.startsWith("hbr") && i.endsWith(")")) { 
                me.hbr_styler(tag, i, debug, req_c)
                continue;
            }

            let styleobj = me.c_def_gen(i, debug, true);
            for (let k in styleobj) {
                chd_cls[k] = styleobj[k]
            }
        }
        if (debug) me.dd[req_c] = chd_cls
			//console.log("(chd_c_gen) " + me.hlpr.jsonBeautify(chd_cls, req_c))

        if (t_id && rf ) return {
            tid : req_c,
            s_defs: chd_cls,
            s : s
        };
        me.addStyle(req_c, chd_cls, debug, s )

    }
    /*__________________________________________*/

    this.hbr_styler = function(tag, c, debug = false, t_id = false, rf = false) {
    	let chd_idntfyr = me.hlpr.get_chd_idntfyr (tag)
    	if ( ! chd_idntfyr.tid ) return console.error (" chd_styler error :", tag.tagName, "has no id or unique class for children" )
    	let s = chd_idntfyr.s

        let brac_i = c.indexOf("(")
        let req_c = t_id || chd_idntfyr.tid
        req_c += ":hover"

        let cl = c.substring(brac_i + 1, c.length - 1)
        let cls = me.hlpr.cls_spliter(cl) //cl.split(",")
        var hbr_cls = {};

        for (let i of cls) {
            if (i.startsWith("chd") && i.endsWith(")")) {
                me.chd_styler(tag, i, debug, req_c)
                continue;
            }
            let styleobj = me.c_def_gen(i);
            for (let k in styleobj) {
                hbr_cls[k] = styleobj[k]
            }
        }
        if (debug) console.log("(hbr_c_gen) " + me.hlpr.jsonBeautify(hbr_cls, req_c))

        if (t_id && rf) return {
            tid: req_c,
            s_defs: hbr_cls,
            s : s
        };

        me.addStyle(req_c, hbr_cls, debug, s)

    }

    /*__________________________________________*/
    this.mq = function(tag, c, bp, debug, mb = false) {
    	let chd_idntfyr = me.hlpr.get_chd_idntfyr (tag)
    	if ( ! chd_idntfyr.tid ) return console.error (" chd_styler error :", tag.tagName, "has no id or unique class for children" )
    	let s = chd_idntfyr.s

        let cl = c.substring(3, c.length - 1)
        let cls = me.hlpr.cls_spliter(cl)
        var mqCls = {},
            cls_arr = new Array();

        let tid = chd_idntfyr.tid;

        cls_arr = me.apply_acss(tag, cls, debug, tid, true, chd_idntfyr.s)
        if (debug) console.log("(mq) cls_arr : " + JSON.stringify(cls_arr))
        let gen_resp_data = me.respStyleGen(cls_arr, bp, debug, mb);
        me.respStyle += gen_resp_data

        if (debug) {
            console.log("(mq) " + typeof cls + " " + me.hlpr.jsonBeautify(cls, "cls"))
            me.dd.mq = cls.join()
            me.dd.mq_gen_cls = (gen_resp_data.replace(/\n/g, ""))
        }
    }
    /*__________________________________________*/
    this.valParser = function(cp, debug) {
        var parsed_val = false,
            a = cp[0],
            b = cp[1],
            c = cp[2],
            d = cp[3],
            v = cp[cp.length - 1],
            z = v[v.length - 1]
        if (v.startsWith("_")) {    // _23p => -23px
        		if( z= "p")
          		parsed_val = v.replace("_", "-") + "x"
          	else
          		parsed_val = v.substring (1, v.length )
        } else
        if (a === "bg" || a == "clr") {
            if (b == "lg") parsed_val = `linear-gradient(${v})`;
            else
            if (b == 'rgba') parsed_val = `rgba(${v})`;
            else parsed_val = v.startsWith("#") ? v : "#" + v;
        } else
        if (v.endsWith("pg")) {
            parsed_val = v.replace("pg", "%")
        } else
        if (a == "bdr") {
            if (b == "C" || c == "C") // for color we use C for prop2
                parsed_val = "#" + v; // ex : bdr-C-green or b-T-C
            else
            if (v.includes("_")) {
                parsed_val = v.replace("_", "x solid #");
            } else
            if (me.keys.prop2.includes(b) && c == v) parsed_val = `${v}x solid`
            else parsed_val = v + "x solid";
        } else
        if (a == "transf") {
            parsed_val = me.hlpr.transf_val_parser(v, debug)
        } else
        if (z == "p") {
            parsed_val = v + "x";
        } else
        if (v.endsWith("vh") || v.endsWith("rem") || "zi,ff,fw,trns,left,right,btm,top,w,h,mh,mw".split(",").includes(a)) {
            parsed_val = v.replace("d", ".")
        } else
        if ("p,m,gtc,gtr,rc,bs,opct".split(",").includes(a)) {
            v = v.replace("hex", "#");
            parsed_val = v.split( "_").join(" ");
        }

        if (debug) me.dd.parsed_val.push((cp + " -> " + parsed_val) );
        return parsed_val;
    }

}

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

