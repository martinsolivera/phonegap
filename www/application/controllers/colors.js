/*
    DICICO - Colors
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $colors = null;
    var $page = null;
    var $opened = false;

    var $elements = 
    {
        parent: '#colors',
        wrap: '#wrap',
        page: '#colors .page',
        back: '#colors .back button',
        nav: 
        {
            content: '#colors .page .content .nav',
            menu_bt1: '#colors .page .content .nav .menu .btMenu1',
            menu_bt2: '#colors .page .content .nav .menu .btMenu2'
        },
        subnav: 
        {
            content: '#colors .page .subnav',
            background: '#colors .page .subnav .background', 
            menu: '#colors .page .subnav .content',
            buttons: '#colors .page .subnav .content .nav .menu .btRooms',
            images: '#colors .page .subnav .contentImages',
            back: '#colors .page .subnav .contentImages .top .button',
            slider: '#colors .page .subnav .contentImages .swiper',
            checked: '#colors .page .subnav .contentImages .images .button',

            myRooms: '#colors .page .subnav .contentMyRooms',
            buttonsMyRooms: '#colors .page .subnav .contentMyRooms .buttomMyRooms',

            imagesMyRooms: '#colors .page .subnav .contentImagesMyRooms',            
            backImagesMyRooms: '#colors .page .subnav .contentImagesMyRooms .top .button',
            buttonsImagesMyRooms: '#colors .page .subnav .contentImagesMyRooms .buttomMyRoomsSaved'
        },
        tool:
        {
            content: '#colors .tool',
            close: '#colors .tool .close',
            plus: '#colors .tool .actions .plus',
            reset: '#colors .tool .actions .reset',
            color: '#colors .tool .actions .colors',
            save: '#colors .tool .actions .save',

            colorbox: '#colors .tool .colorbox',
            colorBack: '#colors .tool .colorbox .background',
            colorPaleta: '#colors .tool .colorbox .nav .menu .paleta',
            colorImage: '#colors .tool .colorbox .nav .menu .image',


            paletaColorBox: '#colors .tool .paletaColorBox',
            paletaColorBack: '#colors .tool .paletaColorBox .top .button',
            popColor: '#colors .tool .paletaColorBox .popColor',
            contentColor: '#colors .tool .paletaColorBox .colors',
            colorList: '#colors .tool .paletaColorBox .colors .list',
            colorListButton: '#colors .tool .paletaColorBox .colors .list .color',

            imageColorBox: '#colors .tool .imageColorBox',
            imageColorBack: '#colors .tool .imageColorBox .top .button',

            saveColorRoom: '#colors .tool .savebox',
            saveColorRoomBack: '#colors .tool .savebox .background',
            
        },
        myRoomsGalery:
        {
            content: '#colors .myRoomsGalery',
            close: '#colors .myRoomsGalery .buttons .close',
            info: '#colors .myRoomsGalery .buttons .info',
            contentInfo: '#colors .myRoomsGalery .infos',
            contentInfoColorButton: '#colors .myRoomsGalery .infos .colors .list .boxColor',
            contentInfoPop: '#colors .myRoomsGalery .infos .popColor'
        }
    };


    // PALETA COLOR
    var _currentArrayColor;
       

    var _currentColor = new Array();
    var _color;
    var _name;
    var _code;

    var _openedInfo;

    var AGENTDEVICEIPAD = false;
    
    if( ( navigator.userAgent.match( /iPad/i ) ) )
    {
        AGENTDEVICEIPAD = true;
    }

    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Colors()
    {
        $colors = $( this );
        colorsInit();
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Colors.prototype.public = function(){}

    
    
    
    //=====================
    // EVENTS
    //=====================

    function onClickedBack()
    {
        $( $colors ).trigger( 'ON_CLICKED_BACK' );
    }

    
    
    
    //=====================
    // METRICS
    //=====================

    function colorsInit()
    {
        colorsSet();
        colorsBackInit();
        colorsNavInit();
        colorsSubnavInit();

        initColor();
    }

    function colorsSet()
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

        $( $elements.tool.content ).css
        ({
            '-webkit-transform': 'rotateY(180deg) translateZ(1px)',
            '-webkit-backface-visibility': 'hidden'
        });

        $( $elements.myRoomsGalery.content ).css
        ({
            '-webkit-transform': 'rotateY(180deg) translateZ(1px)',
            '-webkit-backface-visibility': 'hidden'
        });

        $( $elements.tool.reset ).css({ display: 'none' });
        $( $elements.tool.color ).css({ display: 'none' });
        $( $elements.tool.save ).css({ display: 'none' });
    }

    function colorsPage()
    {
        TweenMax.to( $( $elements.wrap ), .6, { css:{ rotationY: 0 }, ease: Expo.easeInOut } );
    }

    function colorsTool()
    {
        TweenMax.to( $( $elements.wrap ), .6, { css:{ rotationY: -180 }, ease: Expo.easeInOut } );
    }

    
    
    
    //=====================
    // BACK
    //=====================

    function colorsBackInit()
    {
        $( $elements.back ).bind( 'click', onClickedBack );
    }

    
    
    
    //=====================
    // NAV
    //=====================

    function colorsNavInit()
    {
        $( $elements.nav.menu_bt1 ).bind( 'click', function(){ colorsNavClick( 0 ); } );
        $( $elements.nav.menu_bt2 ).bind( 'click', function(){ colorsNavClick( 1 ); } );
    }

    function colorsNavClick( index )
    {
        $page = ( index == 0 ) ? 'view' : 'enviroment';

        if ( index == 0 ) 
        {
            colorsSubnavShow();             
        }
        else
        {
            colorsSubnavMyRoomsShow();            
        };

    }

    
    
    
    //=====================
    // SUBNAV
    //=====================

    function colorsSubnavInit()
    {
        $( $elements.subnav.background ).bind( 'click', colorsSubnavHide );
    }

    function colorsSubnavShow()
    {
        $( $elements.subnav.content ).show();

        $( $elements.subnav.menu ).css( { 'display': 'block', left: '0%' } );
        $( $elements.subnav.images ).css({ left: '100%' });
        $( $elements.subnav.myRooms ).css( { 'display': 'none', left: '0%' } );
        $( $elements.subnav.imagesMyRooms ).css({ left: '100%' });

        $( $elements.subnav.buttons ).bind( 'click', colorSubnavImages );
    }

    function colorsSubnavMyRoomsShow()
    {
        $( $elements.subnav.content ).show();
        
        $( $elements.subnav.menu ).css( { 'display': 'none', left: '0%' } );
        $( $elements.subnav.images ).css({ left: '100%' });
        $( $elements.subnav.myRooms ).css( { 'display': 'block', left: '0%' } );
        $( $elements.subnav.imagesMyRooms ).css({ left: '100%' });

        $( $elements.subnav.buttonsMyRooms ).bind( 'click', colorSubnavImagesMyRooms );
        
    }

    function colorsSubnavHide()
    {
        $( $elements.subnav.back ).unbind( 'click' );
            
        $( $elements.subnav.images ).find( '.pagination' ).empty();
        $( $elements.subnav.slider ).empty();

        $( $elements.subnav.menu ).css( { 'display': 'none' } );
        $( $elements.subnav.myRooms ).css( { 'display': 'none' } );
        

        $( $elements.subnav.content ).hide();   
    }



    function colorSubnavMenu()
    {
       $( $elements.subnav.back ).unbind( 'click' );

        TweenMax.to( $( $elements.subnav.menu ), .4, { left: '0%', ease: Circ.easeOut } );
        TweenMax.to( $( $elements.subnav.images ), .4, { left: '100%', ease: Circ.easeOut } );

        $( $elements.subnav.images ).find( '.pagination' ).empty();
        $( $elements.subnav.slider ).empty();
        
    }

    function colorSubnavMyRooms()
    {
       $( $elements.subnav.backImagesMyRooms ).unbind( 'click' );
        
        TweenMax.to( $( $elements.subnav.myRooms ), .4, { left: '0%', ease: Circ.easeOut } );
        TweenMax.to( $( $elements.subnav.imagesMyRooms ), .4, { left: '100%', ease: Circ.easeOut } );
    }

    function colorSubnavImages()
    {
        $( $elements.subnav.back ).bind( 'click', colorSubnavMenu ).css({ cursor: 'pointer' });

        TweenMax.to( $( $elements.subnav.menu ), .4, { left: '-100%', ease: Circ.easeOut } );
        TweenMax.to( $( $elements.subnav.images ), .4, { left: '0%', ease: Circ.easeOut } );

        colorSubnavImagesSlider();
    }

    function colorSubnavImagesMyRooms()
    { 
        $( $elements.subnav.backImagesMyRooms ).bind( 'click', colorSubnavMyRooms ).css({ cursor: 'pointer' });

        TweenMax.to( $( $elements.subnav.myRooms ), .4, { left: '-100%', ease: Circ.easeOut } );
        TweenMax.to( $( $elements.subnav.imagesMyRooms ), .4, { left: '0%', ease: Circ.easeOut } );

         $( $elements.subnav.buttonsImagesMyRooms ).bind( 'click', imagesMyRoomsView );
    }

    function colorSubnavImagesSlider()
    {
        $( $elements.subnav.images ).find( '.pagination' ).empty();
        $( $elements.subnav.slider ).empty();

        $( $elements.subnav.checked ).css({ display: 'none' });
        $( $elements.subnav.slider ).append( '<div class="swiper-container"><div class="swiper-wrapper"></div></div>' );

        for( var i = 0; i < 3; i++ )
        {
            var image = 'application/assets/images/colors/Cozinha_2.jpg'; // Substituir

            if( AGENTDEVICEIPAD )
            {
                var slide = '<div class="swiper-slide"><img src="'+ image +'" height="590" /></div>';  
            }
            else
            {
                var slide = '<div class="swiper-slide"><img src="'+ image +'" height="367" /></div>';
            }
           

            $( $elements.subnav.slider ).find( '.swiper-wrapper' ).append( slide );
        }

        var mySwiper = new Swiper
        (
            '.swiper-container',
            {
                mode:'horizontal',
                pagination: '.pagination',
                loop: false,
                onSlideClick: function( mySwiper ){ 
                    if( $page == 'view' )
                    {
                        colorsSubnavClick( mySwiper.activeIndex, mySwiper.activeSlide() );
                    } 
                }
            }
        );
    }

    function colorsSubnavClick( index, slide )
    {
        $( $elements.subnav.checked ).css({ display: 'block', opacity: 0 });
        TweenMax.to( $( $elements.subnav.checked ), .3, { opacity: 1, ease: Circ.easeOut } );

        setTimeout( function(){ colorsToolView( index, slide ); }, 1000 );
    }

    
    
    
    //=====================
    // TOOL
    //=====================

    function colorsToolView( index, slide )
    {
        // Flip
        colorsTool();

        $( $elements.tool.content ).css({ 'display': 'block' });
        $( $elements.myRoomsGalery.content ).css({ 'display': 'none' });

        $( $elements.subnav.back ).unbind( 'click' );

        $( $elements.subnav.menu ).css({ left: '0%' });
        $( $elements.subnav.images ).css({ left: '100%' });

        $( $elements.subnav.images ).find( '.pagination' ).empty();
        $( $elements.subnav.slider ).empty();

        $( $elements.tool.close ).bind( 'click', colorsToolClose ).css({ cursor: 'pointer' });
        $( $elements.tool.plus ).bind( 'click', colorsToolPlus ).css({ cursor: 'pointer' });
    }

    function imagesMyRoomsView()
    {
        // Flip
        colorsTool();

        
        $( $elements.subnav.menu ).css({ left: '0%' });
        $( $elements.subnav.images ).css({ left: '100%' });
       
        $( $elements.tool.content ).css({ 'display': 'none' });
        $( $elements.myRoomsGalery.content ).css({ 'display': 'block' });
        
        $( $elements.myRoomsGalery.close ).bind( 'click', imageRoomsClose ).css({ cursor: 'pointer' });
        $( $elements.myRoomsGalery.info ).bind( 'click', imageRoomsInfo ).css({ cursor: 'pointer' });

        $( $elements.myRoomsGalery.contentInfoColorButton ).bind( 'click', function(){ showPopColorInfo( $( this ) ); } );

        
    }


    function colorsToolClose()
    {
        // Unflip
        colorsPage();

        $opened = false;

        $( $elements.tool.close ).unbind( 'click' );
        $( $elements.tool.plus ).unbind( 'click' );

        $( $elements.tool.reset ).unbind( 'click' ).css({ display: 'none' });
        $( $elements.tool.color ).unbind( 'click' ).css({ display: 'none' });
        $( $elements.tool.save ).unbind( 'click' ).css({ display: 'none' });
    }

    function imageRoomsClose()
    {
        // Unflip
        colorsPage(); 

        _openedInfo = false;
        
        $( $elements.myRoomsGalery.contentInfoPop ).css( { 'display': 'none' } );

        $( $elements.myRoomsGalery.close ).unbind( 'click' );        
    }

    function imageRoomsInfo()
    {
        if( !_openedInfo )
        {
            $( $elements.myRoomsGalery.info ).find( '.on' ).css({ 'display': 'none' });
            $( $elements.myRoomsGalery.info ).find( '.out' ).css({ 'display': 'block' });

            TweenMax.to( $( $elements.myRoomsGalery.contentInfo ), 0.5, { 'bottom': '0', ease: Circ.easeOut } );
            TweenMax.to( $( $elements.myRoomsGalery.info ), 0.5, { 'bottom': '180px', ease: Circ.easeOut } );
            _openedInfo = true;
        }
        else
        {
            $( $elements.myRoomsGalery.info ).find( '.on' ).css({ 'display': 'block' });
            $( $elements.myRoomsGalery.info ).find( '.out' ).css({ 'display': 'none' });

            $( $elements.myRoomsGalery.contentInfoPop ).css( { 'display': 'none' } );

            TweenMax.to( $( $elements.myRoomsGalery.contentInfo ), 0.5, { 'bottom': '-200px', ease: Circ.easeOut } );
            TweenMax.to( $( $elements.myRoomsGalery.info ), 0.5, { 'bottom': '58px', ease: Circ.easeOut } );
            _openedInfo = false;
        }

    }



    function colorsToolPlus()
    {
        if( !$opened )
        {
            $opened = true;
            $( $elements.tool.reset ).bind( 'click', colorsToolReset ).css({ display: 'block', cursor: 'pointer' });
            $( $elements.tool.color ).bind( 'click', colorsToolColor ).css({ display: 'block', cursor: 'pointer' });
            $( $elements.tool.save ).bind( 'click', colorsToolSave ).css({ display: 'block', cursor: 'pointer' });
        }
        else
        {
            $opened = false;
            $( $elements.tool.reset ).unbind( 'click' ).css({ display: 'none' });
            $( $elements.tool.color ).unbind( 'click' ).css({ display: 'none' });
            $( $elements.tool.save ).unbind( 'click' ).css({ display: 'none' });
        }
    }

    function colorsToolReset()
    {
        // Qdo clicar em reset
    }

    function colorsToolColor()
    {
        $( $elements.tool.colorbox ).css( { 'display': 'block' } );
    }

    function colorsToolSave()
    {
        $( $elements.tool.saveColorRoom ).css( { 'display': 'block' } );
    }

    function colorsToolSaved()
    {
        // Qdo clicar em salvar
    }




    //=====================
    // ADD COLORS
    //=====================
    function initColor()
    {
     
        changeColor( COLOR_YELLOW );

        $( $elements.tool.paletaColorBox ).find( '.yellow' ).bind( 'click', function(){ changeColor( COLOR_YELLOW ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.blue' ).bind( 'click', function(){ changeColor( COLOR_BLUE ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.white' ).bind( 'click', function(){ changeColor( COLOR_WHITE ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.orange' ).bind( 'click', function(){ changeColor( COLOR_ORANGE ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.cold' ).bind( 'click', function(){ changeColor( COLOR_COLDS ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.hot' ).bind( 'click', function(){ changeColor( COLOR_HOTS ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.green' ).bind( 'click', function(){ changeColor( COLOR_GREEN ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.red' ).bind( 'click', function(){ changeColor( COLOR_RED ); } ).css({ cursor: 'pointer' });
        $( $elements.tool.paletaColorBox ).find( '.purple' ).bind( 'click', function(){ changeColor( COLOR_PURPLE ); } ).css({ cursor: 'pointer' });

        //BUTTON BACK
        $( $elements.tool.paletaColorBack ).bind( 'click', closePaletaColor );
        $( $elements.tool.imageColorBack ).bind( 'click', closePaletaColor );
        

        // BUTTON COLOR PALETA
        $( $elements.tool.colorPaleta ).bind( 'click', openPaletaColor );
        // BUTTON COLOR IMAGE
        $( $elements.tool.colorImage ).bind( 'click', openImageColor );


        // SAVE BUTTON BACK
        $( $elements.tool.saveColorRoomBack ).bind( 'click', saveButtonBack );
            


        $( $elements.tool.contentColor ).scroll( function()
        {
          $( $elements.tool.popColor ).css( { 'display': 'none' } );
        });

        if( AGENTDEVICEIPAD )
        {
            var mySwiperTagColor = new Swiper
            (
                '.swiper-container',
                {
                    mode:'horizontal',
                    loop: false,
                    freeMode: true,
                    slidesPerView: 4
                }
            );
        }
        else
        {
            var mySwiperTagColor = new Swiper
            (
                '.swiper-container',
                {
                    mode:'horizontal',
                    loop: false,
                    freeMode: true,
                    slidesPerView: 2
                }
            );
        }

        
               
    }

    function changeColor( _array )
    {
        _currentArrayColor = _array;

        $( $elements.tool.popColor ).css( { 'display': 'none' } );

        $( $elements.tool.colorList + ' li' ).remove();

        for( var i = 0; i < _array.length; i++ )
        {
            var button = '<button type="button" id="'+i+'" class="color" style="background: #'+_array[ i ].rgb+'"></button>';            
            $( $elements.tool.colorList ).prepend( '<li>'+button+'</li>' );
        }

        $( $elements.tool.colorListButton ).bind( 'click', function(){ showPopColor( $( this ) ); } );
    }


    function showPopColor( _target )
    {
        $( $elements.tool.popColor ).css( { 'display': 'block' } );

        var _index  = _target.context.id;
        var _off    = $( _target.context ).offset();
        _color  = _currentArrayColor[ _index ].rgb;
        _name   = _currentArrayColor[ _index ].name;
        _code   = _currentArrayColor[ _index ].code;
            
        // CHANGE POPCOLOR
        $( $elements.tool.popColor ).find( '.name' ).remove();
        $( $elements.tool.popColor ).find( '.text' ).append( '<span class="name">'+_name+'<br></span>' );
        $( $elements.tool.popColor ).find( '.code' ).remove();
        $( $elements.tool.popColor ).find( '.text' ).append( '<span class="code">'+_code+'</span>' );
        $( $elements.tool.popColor ).find( '.color' ).css( { 'background': '#'+_color } );


        $( $elements.tool.popColor ).offset( { top: ( _off.top ) - ( $( $elements.tool.popColor ).height()/2 ) , left: ( _off.left ) - ( $( $elements.tool.popColor ).width()/2 - 17  )  } );

    }

    function showPopColorInfo( _target )
    {
        $( $elements.myRoomsGalery.contentInfoPop ).css( { 'display': 'block' } );

        var _off           = $( _target.context ).offset();
        var _namePopInfo   = 'Tranquil Aqua';
        var _codePopInfo   = 'SW7611';
            
        // CHANGE POPCOLOR
        $( $elements.myRoomsGalery.contentInfoPop ).find( '.name' ).remove();
        $( $elements.myRoomsGalery.contentInfoPop ).find( '.text' ).append( '<span class="name">'+_namePopInfo+'<br></span>' );
        $( $elements.myRoomsGalery.contentInfoPop ).find( '.code' ).remove();
        $( $elements.myRoomsGalery.contentInfoPop ).find( '.text' ).append( '<span class="code">'+_codePopInfo+'</span>' );
        

        $( $elements.myRoomsGalery.contentInfoPop ).offset( { top: ( _off.top ) - ( $( $elements.tool.popColor ).height()/2 ) - 10 , left: ( _off.left ) - ( $( $elements.tool.popColor ).width()/2 + 23  )  } );

    }


    function closePaletaColor()
    {
        // CHANGE POINTER
        $( $elements.tool.color ).find( '.pointColor' ).css( { 'color':'#'+_color, 'opacity':'1' } );

        // SAVE COLOR
        _currentColor[ 0 ] = new Object( { 'code': _code, 'rgb': _name, 'name': _color } );

        //RESET CSS
        $( $elements.tool.paletaColorBox ).css( { 'left': '100%' } );
        $( $elements.tool.imageColorBox ).css( { 'left': '100%' } );
        $( $elements.tool.colorbox ).css( { 'display': 'none', 'left': '0' } );
    }



    // NAV COLOR
    function openPaletaColor()
    {        
        TweenMax.to( $( $elements.tool.paletaColorBox ), 0.5, { left: '0', ease: Circ.easeOut } );
        TweenMax.to( $( $elements.tool.colorbox ), 0.5, { left: '-100%', ease: Circ.easeOut } );
    }

    function openImageColor()
    {
        TweenMax.to( $( $elements.tool.imageColorBox ), 0.5, { left: '0', ease: Circ.easeOut } );
        TweenMax.to( $( $elements.tool.colorbox ), 0.5, { left: '-100%', ease: Circ.easeOut } );
    }

    // SAVE BUTTON BACK
    function saveButtonBack()
    {
        $( $elements.tool.saveColorRoom ).css( { 'display': 'none' } );
    }

    window.Colors = Colors;

})();