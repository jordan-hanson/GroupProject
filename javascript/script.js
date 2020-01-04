
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
