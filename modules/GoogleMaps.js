;(function( window, document, $, undefined ) {

    'use strict';

    var GoogleMaps = function() {

        var $private = {};
        var $public = {};


        // --------------------------------------------------


        $private.geocoder = '';
        $private.map = '';
        $private.marker = '';
        $private.$mapContainer = '';
        $private.address = '';
        $private.marker = '';


        // --------------------------------------------------


        $private.initGoogleMaps = function initGoogleMaps() {
            if( ! $private.$mapContainer || ! $private.address ) {
                console.error( 'É necessário definir o container do mapa com setMapContainer() e o endereço com setAddress()' );
                return false;
            }

            $private.loadMap();
        };


        // --------------------------------------------------


        $private.loadMap = function loadMap() {
            var geocodeURL = 'http://maps.googleapis.com/maps/api/geocode/json';
            var addressData = {
                address : $private.address,
                sensor: false
            };

            $.getJSON( geocodeURL, addressData, $private.responseJSON );
        };


        // --------------------------------------------------


        $private.responseJSON = function responseJSON( response ) {
            var lat = response.results[0].geometry.location.lat;
            var lng = response.results[0].geometry.location.lng;

            var options = {
                center : new google.maps.LatLng( lat, lng ),
                zoom : 15,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };

            $private.map = new google.maps.Map( $private.$mapContainer[0], options );

            $private.marker = new google.maps.Marker({
                position: $private.map.getCenter(),
                map: $private.map,
                icon: $private.marker
            });
        };


        // ==================================================


        $public.init = function init() {
            console.log( 'carregou GoogleMaps.js' );
            $private.initGoogleMaps();
        };


        // --------------------------------------------------


        $public.setMapContainer = function setMapContainer( $mapContainer ) {
            $private.$mapContainer = $mapContainer;
            return $public;
        };


        // --------------------------------------------------


        $public.setAddress = function setAddress( address ) {
            $private.address = address;
            return $public;
        };


        // --------------------------------------------------


        $public.setMarker = function setMarker( marker ) {
            $private.marker = marker;
            return $public;
        };


        // --------------------------------------------------


        return $public;

    }; // GoogleMaps


    var Module = window.Module || {};

    // Exporting to Modules
    Module.GoogleMaps = GoogleMaps;

})( window, document, jQuery );