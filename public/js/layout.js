function DayConstructor() {
    this.hotel = {};
    this.restaurant = [];
    this.activity = [];
}

var dayOne = new DayConstructor(); //Keep day one, come back and call constructor on dayADd button clicks

var days = [dayOne];

//

var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

var styleArr = [{
    featureType: 'landscape',
    stylers: [{
        saturation: -100
    }, {
        lightness: 60
    }]
}, {
    featureType: 'road.local',
    stylers: [{
        saturation: -100
    }, {
        lightness: 40
    }, {
        visibility: 'on'
    }]
}, {
    featureType: 'transit',
    stylers: [{
        saturation: -100
    }, {
        visibility: 'simplified'
    }]
}, {
    featureType: 'administrative.province',
    stylers: [{
        visibility: 'off'
    }]
}, {
    featureType: 'water',
    stylers: [{
        visibility: 'on'
    }, {
        lightness: 30
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
        color: '#ef8c25'
    }, {
        lightness: 40
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
        visibility: 'off'
    }]
}, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{
        color: '#b6c54c'
    }, {
        lightness: 40
    }, {
        saturation: -40
    }]
}];

var mapCanvas = document.getElementById('map-canvas');

var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
});

var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
};

function drawMarker(type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
        icon: iconURL,
        position: latLng
    });
    marker.setMap(currentMap);
    return marker;
}

function clearMap(newMarker){
    newMarker.setMap(null);
}
// drawMarker('hotel', [40.705137, -74.007624]);
// drawMarker('restaurant', [40.705137, -74.013940]);
// drawMarker('activity', [40.716291, -73.995315]);





$(document).ready(function() {


    for (var i = 0; i < hotels.length; i++) {
        $('#hotel-choices').append(' <option>' + hotels[i].name + '</option> ');
    }

    for (var j = 0; j < restaurants.length; j++) {
        $('#restaurant-choices').append(' <option>' + restaurants[j].name + '</option> ');
    }

    for (var k = 0; k < activities.length; k++) {
        $('#activity-choices').append(' <option>' + activities[k].name + '</option> ');
    }

    $("#add-hotel").click(function() {
        var hotelName = $('#hotel-choices').find(":selected").text();
        console.log(hotelName);
        // dayOne.hotel = x;
        if(days[0].hotel.marker){
            clearMap(days[0].hotel.marker);
        }
        $('#myHotel').text(hotelName);
        for (var i = 0; i < hotels.length; i++) {
            if (hotelName === hotels[i].name) {
                // console.log(restaurant[i]);
                days[0].hotel = hotels[i];
            }
        }
        var locationCoord = days[0].hotel.place.location;
        // console.log(locationCoord);
        var hotelMarker = drawMarker('hotel', [locationCoord[0], locationCoord[1]]);
        days[0].hotel.marker = hotelMarker;
    });


    $("#add-restaurant").click(function() {
        var restaurantName = $('#restaurant-choices').find(":selected").text();
        
        for (var i = 0; i < restaurants.length; i++) {
            if (restaurantName === restaurants[i].name) {
                days[0].restaurant.push(restaurants[i]);        //make market here not below
                var locationCoord = days[0].restaurant[i].place.location;
                var restMarker = drawMarker('restaurant', [locationCoord[0], locationCoord[1]]);
                days[0].restaurant[days[0].restaurant.length-1].marker = restMarker;
            }
        }

        // for(var j = 0; j < days[0].restaurant.length; j++){
        //     var locationCoord = days[0].restaurant[j].place.location;
        //     var restMarker = drawMarker('restaurant', [locationCoord[0], locationCoord[1]]);
        //     days[0].restaurant[j].marker = restMarker;
        // }
        var placeHolder = restaurantName;
        var restaurantVar = '<li>' + placeHolder + '</li>' + '<button data-action="remove" class="btn remove btn-xs btn-danger btn-circle pull-right">x</button>'
        var buttonPressed = $('#myRestaurant').append(restaurantVar);
        $($('#myRestaurant').children().last()[0]).on('click', function(){
            debugger;
            var rest = $(this).prev()[0].textContent;
            var restArray = days[0].restaurant;
            
            for(var k = 0; k < restArray.length; k++){
                if(restArray[k].name === rest){
                    console.log(restArray);
                    clearMap(restArray[k].marker);
                    restArray.splice(k,1);
                }
                
            }



            $(this).prev().remove();
            $(this).remove();
        });

    });

    $("#add-activity").click(function() {
        var activityName = $('#activity-choices').find(":selected").text();
        console.log(activityName);
        // dayOne.activity = x;
        $('#myActivity').append('<li>' + activityName + '</li>');
        for (var i = 0; i < activities.length; i++) {
            if (activityName === activities[i].name) {
                // console.log(activities[i]);
                days[0].activity.push(activities[i]);
            }
        }

        for(var j = 0; j < days[0].activity.length; j++){
            var locationCoord = days[0].activity[j].place.location;
            console.log(locationCoord);
            var actMarker = drawMarker('activity', [locationCoord[0], locationCoord[1]]);
            days[0].activity[j].marker = actMarker;
        }
    });


});