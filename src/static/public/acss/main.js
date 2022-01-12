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
