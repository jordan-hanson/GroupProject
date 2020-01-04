var queryMapUrl = '';
var apiKey = '';
var submit = $(".submit");

window.onload = function () {
    L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';

    var map = L.mapquest.map('map', {
        center: [40.7128, -74.0059],
        layers: L.mapquest.tileLayer('map'),
        zoom: 13
    });
    var hello = 'murray';
    L.mapquest.directions().route({
        start: '350 5th Ave, New York, NY 10118',
        end: hello
    });
}


$.ajax({
    url: queryMapUrl,
    method: "GET"
})
    .then(function () {


    })