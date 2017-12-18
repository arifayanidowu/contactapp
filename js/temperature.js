define(["./sandbox"], function(sb) {
	var id, val, add, el;

	id = "change";

	function init() {
		el = document.getElementById('temp');
		val = el.getElementsByClassName('value')[0];
		add = el.getElementsByClassName('convert')[0];

		$on(add, 'click', addValue);
	}

	function addValue(e){

		var convert = {};

		convert.temp = val.value;

		convert.fahrenheit = ((val.value * 1.8) + 32);


		sb.notify({
			type: "degree",
			data: convert
		})

		e.preventDefault();
	}

	return {
		id: id,
		init: init,
		addValue: addValue
	}

});
