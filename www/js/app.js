/*global require, requirejs*/
require.config({
    baseUrl: "js/app/",
    paths: {
        "jquery": "../jquery"
    }
});
requirejs(["request/controller"], function (controller) {
    controller.run();
});
