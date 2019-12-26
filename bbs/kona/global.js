function PwMenu(){
	this.pid  = null;
	this.obj  = null;
	this.w	  = null;
	this.h	  = null;
	this.t	  = 0;
	this.menu = null;
	this.init();
}

PwMenu.prototype = {

	init : function() {
		this.menu	= getPWBox();
		document.body.insertBefore(this.menu,document.body.firstChild);
	},

	guide : function() {
		read.menu.className = '';
		read.menu.innerHTML = '<div class="popout"><table  border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="bgcorner1"></td><td class="pobg1"></td><td class="bgcorner2"></td></tr><tr><td class="pobg4"></td><td><div class="popoutContent" style="padding:20px;"><img src="'+imgpath+'/loading.gif" align="absmiddle" /> ئۇچۇر ئوقىۋاتىدۇ ...</div></td><td class="pobg2"></td></tr><tr><td class="bgcorner4"></td><td class="pobg3"></td><td class="bgcorner3"></td></tr></tbody></table></div>';
		read.menupz(read.obj);
	},

	close : function() {
		read.t = setTimeout("closep();",100);
	},

	setMenu : function(element,type){
		if (type) {
			var thisobj = this.menu;
		} else {
			var thisobj = getPWContainer();
		}
		if (typeof(element) == 'string') {
			thisobj.innerHTML = element;
		} else {
			while (thisobj.hasChildNodes()) {
				thisobj.removeChild(thisobj.firstChild);
			}
			thisobj.appendChild(element);
		}
	},

	move : function(e) {
		if (is_ie) {
			document.body.onselectstart = function(){return false;}
		}
		var e  = is_ie ? window.event : e;
		var o  = read.menu;
		var x  = e.clientX;
		var y  = e.clientY;
		read.w = e.clientX - parseInt(o.offsetLeft);
		read.h = e.clientY - parseInt(o.offsetTop);
		document.onmousemove = read.moving;
		document.onmouseup   = read.moved;
	},

	moving : function(e) {
		var e  = is_ie ? window.event : e;
		var x  = e.clientX;
		var y  = e.clientY;
		read.menu.style.left = x - read.w + 'px';
		read.menu.style.top  = y - read.h + 'px';
	},

	moved : function() {
		if (is_ie) {
			document.body.onselectstart = function(){return true;}
		}
		document.onmousemove = '';
		document.onmouseup   = '';
	},

	open : function(idName,object,type,pz) {
		clearTimeout(read.t);
		if (typeof type == "undefined") type = 1;
		if (typeof pz == "undefined") pz = 0;
		this.setMenu(getObj(idName).innerHTML,1);
		this.menu.className = getObj(idName).className;
		this.menupz(object,pz);
		if (type != 2) {
			getObj(object).onmouseout = function() {
				read.close();
				getObj(object).onmouseout = '';
			}
			read.menu.onmouseout = read.close;
			read.menu.onmouseover = function() {
				clearTimeout(read.t);
			}
		}
	},
	openmedia : function(idName,object,type,pz) {
		clearTimeout(read.t);
		if (typeof type == "undefined") type = 1;
		if (typeof pz == "undefined") pz = 0;
		this.setMenu(getObj(idName).innerHTML,1);
		this.menu.className = getObj(idName).className;
		this.menumedia(object,pz);
		if (type != 2) {
			getObj(object).onmouseout = function() {
				read.close();
				getObj(object).onmouseout = '';
			}
			read.menu.onmouseout = read.close;
			read.menu.onmouseover = function() {
				clearTimeout(read.t);
			}
		}
	},
	opencolor : function(idName,object,type,pz) {
		clearTimeout(read.t);
		if (typeof type == "undefined") type = 1;
		if (typeof pz == "undefined") pz = 0;
		this.setMenu(getObj(idName).innerHTML,1);
		this.menu.className = getObj(idName).className;
		this.menucolor(object,pz);
		if (type != 2) {
			getObj(object).onmouseout = function() {
				read.close();
				getObj(object).onmouseout = '';
			}
			read.menu.onmouseout = read.close;
			read.menu.onmouseover = function() {
				clearTimeout(read.t);
			}
		}
	},
	openurl : function(idName,object,type,pz) {
		clearTimeout(read.t);
		if (typeof type == "undefined") type = 1;
		if (typeof pz == "undefined") pz = 0;
		this.setMenu(getObj(idName).innerHTML,1);
		this.menu.className = getObj(idName).className;
		this.menuurl(object,pz);
		if (type != 2) {
			getObj(object).onmouseout = function() {
				read.close();
				getObj(object).onmouseout = '';
			}
			read.menu.onmouseout = read.close;
			read.menu.onmouseover = function() {
				clearTimeout(read.t);
			}
		}
	},

	menupz : function(obj,pz) {
		read.menu.onmouseout = '';
		read.menu.style.display = '';
		read.menu.style.zIndex	= 3000;
		read.menu.style.left	= '-100px';
		read.menu.style.visibility = 'visible';
		if (typeof obj == 'string') {
			obj = getObj(obj);
		}
		if (obj == null) {
			read.menu.style.top  = (ietruebody().clientHeight - read.menu.offsetHeight)/3 - getTop() + 'px';
			read.menu.style.left = (ietruebody().clientWidth - read.menu.offsetWidth)/2 + 'px';
		} else {
			var top  = findPosY(obj);
			var left = findPosX(obj);
			var pz_h = Math.floor(pz/10);
			var pz_w = pz % 10;

			if (pz_h!=1 && (pz_h==2 || top < ietruebody().clientHeight/2)) {
				top += getTop() + obj.offsetHeight;
			} else {
				top += getTop() - read.menu.offsetHeight;
			}
			if (pz_w!=1 && (pz_w==2 || left > (ietruebody().clientWidth)*3/5)) {
				left -= read.menu.offsetWidth - obj.offsetWidth + getLeft();
			} else {
				left += getLeft();
			}
			read.menu.style.top  = top  + 'px';
			read.menu.style.left = window.event.x + 50 - read.menu.offsetWidth + 'px';
			
		}
	},
	menumedia : function(obj,type){
		read.menu.onmouseout = '';
		read.menu.style.display = '';
		read.menu.style.cssText = 'FILTER:Alpha(opacity=95);opacity:0.95;left:-500px;z-index:3000';
		if(typeof obj == 'string'){
			obj = getObj(obj);
		}
		if(obj == null){
			read.menu.style.top  = (ietruebody().clientHeight - read.menu.offsetHeight)/2 + ietruebody().scrollTop + 'px';
			read.menu.style.left = (ietruebody().clientWidth - read.menu.offsetWidth)/2 + 'px';
		} else{
			var top  = findPosY(obj);
			var left = findPosX(obj);
			
			if(top < ietruebody().clientHeight/2 || type>3){
				top += ietruebody().scrollTop + obj.offsetHeight;
			} else{
				top += ietruebody().scrollTop - read.menu.offsetHeight;
			}
			if(left > (ietruebody().clientWidth)*3/5){
				left -= read.menu.offsetWidth - obj.offsetWidth;
			}
			read.menu.style.top  = top + 9  + 'px';
			read.menu.style.left =1024 - 417 -  read.menu.offsetWidth;
		}
	},
	menucolor : function(obj,type){
		read.menu.onmouseout = '';
		read.menu.style.display = '';
		read.menu.style.cssText = 'FILTER:Alpha(opacity=95);opacity:0.95;left:-500px;z-index:3000';
		if(typeof obj == 'string'){
			obj = getObj(obj);
		}
		if(obj == null){
			read.menu.style.top  = (ietruebody().clientHeight - read.menu.offsetHeight)/2 + ietruebody().scrollTop + 'px';
			read.menu.style.left = (ietruebody().clientWidth - read.menu.offsetWidth)/2 + 'px';
		} else{
			var top  = findPosY(obj);
			var left = findPosX(obj);
			
			if(top < ietruebody().clientHeight/2 || type>3){
				top += ietruebody().scrollTop + obj.offsetHeight;
			} else{
				top += ietruebody().scrollTop - read.menu.offsetHeight;
			}
			if(left > (ietruebody().clientWidth)*3/5){
				left -= read.menu.offsetWidth - obj.offsetWidth;
			}
			read.menu.style.top  = top + 9  + 'px';
			read.menu.style.left =1024 - 487 -  read.menu.offsetWidth;
		}
	},
	menuurl : function(obj,type){
		read.menu.onmouseout = '';
		read.menu.style.display = '';
		read.menu.style.cssText = 'FILTER:Alpha(opacity=95);opacity:0.95;left:-500px;z-index:3000';
		if(typeof obj == 'string'){
			obj = getObj(obj);
		}
		if(obj == null){
			read.menu.style.top  = (ietruebody().clientHeight - read.menu.offsetHeight)/2 + ietruebody().scrollTop + 'px';
			read.menu.style.left = (ietruebody().clientWidth - read.menu.offsetWidth)/2 + 'px';
		} else{
			var top  = findPosY(obj);
			var left = findPosX(obj);
			
			if(top < ietruebody().clientHeight/2 || type>3){
				top += ietruebody().scrollTop + obj.offsetHeight;
			} else{
				top += ietruebody().scrollTop - read.menu.offsetHeight;
			}
			if(left > (ietruebody().clientWidth)*3/5){
				left -= read.menu.offsetWidth - obj.offsetWidth;
			}
			read.menu.style.top  = top + 9  + 'px';
			read.menu.style.left =1024 - 217 -  read.menu.offsetWidth;
		}
	},

	InitMenu : function() {
		function setopen(a,b) {
			if (getObj(a)) {
				getObj(a).onmouseover = function(){read.open(b,a);}
			}
		}
		for (var i in openmenu)
			setopen(i,openmenu[i]);
	},

	IsShow : function() {
		return (read.menu.hasChildNodes() && read.menu.style.display != 'none') ? true : false;
	}
}
var read = new PwMenu();

