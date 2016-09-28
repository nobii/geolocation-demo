const TARGET_LOC = {
    lat: 35.463132,
    lng: 139.624930
};


function log (text = '') {
    document.getElementById('logger').innerHTML += text + '<br />';
}

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

function renderMap (loc) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        scrollwheel: false,
        zoom: 15
    });

    addMarker(map, {
        loc: loc,
        title: 'Your location'
    });

    addMarker(map, {
        loc: TARGET_LOC,
        title: 'Target location'
    });
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


(function () {
    if (!navigator.geolocation) {
        console.error('geolocation is not supported');
        return;
    }

    log('[get geolocation] loading...');

    getGeolocation((err, coords) => {
        if (err) {
            console.error(err);
            return;
        }

        const loc = {
            lat: coords.latitude,
            lng: coords.longitude
        };


        log('[get geolocation] done.');
        log(`More or less ${coords.accuracy} meters.`);

        const distance = calcDistance(loc, TARGET_LOC);
        log(`distance: ${distance * 1000} meters.`);
        
        log('[render map]');
        renderMap(loc);
    });
})();
