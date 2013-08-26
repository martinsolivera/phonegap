/*
    DICICO - Tips
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $tips = null;

    var $elements = 
    {
        menu: '#viewer .header',
        wrap: '#tips .page',
        back: '#tips .nav-button-back',
        menuList : 'ul.menu.listMenu',
        nav: 
        {
            content: '#tips .page .content .nav',
            menu: '#tips .page .content .nav .menu li button'
        },
        pages:
        {
            building: '#tips .page .pages #bulding_wrapper',
            accordionBuilding: '#tips .page .pages #bulding_wrapper .wrapper #accordionBuilding',
            swipeBuilding: '#tips .page .pages #bulding_wrapper .wrapper #accordionBuilding .contentList .thumbs',

            paginaTitulo: '#tips .page .pages #bulding_wrapper .wrapper .wrapper_top .wrapper_title span',
            
            busca : '#tips .page .pages #bulding_wrapper .wrapper .search .field .input'
        }
    };

    var AGENTDEVICEIPAD = false;
    
    if( ( navigator.userAgent.match( /iPad/i ) ) )
    {
        AGENTDEVICEIPAD = true;
    }
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Tips()
    {
        $tips = $( this );
        tipsInit();
    }

    
    
    
    //=====================
    // TALK
    //=====================

    function tipsInit()
    {
        $.ajax({
            dataType: "json",
            // url: 'http://www.appdicico.com.br/site/categorias',
            url: 'application/assets/json/categorias.json',
            success: function(data){
                $.each(data, function(index, value){
                    var li = '<li><button type="button" class="nav-tile" data-id="'+value.id+'"><span>'+value.nome+'</span></button></li>';
                    $($elements.menuList).append(li);
                });

                tipsNavInit();
            }
        });

        tipsSet();
        tipsBackInit();

        $($elements.pages.busca).keyup(function (){
            var regex = new RegExp($(this).val());

            $($elements.pages.accordionBuilding).find('li').each(function (index, value){
                $(value).hide();

                if(regex.test($(value).find('h4').text())){
                    $(value).show();
                }

            });

        });
    }

    function tipsSet()
    {
        $( $elements.pages.building ).css({ display: 'none' });
    }

    function tipsViewer()
    {
        TweenMax.to( $( $elements.menu ), .6, { css:{ left: 0 }, ease: Expo.easeInOut } );
        TweenMax.to( $( $elements.wrap ), .6, { css:{ left: '0%' }, ease: Expo.easeInOut } );

        $( $elements.pages.swipeBuilding ).empty();
        $( $elements.pages.swipeEndingWork ).empty();
        $( $elements.pages.swipeForHome ).empty();
    }

    function tipsPages()
    {
        TweenMax.to( $( $elements.menu ), .6, { css:{ left: -$( window ).width() }, ease: Expo.easeInOut } );
        TweenMax.to( $( $elements.wrap ), .6, { css:{ left: '-100%' }, ease: Expo.easeInOut } );
    }

    
    
    
    //=====================
    // BACK
    //=====================

    function tipsBackInit()
    {
        $( $elements.back ).bind( 'click', tipsViewer );
    }

    
    
    
    //=====================
    // NAV
    //=====================

    function tipsNavInit()
    {
        $( $elements.nav.menu ).bind('click', function(){
            tipsNavClick($(this).attr('data-id'));
            $($elements.pages.paginaTitulo).text($(this).text());
        });
    }

    function tipsNavClick(id)
    {
    	pageBuilding(id);
        tipsPages();
    }

    
    
    
    //=====================
    // PAGES
    //=====================

    function pageBuilding( id )
    {
        
		$.ajax({
		    dataType: "json",
		    // url: 'http://www.appdicico.com.br/site/dicas',
		    url: 'application/assets/json/dicas.json',
		    success: function(data){
		        $($elements.pages.accordionBuilding).find('li').remove();

		        $.each(data, function(index, value){
		           if(value.categoria == id){
		                var li  = '<li class="'+ ((value.galeria.length > 0) ? 'esseAquiTem' : '') +'">';
		                    li += '<h4 class="title">'+value.titulo+'</h4>';
		                    li += '<div class="contentList">';
		                    li += '<div class="thumbs"></div>';
		                    li += '<div class="text">'+value.texto+'</div>';
		                    li += '</div>';
		                    li += '</li>';
		                
		                $($elements.pages.accordionBuilding).append(li);

		                $( $elements.pages.building ).css({ display: 'block' });
		                $( $elements.pages.endingWok ).css({ display: 'none' });
		                $( $elements.pages.forHome ).css({ display: 'none' });
		                
		                $.fn.accordion.defaults.container = false;
		                
		                $( $elements.pages.accordionBuilding ).accordion( { el: ".h", head: "h4", next: "div" } );

		                if(value.galeria.length > 0){
		                    settingImagesSlider( $elements.pages.swipeBuilding, 'building', value.galeria );
		                }
		           }
		        });

		        $($elements.pages.accordionBuilding).find('li').each(function(index, value){
		            if(!$(value).hasClass('esseAquiTem')){
		                $(value).find('.thumbs').hide();
		            }
		        });
		    }
		});
    }

    function settingImagesSlider( _obj, _string, array )
    {

        var count = 0;

        $( _obj ).each
        ( 

            function()
            {
                var _div        = "swiper_"+_string+"_"+count;
                var _pagination = "pag_"+_string+"_"+count;

                $( this ).append( '<div id="'+_div+'" class="swiper-container"><div class="swiper-wrapper"></div></div> <div class="navigate"><div id="'+_pagination+'" class="pagination"></div></div>' );

                // for( var i = 0; i < 3; i++ )
                // {
                //     var image = 'application/assets/images/tips/building_image.jpg'; // Substituir

                //     if( AGENTDEVICEIPAD )
                //     {
                //         var slide = '<div class="swiper-slide"><img src="'+ image +'" height="232" /></div>';    
                //     }
                //     else
                //     {
                //         var slide = '<div class="swiper-slide"><img src="'+ image +'" height="198" /></div>';
                //     }
                    

                //     $( this ).find( '.swiper-wrapper' ).append( slide );
                // }

                for( var i = 0; i < array.length; i++ ){
	                var slide = '<div class="swiper-slide"><img src="'+ array[i] +'" height="'+((AGENTDEVICEIPAD) ? '232' : '198')+'" /></div>';

	                $( this ).find( '.swiper-wrapper' ).append( slide );
	            }


	            // var swBuilding = new Swiper ('#'+_div, {
	            //     mode:'horizontal',
	            //     pagination: '#'+_pagination,
	            //     loop: false
	            // });


                if( AGENTDEVICEIPAD )
                {
                    var swBuilding = new Swiper
                    (
                        '#'+_div,
                        {
                            mode:'horizontal',
                            pagination: '#'+_pagination,
                            loop: false,
                            slidesPerView: 2
                        }
                    );
                }
                else
                {
                    var swBuilding = new Swiper
                    (
                        '#'+_div,
                        {
                            mode:'horizontal',
                            pagination: '#'+_pagination,
                            loop: false
                        }
                );
                }
                

                count ++;
            }


        );

        
    }
    window.Tips = Tips;

})();