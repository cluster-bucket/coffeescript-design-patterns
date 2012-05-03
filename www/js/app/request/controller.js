/*global define*/
define(["../registry", "./request", "./resolver", "../helpers/configs"], 
    function (registry, request, resolver, configs) {

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
            var req = Object.create(request),
                cmdr = Object.create(resolver);
            
            req.add("auth");
            req.add("session");
            req.add("params");
            req = req.run();
            
            cmdr.getCommand(req).then(function (result) {
                result.command.execute(req);
            });
        }
    };
});