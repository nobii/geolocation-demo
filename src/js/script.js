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

function renderMap (lat, lng) {
    const loc = {
        lat: lat,
        lng: lng
    };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        scrollwheel: false,
        zoom: 15
    });

    addMarker(map, {
        loc: loc,
        title: 'Your location'
    });
}

function addMarker (map, opts) {
    new google.maps.Marker({
        map: map,
        position: opts.loc,
        title: opts.title
    });
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

        console.log('[get geolocation] done.');
        console.log('More or less ' + coords.accuracy + ' meters.');
        
        console.log('[render map]');
        renderMap(coords.latitude, coords.longitude);
    });
})();
