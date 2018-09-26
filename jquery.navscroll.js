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
            url_hash: false, //IE9 + 
            head_hight: 0 //px
        }
        var wait = false,
            cwait = false;
        var anchor = [];
        var _settings = $.extend(_defaultset, settings);

        var animate_scroll = function(scrolltop) {
            $('html, body').stop().animate({
                scrollTop: scrolltop - _settings.head_hight
            }, _settings.sec, _settings.linear);
        }
        var scroll_event = function($ele) {
            $(window).off("scroll").on("scroll", function() {
                wait = true;
                for (var x = 0; x < anchor.length; x++) {
                    var anchor_id = anchor[x].anchor;
                    if ($(document).find("[data-anchor=" + anchor_id + "]").length > 0) {
                        if (!cwait && $(window).scrollTop() >= $(document).find("[data-anchor=" + anchor_id + "]").offset().top - _settings.head_hight && $(window).scrollTop() < $(document).find("[data-anchor=" + anchor_id + "]").offset().top + $(document).find("[data-anchor=" + anchor_id + "]").height() - _settings.head_hight) {
                            if ($ele.find(".on").data("nav") != anchor[x].anchor) {
                                if (_settings.url_hash) location.hash = anchor[x].anchor;
                                $ele.find("[data-nav]").removeClass("on");
                                $ele.find("[data-nav]").eq(x).addClass("on");
                                $("[data-anchor]").removeClass("on");
                                $("[data-anchor]").eq(x).addClass("on");
                                var callback = $("[data-anchor]").eq(x).data("callback");
                                if (callback){
                                    var sp = callback.split("(");
                                    var fun = sp[0];
                                    var params = sp[1].replace(")", "").split(",");
                                    var fun = window[fun];
                                    fun.apply(null, params);
                                }
                            }
                            break;
                        }
                    } else {
                        console.log("%c not find " + anchor_id, "background:#000; color:red;");
                    }
                    if (x == anchor.length - 1) {
                        $ele.find("[data-nav]").removeClass("on");
                    }
                }
            });
        }
        if (_settings.url_hash) {
            var hash = location.hash.replace("#", "");
            if ("onhashchange" in window) {
                $(window).bind('hashchange', function(e) {
                    e.preventDefault();
                    hash = location.hash.replace("#", "");
                    if (!wait) {
                        animate_scroll($(document).find("[data-anchor=" + hash + "]").offset().top);
                    }
                    wait = false;
                    return false;
                });
            }
            if (hash != "" && $(document).find("[data-anchor=" + hash + "]").length > 0) {
                animate_scroll($(document).find("[data-anchor=" + hash + "]").offset().top);
            }
        }
        return this.each(function(idx) {
            var main_obj = $(this);
            var child = $(this).find("[data-nav]");
            child.each(function(inx) {
                var anchor_id = $(this).data("nav");
                $(this).click(function(e) {
                    e.preventDefault();
                    wait = true;
                    cwait = true;
                    var div_top = ($(document).find("[data-anchor=" + anchor_id + "]").length > 0) ? $(document).find("[data-anchor=" + anchor_id + "]").offset().top : 0;
                    if (_settings.url_hash) location.hash = anchor_id;
                    $('html, body').stop().animate({
                        scrollTop: div_top - _settings.head_hight
                    }, _settings.sec, _settings.linear, function() {
                        cwait = false;
                    });
                });
                obj_data = {
                    anchor: anchor_id
                }
                anchor.push(obj_data);
            });
            scroll_event($(this));
        });
    }
})(jQuery);
