// JavaScript Document
	imgUrl1="http://bbs.bagdax.cn/js-rasim/bbsahmat.jpg";
    imgtext1="1"
    imgLink1=escape("http://bbs.bagdax.cn/read.php?tid=14589/");
    
    imgUrl2="http://bbs.bagdax.cn/js-rasim/30.jpg";
    imgtext2="2"
    imgLink2=escape("http://www.alimahat.com/?p=2027/");
    
  
    imgUrl3="http://bbs.bagdax.cn/js-rasim/ibrat.jpg";
    imgtext3="3"
    imgLink3=escape("http://bbs.bagdax.cn/read.php?tid=7470/");
	
	imgUrl4="http://bbs.bagdax.cn/js-rasim/hafu.jpg";
    imgtext4="4"
    imgLink4=escape("http://bbs.bagdax.cn/read.php?tid=8996/");

    
     var focus_width=315
     var focus_height=145
     var text_height=0
     var swf_height = focus_height+text_height
     
     var pics=imgUrl1+"|"+imgUrl2+"|"+imgUrl3+"|"+imgUrl4
     var links=imgLink1+"|"+imgLink2+"|"+imgLink3+"|"+imgLink4
     var texts=imgtext1+"|"+imgtext2+"|"+imgtext3+"|"+imgtext4
     var flashCode = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/hotdeploy/flash/swflash.cab#version=6,0,0,0" width="'+ focus_width +'" height="'+ swf_height +'">';
     flashCode = flashCode + '<param name="allowScriptAccess" value="sameDomain"><param name="movie" value="/js/focus2.swf"><param name="quality" value="high"><param name="bgcolor" value="#F0F0F0">';
     flashCode = flashCode + '<param name="menu" value="false"><param name=wmode value="opaque">';
     flashCode = flashCode + '<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'">';
     flashCode = flashCode + '<embed src="/js/focus2.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+ focus_width +'" height="'+ swf_height +'" FlashVars="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'"></embed>';
     flashCode = flashCode + '</object>';
     document.write(flashCode)