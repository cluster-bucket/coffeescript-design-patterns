/**
 * @link <a href="http://java.sun.com/blueprints/corej2eepatterns/Patterns/ViewHelper.html">View Helper</a>
 */
/*global require, requirejs*/
require.config({
    baseUrl: "js/view-helper/",
    paths: {
        "jquery": "../jquery",
        "underscore": "../libs/underscore"
    }
});

requirejs(['jquery', 'helper', 'text!template.html', 'underscore'], 
        function ($, helper, template, _) {

    var request = helper.getRequest(),
        output = _.template(template, request);

    $(function () {
        $("body").html(output);
    });
});

