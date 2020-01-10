// var lon, lat, crd;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// var latitude, longitude, coffeShopCard, cardTitle, cardIdentifier, cardMileageApi, cardStoreHours;



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





const getCoffeeShops = () => {
    let queryUL;

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
            dataEl = data
            console.log(dataEl)
            for (var i = 0; i < dataEl.candidates.length; i++) {
                console.log(dataEl.candidates[i].address);
                let cityEl = dataEl.candidates[i].attributes.Place_addr;
                console.log(dataEl.candidates[i].attributes.Place_addr);
                var coffeeShopCard = $("<div>").addClass("col s12 m12").attr("id", "card-button");
                var cardTitle = $("<h5>").addClass("header").text(dataEl.candidates[i].address);
                var horizontalCard = $("<div>").addClass("card horizontal");
                var cardImg = $("<div>").addClass("card-image");
                var Img = $('<img />', {
                    id: "image-" + [i],
                    src: 'https://lorempixel.com/100/190/nature/6',
                    alt: 'placeholder'
                });
                var cardStack = $("<div>").addClass("card-stack");
                var cardContent = $("<div>").addClass("card-content ")
                // var cardButton = $("<a />").addClass("waves-effect waves-light btn").text("button")
                var cardIdentifier = $("<h6>").text("Coffee Shop");
                var cardStoreHours = $("<h6>").text("6am : 9pm");

                $(coffeeShopCard).append(horizontalCard);
                $(horizontalCard).append(cardTitle);
                $(horizontalCard).append(cardStack);
                $(cardStack).append(cardContent);
                $(cardContent).append(cardIdentifier);
                $(cardContent).append(cardStoreHours);
                $(horizontalCard).append(cardImg);
                $(cardImg).append(Img);
                $("#coffee-shops-homes").append(coffeeShopCard);




            }
            console.log(dataEl.candidates[1].address)




            $("#card-button").click(function () {


                L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';

                var map = L.mapquest.map('map', {
                    center: [lon, lat],
                    layers: L.mapquest.tileLayer('map'),
                    zoom: 13
                });
                console.log(map)
                var cityEl = 'murray';
                L.mapquest.directions().route({
                    start: '350 5th Ave, New York, NY 10118',
                    end: cityEl

                });
                console.log(cityEl)
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


// $.ajax({
//     url: queryMapUrl,    
//     method: "GET"
// })
//     .then(function () {


//     })  