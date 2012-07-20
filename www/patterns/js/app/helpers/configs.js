/*global define*/
define(["jquery"], function ($) {
    return {
        get: function () {
            return $.ajax({
              url: "js/app/helpers/configs.json",
              dataType: "json",
              async: false
            });
        }
    };
});