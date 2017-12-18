define(["./sandbox"], function(sb) {

    var id, el, convert;

    id = "convert-value";

    function init() {
        el = document.getElementsByClassName('degree')[0];
        convert = el.getElementsByClassName('convert')[0];

        sb.listen({ 'degree': weatherConversion }, id);
    }

    function weatherConversion(celsius) {

        var create = document.createElement('p');
        var f = document.createTextNode(celsius.fahrenheit);
        create.appendChild(f);
        el.appendChild(create);
    }

    return {
        id: id,
        init: init,
        weatherConversion: weatherConversion
    };



});