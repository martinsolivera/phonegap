/*
    DICICO - Metrics
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $metrics = null;
    var $opened = false;

    var $elements = 
    {
        parent: '#metrics',
        wrap: '#wrap',
        page: '#metrics .page',
        back: '#metrics .back button',
        nav: 
        {
            content: '#metrics .page .content .nav',
            menu: '#metrics .page .content .nav .menu li button'
        },
        subnav: 
        {
            content: '#metrics .page .subnav',
            background: '#metrics .page .subnav .background', 
            menu: '#metrics .page .subnav .menu li button',
            image: '#metrics .image img'
        },
        tool:
        {
            content: '#metrics .tool',
            close: '#metrics .tool .close',
            plus: '#metrics .tool .actions .plus',
            rule: '#metrics .tool .actions .rules',
            text: '#metrics .tool .actions .text',
            save: '#metrics .tool .actions .save'
        },
        save:
        {
            box: '#metrics .tool .savebox',
            background: '#metrics .tool .savebox .background',
            button: '#metrics .tool .savebox .nav .menu button'
        }
    };

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Metrics()
    {
        $metrics = $( this );
        metricsInit();
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Metrics.prototype.public = function(){}

    
    
    
    //=====================
    // EVENTS
    //=====================

    function onClickedBack()
    {
        $( $metrics ).trigger( 'ON_CLICKED_BACK' );
    }

    
    
    
    //=====================
    // METRICS
    //=====================

    function metricsInit()
    {
        metricsSet();
        metricsBackInit();
        metricsNavInit();
        metricsSubnavInit();
    }

    function metricsSet()
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

        $( $elements.tool.text ).css({ display: 'none' });
        $( $elements.tool.rule ).css({ display: 'none' });
        $( $elements.tool.save ).css({ display: 'none' });
    }

    function metricsPage()
    {
        TweenMax.to( $( $elements.wrap ), .6, { css:{ rotationY: 0 }, ease: Expo.easeInOut } );
    }

    function metricsTool()
    {
        TweenMax.to( $( $elements.wrap ), .6, { css:{ rotationY: -180 }, ease: Expo.easeInOut } );
    }

    
    
    
    //=====================
    // BACK
    //=====================

    function metricsBackInit()
    {
        $( $elements.back ).bind( 'click', onClickedBack );
    }

    
    
    
    //=====================
    // NAV
    //=====================

    function metricsNavInit()
    {
        $( $elements.nav.menu ).each
        (
            function()
            {
                $( this ).bind( 'click', function(){ metricsNavClick(); } );
            }
        );
    }

    function metricsNavClick()
    {
        metricsNavImage();
    }

    function metricsNavImage()
    {
        var page = 'image';
        var buttons = [ 'Galeria de Imagens', 'Câmera' ];

        metricsSubnavShow( page, buttons );
    }

    
    
    
    //=====================
    // SUBNAV
    //=====================

    function metricsSubnavInit()
    {
        $( $elements.subnav.background ).bind( 'click', metricsSubnavHide );
    }

    function metricsSubnavShow( page, buttons )
    {
        $( $elements.subnav.content ).show();

        $( $elements.subnav.menu ).each
        (
            function( index )
            {
                $( this ).find( 'span' ).text( buttons[index] );
                $( this ).unbind( 'click' );
                $( this ).bind( 'click', function(){ metricsSubnavClick( page, index ); } );
            }
        );
    }

    function metricsSubnavHide()
    {
        $( $elements.subnav.content ).hide();
    }

    function metricsSubnavClick( page, index )
    {
        if( page == 'image' )
        {
            if( index == 0 )
            {
                metricsAppPhotos();
            }
            else
            {
                metricsAppCam();
            }
        }
    }

    
    
    
    //=====================
    // APP PHOTOS
    //=====================

    function metricsAppPhotos()
    {
        // Aqui chama a galeria do iphone


        // Ao final do código chama a ferramenta
        //metricsToolInit();
 
        navigator.camera.getPicture(onSelectPhoto, onFail, { quality: 80,
                             allowEdit: true, destinationType: destinationType.FILE_URI,
                             sourceType: pictureSource.PHOTOLIBRARY });
 
 
    }

    
    
    
    //=====================
    // APP PHOTOS
    //=====================

    function metricsAppCam()
    {
        // Aqui chama a camera do iphone

        navigator.camera.getPicture(onCapturePhoto, onFail, { quality: 80, allowEdit: true,
                             destinationType: destinationType.DATA_URL });

 

        // Ao final do código chama a ferramenta
       // metricsToolInit();
    }

    
    
 
    function onCapturePhoto(imageData){
     //   $($elements.subnav.image).attr('src',"data:image/jpeg;base64," + imageData);
 
        var smallImage = document.getElementById('im');
        smallImage.src = "data:image/jpeg;base64," + imageData;
 
 
     //   var drawingContext = document.getElementById("drawingCanvas").getContext('2d');
 
 
        setTimeout(function(){
                   drawingContext.save();
                  drawingContext.drawImage(document.getElementById("im"),0,0);
                   
            metricsToolInit();
            },500)
    }
 
    function onSelectPhoto(imageData) {
 
        //$($elements.subnav.image).attr('src',imageData);
       // document.getElementById("im")
 
        var smallImage = document.getElementById('im');
        smallImage.src = imageData;
 alert(drawingCanvas.width);
 //
    //    var drawingContext = document.getElementById("drawingCanvas").getContext('2d');
 
        setTimeout(function(){
                   drawingContext.save();
                   drawingContext.drawImage(document.getElementById("im"),0,0);
                   
            metricsToolInit();
            },500)
    }
 
    function onFail(message) {
 
 
    }
 
 
 
    //=====================
    // TOOL
    //=====================

    function metricsToolInit()
    {
        // Flip
        metricsTool();

        $( $elements.tool.close ).bind( 'click', metricsToolClose ).css({ cursor: 'pointer' });
        $( $elements.tool.plus ).bind( 'click', metricsToolPlus ).css({ cursor: 'pointer' });
 

 
    }

    function metricsToolClose()
    {
        // Unflip
        metricsPage();

        $opened = false;

        $( $elements.tool.close ).unbind( 'click' );
        $( $elements.tool.plus ).unbind( 'click' );

        $( $elements.tool.text ).unbind( 'click' ).css({ display: 'none' });
        $( $elements.tool.rule ).unbind( 'click' ).css({ display: 'none' });
        $( $elements.tool.save ).unbind( 'click' ).css({ display: 'none' });
    }

    function metricsToolPlus()
    {
        if( !$opened )
        {
            $opened = true;
            $( $elements.tool.text ).bind( 'click', metricsToolText ).css({ display: 'block', cursor: 'pointer' });
            $( $elements.tool.rule ).bind( 'click', metricsToolRules ).css({ display: 'block', cursor: 'pointer' });
            $( $elements.tool.save ).bind( 'click', metricsToolSave ).css({ display: 'block', cursor: 'pointer' });
        }
        else
        {
            $opened = false;
            $( $elements.tool.text ).unbind( 'click' ).css({ display: 'none' });
            $( $elements.tool.rule ).unbind( 'click' ).css({ display: 'none' });
            $( $elements.tool.save ).unbind( 'click' ).css({ display: 'none' });
        }
    }

    function metricsToolText()
    {
        // Qdo clicar em texto
        selectedFunction  = 'text';
    }

    function metricsToolRules()
    {
        // Qdo clicar em régua
        selectedFunction='line';
    }

    function metricsToolSave()
    {
        $( $elements.save.box ).css({ display: 'block' });
        $( $elements.save.background ).bind( 'click', function(){ $( $elements.save.box ).css({ display: 'none' }); } );
        $( $elements.save.button ).bind( 'click', metricsToolSaved );
    }

    function metricsToolSaved()
    {
        // Qdo clicar em salvar
    }

    window.Metrics = Metrics;

})();