
=======

function buildQueryUrl() {
    var queryURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?";
    var queryParams = { "f": "json" };
    queryParams.category = "coffee shop";
    queryParams.outFields = "Place_addr", "PlaceName";
    queryParams.maxLocations = "5";
    queryParams.location = "-111.840498,40.7702357";

    return queryURL + $.param(queryParams);

}

queryURL = buildQueryUrl();
console.log(queryURL)

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (data) {
    dataEl = data
    console.log(dataEl)
    for (var i = 0; i < dataEl.candidates.length; i++) {
        console.log(dataEl.candidates[i].address)

    }
    console.log(dataEl.candidates[1].address)

})


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