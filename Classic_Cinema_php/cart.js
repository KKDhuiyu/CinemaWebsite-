/**
 * Shopping cart functions for the category pages
 *
 * Created by: Steven Mills, 09/04/2014
 * Last Modified by: Steven Mills 31/08/2015
 */

/*jslint browser: true, this: true */
/*global Cookie, $ */

/**
 * Module pattern for Cart functions
 */
var Cart = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Add items to the cart
     *
     * This function is called when a 'Buy' button is clicked.
     * The cart itself is stored in a cookie, which is updated each time this function is called.
     */
    function addToCart() {
        var itemList, newItem;
        itemList = Cookie.get("cart");
        if (itemList) {
            itemList = JSON.parse(itemList);
        } else {
            itemList = [];
        }
        newItem = {};
        newItem.title = $(this).parent().parent().find("h3").html();
        newItem.price = $(this).parent().find(".price").html();
        itemList.push(newItem);
        Cookie.set("cart", JSON.stringify(itemList));
    }

    /**
     * Setup function for the cart functions
     *
     * Gets a list of 'Buy' buttons, and sets them to call addToCart when clicked
     */
    pub.setup = function () {
        $(".buy").click(addToCart);
    };

    // Expose public interface
    return pub;
}());

// Call Cart.setup when page loads
$(document).ready(Cart.setup);