/*global define*/
define(["../registry", "./request", "./resolver", "../helpers/configs"], 
    function (registry, Request, resolver, configs) {

    return {
        run: function () {
            this.init();
            this.handle();
        },
        init: function () {
            // Copy the configs over
            // Syncronous but still uses deferreds, wha?
            configs.get().then(function (cfgs) {
                for (var cfg in cfgs) {
                    registry[cfg] = cfgs[cfg];
                } 
            });
        },
        handle: function () {
            var req = new Request(),
                cmdr = Object.create(resolver);
            
            req.addDecorator("auth");
            req.addDecorator("session");
            req.addDecorator("params");
            req.applyDecorators();
            console.log(req);
            
            cmdr.getCommand(req).then(function (result) {
                result.command.execute(req);
            });
        }
    };
});