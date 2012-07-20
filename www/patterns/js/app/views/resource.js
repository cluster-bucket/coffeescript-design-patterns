/*global define, console*/
define(["../registry"], function (registry) {
    return {
        execute: function (request) {
            if (registry.debug) {
                console.log("Resource view", request);
            }
        }
    };
});