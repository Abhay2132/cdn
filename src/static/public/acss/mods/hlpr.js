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

