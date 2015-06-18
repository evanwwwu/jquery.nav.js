/*
 * 標籤滑動感測
 * include: jqeury.min.js
 * 2015/06/918
 */
 ;
 (function($) {
 	$.fn.navscroll = function(settings) {
 		var _defaultset = {
 			easing: "linear",
 			sec: 500,
 			hash: false,
 			head_hight: 0
 		}
 		var anchor = [];
 		var scroll_event = function($ele) {
 			$(window).on("scroll", function() {
 				console.log(321);
 				for (var x = 0; x < anchor.length; x++) {
 					console.log($ele);
 					if ($(window).scrollTop() >= anchor[x].top && $(window).scrollTop() < anchor[x].bottom) {
 						$ele.children().removeClass("on");
 						$ele.children().eq(x).addClass("on");
 						break;
 					}
 					if(x==anchor.length-1){
 						$ele.children().removeClass("on");
 					}
 				}
 			});
 		}
 		var _settings = $.extend(_defaultset, settings);
 		return this.each(function(idx) {
 			var main_obj = $(this);
 			var child = $(this).children();
 			child.each(function(inx) {
 				var anchor_id = $(this).data("anchor");
 				var div_top = ($("#" + anchor_id).length > 0) ? $("#" + anchor_id).offset().top : 0;
 				console.log(div_top);
 				$(this).click(function() {
 					$('html, body').animate({
 						scrollTop: div_top
 					}, _settings.sec, _settings.linear);
 				});
 				obj_data = {
 					anchor: anchor_id,
 					top: div_top + _settings.head_hight,
 					bottom: div_top + $("#" + anchor_id).height() + _settings.head_hight
 				}
 				anchor.push(obj_data);
 			});
 			scroll_event($(this));
 		});
 	}
 })(jQuery);
