
function AjaxObj() {
	this.responseText = null;
	var s = document.createElement('div');
	s.style.display = 'none';
	s.innerHTML = '<iframe id="ajaxiframe" name="ajaxiframe" width="0" height="0" src=""></iframe>';
	document.body.appendChild(s);
	this.iframe = s.firstChild;

	this.post = function(url,data) {
		if (typeof data == 'string' && data != '') {
			var f = document.createElement('form');
			f.name	 = 'ajaxform';
			f.target = 'ajaxiframe';
			f.method = 'post';
			f.action = url;
			var ds = data.split("&");
			for (var i = 0; i < ds.length; i++) {
				if (ds[i]) {
					var v	 = ds[i];
					var el	 = document.createElement('input');
					el.type  = 'hidden';
					el.name  = v.substr(0,v.indexOf('='));
					el.value = v.substr(v.indexOf('=')+1);
					f.appendChild(el);
				}
			}
			document.body.appendChild(f);
			f.submit();
			document.body.removeChild(f);
		} else if (typeof data == 'object') {
			data.target = 'ajaxiframe';
			data.submit();
		} else {
			self.ajaxiframe.location = url;
		}
	}
}
function XMLhttp() {
	this.request = null;
	this.recall	 = null;
	this.time    = null;
	this.t       = null;
	this.last	 = 0;
}

XMLhttp.prototype = {

	send : function(url,data,callback) {
		if (this.request == null) {
			this.request = new AjaxObj();
		}
		this.request.responseText = '';

		var nowtime	= new Date().getTime();
		if (nowtime - this.last < 1500) {
			clearTimeout(this.t);
			this.t = setTimeout(function(){ajax.send(url,data,callback)},1500+this.last-nowtime);
			return;
		}
		this.last = nowtime;
		url	+= (url.indexOf("?") >= 0) ? "&nowtime=" + nowtime : "?nowtime=" + nowtime;
		if (typeof verifyhash != 'undefined') {
			url += '&verify=' + verifyhash;
		}
		this.request.post(url,data);
		this.recall = callback;
		if (typeof this.recall == "function") {
			if (this.request.iframe.attachEvent) {
				this.request.iframe.detachEvent('onload',ajax.load);
				this.request.iframe.attachEvent('onload',ajax.load);
			} else {
				this.request.iframe.addEventListener('load',ajax.load,true);
			}
		}
	},

	load : function() {
		if (is_ie) {
			ajax.request.responseText = (typeof ajax.request.iframe.contentWindow.document.XMLDocument != 'undefined') ? ajax.request.iframe.contentWindow.document.XMLDocument.text : null;
			ajax.request.iframe.detachEvent('onload',ajax.load);
		} else {
			ajax.request.responseText = ajax.request.iframe.contentWindow.document.documentElement.firstChild.nodeValue;
			ajax.request.iframe.removeEventListener('load',ajax.load,true);
		}
		ajax.recall();
	},

	XmlDocument : function(obj) {
		return is_ie ? ajax.request.iframe.contentWindow.document.XMLDocument : ajax.request.iframe.contentWindow.document;
	},

	submit : function(obj,recall) {
		if (typeof recall == 'undefined' || typeof recall != 'function') {
			recall = ajax.guide;
		}
		ajax.send(obj.action,obj,recall);
		closep();
	},

	get : function() {
		if (ajax.request.responseText != null && ajax.request.responseText.indexOf('<') != -1) {
			read.setMenu(this.runscript(ajax.request.responseText));
			read.menupz(read.obj);
		} else {
			closep();
			ajax.guide();
		}
	},

	runscript : function (html) {
		if (html.indexOf('<script') == -1) return html;
		html = html.replace(/<script(.*?)>([^\x00]*?)<\/script>/ig, function($1, $2, $3) {
			var id = path = code = '';
			if ($2.match(/\s*id\="([\w\_]+?)"/ig)) {
				id = RegExp.$1;
			}
			if ($2.match(/\s*src\="(.+?)"/ig)) {
				path = RegExp.$1;
			} else {
				code = $3;
			}
			loadjs(path,code,id);
			return '';
		});
		return html;
	},

	guide : function() {
		if (ajax.request.responseText == null) {
			ajax.request.responseText = '您请求的页面出错啦!';
		}
		var rText = ajax.request.responseText.split('\t');
		if (rText[1] != 'nextto') {
			showDialog('',rText[0],2);
		}
		if (typeof(rText[1]) != 'undefined' && in_array(rText[1],['jump','nextto','reload'])) {
			if (rText[1] == 'jump') {
				setTimeout("window.location.href='"+rText[2]+"';",200);
			} else if (rText[1] == 'nextto') {
				sendmsg(rText[2],rText[3],rText[4]);
			} else if (rText[1] == 'reload') {
				setTimeout("window.location.reload();",200);
			}
		}
	},

	clear : function() {
		if (IsElement('ajax_guide')) document.body.removeChild(getObj('ajax_guide'));
	},

	convert : function(str) {
		if (typeof(str)=='string') {
			return str.replace(/\&/g,'%26');
		}
		return str;
	},

	quickpost : function(event,obj) {
		if ((event.ctrlKey && event.keyCode == 13) || (event.altKey && event.keyCode == 83)) {
			try{obj.ajaxsubmit.click();}catch(e){}
		}
	}
}

