/**
 * Interpret events so that the correct code can be invoked to fulfill the request.
 */
/*global requirejs, define*/
define(["jquery", "../views/main"], function ($, mainView) {

    return {
        getCommand: function (request) {
            var cmd,
                path,
                name,
                defer;
    
            defer = $.Deferred();
            
            // @todo determine command
            //cmd = request.getProperty("hash");
            if (request.getProperty('params').resource !== undefined) {
                cmd = "resource";
            } else {
                return defer.resolve({
                    command: Object.create(mainView),
                    request: request
                });
            }
    
            name = cmd.charAt(0).toUpperCase() + cmd.slice(1);
            path = "./views/" + cmd;
    
            // Override the default error handling for requirejs
            // @link <a href="http://requirejs.org/docs/api.html#errors">Handling Errors</a>
            requirejs.onError = function (err) {
                if (err.requireType === 'timeout') {
                    request.addFeedback("Command " + cmd + " not found.");
                    defer.resolve({
                        command: Object.create(mainView),
                        request: request
                    });
                } else {
                    throw err;
                }
            };
    
            // @todo CmdClass instanceof Command
            requirejs([path], function (view) {
                defer.resolve({
                    command: Object.create(view),
                    request: request
                });
            });
    
            return defer.promise();
    
        }
    };

});