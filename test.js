window.$on = function (target, type, cb) {
	target.addEventListener(type, cb, false);
}

var CORE = (function(){
	"use strict";

	var modules = {};

	function  addModule(module_id, mod){
		modules[module_id] = mod;
	}

	function registerEvents(evt, module_id){
		var theMod = modules[module_id];
		theMod.events = evt;
	}

	function triggerEvents(evt){
		var mod;
		for(mod in modules){
			if(modules.hasOwnProperty(mod)){
				mod = modules[mod];

				if(mod.events && mod.events[evt.type]){
					mod.events[evt.type](evt.data);
				}
			}
		}
	}
	return {
		addModule: addModule,
		registerEvents: registerEvents,
		triggerEvents: triggerEvents
	}

})();

var sb = (function() {
	function listen(evt, module_id){
		CORE.registerEvents(evt, module_id);
	}

	function notify(evt){
		CORE.triggerEvents(evt);
	}
	return{
		listen: listen,
		notify: notify
	}
})();