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

    var Storage = (function() {
        var $public = {};
        var $private = {};

        // ------------------------------

        $public.set = function set( item, data ) {
            localStorage.setItem( item, JSON.stringify( data ) );
            return;
        };

        // ------------------------------

        $public.get = function get( item ) {
            var thisItem = localStorage.getItem( item );
            return JSON.parse( thisItem );
        };

        // ------------------------------

        $public.remove = function remove( item ) {
            localStorage.removeItem( item );
        };

        // ------------------------------

        return $public;
    })();

    return Storage;
});