function closep() {
	read.menu.style.display = 'none';
	read.menu.className = '';
}
function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} else if (obj.x) {
		curleft += obj.x;
	}
	return curleft - getLeft();
}
function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} else if (obj.y) {
		curtop += obj.y;
	}
	return curtop - getTop();
}
function in_array(str,a){
	for (var i=0; i<a.length; i++) {
		if(str == a[i])	return true;
	}
	return false;
}
function loadjs(path, code, id) {
	if (typeof id == 'undefined') id = '';
	if (id != '' && IsElement(id)) {
		return false;
	}
	var header = document.getElementsByTagName("head")[0];
	var s = document.createElement("script");
	if (id) s.id  = id;
	if (path) {
		s.src = path;
	} else if (code) {
		s.text = code;
	}
	header.appendChild(s);
	return true;
}
function keyCodes(e) {
	if (read.menu.style.display == '' && e.keyCode == 27) {
		read.close();
	}
}
function opencode(menu,td) {
	if (read.IsShow() && read.menu.firstChild.id == 'ckcode') return;
	read.open(menu,td,2,11);
	getObj('ckcode').src = 'ck.php?nowtime=' + new Date().getTime();
	document.onclick = function(e) {
		var o = is_ie ? window.event.srcElement : e.target;
		if (o == td) {
			return;
		} else if (o.id == 'ckcode') {
			getObj('ckcode').src = 'ck.php?nowtime=' + new Date().getTime();
		} else {
			closep();
			document.onclick = '';
		}
	}
}

