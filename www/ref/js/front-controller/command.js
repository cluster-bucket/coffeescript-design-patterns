/**
 * Base Command pattern
 */
/*global define*/
define([], function () {
    var Command = function () {};

    Command.prototype.execute = function (request) {
        this.doExecute(request);
    };

    Command.prototype.doExecute = function (request) {};

    return Command;
});