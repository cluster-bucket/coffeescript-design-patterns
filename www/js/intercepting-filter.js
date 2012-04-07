/**
 * @link <a href="http://java.sun.com/blueprints/corej2eepatterns/Patterns/InterceptingFilter.html">Intercepting Filter</a>
 */
/*global require, requirejs*/
require.config({
    baseUrl: "js/intercepting-filter/",
    paths: {
        "jquery": "../jquery"
    }
});
requirejs(["process"], function (Process) {

// Simple decorator
// function Request() {
//     this.collection = [];
// };

// Request.decorators = {};

// Request.decorators.authRequest = {
//     process: function () {
//         console.log("Auth request");
//     }
// };

// Request.decorators.logRequest = {
//     process: function () {
//         console.log("Log request");
//     }
// };

// Request.prototype.decorate = function (decorator) {
//     this.collection.push(decorator);
// }

// Request.prototype.processRequest = function () {
//     var i, ifce = {};
//     for (i = 0; i < this.collection.length; i += 1) {
//         Request.decorators[this.collection[i]].process();
//     }
// };

// var req = new Request();
// req.decorate('logRequest');
// req.decorate('authRequest');
// req.processRequest();

});
