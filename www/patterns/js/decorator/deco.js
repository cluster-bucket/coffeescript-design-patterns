/*global define*/
define([], function () {
    
    function qs() {
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
    
    var rdeco = {
        request: {},
        collection: [],
        decorators: {},
        add: function (decorator) {
            this.collection.push(decorator);
        },
        run: function (request) {
            var i;
            rdeco.request = request;
            for (i = 0; i < this.collection.length; i += 1) {
                this.decorators[this.collection[i]].execute();
            }
            return rdeco.request;
        }
    };
    
    rdeco.decorators.auth = {
        execute: function () {
            rdeco.request.auth = true;
        }
    };
    
    rdeco.decorators.session = {
        execute: function () {
            rdeco.request.session = "valid";
        }
    };
    
    rdeco.decorators.params = {
        execute: function () {
            rdeco.request.params = qs();
        }
    };
    
    return rdeco;
});