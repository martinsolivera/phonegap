/*
    DICICO - Header
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $header = null;

    var $elements = 
    {
        header     : '#viewer .header',
        buttons    : '#viewer .header .buttons',
        navigation : '#viewer .header .navigation',
        appliance  : '#viewer .header .appliance',
    };

    var $side = null;
    var $opened = false;

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Header()
    {
        $header = $( this );
        init();
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Header.prototype.close = function( view ){ close(); }

    
    
    
    //=====================
    // HEADER
    //=====================

    function init()
    {
        setTimeout( listeners, 1000 );
    }

    function listeners()
    {
        $( $elements.navigation ).bind( 'click', navigation );
        $( $elements.appliance ).bind( 'click', appliance );
    }

    function close()
    {
        if( $side == 'navigation' )
        {
            $opened = false;
            $( $elements.navigation ).find( '.on' ).css({ opacity: 1 });
            $( $elements.navigation ).find( '.off' ).css({ opacity: 0 });
        }
        else if( $side == 'appliance' )
        {
            $opened = false;
            $( $elements.appliance ).find( '.on' ).css({ opacity: 1 });
            $( $elements.appliance ).find( '.off' ).css({ opacity: 0 });
        }
    }

    function navigation()
    {
        $side = 'navigation';

        if( !$opened )
        {
            $opened = true;
            $( $elements.navigation ).find( '.on' ).css({ opacity: 0 });
            $( $elements.navigation ).find( '.off' ).css({ opacity: 1 });
        }
        else
        {
            $opened = false;
            $( $elements.navigation ).find( '.on' ).css({ opacity: 1 });
            $( $elements.navigation ).find( '.off' ).css({ opacity: 0 });
        }

    	$( $header ).trigger( 'ON_TAPPED_NAVIGATION' );
    }

    function appliance()
    {
        $side = 'appliance';

        if( !$opened )
        {
            $opened = true;
            $( $elements.appliance ).find( '.on' ).css({ opacity: 0 });
            $( $elements.appliance ).find( '.off' ).css({ opacity: 1 });
        }
        else
        {
            $opened = false;
            $( $elements.appliance ).find( '.on' ).css({ opacity: 1 });
            $( $elements.appliance ).find( '.off' ).css({ opacity: 0 });
        }

    	$( $header ).trigger( 'ON_TAPPED_APPLIANCE' );
    }

    window.Header = Header;

})();