/**
 * Kicks off less and compiles any stylesheets
 * used in the browser distributed version of less
 * to kick-start less using the browser api
 */
/*global window */

// shim Promise if required
require('promise/polyfill.js');

var options = (typeof window !== 'undefined' && window.less) || {};
require("./add-default-options")(window, options);

var less = self.less1 = module.exports = require("./index")(window, options);

if (typeof window !== 'undefined' && /!watch/.test(window.location.hash)) {
    less.watch();
}

less.pageLoadFinished = less.registerStylesheets().then(
    function () {
        return less.refresh(less.env === 'development');
    }
);
