;(function ( factory ) {
    'use strict';
    /* istanbul ignore next */
    if ( typeof define === 'function' && define.amd ) {
        define( factory );
    }
    else if ( typeof exports === 'object' ) {
        exports = module.exports = factory();
    }
    else {
        this.Module = ( this.Module || {} );
        this.Module.Storage = factory();
    }
})(function() {
    'use strict';

    var Storage = function() {
        var $public = {};
        var $private = {};

        // --------------------------------------------------

        $private.defaults = {
            type : 'localStorage'
        };

        // --------------------------------------------------

        $public.use = function use( type ) {
            $private.defaults.type = type;
            return $public;
        };

        // --------------------------------------------------

        $public.set = function set( item, data ) {
            window[ $private.defaults.type ].setItem( item, JSON.stringify( data ) );
            return;
        };

        // --------------------------------------------------

        $public.get = function get( item ) {
            var thisItem = window[ $private.defaults.type ].getItem( item );
            return JSON.parse( thisItem );
        };

        // --------------------------------------------------

        $public.remove = function remove( item ) {
            window[ $private.defaults.type ].removeItem( item );
        };

        // --------------------------------------------------

        return $public;
    };

    return Storage;
});