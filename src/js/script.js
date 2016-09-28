const TARGET_LOC = {
    lat: 35.463132,
    lng: 139.624930
};


function getGeolocation (cb) {
    const opts = {
        enableHighAccuracy: true,
        timeout: 8 * 1000,
        maximumAge: 10 * 60 * 1000
    };

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            cb(null, pos.coords);
        },
        (err) => {
            cb(err);
        },
        opts
    );
}

function renderMap (userLoc, userAcc) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: userLoc,
        scrollwheel: false,
        zoom: 18
    });

    addMarker(map, {
        loc: TARGET_LOC,
        title: 'Target location'
    });

    drawCircle(map, userLoc, userAcc);
    drawLine(map, userLoc, TARGET_LOC);
}

function addMarker (map, opts) {
    new google.maps.Marker({
        map: map,
        position: opts.loc,
        title: opts.title
    });
}

function calcDistance (loc1, loc2) {
    const EARTH_RADIUS = 6378.1;
    
    const lat1 = loc1.lat;
    const radianLat1 = lat1 * ( Math.PI  / 180 );
    
    const lng1 = loc1.lng;
    const radianLng1 = lng1 * ( Math.PI  / 180 );
    
    const lat2 = loc2.lat;
    const radianLat2 = lat2 * ( Math.PI  / 180 );
    
    const lng2 = loc2.lng;
    const radianLng2 = lng2 * ( Math.PI  / 180 );
    
    const diffLat = (radianLat1 - radianLat2);
    const diffLng = (radianLng1 - radianLng2);
    const sinLat = Math.sin(diffLat / 2);
    const sinLng = Math.sin(diffLng / 2);
    const a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);
    const distance = EARTH_RADIUS * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
    
    return distance;
}

function drawCircle (map, centerLoc, radius) {
    new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: centerLoc,
        radius: radius
    });
}

function drawLine (map, loc1, loc2) {
    const path = new google.maps.Polyline({
        path: [ loc1, loc2 ],
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    path.setMap(map);
}



(function () {
    if (!navigator.geolocation) {
        console.error('geolocation is not supported');
        return;
    }

    console.log('[get geolocation] loading...');

    getGeolocation((err, coords) => {
        if (err) {
            console.error(err);
            return;
        }

        const loc = {
            lat: coords.latitude,
            lng: coords.longitude
        };

        console.log('[get geolocation] done.');
        console.log(`More or less ${coords.accuracy} meters.`);

        const distance = calcDistance(loc, TARGET_LOC);
        console.log(`distance: ${distance * 1000} meters.`);
        document.getElementById('result').innerHTML = `${distance * 1000} meters`;
        
        console.log('[render map]');
        renderMap(loc, coords.accuracy);
    });
})();
