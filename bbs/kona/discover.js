/*
	discover.js

	@author otkur.biz
*/
var colCount = 0;
var colWidth = 0;
var margin = 10;
var windowWidth = 0;
var blocks = [];
var page = 1;
var baseUrl = SITEURL + '/plugin.php?id=otkur_discover:discover';
var loaded = false;
var list = [];
var block = '';

jQuery(function(){
	setupBlocks();
	
	loadMore();
});


function setupBlocks() {
	windowWidth = jQuery("#discover").width();
	colWidth = jQuery('.block').outerWidth();
	blocks = [];
	colCount = Math.floor(windowWidth/(colWidth+margin));
	for(var i=0;i<colCount;i++){
		blocks.push(margin);
	}
	positionBlocks();
}

function positionBlocks() {
	
	jQuery('.block').each(function(){
		var min = Array.min(blocks);
		var index = jQuery.inArray(min, blocks);
		var rightPos = margin+(index*(colWidth+margin));
		jQuery(this).css({
			'right':rightPos+'px',
			'top':min+'px'
		});
		blocks[index] = min+jQuery(this).outerHeight()+margin;
	});	
	height = Array.max(blocks)+margin;
	jQuery(".discover").css({
		'height':height + "px"
	});
	
}

function loadMore(){
	jQuery(window).bind("scroll", function (event){
		if(!loaded){
			loaded = true;
			loadNextPage();
		}
		var top = document.documentElement.scrollTop + document.body.scrollTop;
		var loadPoint = Array.min(blocks) - 300; 
		if( top > loadPoint){
			if(page > 20){
				return;
			}
			showNextPage();
		}
	});
}

function loadNextPage(){
	jQuery.getJSON(baseUrl + '&mod=ajax',{page: page}, function(data){
		loaded = true;
		page ++;
		list = data.list;
	});
}

function showNextPage(){
	for(key in list){
		var min = Array.min(blocks);
		var index = jQuery.inArray(min, blocks);
		var rightPos = margin+(index*(colWidth+margin));
		//showLoading();
		loadBlock(list[key]);
	}
	list = [];
	loaded = false;

	height = Array.max(blocks)+margin;
	jQuery(".discover").css({
		'height':height + "px"
	});
}

function showLoading(){
	var min = Array.min(blocks);
	var index = jQuery.inArray(min, blocks);
	var rightPos = margin+(index*(colWidth+margin));
	var text  = '<div class="loading" style="right:'+rightPos+'px; top:'+min+'px;">';
	text += '<img src="'+IMGDIR+'loading.gif" />'
	text += '</div>'
}
 
function loadBlock(post){
	var min = Array.min(blocks);
	var index = jQuery.inArray(min, blocks);
	var rightPos = margin+(index*(colWidth+margin));
	
	block  += '<div class="block" style="right:'+rightPos+'px; top:'+min+'px;">';
    block  += '<h3 class="post-title">';
    block  += '<a href="forum.php?mod=viewthread&amp;tid='+post.id+'" title="'+post.title+'" rel="bookmark">';
    block  += post.title;
    block  += '</a>';
    block  += '</h3>';
	if(post.pic){
	    block  += '<div class="featured-img">';
	    block  += '<a href="forum.php?mod=viewthread&amp;tid='+post.id+'" title="'+post.title+'">';
	    block  += '<img src="data/attachment/'+post.pic+'" class="attachment-large wp-post-image" alt="at-goa-by-suraj" title="at-goa-by-suraj">';
	    block  += '</a>';
	    block  += '</div>';
	}
    block  += '<div class="description">';
    block  += '<p>';
    block  += post.summary;
    block  += '<span class="ellipsis">…</span>';
    block  += '<span class="read-more">';
    block  += '<a href="forum.php?mod=viewthread&amp;tid='+post.id+'">داۋامىنى ئوقۇڭ ›</a>';
    block  += '</span>';

    block  += '</p>';  

    block  += '</div>';

    block  += '<div class="meta clearfix">';
    block  += '<div class="post-author col">';
    block  += '<span class="ico hello">Author</span>';
    block  += '<a class="url fn n" href="home.php?mod=space&uid='+post.authorid+' title="">'+post.author+'</a>';
    block  += '</div> ';
    block  += '<div class="col time" datetime="'+post.date+'">';
    block  += '<span class="ico">Published on</span>';
    block  += '<a href="" title="4:39 pm" rel="bookmark">'+post.date+'</a></div></div>';
    block  += '<div class="meta">';
    block  += '<div class="cats"><span class="ico">Categories</span><div class="overflow-hidden cat-listing"><a href="'+post.forumurl+'" title="" rel="category tag">'+post.forumname+'</a></div></div>';
    block  += '</div>';
    block  += '</div>';
    jQuery("#discover .discover").append(block);
    block = '';
    blocks[index] = min + jQuery("#discover>.discover>div:last-child").outerHeight() + margin;

}

// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array);
};

// Function to get the Min value in Array
Array.max = function(array) {
    return Math.max.apply(Math, array);
};

