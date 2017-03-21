/**
 * Created by hjia on 7/28/16.
 */

var Cookie = (function () {
    "use strict";
    var pub = {};

    // set function that store a new String as split by ; into cookies 
    pub.set = function (name, value, hours) {
        var date, expires;

        if (hours) {
            date = new Date();
            date.setHours(date.getHours() + hours);
            expires = "; expires=" + date.toGMTString();
            } else {
            expires = "";
          }
        // encode Name and Value so the split function or "=" don't get disturbed
        document.cookie =  encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/" ;
        };

    //get function that return the value of the related "name" parameter.
        pub.get = function (name) {
            var nameEq, cookies, cookie, i;
            nameEq = name + "=";
            cookies = document.cookie.split(";");
            for (i = 0; i < cookies.length; i += 1) {
                //cookie is a String. and cookies is not . so we decode the name and value here.
                cookie = decodeURIComponent(cookies[i]).trim();
                if (cookie.indexOf(nameEq) === 0) {
                    return cookie.substring(nameEq.length, cookie.length); }
            }
            return null;
        };
        pub.clear = function (name) {
            pub.set(name, "", -1);
        };
        return pub; }());
