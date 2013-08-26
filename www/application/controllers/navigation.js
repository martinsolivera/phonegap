/*
    DICICO - Navigation
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $navigation = null;

    var $elements = 
    {
        navigation : '#navigation button',
        appliance  : '#appliance button'
    };

    var $buttons = [];
        $buttons['navigation'] = [];
        $buttons['appliance']  = [];

    var $selected = null;

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Navigation()
    {
        $navigation = $( this );
        init();
    }

    
    
    
    //=====================
    // NAVIGATION
    //=====================

    Navigation.prototype.return = function(){ returned(); }

    
    
    
    //=====================
    // NAVIGATION
    //=====================

    function init()
    {
        navigationInit();
        applianceInit();

        setTimeout( initial, 1000 );
    }

    function initial()
    {
        $( $buttons['navigation'][0] ).click();
    }

    function control( event )
    {
        if( RELEASED && $( event.currentTarget ).attr( 'data-navigation' ) != $selected )
        {
            for( var i = 0; i < $buttons['navigation'].length; i++ )
            {
                if( $( $buttons['navigation'][i] ).context == event.currentTarget )
                {
                    $( $buttons['navigation'][i] ).find( 'img' ).css({ opacity: 1 });
                    $( $buttons['navigation'][i] ).find( 'span' ).css({ opacity: 1 });
                    $( $buttons['navigation'][i] ).css({ background: '#2d3136' });

                    $selected = $( $buttons['navigation'][i] ).attr( 'data-navigation' );
                }
                else
                {
                    $( $buttons['navigation'][i] ).find( 'img' ).css({ opacity: .2 });
                    $( $buttons['navigation'][i] ).find( 'span' ).css({ opacity: .2 });
                    $( $buttons['navigation'][i] ).css({ background: 'transparent' });
                }
            }

            for( var j = 0; j < $buttons['appliance'].length; j++ )
            {
                if( $( $buttons['appliance'][j] ).context == event.currentTarget )
                {
                    $( $buttons['appliance'][j] ).find( 'img' ).css({ opacity: .2 });

                    $selected = $( $buttons['appliance'][j] ).attr( 'data-navigation' );
                }
                else
                {
                    $( $buttons['appliance'][j] ).find( 'img' ).css({ opacity: 1 });
                }
            }

            $( $navigation ).trigger({ type: 'ON_TAPPED_NAVIGATION', view: $selected });
        }
    }

    function returned()
    {
        $selected = null;
        
        for( var j = 0; j < $buttons['appliance'].length; j++ )
        {
            $( $buttons['appliance'][j] ).find( 'img' ).css({ opacity: 1 });
        }
    }

    
    
    
    //=====================
    // NAVIGATION
    //=====================

    function navigationInit()
    {
        $( $elements.navigation ).each
        (
            function()
            {
                var button = $( this );
                var image  = $( this ).find( 'img' );
                var span   = $( this ).find( 'span' );

                span.css
                ({
                    position: 'absolute',
                    top: '50%',
                    left: ( image.position().left + image.width() ),
                    marginTop: -( span.height() / 2 )
                });

                $( this ).bind( 'click', control );

                $buttons['navigation'].push( $( this ) );
            }
        );
    }

    
    
    
    //=====================
    // APPLIANCE
    //=====================

    function applianceInit()
    {
        $( $elements.appliance ).each
        (
            function()
            {
                var button = $( this );
                var span   = $( this ).find( 'span' );

                span.css
                ({
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    fontSize: ( ( span.height() * 40 ) / button.height() ),
                    marginTop: -( span.height() / 2 )
                });

                $( this ).bind( 'click', control );

                $buttons['appliance'].push( $( this ) );
            }
        );
    }

    window.Navigation = Navigation;

})();