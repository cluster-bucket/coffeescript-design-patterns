/**
 * Bootstrap
 */
/*global require,requirejs*/
require.config({
    baseUrl: "js/decorator/"
});
requirejs(["./deco"], function (decorator) {
    
    var deco = Object.create(decorator),
        request = {name: "main"};
    
    deco.add('auth');
    deco.add('session');
    deco.add('params');
    request = deco.run(request);
    
    console.log(request);
});