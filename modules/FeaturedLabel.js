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
        this.Module.FeaturedLabel = factory( jQuery );
    }
})(function( $ ) {

    'use strict';

    var FeaturedLabel = function() {

        var $public = {};
        var $private = {};


        // --------------------------------------------------


        $private.defaults = {
            inputSelector : null,
            inputContainerSelector : null,

            activeClass : 'active'
        };


        // --------------------------------------------------


        $public.init = function init() {
            console.log( 'carregou FeaturedLabel.js' );

            $private.checkFeaturedLabelIsReady();
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
            console.log( '%cFEATURED LABEL (HELP)', styleH1 );
            console.log( '%cPARÂMETROS OBRIGATÓRIOS:', styleH2 );
            console.log( '%cinputSelector%c (string CSS selector): Input que receberá o efeito.', styleH3, styleP );
            console.log( '%cinputContainerSelector%c (string CSS selector): Container que receberá a classe "active" para aplicar, com CSS, um efeito à label. Deve ser pai de "inputSelector"', styleH3, styleP );
            console.log( '' );
            console.log( '%cOUTROS PARÂMETROS:', styleH2 );
            console.log( '%cactiveClass%c (string): Classe CSS usada para quando o campo estiver ativo, aplicar um efeito à label.', styleH3, styleP );
            console.log( '' );
        };


        // --------------------------------------------------


        $private.get = function get( property ) {
            return $private.defaults[ property ];
        };


        // --------------------------------------------------


        $private.checkFeaturedLabelIsReady = function checkFeaturedLabelIsReady() {
            if( ! $private.isFeaturedLabelReady() ) {
                console.error( 'Antes de iniciar o FeaturedLabel, é necessário definir os parâmetros obrigatórios. Para saber quais são, execute Module.FeaturedLabel().help() no console.' );
                return false;
            }

            return $private.initFeaturedLabel();
        };


        // --------------------------------------------------


        $private.isFeaturedLabelReady = function isFeaturedLabelReady() {
            return (
                // Verifica se parâmetros obrigatórios foram setados
                $private.get( 'inputSelector' ) &&
                $private.get( 'inputContainerSelector' )
            );
        };


        // --------------------------------------------------


        $private.initFeaturedLabel = function initFeaturedLabel() {
            console.log( 'initFeaturedLabel iniciado!' );
            $private.initEvents();
        };


        // --------------------------------------------------


        $private.initEvents = function initEvents() {
            $( $private.get( 'inputSelector' ) ).on( 'input.featuredlabel focus.featuredlabel blur.featuredlabel', $private.inputTextEffect );
        };


        // --------------------------------------------------


        $private.inputTextEffect = function inputTextEffect( e ) {
            var $containerInputText = $( this ).closest( $private.get( 'inputContainerSelector' ) );
            var activeClass = $private.get( 'activeClass' );

            if( ! this.value ) {
                return $containerInputText.removeClass( activeClass );
            }

            return $containerInputText.addClass( activeClass );
        };


        // --------------------------------------------------


        return $public;

    }; // FeaturedLabel


    return FeaturedLabel;

});