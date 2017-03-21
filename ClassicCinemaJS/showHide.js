/**
 * Created by hjia on 7/19/16.
 */

var ShowHide= (function(){
    "use strict";
    var pub={};
    function showHideDetails() {
        /* jshint -W040*/
        $(this).siblings().toggle("slow");
        /* jshint +W040*/
    }

    pub.setup = function() {
        $(".film h3").css({cursor: "pointer"});
        $(".film h3").click(showHideDetails);
    };
    return pub;
}());

if (window.addEventListener) { window.addEventListener('load', ShowHide.setup);
} else if (window.attachEvent) { window.attachEvent('onload', ShowHide.setup);
} else {
    window.alert("Could not attach 'ShowHide.setup' to the 'window.onload' event");
}
