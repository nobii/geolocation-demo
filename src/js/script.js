

(function () {
    if (!navigator.geolocation) {
        return;
    }

    const opts = {
        enableHighAccuracy: true,
        timeout: 8 * 1000,
        maximumAge: 10 * 60 * 1000
    };

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            alert(JSON.stringify(pos));
        },
        (err) => {
            console.error(err);
            alert('error!!');
        },
        opts
    );
})();
