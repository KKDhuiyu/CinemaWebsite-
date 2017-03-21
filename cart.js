/**
 * Created by hjia on 7/28/16.
 */

var Cart = (function () {
    "use strict";
    var pub = {};
    var cart,totalPrice; // this is the cart array that we used as a list to store into the cookies

    // this is a constructor that takes title and price of an item as parameters and create an obj with those two parameters
    function PurchaseObject(title, price) {
        this.title = title; //the title of the movie
        this.price = price; // the price of the movie
    }

    function displayCart() {
        var i,price;
        if($("#shoppingCart")===null){
            return;
        }
        if (window.Cookie.get("cart") !== null) {
            $("#cartForm").css({display: "block"});
            $("#shoppingCart").empty();
            $("#shoppingCart").append( "<h4> Item list:</h4>");
            //JSON the strings stored in cookies and transfer it to objects
            cart = JSON.parse(window.Cookie.get("cart"));
            price=0.0;
            for (i = 0; i < cart.length; i++) {
                $("#shoppingCart").append("<p>Movie Title:   "+cart[i].title+".  Price:  $"+cart[i].price+"</p>");
                price+=parseFloat(cart[i].price);
            }
            $("#shoppingCart").append("<h4> Total: $ "+price+"</h4>");

        }else{
            $("#shoppingCart").empty();
            $("#shoppingCart").append( "<h4> Cart is Empty</h4>");
            $("#cartForm").css({display: "none"});
        }
    }
    // this function is executed when the "buy" button is pressed.
    function addToCart() {

        var title, price, obj, i ;
        /* jshint -W040*/
        // find the title and the price for related button
        title = $(this).parent().parent().children("h3").text();
        price = $(this).parent().children(".price").text();
        /* jshint +W040*/
        // create an object no matter if it has been added in cart
        obj = new PurchaseObject(title, price);
        // ask cart stored in cookies (if any)
        if (window.Cookie.get("cart") !== null) {
            //JSON the strings stored in cookies and transfer it to objects
            cart = JSON.parse(window.Cookie.get("cart"));
            //for loop is uesd for check if the object has already been added to the cart
            for (i = 0; i < cart.length; i++) {
                // if it has been added into the cart. then alert the user and return
                if (cart[i].title === obj.title) {
                    window.alert("item already in cart");
                    return;
                }
            }
            //if it is not. then push it into cart array then sent it back to cookies.
            cart.push(obj);

            window.Cookie.set("cart",JSON.stringify(cart));
        } else {
            cart[0] = obj;

            window.Cookie.set("cart",JSON.stringify(cart) );
        }
    }

    // a setup function for Cart
    pub.setup = function () {
        cart = [];
        totalPrice=0.0;
        $(".buy").click(addToCart);
        displayCart();
    };
    return pub;

}());

if (window.addEventListener) {
    window.addEventListener('load', Cart.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Cart.setup);
} else {
    window.alert("Could not attach 'cart.setup' to the 'window.onload' event");
}

