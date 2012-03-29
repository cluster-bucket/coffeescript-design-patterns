/**
 * Command
 */
/*global define, console*/
define(["../command"], function (BaseCommand) {
    var Command = function () {};
    Command.prototype = new BaseCommand();
    Command.prototype.doExecute = function (request) {
        request.addFeedback("Feedback loop");
        console.log("Ohai!");
    };

    return Command;
});