var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
function buildQueryUrl(lat, lon) {
    var queryURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?";
    var queryParams = { "f": "json" };
    queryParams.category = "coffee shop";
    queryParams.outFields = "Place_addr", "PlaceName";
    queryParams.maxLocations = "5";
    console.log(lat, lon)
    queryParams.location = `${lon},${lat}`;
    return queryURL + $.param(queryParams);
}
// this variable allows the map builder to wait until that script is read to build the
var starVar = 0
// this function is called once the page loads with the windows.onload function at the bottom
getCoffeeShops = () => {
    function success(pos) {
        let crd = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        let lon = crd.longitude;
        let lat = crd.latitude;
        queryURL = buildQueryUrl(lat, lon);
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            function buildCoffeeShopCard() {
                $(coffeeShopCard).append(horizontalCard);
                $(horizontalCard).append(cardTitle);
                $(cardTitle).append(cardStack);
                $(cardStack).append(cardContent);
                $(cardContent).append(cardIdentifier);
                $(horizontalCard).append(cardImg);
                $(cardImg).append(Img);
                $(cardContent).append(cardStoreHours);
                $("#coffee-shops-homes").append(coffeeShopCard);
            }
            for (var i = 0; i < data.candidates.length; i++) {
                console.log(data.candidates[i].address);
                console.log(data.candidates[i].attributes.Place_addr);
                var coffeeShopCard = $("<div>").addClass("col s12 m12").attr({
                    "class": "card-button",
                    "data-address": data.candidates[i].attributes.Place_addr
                });
                var cardTitle = $("<h5>").addClass("header").text(data.candidates[i].address);
                var horizontalCard = $("<div>").addClass("card horizontal");
                var cardImg = $("<div>").addClass("card-image");
                var Img = $('<img />', {
                    id: "image-" + [i],
                    src: 'https://media.giphy.com/media/7qV3yswT0K8hi/giphy.gif',
                    alt: 'placeholder'
                });
                var cardStack = $("<div>").addClass("card-stack");
                var cardContent = $("<div>").addClass("card-content card-items")
                // var cardButton = $("<a />").addClass("waves-effect waves-light btn").text("button")
                var cardIdentifier = $("<h6>").text("Coffee Shop");
                var cardStoreHours = $("<h6>").text("Store Hours: 6am to 9pm");
                buildCoffeeShopCard();
            }
            // ----finding the reverse address from the lattitude and longitude
            var reverseURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=Sf1vVXP4tsAXRiAvYumsYGJTgGd0wlMe&location=" + lat + "," + lon + "&includeRoadMetadata=true&includeNearestIntersection=true"
            // ----finding the reverse address of of the lattitude and longitude
            $.ajax({
                url: reverseURL,
                method: "GET"
            }).then(function (geoAddress) {
                var adressStart = geoAddress.results[0].locations[0]
                var startAddress = adressStart.street + ", " + adressStart.adminArea5 + ", " + adressStart.adminArea3 + ", " + adressStart.postalCode
                $(".card-button").click(function () {
                    var shopAddress = $(this).data('address');
                    console.log(shopAddress)
                    L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';
                    if (starVar === 0) {
                        starVar = 1
                        var map = L.mapquest.map('map', {
                            center: [lon, lat],
                            layers: L.mapquest.tileLayer('map'),
                            zoom: 13
                        });
                    }
                    L.mapquest.directions().route({
                        start: startAddress,
                        end: shopAddress
                    });
                })
            })
            $('#searchButton').on("click", function () {
                var zipcode = $('#search').val().trim();
                console.log(zipcode)
                var url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + zipcode + '&facet=state&facet=timezone&facet=dst'
                $.ajax({
                    url: url,
                    method: "GET"
                }).then(function (zips) {
                    var longitude = zips.records[0].fields.longitude
                    var latitude = zips.records[0].fields.latitude
                    var queryURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?";
                    queryURL = buildQueryUrl(latitude, longitude);
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response)
                        responseEl = response
                        // console.log(responseEl)
                        for (var i = 0; i < responseEl.candidates.length; i++) {
                            // console.log(responseEl.candidates[i].address);
                            let cityEl = responseEl.candidates[i].attributes.Place_addr;
                            // console.log(responseEl.candidates[i].attributes.Place_addr);
                            var coffeeShopCard = $("<div>").addClass("col s12 m12").attr({
                                "class": "card-button",
                                "data-address": response.candidates[i].attributes.Place_addr
                            });
                            var cardTitle = $("<h5>").addClass("header").text(responseEl.candidates[i].address);
                            var horizontalCard = $("<div>").addClass("card horizontal");
                            var cardImg = $("<div>").addClass("card-image");
                            var Img = $('<img />', {
                                id: "image-" + [i],
                                src: 'https://media.giphy.com/media/7qV3yswT0K8hi/giphy.gif',
                                alt: 'placeholder'
                            });
                            var cardStack = $("<div>").addClass("card-stack");
                            var cardContent = $("<div>").addClass("card-content card-items")
                            // var cardButton = $("<a />").addClass("waves-effect waves-light btn").text("button")
                            var cardIdentifier = $("<h6>").text("Coffee Shop");
                            var cardStoreHours = $("<h6>").text("Store Hours: 6am to 9pm");
                            $(coffeeShopCard).append(horizontalCard);
                            $(horizontalCard).append(cardTitle);
                            $(cardTitle).append(cardStack);
                            $(cardStack).append(cardContent);
                            $(cardContent).append(cardIdentifier);
                            $(horizontalCard).append(cardImg);
                            $(cardImg).append(Img);
                            $(cardContent).append(cardStoreHours);
                            $("#coffee-shops-homes").append(coffeeShopCard);
                        }
                        $.ajax({
                            url: reverseURL,
                            method: "GET"
                        }).then(function (geoAddress) {
                            var adressStart = geoAddress.results[0].locations[0]
                            var startAddress = adressStart.street + ", " + adressStart.adminArea5 + ", " + adressStart.adminArea3 + ", " + adressStart.postalCode
                            $(".card-button").click(function () {
                                var shopAddress = $(this).data('address');
                                console.log(shopAddress)
                                L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';
                                if (starVar === 0) {
                                    starVar = 1
                                    var map = L.mapquest.map('map', {
                                        center: [lon, lat],
                                        layers: L.mapquest.tileLayer('map'),
                                        zoom: 13
                                    });
                                }
                                L.mapquest.directions().route({
                                    start: startAddress,
                                    end: shopAddress
                                });
                            })
                        })
                    })
                    $('#search').val(null);
                    $('#coffee-shops-homes').empty();
                })
            })
        })
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}
window.onload = () => {
    getCoffeeShops()
}