/*
    DICICO - Viewer
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $viewer     = null;
    var $header     = null;
    var $home       = null;
    var $talk       = null;
    var $work       = null;
    var $tips       = null;
    var $assistance = null;
    var $config     = null;
    var $calculator = null;
    var $metrics    = null;
    var $colors     = null;

    var $elements = 
    {
        app     : '#app',
        viewer  : '#viewer',
        header  : '#viewer .header',
        content : '#viewer .content',
        tools   : '#tools'
    };

    var $page = null;
    var $opened = false;
    var $orientation = null;

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Viewer()
    {
        $viewer = $( this );
        init();
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Viewer.prototype.control = function( view ){ control( view ); }

    
    
    
    //=====================
    // METHODS
    //=====================

    function init()
    {
        viewerInit();
        headerInit();
    }

    function control( view )
    {
        headerClose();
        viewerSlide( $orientation );
        setTimeout( load, 500, view );
    }

    function load( view )
    {
        $page = view;

        $.ajax
        (
            {
                headers : { 'X-Content-Only': 'true' },
                type    : 'GET',
                url     : PATH_VIEWS + view + '.html',
                cache   : false
            }
        ).done
        (
            function( content )
            {
                if( $page != 'calculator' && $page != 'metrics' && $page != 'colors' )
                {
                    viewerAppend( content );
                }
                else
                {
                    toolsAppend( content );
                }

                eval( view )();

                $( $viewer ).trigger( 'ON_CHANGED_VIEWER' );
            }
        );
    }

    
    
    
    //=====================
    // VIEWER
    //=====================

    function viewerInit()
    {
        $( $elements.app ).css({ display: 'block' });
    }

    function viewerAppend( content )
    {
        $( $elements.content ).empty().append( content );
    }

    function viewerSlide( orientation )
    {
        $orientation = orientation;

        if( orientation == 'right' )
        {
            if( !$opened ) 
            {
                $opened = true;
                TweenMax.to( $( $elements.viewer ), .4, { css:{ left: '67%' }, ease: Expo.easeOut } );
            }
            else
            {
                $opened = false;
                TweenMax.to( $( $elements.viewer ), .4, { css:{ left: '0%' }, ease: Expo.easeOut } );
            }
        }
        
        if( orientation == 'left' )
        {
            if( !$opened ) 
            {
                $opened = true;
                TweenMax.to( $( $elements.viewer ), .2, { css:{ left: -104 }, ease: Expo.easeOut } );
            }
            else
            {
                $opened = false;
                TweenMax.to( $( $elements.viewer ), .2, { css:{ left: 0 }, ease: Expo.easeOut } );
            }
        }
    }

    
    
    
    //=====================
    // TOOLS
    //=====================

    function toolsAppend( content )
    {
        $( $elements.tools ).empty().append( content );
        TweenMax.to( $( $elements.app ), .6, { css:{ left: '-100%' }, ease: Expo.easeOut } );
    }

    function toolsSlide()
    {
        TweenMax.to( $( $elements.app ), .6, { css:{ left: '0%' }, ease: Expo.easeOut } );
        $( $viewer ).trigger( 'ON_RETURN_VIEWER' );
    }

    
    
    
    //=====================
    // HEADER
    //=====================

    function headerInit()
    {
        $header = new Header();
        $( $header ).bind( 'ON_TAPPED_NAVIGATION', function(){ viewerSlide( 'right' ); } );
        $( $header ).bind( 'ON_TAPPED_APPLIANCE', function(){ viewerSlide( 'left' ); } );
    }

    function headerClose()
    {
        $header.close();
    }

    
    
    
    //=====================
    // VIEWS
    //=====================

    function home()
    {
        console.log( 'home' );

        $home = new Home();
    }

    function talk()
    {
        console.log( 'talk' );

        $talk = new Talk();
    }

    function work()
    {
        console.log( 'work' );
        $work = new Works();
    }

    function tips()
    {
        console.log( 'tips' );

        $tips = new Tips();
    }

    function assistance()
    {
        console.log( 'assistance' );

        $assistance = new Assistance();
    }

    function config()
    {
        console.log( 'config' );
    }

    function calculator()
    {
        console.log( 'calculator' );

        $calculator = new Calculator();
        $( $calculator ).bind( 'ON_CLICKED_BACK', toolsSlide );
    }

    function metrics()
    {
        console.log( 'metrics' );

        $metrics = new Metrics();
        $( $metrics ).bind( 'ON_CLICKED_BACK', toolsSlide );
    }

    function colors()
    {
        console.log( 'colors' );

        $colors = new Colors();
        $( $colors ).bind( 'ON_CLICKED_BACK', toolsSlide );
    }

    window.Viewer = Viewer;

})();