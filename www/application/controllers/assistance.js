/*
    DICICO - Assistance
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $assistance = null;

    var $elements = 
    {
        nav : '#assistance .nav',
        slider : '#assistance .nav #slider',
        letters : '#assistance .nav #letters',
        list : '#assistance .list',
        places : '#divList'
    };

    var $letter = 'a';
    var $total = 0;
    var $touchLast = 0;
    var $touchCurrent = 0;
    var $current = 0;

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Assistance()
    {
        $assistance = $( this );
        init();
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Assistance.prototype.public = function(){}

    
    
    
    //=====================
    // ASSISTANCE
    //=====================

    function init()
    {
        $.ajax({
            dataType: "json",
            // url: 'http://www.appdicico.com.br/site/assistencia',
            url: 'application/assets/json/assistencia.json',
            success: function(data){
                $.each(data, function(index, value){
                    var div = '';
                        div += '<div data-letter="'+value.letra+'" class="place">';
                        div += '<div class="logo">'+ ((value.galeria != "") ? '<img src="http://www.appdicico.com.br/'+value.galeria+'" />' : '') +'</div>';
                        div += '<div class="info"><p>'+value.fornecedor+'</p></div>';
                        div += '</div>';

                    $($elements.places).append(div);
                });

                navFilter();
            }
        });

        navInit();
    }

    
    
    
    //=====================
    // NAV
    //=====================

    function navInit()
    {
        document.getElementById( 'slider' ).addEventListener( "touchstart", navStart, true );
        document.getElementById( 'slider' ).addEventListener( "touchmove", navMove, true );
        document.getElementById( 'slider' ).addEventListener( "touchend", navEnd, true );

        $( $elements.letters ).css({ marginLeft: ( ( $( $elements.nav ).width() - $( $elements.letters ).children().eq(0).width() ) / 2 ) });

        $total = $( $elements.letters ).children().length;

        $( $elements.letters ).children().each
        (
            function( index )
            {
                $( this ).css({ left: ( ( $( this ).width() + 22 ) * index ) });

                TweenMax.to( $( this ), 0, { scale: ( 1 - ( '.' + index ) ) } );
            }
        );

        navFilter();
    }

    function navStart( event )
    {
        event.preventDefault();

        $touchLast = event.touches[0].pageX || event.touches[0].clientX;
    }

    function navMove( event )
    {
        event.preventDefault();

        $touchCurrent = event.touches[0].pageX || event.touches[0].clientX;
    }

    function navEnd( event )
    {
        event.preventDefault();

        var step = ( $( $elements.letters ).children().eq(0).width() + 22 );
        var slided = 0;
        var orientation = ( $touchCurrent > $touchLast ) ? 1: -1;

        if( $touchCurrent > $touchLast )
        {
            slided = ( ( $touchCurrent - $touchLast ) > ( $( window ).width() - 100 ) ) ? 4 : 1;
        }
        else
        {
            slided = ( ( $touchLast - $touchCurrent ) > ( $( window ).width() - 100 ) ) ? 4 : 1;
        }

        $current -= ( slided * orientation );

        if( $current < 0 ) $current = 0;
        else if( $current > ( $total - 1 ) ) $current = $total - 1;

        var timing = ( slided < 0 ) ? '.'+( ( slided + 1 ) * -1 ): '.'+( slided + 1 ); 

        TweenMax.to( $( $elements.letters ), timing, { css:{ left: -( step * $current ) }, ease: Circ.easeOut } );

        $( $elements.letters ).children().each
        (
            function( index )
            {
                if( index == $current )
                {
                    $letter = $( this ).children().text();
                    TweenMax.to( $( this ), timing, { scale: 1, ease: Circ.easeOut } );
                }
                else if( index < $current )
                {
                    var scale = ( .9 / ( $current - index ) );
                    TweenMax.to( $( this ), timing, { scale: ( scale < .3 ) ? .3 : scale, ease: Circ.easeOut } );
                }
                else if( index > $current )
                {
                    var scale = ( .9 / ( index - $current ) );
                    TweenMax.to( $( this ), timing, { scale: ( scale < .3 ) ? .3 : scale, ease: Circ.easeOut } );
                }
            }
        );

        navFilter();
    }

    function navFilter()
    {
        $( $elements.list ).find( '.place' ).each(function() {

            // alert($(this).data('letter').toUpperCase());
            // alert($letter.toUpperCase());

            if($(this).data('letter').toUpperCase() == $letter.toUpperCase())
                {
                    $( this ).show();
                }
                else
                {
                    $( this ).hide();
                }
            }
        );
    }

    window.Assistance = Assistance;

})();