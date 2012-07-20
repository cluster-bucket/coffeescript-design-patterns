/*!
 * @fileOverview Simple decorator
 */
/*global define, console*/
define(["./log", "./auth", "./structure"], function (log, auth, structure) {
    function ProcessRequest(req) {
        this.request = req;
        this.collection = [];
    };

    // Add decorators
    ProcessRequest.decorators = {};
    ProcessRequest.decorators.log = log;
    ProcessRequest.decorators.auth = auth;
    ProcessRequest.decorators.structure = structure;

    ProcessRequest.prototype.decorate = function (decorator) {
        this.collection.push(decorator);
    }

    ProcessRequest.prototype.process = function () {
        var request = this.request,
            max = this.collection.length,
            name,
            i;

        for (i = 0; i < max; i += 1) {
            name = this.collection[i];
            request = ProcessRequest.decorators[name].process(request);
        }
    };

    return ProcessRequest;
});