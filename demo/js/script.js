(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function getGeolocation(cb) {
    var opts = {
        enableHighAccuracy: true,
        timeout: 8 * 1000,
        maximumAge: 10 * 60 * 1000
    };

    navigator.geolocation.getCurrentPosition(function (pos) {
        cb(null, {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        });
    }, function (err) {
        cb(err);
    }, opts);
}

function renderMap(pos) {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        scrollwheel: false,
        zoom: 15
    });

    addMarker(map, {
        pos: pos,
        title: 'Your location'
    });
}

function addMarker(map, opts) {
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

    getGeolocation(function (err, pos) {
        if (err) {
            console.error(err);
            return;
        }

        console.log('[render map] start');

        renderMap(pos);
    });
})();

},{}]},{},[1]);
