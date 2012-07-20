/**
 * Interpret events so that the correct code can be invoked to fulfill the request.
 */
/*global requirejs, define*/
define(["jquery", "./command/default"], function ($, DefaultCommand) {

    var Resolver = function () {
        this.defaultCmd = new DefaultCommand();
    };

    Resolver.prototype.getCommand = function (request) {
        var cmd,
            path,
            name,
            defer;

        cmd = request.getProperty("hash");
        path = "./command/{cmd}";
        defer = $.Deferred();

        if (cmd === "") {
            return defer.resolve({
                command: this.defaultCmd,
                request: request
            });
        }

        name = cmd.charAt(0).toUpperCase() + cmd.slice(1);
        path = path.replace("{cmd}", cmd);

        // Override the default error handling for requirejs
        // @link <a href="http://requirejs.org/docs/api.html#errors">Handling Errors</a>
        requirejs.onError = function (err) {
            if (err.requireType === 'timeout') {
                request.addFeedback("Command " + cmd + " not found.");
                defer.resolve({
                    command: this.defaultCmd,
                    request: request
                });
            } else {
                throw err;
            }
        };

        // @todo CmdClass instanceof Command
        requirejs([path], function (CmdClass) {
            defer.resolve({
                command: new CmdClass,
                request: request
            });
        });

        return defer.promise();

    };

    return Resolver;
});