function getPWBox(type){
	if (getObj('pw_box')) {
		return getObj('pw_box');
	}
	var pw_box	= elementBind('div','pw_box','','position:absolute');
	document.body.appendChild(pw_box);
	return pw_box;
}

function getPWContainer(){
	if (getObj('pw_box')) {
		var pw_box = getObj('pw_box');
	} else {
		var pw_box = getPWBox();
	}
	if (getObj('box_container')) {
		return getObj('box_container');
	}
	pw_box.innerHTML = '<div class="popout"><table  border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="bgcorner1"></td><td class="pobg1"></td><td class="bgcorner2"></td></tr><tr><td class="pobg4"></td><td><div class="popoutContent" id="box_container"></div></td><td class="pobg2"></td></tr><tr><td class="bgcorner4"></td><td class="pobg3"></td><td class="bgcorner3"></td></tr></tbody></table></div>';
	var popoutContent = getObj('box_container');
	return popoutContent;
}
function elementBind(type,id,stylename,csstext){
	var element = document.createElement(type);
	if (id) {
		element.id = id;
	}
	if (typeof(stylename) == 'string') {
		element.className = stylename;
	}
	if (typeof(csstext) == 'string') {
		element.style.cssText = csstext;
	}
	return element;
}

function addChild(parent,type,id,stylename,csstext){
	parent = objCheck(parent);
	var child = elementBind(type,id,stylename,csstext);
	parent.appendChild(child);
	return child;
}

