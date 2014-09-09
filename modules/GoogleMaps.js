;(function ( factory ) {
    'use strict';
    /* istanbul ignore next */
    if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery' ], factory );
    }
    else if ( typeof exports === 'object' ) {
        exports = module.exports = factory( require( 'jquery' ) );
    }
    else {
        this.Module = ( this.Module || {} );
        this.Module.GoogleMaps = factory( jQuery );
    }
})(function( $ ) {

    'use strict';

    var GoogleMaps = function() {

        var $private = {};
        var $public = {};


        // --------------------------------------------------


        $private.defaults = {
            mapContainer : null,
            address : null,
            marker : null
        };

        $private.geocoder = null;
        $private.map = null;


        // --------------------------------------------------


        $public.init = function init() {
            console.log( 'carregou GoogleMaps.js' );
            $private.initGoogleMaps();
        };


        // --------------------------------------------------


        $public.set = function set( property, value ) {
            $private.defaults[ property ] = value;
            return $public;
        };


        // --------------------------------------------------


        $public.help = function help() {
            var styleH1 = 'font: bold 16px sans-serif';
            var styleH2 = 'font: bold 14px sans-serif';
            var styleH3 = 'font-weight: 700; background: #f0f0f0; color: #333';
            var styleP = 'color: #333';

            console.log( '' );
            console.log( '%cGOOGLE MAPS (HELP)', styleH1 );
            console.log( '%cPARÂMETROS OBRIGATÓRIOS:', styleH2 );
            console.log( '%c mapContainer (jQuery object): null %c Objeto jQuery do container que vai receber o mapa.', styleH3, styleP );
            console.log( '%caddress (string): null %c Endereço que será mostrado no mapa.', styleH3, styleP );
            console.log( '' );
            console.log( '%cOUTROS PARÂMETROS:', styleH2 );
            console.log( '%cmarker (url): null %c URL da imagem que será usada como marcador.', styleH3, styleP );
            console.log( '' );
        };


        // --------------------------------------------------


        $private.get = function get( property ) {
            return $private.defaults[ property ];
        };


        // --------------------------------------------------


        $private.initGoogleMaps = function initGoogleMaps() {
            if( ! google || ! $private.get( 'mapContainer' ) || ! $private.get( 'address' ) ) {
                console.error( 'Antes de iniciar o Google Maps, é necessário definir os parâmetros obrigatórios. Para saber quais são, execute Module.GoogleMaps().help() no console.' );
                return false;
            }

            $private.loadMap();
        };


        // --------------------------------------------------


        $private.loadMap = function loadMap() {
            var geocodeURL = 'http://maps.googleapis.com/maps/api/geocode/json';
            var addressData = {
                address : $private.get( 'address' ),
                sensor: false
            };

            $.getJSON( geocodeURL, addressData, $private.responseJSON );
        };


        // --------------------------------------------------


        $private.responseJSON = function responseJSON( response ) {
            var lat = response.results[0].geometry.location.lat;
            var lng = response.results[0].geometry.location.lng;
            var marker;

            var options = {
                center : new google.maps.LatLng( lat, lng ),
                zoom : 15,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };

            $private.map = new google.maps.Map( $private.get( 'mapContainer' )[0], options );

            marker = new google.maps.Marker({
                position: $private.map.getCenter(),
                map: $private.map,
                icon: $private.get( 'marker' )
            });
        };


        // --------------------------------------------------


        return $public;

    }; // GoogleMaps


    return GoogleMaps;

});
