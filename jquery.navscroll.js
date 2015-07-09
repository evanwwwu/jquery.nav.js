/* 標籤滑動感測
 * include: jqeury.min.js
 * 2015/06/918
 */
 ;
 (function($) {
 	$.fn.navscroll = function(settings) {
 		var _defaultset = {
 			easing: "linear",
 			sec: 500,
 			url_hash: false,   //IE9 + 
 			head_hight: 0   //px
 		}
 		var wait = false;
 		var anchor = [];
 		var _settings = $.extend(_defaultset, settings);

 		var animate_scroll = function(scrolltop){
 			$('html, body').stop().animate({
 				scrollTop: scrolltop - _settings.head_hight
 			}, _settings.sec, _settings.linear);
 		}
 		var scroll_event = function($ele) {
 			$(window).on("scroll", function() {
 				wait = true;
 				for (var x = 0; x < anchor.length; x++) {
 					if ($(window).scrollTop() >= anchor[x].top && $(window).scrollTop() < anchor[x].bottom) {
 						if($ele.children(".on").data("nav") != anchor[x].anchor){
 							// location.hash = anchor[x].anchor;
 							$ele.children().removeClass("on");
 							$ele.children().eq(x).addClass("on");
 						}
 						break;
 					}
 					if(x==anchor.length-1){
 						$ele.children().removeClass("on");
 					}
 				}
 				wait = false;
 			});
 		}
 		if(_settings.url_hash){
 			var hash = location.hash.replace("#","");
 			if ("onhashchange" in window) {
 				$(window).bind('hashchange', function(e) {
 					e.preventDefault();
 					hash = location.hash.replace("#","")
 					if(!wait){
 						animate_scroll($(document).find("[data-anchor="+hash+"]").offset().top);
 					}
 					return false;
 				});
 			}
 			if(hash != "" && $(document).find("[data-anchor="+hash+"]").length > 0 ){
 				animate_scroll($(document).find("[data-anchor="+hash+"]").offset().top);
 			}
 		}
 		return this.each(function(idx) {
 			var main_obj = $(this);
 			var child = $(this).children();
 			child.each(function(inx) {
 				var anchor_id = $(this).data("nav");
 				var div_top = ($(document).find("[data-anchor="+anchor_id+"]").length > 0) ? $(document).find("[data-anchor="+anchor_id+"]").offset().top : 0;
 				$(this).click(function() {
 					wait = true;
 					// location.hash = anchor_id;
 					$('html, body').stop().animate({
 						scrollTop: div_top - _settings.head_hight
 					}, _settings.sec, _settings.linear,function(){
 						wait = false;
 					});
 				});
 				obj_data = {
 					anchor: anchor_id,
 					top: div_top - _settings.head_hight,
 					bottom: div_top  - _settings.head_hight + $(document).find("[data-anchor="+anchor_id+"]").height()
 				}
 				anchor.push(obj_data);
 			});
 			scroll_event($(this));
 		});
 	}
 })(jQuery);
