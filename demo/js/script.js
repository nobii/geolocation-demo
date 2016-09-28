(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var TARGET_LOC = {
    lat: 35.463132,
    lng: 139.624930
};

function getGeolocation(cb) {
    var opts = {
        enableHighAccuracy: true,
        timeout: 8 * 1000,
        maximumAge: 10 * 60 * 1000
    };

    navigator.geolocation.getCurrentPosition(function (pos) {
        cb(null, pos.coords);
    }, function (err) {
        cb(err);
    }, opts);
}

function renderMap(userLoc, userAcc) {
    var map = new google.maps.Map(document.getElementById('map'), {
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

function addMarker(map, opts) {
    new google.maps.Marker({
        map: map,
        position: opts.loc,
        title: opts.title
    });
}

function calcDistance(loc1, loc2) {
    var EARTH_RADIUS = 6378.1;

    var lat1 = loc1.lat;
    var radianLat1 = lat1 * (Math.PI / 180);

    var lng1 = loc1.lng;
    var radianLng1 = lng1 * (Math.PI / 180);

    var lat2 = loc2.lat;
    var radianLat2 = lat2 * (Math.PI / 180);

    var lng2 = loc2.lng;
    var radianLng2 = lng2 * (Math.PI / 180);

    var diffLat = radianLat1 - radianLat2;
    var diffLng = radianLng1 - radianLng2;
    var sinLat = Math.sin(diffLat / 2);
    var sinLng = Math.sin(diffLng / 2);
    var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);
    var distance = EARTH_RADIUS * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

    return distance;
}

function drawCircle(map, centerLoc, radius) {
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

function drawLine(map, loc1, loc2) {
    var path = new google.maps.Polyline({
        path: [loc1, loc2],
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

    getGeolocation(function (err, coords) {
        if (err) {
            console.error(err);
            return;
        }

        var loc = {
            lat: coords.latitude,
            lng: coords.longitude
        };

        console.log('[get geolocation] done.');
        console.log('More or less ' + coords.accuracy + ' meters.');

        var distance = calcDistance(loc, TARGET_LOC);
        console.log('distance: ' + distance * 1000 + ' meters.');
        document.getElementById('result').innerHTML = distance * 1000 + ' meters';

        console.log('[render map]');
        renderMap(loc, coords.accuracy);
    });
})();

},{}]},{},[1]);
