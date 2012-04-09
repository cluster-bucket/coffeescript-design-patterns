/**
 * @link <a href="http://java.sun.com/blueprints/corej2eepatterns/Patterns/ViewHelper.html">View Helper</a>
 */
/*global require, requirejs*/
require.config({
    baseUrl: "js/view-helper/",
    paths: {
        "jquery": "../jquery",
        "mustache": "../libs/mustache"
    }
});

requirejs(['jquery', 'helper', 'text!template.html', 'mustache'], 
        function ($, helper, template) {
    console.log(helper, template);
    var request = helper.getRequest(),
        output = mustache.render(template, request);
    $(function () {
        $("body").html(output);
    });
});

