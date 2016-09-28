function getGeolocation (cb) {
    const opts = {
        enableHighAccuracy: true,
        timeout: 8 * 1000,
        maximumAge: 10 * 60 * 1000
    };

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            cb(null, {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        },
        (err) => {
            cb(err);
        },
        opts
    );
}

function renderMap (pos) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        scrollwheel: false,
        zoom: 15
    });

    addMarker(map, {
        pos: pos,
        title: 'Your location'
    });
}

function addMarker (map, opts) {
    new google.maps.Marker({
        map: map,
        position: opts.pos,
        title: opts.title
    });
}


(function () {
    if (!navigator.geolocation) {
        console.error('geolocation is not supported');
        return;
    }

    console.log('[get geolocation] loading...');

    getGeolocation((err, pos) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('[render map] start');

        renderMap(pos);
    });
})();
