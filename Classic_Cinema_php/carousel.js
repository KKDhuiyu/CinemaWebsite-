/**
 * Image Carousel for the front page of the Classic Cinema site.
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Steven Mills 31/08/2015
 */

/*jslint browser: true, this: true */
/*globals $ */

/**
 * Module pattern for Carousel functions
 */
var Carousel = (function () {
    "use strict";

    var categoryList, categoryIndex, pub, nextCategory;

    // Public interface
    pub = {};

    /**
     * Constructor function for MovieCateogry objects
     *
     * These objects represent movie categories as shown on the front page.
     * Note that as a constructor this function does not return a value.
     * Instead it should be called using the form: new MovieCategory(...);
     *
     * @param title The title of the category to display
     * @param image The image to display for the category
     * @param page The category page to link to
     */
    function MovieCategory(title, image, page) {
        this.title = title;
        this.image = image;
        this.page = page;
        this.makeHTML = function () {
            var html;
            html = "<a href='" + page + "'>";
            html += "<img src='" + image + "'>";
            html += "<br>" + title;
            html += "</img>";
            html += "</a>";
            return html;
        };
    }

    /**
     * Update the carousel to the next category
     * This animates the categories coming in alternately from the left and the right
     * To remember which state we are in an anonymous function is used to create a closure
     */
    nextCategory = (function () {
        var padLeft = true;
        return function () {
            if (padLeft) {
                $("#carousel").animate({
                    paddingLeft: 400,
                    opacity: 0.0
                }, 1000, "swing", function () {
                    $("#carousel").html(categoryList[categoryIndex].makeHTML());
                    categoryIndex += 1;
                    if (categoryIndex >= categoryList.length) {
                        categoryIndex = 0;
                    }
                    $("#carousel").animate({
                        paddingLeft: 10,
                        opacity: 1.0
                    }, 1000, "swing");
                });
            } else {
                $("#carousel").animate({
                    paddingRight: 400,
                    opacity: 0.0
                }, 1000, "swing", function () {
                    $("#carousel").html(categoryList[categoryIndex].makeHTML());
                    categoryIndex += 1;
                    if (categoryIndex >= categoryList.length) {
                        categoryIndex = 0;
                    }
                    $("#carousel").animate({
                        paddingRight: 10,
                        opacity: 1.0
                    }, 1000, "swing");
                });
            }
            padLeft = !padLeft;
        };
    }());

    /**
     * Setup function for the carousel
     *
     * Creates a list of MovieCategory objects, and starts the timer
     */
    pub.setup = function () {
        categoryList = [];
        categoryList.push(new MovieCategory("Classics", "images/Metropolis.jpg", "classic.php"));
        categoryList.push(new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.php"));
        categoryList.push(new MovieCategory("Alfred Hitchcock", "images/Vertigo.jpg", "hitchcock.php"));
        categoryIndex = 0;
        nextCategory();
        setInterval(nextCategory, 2000);
    };

    // Expose public interface
    return pub;
}());

// Call Carousel.setup when page is loaded
$(document).ready(Carousel.setup);
