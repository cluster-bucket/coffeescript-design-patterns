/**
 * Here's my justification for using a constructor function for requests:
 * 
 * 1. Simplifies validation - By simply checking if an object is an 
 * `instanceof Type` we can ensure that the object has the correct 
 * properties and methods throughout. This reduces the amount of validation 
 * that must occur before the object is used.
 * 
 * 2. Smaller codebase - Seriously. If I don't have to write `x !== undefined`
 * five or six times in every function that's a significant savings. No joke.
 * 
 * 3. Prevents polymorphism - A developer cannot simply create a 
 * similar object to be used in place of the properly vetted/validated one.
 * Instead the developer must create an instance of the object.
    // 
    function Clobber(val) {

        // if !use_strict                
        if(false === (this instanceof Clobber)) {
            return new Clobber(val);
        }
        
        this.clobberMe = val;
        console.log(this, this.clobberMe);
    }

    var search = new Clobber("right"),
        destroy = Clobber("wrong");
*/
/*
function Interface() {
    this.collection = [];
};

Interface.decorators = {};

Interface.decorators.color = {
    attr: "css"
};

Interface.decorators.href = {
    attr: "attr"
};

Interface.prototype.decorate = function (decorator) {
    this.collection.push(decorator);
}

Interface.prototype.toJSON = function () {
    var i, ifce = {};
    console.log(this.collection, Interface.decorators);
    for (i = 0; i < this.collection.length; i += 1) {
        ifce[this.collection[i]] = Interface.decorators[this.collection[i]].attr;
    }
    return JSON.stringify(ifce);
};

var widget = new Interface();
widget.decorate('color');
widget.decorate('href');
console.log(widget.toJSON());​
*/
/*global define*/
define(["../helpers/qs"], function (qs) {
    
    function Request () {
        "use strict";
        
        // if !use_strict                
        if(false === (this instanceof Request)) {
            return new Request();
        }
    }
    
    // Private properties
    // Collection of decorators to execute
    Request.collection = [];
    
    Request.properties = {
        auth: false,
        sesion: "unknown",
        params: {}
    };
    
    // Available decorators
    Request.decorators = {};
    Request.decorators.auth = {
        execute: function () {
            Request.properties.auth = true;
        }
    };
    
    Request.decorators.session = {
        execute: function () {
            Request.properties.session = "valid";
        }
    };
    
    Request.decorators.params = {
        execute: function () {
            Request.properties.params = qs.all();
        }
    };

    // Public methods
    Request.prototype.applyDecorators = function () {
        var i;
        for (i = 0; i < Request.collection.length; i += 1) {
            Request.decorators[Request.collection[i]].execute();
        }
        // return this.request;
    };
    
    Request.prototype.addDecorator = function (decorator) {
        Request.collection.push(decorator);
    };
    
    Request.prototype.getProperty = function (property) {
        return Request.properties[property];
    };
    
    return Request;
});