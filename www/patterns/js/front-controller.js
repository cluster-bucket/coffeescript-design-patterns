/**
 * Bootstrap
 */
/*global require, requirejs*/
require.config({
    baseUrl: "js/front-controller/",
    paths: {
        "jquery": "../jquery"
    }
});
requirejs(["controller"], function (Controller) {
    Controller.run();
});
