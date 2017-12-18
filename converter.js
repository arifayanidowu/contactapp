/*Js for weather conversion*/
window.$on = function(target, type, cb) {
    target.addEventListener(type, cb, false);
};

var CORE = (function() {
    "use strict";

    var modules = {};

    function addModule(module_id, mod) {
        modules[module_id] = mod;
    }

    function registerEvents(evt, module_id) {
        var theMod = modules[module_id];
        theMod.events = evt;
    }

    function triggerEvents(evt) {
        var mod;
        for (mod in modules) {
            if (modules.hasOwnProperty(mod)) {
                mod = modules[mod];

                if (mod.events && mod.events[evt.type]) {
                    mod.events[evt.type](evt.data);
                }
            }

        }
    }
    return {
        addModule: addModule,
        registerEvents: registerEvents,
        triggerEvents: triggerEvents

    };

})();

var sb = (function() {
    function listen(evt, module_id) {
        CORE.registerEvents(evt, module_id);
    }

    function notify(evt) {
        CORE.triggerEvents(evt);
    }

    return {
        listen: listen,
        notify: notify
    };
})();

var temperature = (function() {
    var id, val, add, el;

    id = "change";

    function init() {
        el = document.getElementById('temp');
        val = el.getElementsByClassName('value')[0];
        add = el.getElementsByClassName('convert')[0];

        $on(add, 'click', addValue);
    }

    function addValue(e) {

        var convert = {};

        convert.value = val.value;

        convert.fahrenheit = ((val.value * 1.8) + 32);


        sb.notify({
            type: "degree",
            data: convert
        });

        e.preventDefault();
    }

    return {
        id: id,
        init: init,
        addValue: addValue
    };

})();


var showTemperature = (function() {

    var id, el, convert;

    id = "convert-value";

    function init() {
        el = document.getElementById('temp');
        convert = el.getElementsByClassName('degree')[0];

        sb.listen({ 'degree': weatherConversion }, id);
    }

    function weatherConversion(celsius) {

        convert.setAttribute('value', celsius.fahrenheit);
        /* 
                var create = document.createElement('p');
                var f = document.createTextNode(celsius.fahrenheit);
                create.appendChild(f);
                el.appendChild(create); */
    }

    return {
        id: id,
        init: init,
        weatherConversion: weatherConversion
    };



})();



CORE.addModule(temperature.id, temperature);
CORE.addModule(showTemperature.id, showTemperature);

temperature.init();
showTemperature.init();