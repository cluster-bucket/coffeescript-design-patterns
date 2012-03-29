/**
 * Central point of entry for every request
 */
/*global define*/
define(["jquery", "./request", "./resolver"], function ($, Request, Resolver) {

    var Controller  = function () {};

    /**
     * Convenience method
     * @static
     */
    Controller.prototype.run = function (element) {
        var instance = new Controller();
        instance.init();
        instance.handleRequest();
    };

    Controller.prototype.init = function () {
        // Helper.init();
    };

    Controller.prototype.handleRequest = function () {
        var request = new Request(),
            cmdr = new Resolver();

        cmdr.getCommand(request).then(function (result) {
            result.command.execute(request);
            console.log(request);
        });
    };

    return new Controller();
});