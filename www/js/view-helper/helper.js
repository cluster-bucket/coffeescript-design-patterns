/*global define*/
define(["./registry"], function (registry) {
    return {
        getRequest: function () {
            return registry.getRequest();
        }
    };
});