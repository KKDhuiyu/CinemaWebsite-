/**
 * Show/Hide movie details on the Classic Cinema site.
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Steven Mills 31/08/2015
 */

/*jslint browser: true, this: true */
/*global $ */

/**
 * Module pattern for Show/Hide functions
 */
var ShowHide = (function () {
    "use strict";

    // Public interface
    var pub = {};

    /**
     * Show or hide the details of a given movie
     *
     * Which movie is determined by a mouse click, accessed via 'this'.
     */
    function showHideDetails() {
        $(this).siblings().toggle();
    }

    /**
     * Setup function for ShowHide
     *
     * Attaches showHideDetails as a callback when movie titles are clicked on.
     */
    pub.setup = function () {
        $(".film").each(function () {
            $(this).find("h3").click(showHideDetails);
            $(this).find("h3").css({cursor: "pointer"});
        });
    };

    // Expose public interface
    return pub;
}());

// Call ShowHide.setup when page loads
$(document).ready(ShowHide.setup);