function delElement(id){
	id = objCheck(id);
	id.parentNode.removeChild(id);
}

function pwForumList(isLink,isPost,fid,handle) {
	if (isLink == true) {
		if (isPost == true){
			window.location.href = 'post.php?fid='+fid;
			if (is_ie) {
				window.event.returnValue = false;
			}
		} else {
			return true;
		}
	} else {
		if (gIsPost != isPost || read.menu.style.display=='none' || read.menu.innerHTML == '') {
			read.menu.innerHTML = '';
			if (isPost == true) {
				if (getObj('title_forumlist') == null) {
					showDialog('error','كەينى سەھنىدىن سەھىپە ئۇچۇرلىرىنى يېڭىلاڭ');
				}
				getObj('title_forumlist').innerHTML = 'تېما يوللىماقچى بولغان سەھىپىنى تاللاڭ';
			} else {
				if (getObj('title_forumlist') == null) {
					showDialog('error','كەينى سەھنىدىن سەھىپە ئۇچۇرلىرىنى يېڭىلاڭ');
				}
				getObj('title_forumlist').innerHTML = 'مۇنبەر سەھىپىلىرى';
			}
			gIsPost = isPost;
			if (handle.id.indexOf('pwb_')==-1) {
				read.open('menu_forumlist',handle,2);
			}

		} else {
			read.close();
		}
	}
	return false;
}
function char_cv(str){
	if (str != ''){
		str = str.replace(/</g,'&lt;');
		str = str.replace(/%3C/g,'&lt;');
		str = str.replace(/>/g,'&gt;');
		str = str.replace(/%3E/g,'&gt;');
		str = str.replace(/'/g,'&#39;');
		str = str.replace(/"/g,'&quot;');
	}
	return str;
}
function JSONParse(text){
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var j;
	if (cx.test(text)) {
		text = text.replace(cx, function (a) {
			return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		});
	}
	if (/^[\],:{}\s]*$/.test(text.replace(/"[^"]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		j = eval('(' + text + ')');
		return j;
	}
	showDialog(error,'ئۇچۇر شەكلى خاتا ، ئانالىز قىلغىلى بولمىدى');
}
function showDialog(type,message,autohide,callback) {
	var container	= elementBind('div','','','width:400px;');
	var title	= elementBind('div','','h b','padding:0 .6em');
	title.innerHTML = 'كۆرسەتمە';
	container.appendChild(title);
	var inner_div	= addChild(container,'div','','p10 tac','height:100px');
	var p2 = addChild(inner_div,'p','','','margin-top:37px');
	if (type=='error'||type=='success'||type=='warning'||type=='confirm') {
		var img2 = elementBind('img');
		img2.setAttribute('src',imgpath+ '/'+ type +'_bg.gif');
		img2.setAttribute('align','absmiddle');
		p2.appendChild(img2);
	}
	p2.innerHTML += message;

	var tar	= addChild(container,'div','','pdD tar tr2');
	if (type == 'confirm' && typeof(callback) == 'function') {
		var ok	= elementBind('input','','bt');
		ok.type	= 'button';
		ok.value= 'مۇقىملاش';
		ok.onclick	= function () {
			closep();
			if (typeof(callback)=='function') {
				callback();
			}
		}
		tar.appendChild(ok);
	}

	var cansel	= elementBind('input','','bt','margin-left:8px');
	cansel.type	= 'button';
	cansel.value= 'تاقاش';
	cansel.onclick	= closep;
	tar.appendChild(cansel);
	read.setMenu(container);
	read.menupz();
	if (autohide) {
		window.setTimeout("closep()", (autohide * 1000));
	}
}