var ajax = new XMLhttp();

function sendmsg(url,data,id) {
	read.obj = (typeof id == 'undefined' || !id) ? null : getObj(id);
	read.guide();
	setTimeout(function(){ajax.send(url,data,ajax.get);},300);
}
function getObj(id) {
	return document.getElementById(id);
}
function objCheck(obj) {
	if (typeof(obj)=='string') {
		obj	= getObj(obj);
	}
	return obj;
}
function ietruebody() {
	if (getObj('upPanel')) {
		return getObj('upPanel');
	}
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}
function getTop() {
	return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:ietruebody().scrollTop;
}
function getLeft() {
	return (typeof window.pageXOffset != 'undefined' ? window.pageXOffset:ietruebody().scrollLeft)
}
function IsElement(id) {
	return document.getElementById(id) != null ? true : false;
}
function setCurrent(src,dst,css) {
	var o = null;
	if (IsElement(src)) {
		o = getObj(src);
	} else if (dst && IsElement(dst)) {
		o = getObj(dst);
	}
	if (o) o.className += ' ' + css;
}

function strlen(str){
	var len = 0;
	var s_len = str.length = (is_ie && str.indexOf('\n')!=-1) ? str.replace(/\r?\n/g, '_').length : str.length;
	var c_len = charset == 'utf-8' ? 3 : 2;
	for(var i=0;i<s_len;i++){
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? c_len : 1;
	}
	return len;
}

function initCheckTextNum(textareaid,warnid,num) {
	var textareaobj = document.getElementById(textareaid);
	if (document.addEventListener) {
		textareaobj.addEventListener("input",function(){checkTextNum(textareaobj,warnid,num);},false);
	} else if (document.attachEvent){
		textareaobj.attachEvent("onpropertychange",function(){checkTextNum(textareaobj,warnid,num);});
	}
}

function checkTextNum(textareaid,warnid,num) {
	if (typeof(textareaid) == 'string') {
		var textareaobj = document.getElementById(textareaid);
	} else {
		var textareaobj = textareaid;
	}
	var str_length = strlen(textareaobj.value);
	var warn = document.getElementById(warnid);
	if (str_length > num) {
		warn.style.color = 'red';
		warn.innerHTML = ''+(str_length-num)+' خەت ئېشىپ كەتتى';
	} else {
		warn.style.color = '';
		warn.innerHTML = 'چېكى ' + num + ' خەت';
	}
}