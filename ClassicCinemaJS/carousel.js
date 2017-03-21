/**
 * Created by hjia on 7/25/16.
 */

var Carousel= (function() {
    "use strict";
    var pub = {};
    var objectList, objectIndex;
//the object constructor
    function MovieCategory(title, image, page) {
        this.title = title;
        this.image = image;
        this.page = page;
        // the anonymous functions that creat and return a string which will be the inner content of the calrousel div.
        this.makeHTML = function () {
            var HTMLstring;
            HTMLstring = "<a href=" + this.page + "><figure> <img src=" + this.image + "><figcaption>" + this.title + "</figcaption>" +
                " </figure></a>";
            return HTMLstring;
        };
    }

    // the nextCategory controls the carousel rotation
    function nextCategory() {
        //if-else statement to control objectIndex doesn't go out of the bound
        if (objectIndex < 2) {
            objectIndex += 1;
        } else {
            objectIndex = 0;
        }
        // set the inner Html of the div whose id=carousel to the string that returns by objectList.makeHTML
        var content= objectList[objectIndex].makeHTML();
        $("#carousel").empty();
        $('#carousel').append(content);

       $( "#carousel" ).find("a").fadeOut(2000);


    }

// setup when window onload
    pub.setup = function () {
        // Setup a list and push caregories to the list
        objectList = [];
        objectList.push(new MovieCategory("Classic Movies", "images/Metropolis.jpg", "classic.html"));
        objectList.push(new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.html"));
        objectList.push(new MovieCategory("Alfred Hitchcock", "images/Vertigo.jpg", "hitchcock.html"));
        // call nextImage for every 2 seconds
        nextCategory();
        setInterval(nextCategory, 2000);
    };
    return pub;
}());

if (window.addEventListener) {
    window.addEventListener('load', Carousel.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Carousel.setup);
} else {
    window.alert("Could not attach ’Carousel.setup’ to the ’window.onload’ event");
}