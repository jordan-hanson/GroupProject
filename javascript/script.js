
// var latitude, longitude, coffeShopCard, cardTitle, cardIdentifier, cardMileageApi, cardStoreHours;


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
        console.log(dataEl.candidates[i].address);
        var coffeeShopCard = $("<div>").addClass("col s12 m12");
        var cardTitle = $("<h3>").addClass("header").text(dataEl.candidates[i].address);
        var horizontalCard = $("<div>").addClass("card horizontal");
        var cardImg = $("<div>").addClass("card-image");
        var Img = $('<img />', {
            id: "image-" + [i],
            src: 'https://lorempixel.com/100/190/nature/6',
            alt: 'placeholder'
        });
        var cardStack = $("<div>").addClass("card-stack");
        var cardContent = $("<div>").addClass("card-content")
        // var cardButton = $("<a />").addClass("waves-effect waves-light btn").text("button")
        var cardIdentifier = $("<li>").text("Coffee Shop");
        var cardStoreHours = $("<li>").text("6am : 9pm");

        $(coffeeShopCard).append(cardTitle);
        $(coffeeShopCard).append(horizontalCard);
        $(horizontalCard).append(cardStack);
        $(cardStack).append(cardContent);
        $(cardContent).append(cardIdentifier);
        $(cardContent).append(cardStoreHours);
        $(horizontalCard).append(cardImg);
        $(cardImg).append(Img);
        $("#coffee-shops-homes").append(coffeeShopCard);




    }
    console.log(dataEl.candidates[1].address)

})


// var queryMapUrl = '';
// var apiKey = '';
// var submit = $(".submit");

// window.onload = function () {
//     L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';

//     var map = L.mapquest.map('map', {
//         center: [40.7128, -74.0059],
//         layers: L.mapquest.tileLayer('map'),
//         zoom: 13
//     });
//     var hello = 'murray';
//     L.mapquest.directions().route({
//         start: '350 5th Ave, New York, NY 10118',
//         end: hello
//     });
// }


// $.ajax({
//     url: queryMapUrl,
//     method: "GET"
// })
//     .then(function () {


//     })