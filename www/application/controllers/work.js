/*
    DICICO - Sample
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $works = null;

    var $elements = 
    {
        wrap: '#work .page',
        nav: 
        {
            content: '#work .page .wrapper .content',
            buttonNext: '#work .page .wrapper .buttonNext',
            message: '#work .page .message',
            buttonOK: '#work .page .message .text .buttonOk'
        },
        messageText:
        {
            fase1: '#work .page .message #msg_text1',
            fase2: '#work .page .message #msg_text2',
            fase3: '#work .page .message #msg_text3',
            fase4: '#work .page .message #msg_text4',
            fase5: '#work .page .message #msg_text5',
            fase5_a: '#work .page .message #msg_text5 .msg_text_a',
            fase5_b: '#work .page .message #msg_text5 .msg_text_b',
            fase6: '#work .page .message #msg_text6',
            fase6_a: '#work .page .message #msg_text6 .msg_text_a',
            fase6_b: '#work .page .message #msg_text6 .msg_text_b'
        },
        fase1:
        {
            option1: '#work .page .wrapper .content #fase1 #fase1_1',
        }
    };

    var currentFase         = 0;
    var getScreenSizeWidth  = $( window ).width(); 
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Works()
    {
        $works = $( this );
        worksInit();
    }

    
    
    //=====================
    // WORKS
    //=====================

    function worksInit()
    {
         worksSet();
    }


    function worksSet()
    {
        // BUTTON NEXT
        $( $elements.nav.buttonNext ).css({ display: 'block' });
        $( $elements.nav.buttonNext ).bind( 'click', clickNext );

        // BUTTON OK
        $( $elements.nav.buttonOK ).bind( 'click', clickOk );

        // MESSAGE TEXT
        changeMessage();

            
    }


    //=====================
    // BUTTONS
    //=====================
    function clickNext()
    {   
        changeMessage();
        showMessage();         
    }

    function clickOk()
    {
        if ( currentFase < 5 ) 
        {
            currentFase ++;
            hideMessage()

            setTimeout( function()
            {
                motionFase();
            }, 600 );
            
            //changeFase();    
        };
    }



    // CHANGE FASE
    function changeFase()
    {
        switch( currentFase )
        {  
            case 1:

                break;
            case 2:
            
                break;
            case 3:
            
                break;
            case 4:
            
                break;
            case 5:
            
                break;
            case 6:
            
                break;
        }
    }

    // CHANGE TEXT MESSAGE
    function changeMessage()
    {
        switch( currentFase )
        {  
            case 0:
                $( $elements.messageText.fase1 ).css({ display: 'block' });
                $( $elements.messageText.fase2 ).css({ display: 'none' });
                $( $elements.messageText.fase3 ).css({ display: 'none' });
                $( $elements.messageText.fase4 ).css({ display: 'none' });
                $( $elements.messageText.fase5 ).css({ display: 'none' });
                $( $elements.messageText.fase5_a ).css({ display: 'none' });
                $( $elements.messageText.fase5_b ).css({ display: 'none' });
                $( $elements.messageText.fase6 ).css({ display: 'none' });
                $( $elements.messageText.fase6_a ).css({ display: 'none' });
                $( $elements.messageText.fase6_b ).css({ display: 'none' });
                break;
            case 1:
                $( $elements.messageText.fase1 ).css({ display: 'none' });
                $( $elements.messageText.fase2 ).css({ display: 'block' });
                $( $elements.messageText.fase3 ).css({ display: 'none' });
                $( $elements.messageText.fase4 ).css({ display: 'none' });
                $( $elements.messageText.fase5 ).css({ display: 'none' });
                $( $elements.messageText.fase5_a ).css({ display: 'none' });
                $( $elements.messageText.fase5_b ).css({ display: 'none' });
                $( $elements.messageText.fase6 ).css({ display: 'none' });
                $( $elements.messageText.fase6_a ).css({ display: 'none' });
                $( $elements.messageText.fase6_b ).css({ display: 'none' });
                break;
            case 2:
                $( $elements.messageText.fase1 ).css({ display: 'none' });
                $( $elements.messageText.fase2 ).css({ display: 'none' });
                $( $elements.messageText.fase3 ).css({ display: 'block' });
                $( $elements.messageText.fase4 ).css({ display: 'none' });
                $( $elements.messageText.fase5 ).css({ display: 'none' });
                $( $elements.messageText.fase5_a ).css({ display: 'none' });
                $( $elements.messageText.fase5_b ).css({ display: 'none' });
                $( $elements.messageText.fase6 ).css({ display: 'none' });
                $( $elements.messageText.fase6_a ).css({ display: 'none' });
                $( $elements.messageText.fase6_b ).css({ display: 'none' });
                break;
            case 3:
                $( $elements.messageText.fase1 ).css({ display: 'none' });
                $( $elements.messageText.fase2 ).css({ display: 'none' });
                $( $elements.messageText.fase3 ).css({ display: 'none' });
                $( $elements.messageText.fase4 ).css({ display: 'block' });
                $( $elements.messageText.fase5 ).css({ display: 'none' });
                $( $elements.messageText.fase5_a ).css({ display: 'none' });
                $( $elements.messageText.fase5_b ).css({ display: 'none' });
                $( $elements.messageText.fase6 ).css({ display: 'none' });
                $( $elements.messageText.fase6_a ).css({ display: 'none' });
                $( $elements.messageText.fase6_b ).css({ display: 'none' });
                break;
            case 4:
                $( $elements.messageText.fase1 ).css({ display: 'none' });
                $( $elements.messageText.fase2 ).css({ display: 'none' });
                $( $elements.messageText.fase3 ).css({ display: 'none' });
                $( $elements.messageText.fase4 ).css({ display: 'none' });
                $( $elements.messageText.fase5 ).css({ display: 'block' });

                // A OR B
                $( $elements.messageText.fase5_a ).css({ display: 'block' });
                $( $elements.messageText.fase5_b ).css({ display: 'none' });

                $( $elements.messageText.fase6 ).css({ display: 'none' });
                $( $elements.messageText.fase6_a ).css({ display: 'none' });
                $( $elements.messageText.fase6_b ).css({ display: 'none' });

                break;
            case 5:
                $( $elements.messageText.fase1 ).css({ display: 'none' });
                $( $elements.messageText.fase2 ).css({ display: 'none' });
                $( $elements.messageText.fase3 ).css({ display: 'none' });
                $( $elements.messageText.fase4 ).css({ display: 'none' });
                $( $elements.messageText.fase5 ).css({ display: 'none' });
                $( $elements.messageText.fase5_a ).css({ display: 'none' });
                $( $elements.messageText.fase5_b ).css({ display: 'none' });
                $( $elements.messageText.fase6 ).css({ display: 'block' });

                // A OR B
                $( $elements.messageText.fase6_a ).css({ display: 'block' });
                $( $elements.messageText.fase6_b ).css({ display: 'none' });
                break;
        }
    }

    //=====================
    // SHOW/HIDE INFO TEXT
    //=====================
    function showMessage()
    {
        $( $elements.nav.message ).css( 'display', 'block' );
        TweenMax.to( $( $elements.nav.message ), .6, { css:{ opacity: 1 }, ease: Expo.easeInOut } );   
    }

    function hideMessage()
    {
        
        TweenMax.to( $( $elements.nav.message ), .6, { css:{ opacity: 0 }, ease: Expo.easeInOut } );

        setTimeout( function()
        {
            $( $elements.nav.message ).css( 'display', 'none' );
        }, 600 );
    }



    function motionFase()
    {
        TweenMax.to( $( $elements.nav.content ), .6, { css:{ left: -( getScreenSizeWidth * currentFase ) }, ease: Expo.easeInOut } );
    }

    window.Works = Works;

})();