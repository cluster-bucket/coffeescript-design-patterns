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

requirejs(["process"], function (ProcessRequest) {
    var process = new ProcessRequest();
    process.decorate('log');
    process.decorate('auth');
    process.decorate('structure');
    process.process();
});

