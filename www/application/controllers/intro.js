/*
    DICICO - Intro
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $intro = null;

    var $elements = 
    {
        intro : '#intro',
    };

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Intro()
    {
        $intro = $( this );
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Intro.prototype.hide = function()
    {
        TweenMax.to( $( $elements.intro ), .6, { css:{ top: '-105%' }, ease: Expo.easeInOut, delay: 3 } );
        setTimeout( function(){ $( $elements.intro ).css({ display: 'none' }); }, 3600 );
    }

    window.Intro = Intro;

})();