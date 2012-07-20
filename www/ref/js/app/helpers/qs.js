/*global define*/
define([], function () {
    return {
        all: function () {
            var i,
                params = {},
                query = window.location.search.substring(1),
                keyvals = query.split("&");
            
            for (i = 0; i < keyvals.length; i += 1) {
                var kv = keyvals[i].split("=");
                    params[kv[0]] = kv[1];
            }
            
            return params;
        }
    };
});