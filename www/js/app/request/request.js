/*global define*/
define(["../helpers/qs"], function (qs) {
    
    var rdeco = {
        request: {},
        collection: [],
        decorators: {}
    };

    rdeco.add = function (decorator) {
        this.collection.push(decorator);
    };

    rdeco.run = function () {
        var i;
        for (i = 0; i < this.collection.length; i += 1) {
            this.decorators[this.collection[i]].execute();
        }
        return this.request;
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
            rdeco.request.params = qs.all();
        }
    };
    
    return rdeco;
});