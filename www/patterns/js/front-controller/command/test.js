/**
 * Command
 */
/*global define, console*/
define(["../command"], function (BaseCommand) {
    var Command = function () {};
    Command.prototype = new BaseCommand();
    Command.prototype.doExecute = function (request) {
        request.addFeedback("Test feedback");
        console.log("Hey Test!");
    };

    return Command;
});