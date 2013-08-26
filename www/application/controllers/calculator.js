/*
    DICICO - Calculator
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $calculator = null;

    var $elements = 
    {
        parent: '#calculator',
        wrap: '#wrap',
        page: '#calculator .page',
        back: '#calculator .page .back button',
        nav: 
        {
            content: '#calculator .page .content .nav',
            menu: '#calculator .page .content .nav .menu li button'
        },
        subnav: 
        {
            content: '#calculator .page .subnav',
            background: '#calculator .page .subnav .background', 
            menu: '#calculator .page .subnav .menu li button'
        },
        calculator:
        {
            content: '#calculator .calculator',
            close: '#calculator .calculator .close',
            input: '#calculator .calculator .input',
            form: '#calculator .calculator .form',
            row: '#calculator .calculator .form .row',
            output: '#calculator .calculator .output'
        }
    };

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Calculator()
    {
        $calculator = $( this );
        calculatorInit();
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Calculator.prototype.public = function(){}

    
    
    
    //=====================
    // EVENTS
    //=====================

    function onClickedBack()
    {
        $( $calculator ).trigger( 'ON_CLICKED_BACK' );
    }

    
    
    
    //=====================
    // CALCULATOR
    //=====================

    function calculatorInit()
    {
        calculatorSet();
        calculatorBackInit();
        calculatorNavInit();
        calculatorSubnavInit();
    }

    function calculatorSet()
    {
        $( $elements.parent ).css
        ({
            '-webkit-perspective': 1500
        });

        $( $elements.wrap ).css
        ({
            '-webkit-transform-style': 'preserve-3d',
            '-webkit-transform': 'rotateY(0deg)'
        });

        $( $elements.calculator.content ).css
        ({
            '-webkit-transform': 'rotateY(180deg) translateZ(1px)',
            '-webkit-backface-visibility': 'hidden'
        });
    }

    function calculatorPage()
    {
        TweenMax.to( $( $elements.wrap ), .6, { css:{ rotationY: 0 }, ease: Expo.easeInOut } );
    }

    function calculatorCalc()
    {
        TweenMax.to( $( $elements.wrap ), .6, { css:{ rotationY: -180 }, ease: Expo.easeInOut } );
    }

    
    
    
    //=====================
    // BACK
    //=====================

    function calculatorBackInit()
    {
        $( $elements.back ).bind( 'click', onClickedBack );
    }

    
    
    
    //=====================
    // NAV
    //=====================

    function calculatorNavInit()
    {
        $( $elements.nav.menu ).each
        (
            function( index )
            {
                $( this ).bind( 'click', function(){ calculatorNavClick( index ); } );
            }
        );
    }

    function calculatorNavClick( index )
    {
        switch( index )
        {
            case 0:
                calculatorNavTiles();
                break;
            case 1:
                calculatorNavTint();
                break;
            case 2:
                calculatorNavAir();
                break;
        }
    }

    function calculatorNavTiles()
    {
        var page = 'tiles';
        var buttons = [ 'Pisos', 'Revestimentos' ];

        calculatorSubnavShow( page, buttons );
    }

    function calculatorNavTint()
    {
        var page = 'tint';
        var buttons = [ 'Teto', 'Parede' ];

        calculatorSubnavShow( page, buttons );
    }

    function calculatorNavAir()
    {
        var page = 'air';
        var texts = [ 'Ar Condicionado', 'Ar Condicionado' ];

        calculatorCalc();
        calculatorCalcInit( texts );
    }

    
    
    
    //=====================
    // SUBNAV
    //=====================

    function calculatorSubnavInit()
    {
        $( $elements.subnav.background ).bind( 'click', calculatorSubnavHide );
    }

    function calculatorSubnavShow( page, buttons )
    {
        $( $elements.subnav.content ).show();

        $( $elements.subnav.menu ).each
        (
            function( index )
            {
                $( this ).find( 'span' ).text( buttons[index] );
                $( this ).unbind( 'click' );
                $( this ).bind( 'click', function(){ calculatorSubnavClick( page, index ); } );
            }
        );
    }

    function calculatorSubnavHide()
    {
        $( $elements.subnav.content ).hide();
    }

    function calculatorSubnavClick( page, index )
    {
        if( page == 'tiles' )
        {
            if( index == 0 )
            {
                var texts = [ 'Pisos e Revestimentos', 'Pisos' ];

                calculatorCalc();
                calculatorCalcInit( texts );
            }
            else
            {
                var texts = [ 'Pisos e Revestimentos', 'Revestimentos' ];

                calculatorCalc();
                calculatorCalcInit( texts );
            }
        }
        else if( page == 'tint' )
        {
            if( index == 0 )
            {
                var texts = [ 'Tinta', 'Teto' ];

                calculatorCalc();
                calculatorCalcInit( texts );
            }
            else
            {
                var texts = [ 'Tinta', 'Parede' ];

                calculatorCalc();
                calculatorCalcInit( texts );
            }
        }
    }

    
    
    
    //=====================
    // CALC
    //=====================

    function calculatorCalcInit( texts )
    {
        calculatorCalcSet( texts );
        calculatorCalcClose();
        calculatorCalcAdd();
    }

    function calculatorCalcSet( texts )
    {
        $( $elements.calculator.input ).find( '.title' ).find( 'p' ).text( texts[0] );
        $( $elements.calculator.input ).find( '.type' ).find( 'p' ).text( texts[1] );
    }

    function calculatorCalcClose()
    {
        $( $elements.calculator.close ).bind
        (
            'click',
            function()
            {
                calculatorPage();

                setTimeout
                (
                    function()
                    {
                        $( $elements.calculator.input ).show();
                        $( $elements.calculator.output ).hide();

                        $( $elements.calculator.form ).empty();
                        $( $elements.calculator.form ).children().remove();
                        $( $elements.calculator.input ).find( '.calculate button' ).css({ opacity: .5 }).unbind( 'click' );
                    }, 700
                );
            } 
        );
    }

    function calculatorCalcAdd()
    {
        $( $elements.calculator.form ).append( '<div class="row"><button class="add" type="button"><img src="application/assets/images/calculator/icon_add.gif" height="35" /></button><div class="column cellpad"><input type="text" maxlength="5" /></div><div class="column"><input type="text" maxlength="5" /></div><div class="clear"></div></div>' );

        $( $elements.calculator.form ).find( '.add' ).css({ display: 'none' });

        $( $elements.calculator.form ).find( '.add' ).bind( 'click', calculatorCalcAdd );
        $( $elements.calculator.form ).find( 'input' ).bind( 'keyup', calculatorCalcValidate );
        $( $elements.calculator.form ).find( 'input' ).bind( 'focusin', calculatorCalcValidate );
        $( $elements.calculator.form ).find( 'input' ).bind( 'focusout', calculatorCalcValidate );
    }

    function calculatorCalcValidate( event )
    {
        var value = $( event.currentTarget ).val();
        var index = ( $( $elements.calculator.form ).find( '.add' ).length - 1 );

        $( event.currentTarget ).val( value.replace( /[^,\d+]/, "" ) );

        $( $elements.calculator.row ).each
        (
            function(i)
            {
                if( i == 0 )
                {
                    if( $( this ).find( 'input' ).eq(0).val().length > 0 && $( this ).find( 'input' ).eq(1).val().length > 0 )
                    {
                        $( $elements.calculator.input ).find( '.calculate button' ).css({ opacity: 1 }).bind( 'click', function(){ calculatorCalcResult(); } );
                    }
                    else
                    {
                        $( $elements.calculator.input ).find( '.calculate button' ).css({ opacity: .5 }).unbind( 'click' );
                    }
                }

                if( i == index )
                {
                    if( $( this ).find( 'input' ).eq(0).val().length > 0 && $( this ).find( 'input' ).eq(1).val().length > 0 )
                    {
                        $( this ).find( '.add' ).css({ display: 'block' });
                    }
                }
            }
        );
    }

    function calculatorCalcResult()
    {
        var title = $( $elements.calculator.input ).find( '.type' ).find( 'p' ).text();

        $( $elements.calculator.output ).find( '.title p' ).text( title );

        $( $elements.calculator.output ).find( '.result' ).empty();

        $( $elements.calculator.row ).each
        (
            function( index )
            {
                var value1 = $( this ).find( 'input' ).eq(0).val().replace( ',', '.' );
                var value2 = $( this ).find( 'input' ).eq(1).val().replace( ',', '.' );
                var total = String( value1 * value2 ).replace( '.', ',' );

                $( $elements.calculator.output ).find( '.result' ).append( '<p class="label">'+ title + ' ' + ( index + 1 ) +':</p><p class="value">'+ total +'m</p>' );
            }
        );

        $( $elements.calculator.output ).find( '.tip' ).unbind( 'click' );
        $( $elements.calculator.output ).find( '.tip' ).bind
        (
            'click',
            function()
            {
                TweenMax.to( $( $elements.calculator.output ).find( '.panel' ), .25, { css:{ bottom: 0 }, ease: Circ.easeOut } );
            }
        );
        $( $elements.calculator.output ).find( '.asterisc' ).bind
        (
            'click',
            function()
            {
                TweenMax.to( $( $elements.calculator.output ).find( '.panel' ), .35, { css:{ bottom: -280 }, ease: Circ.easeOut } );
            }
        );

        $( $elements.calculator.input ).hide();
        $( $elements.calculator.output ).show();
    }

    window.Calculator = Calculator;

})();