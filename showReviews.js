/**
 * Created by hjia on 8/20/16.
 */
var Reviews = (function() {
    "use strict";
    var pub = {};

    function parseReviews(data, target) {
        $(target).empty();
        $(target).append("<dl>");
        $(data).find("review").each(function () {
            var rating = $(this).find("rating")[0].textContent;
            var user = $(this).find("user")[0].textContent;
            var text="<dt>"+user+":</dt><dd> "+rating+"</dd>";
            $(target).append(text);
        });
        $(target).append("</dl>");
    }
    function showReviews() {
        /* jshint -W040*/
        var target = $(this).parent().find(".review")[0];
        var img= $(this).parent().find("img")[0].src;
        /* jshint +W040*/
        var xmlSource= img.replace(/images/,"xml");
         xmlSource= xmlSource.replace(/jpg/,"xml");

        $.ajax({
            type: "GET",
            url: xmlSource,
            cache: false,
            success: function(data) {
                parseReviews(data, target);
                var checkEmpty= $(target).find("dt").length;
                if(checkEmpty<1){
                    $(target).empty();
                    $(target).append("<p>There are no reviews for the item.</p>");
                }
            },

            error: function() {
                $(target).empty();
                 $(target).append("<p>There are no reviews for the item.</p>");
            }
        });

    }
    pub.setup = function() {
        var text=" <input type= 'button' class='showReviews' value='Show Reviews'> <div class='review'></div>";
        $(".film").append(text);
        $(".showReviews").click(showReviews);
    };
    return pub;
}());



if (window.addEventListener) {
    window.addEventListener('load', Reviews.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Reviews.setup);
} else {
    window.alert("Could not attach 'Reviews.setup' to the 'window.onload' event");
}

