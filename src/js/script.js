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


function renderMap (lat, lng) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat,
            lng: lng
        },
        scrollwheel: false,
        zoom: 15
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

        renderMap(pos.lat, pos.lng);
    });
})();
