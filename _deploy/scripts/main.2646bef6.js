"use strict";jQuery(function(a){var b=a(".overlay"),c=a(".main-navigation");a(".navigation-toggle").bind("click touchstart",function(a){a.preventDefault(),c.is(":visible")?c.slideUp("fast",function(){b.fadeOut("fast")}):b.fadeIn("fast",function(){c.slideDown("fast")})}),b.bind("click touchstart",function(){c.is(":visible")?c.slideUp("fast",function(){b.fadeOut("fast")}):b.fadeIn("fast",function(){c.slideDown("fast")})});var d=a("a, button");d.bind("touchstart",function(){"disabled"!==a(this).attr("disabled")&&a(this).addClass("active")}),d.bind("touchend",function(){a(this).removeClass("active")}),d.bind("click",function(b){"disabled"===a(this).attr("disabled")&&b.preventDefault()})});