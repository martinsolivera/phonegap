/*
    DICICO - Talk
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";
    
    //=====================
    // VARS
    //=====================

    var $talk = null;

    var $elements = 
    {
        menu: '#viewer .header',
        wrap: '#talk .page',
        back: '#talk .page .nav-button-back',
        nav: 
        {
            content: '#talk .page .content .nav',
            menu: '#talk .page .content .nav .menu li button'
        },
        pages:
        {
            stores: '#ourStores_wrapper',
            maps: '#maps_wrapper',
            list: '#list_wrapper',
            sac: '#sac_wrapper',
            faq: '#faq_wrapper',
            social: '#social_wrapper',

            buttonAll: '#ourStores_wrapper .menu .btAll',
            buttonNearMaps: '#ourStores_wrapper .menu .btNearest',   
                     
            buttonCloseNearestMap: '#maps_wrapper .buttons .close',
            buttonInfoNearestMap: '#maps_wrapper .buttons .info',
            boxInfo:'#maps_wrapper .infos',

            accordionRegions: '#list_wrapper .contentList #accordionListRegions',
            accordionCities: '#list_wrapper .contentList #accordionListCities',
            buttonCloseListStore: '#list_wrapper .close',

            faqContent: '#faq_wrapper .wrapper',
            accordionFaq: '#faq_wrapper .wrapper #accordionFaq',
            accordionFaq1: '#faq_wrapper .wrapper #accordionFaq1',
            buttonSearch: '#faq_wrapper .wrapper .search .buttonSearch',

            listaTodasLojas: '#list_wrapper .contentList ul.divList.listaTodasLojas',
        }
    };


    // OURSTORES
    var _openedInfo = false;
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Talk()
    {
        $talk = $( this );
        talkInit();        
    }

    
    
    
    //=====================
    // TALK
    //=====================

    function talkInit()
    {
        talkSet();
        talkBackInit();
        talkNavInit();


    }

    function talkSet()
    {
        $( $elements.pages.stores ).css({ display: 'none' });
        $( $elements.pages.maps ).css({ display: 'none' });
        $( $elements.pages.list ).css({ display: 'none' });
        $( $elements.pages.sac ).css({ display: 'none' });
        $( $elements.pages.faq ).css({ display: 'none' });
        $( $elements.pages.social ).css({ display: 'none' });
    }

    function talkViewer()
    {
        TweenMax.to( $( $elements.menu ), .6, { css:{ left: 0 }, ease: Expo.easeInOut } );
        TweenMax.to( $( $elements.wrap ), .6, { css:{ left: '0%' }, ease: Expo.easeInOut } );
    }

    function talkPages()
    {
        TweenMax.to( $( $elements.menu ), .6, { css:{ left: -$( window ).width() }, ease: Expo.easeInOut } );
        TweenMax.to( $( $elements.wrap ), .6, { css:{ left: '-100%' }, ease: Expo.easeInOut } );
    }

    
    
    
    //=====================
    // BACK
    //=====================

    function talkBackInit()
    {
        $( $elements.back ).bind( 'click', talkViewer );
    }

    
    
    
    //=====================
    // NAV
    //=====================

    function talkNavInit()
    {
        $( $elements.nav.menu ).each
        (
            function( index )
            {
                $( this ).bind( 'click', function(){ talkNavClick( index ); } );
            }
        );
    }

    function talkNavClick( index )
    {
        switch( index )
        {
            case 0:
                pageStores();
                break;
            case 1:
                pageSac();
                break;
            case 2:
                pageSocial();
                break;
            case 3:
                pageFaq();
                break;
        }

        talkPages();
    }

    
    
    
    //=====================
    // PAGES
    //=====================
    var $latitude = 0;
    var $longitude = 0;

    function loadCurrentPosition()
    {
		navigator.geolocation.getCurrentPosition(function(position){$latitude = position.coords.latitude, $longitude=position.coords.longitude}, function(error){alert(error.message)});
    }
 
    function getNearlyStore()
    {
 		var menorDistancia = 10000000;
 		var item = null;

    	//Percorre aqui todas as lojas em busca da menor distância:
        $.each(function(index, value){

    		var ret = calculateDistance(value.latitude,value.longitude);

    		if(ret < menorDistancia)
    		{
    			menorDistancia = ret;
    			item = value;
    		}
        });

        return item;
    }


	function calculateDistance(latitude, longitude)
	{
	    var R = 6371; // km
	    var dLat = (latitude-$latitude).toRad();
	    var dLon = (longitude-$longitude).toRad();
	    var lat1 = $latitude.toRad();
	    var lat2 = $longitude.toRad();

	    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	    var distance = R * c;
			

	    return distance;
	}
 
    function pageStores()
    {
        // Lojas

        $( $elements.pages.stores ).css({ display: 'block' });
        $( $elements.pages.maps ).css({ display: 'none' });
        $( $elements.pages.list ).css({ display: 'none' });
        $( $elements.pages.sac ).css({ display: 'none' });
        $( $elements.pages.faq ).css({ display: 'none' });
        $( $elements.pages.social ).css({ display: 'none' });

        var array = [];

        $.ajax({
            dataType: "json",
            // url: 'http://www.appdicico.com.br/site/lojas',
            url: 'application/assets/json/lojas.json',
            success: function(data){
                // array.push(data[0].Loja);
            }
        }).done(function(data){
            //BUTTON
            $( $elements.pages.buttonAll ).bind('click', function(){
                allStores(data[0].Loja);
            }).css( { cursor: 'pointer' } );
            
            $( $elements.pages.buttonNearMaps ).bind( 'click', nearestStoreMaps ).css( { cursor: 'pointer' } );
            
            $( $elements.pages.buttonCloseNearestMap ).bind( 'click', closeNearestStore ).css( { cursor: 'pointer' } );
            $( $elements.pages.buttonInfoNearestMap ).bind( 'click', showInfoBox ).css( { cursor: 'pointer' } );
        });
    }

    function pageSac()
    {
        $( $elements.pages.stores ).css({ display: 'none' });
        $( $elements.pages.maps ).css({ display: 'none' });
        $( $elements.pages.list ).css({ display: 'none' });
        $( $elements.pages.sac ).css({ display: 'block' });
        $( $elements.pages.faq ).css({ display: 'none' });
        $( $elements.pages.social ).css({ display: 'none' });
    }

    function pageSocial()
    {
        $( $elements.pages.stores ).css({ display: 'none' });
        $( $elements.pages.maps ).css({ display: 'none' });
        $( $elements.pages.list ).css({ display: 'none' });
        $( $elements.pages.sac ).css({ display: 'none' });
        $( $elements.pages.faq ).css({ display: 'none' });
        $( $elements.pages.social ).css({ display: 'block' });
    }

    function pageFaq()
    {
 
        $.ajax({
            dataType: "json",
            // url: 'http://www.appdicico.com.br/site/faq',
            url: 'application/assets/json/faq.json',
            success: function(data){
                $( $elements.pages.accordionFaq ).find('li').remove();

                $.each(data, function(index, value){
                   var li = '';
                       li += '<li class="item_qst">';
                       li += '<h4 class="title_qst"><span class="number"><span>'+(index + 1)+'</span></span><a class="trigger" href="#">'+value.pergunta+'</a></h4>';
                       li += '<div class="answer">'+value.resposta+'</div>';
                       li += '</li>';

                    $($elements.pages.accordionFaq).append(li);
                });

                $($elements.pages.accordionFaq).find('li div').hide();

                $($elements.pages.accordionFaq).find('li').click(function (){
                    $(this).find('div').toggle();
                });

                $('.input').keyup(function (event){
                    var regex = new RegExp($(this).val());

                    $($elements.pages.accordionFaq).find('li').each(function (index, value){
                        $(value).hide();

                        if(regex.test($(value).find('h4').text())){
                            $(value).show();
                        }

                    });
                });
            }
        });

        $( $elements.pages.stores ).css({ display: 'none' });
        $( $elements.pages.maps ).css({ display: 'none' });
        $( $elements.pages.list ).css({ display: 'none' });
        $( $elements.pages.sac ).css({ display: 'none' });
        $( $elements.pages.faq ).css({ display: 'block' });
        $( $elements.pages.social ).css({ display: 'none' });

        // $( $elements.pages.faqContent ).scrollTop( 50 );
        // $.fn.accordion.defaults.container = false;
        // $( $elements.pages.accordionFaq ).accordion( { el: ".h", head: "h4", next: "div" } );
        // // $( $elements.pages.accordionFaq1 ).accordion( { el: ".h", head: "h4", next: "div" } );
        // // BUTTON SEARCH
        // $( $elements.pages.buttonSearch ).bind( 'click', search ).css( { cursor: 'pointer' } );
        
    }

    //=====================
    // OUR STORES
    //=====================

    function mapaNaTela(){
        var map;

        function initialize() {
            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(-34.397, 150.644),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('mapNaTela'), mapOptions);
        }

        initialize()
        
        google.maps.event.addDomListener(window, 'load', initialize);
    }

    // NEAREST STORES
    function nearestStoreMaps()
    {
        mapaNaTela();

        $( $elements.pages.maps ).css({ display: 'block' });
        $( $elements.back ).css({ display: 'none' });
    }

    function closeNearestStore()
    {
        $( $elements.pages.maps ).css({ display: 'none' });
        $( $elements.back ).css({ display: 'block' });
        $( $elements.pages.boxInfo ).css( { 'bottom': '-200px' } );
    }

    function showInfoBox()
    {
        if( !_openedInfo )
        {
            $( $elements.pages.buttonInfoNearestMap ).find( '.on' ).css({ 'display': 'none' });
            $( $elements.pages.buttonInfoNearestMap ).find( '.out' ).css({ 'display': 'block' });

            TweenMax.to( $( $elements.pages.boxInfo ), 0.5, { 'bottom': '0', ease: Circ.easeOut } );
            TweenMax.to( $( $elements.pages.buttonInfoNearestMap ), 0.5, { 'bottom': '230px', ease: Circ.easeOut } );

            _openedInfo = true;
        }
        else
        {
            $( $elements.pages.buttonInfoNearestMap ).find( '.on' ).css({ 'display': 'block' });
            $( $elements.pages.buttonInfoNearestMap ).find( '.out' ).css({ 'display': 'none' });
            
            TweenMax.to( $( $elements.pages.boxInfo ), 0.5, { 'bottom': '-200px', ease: Circ.easeOut } );
            TweenMax.to( $( $elements.pages.buttonInfoNearestMap ), 0.5, { 'bottom': '58px', ease: Circ.easeOut } );

            _openedInfo = false;
        }
    }

    // Todas as lojas
    function allStores(cidade)
    {   
        var menuLateral = $($elements.pages.listaTodasLojas);
            menuLateral.find('li').remove();

        $.each(cidade['Cidades'], function(index, value) {
            for (var i in value){
                console.log(i);
                menuLateral.append('<li><h4 class="title" >'+i+'</h4><div id="accordionListCities" class="lst_cities"><ul></ul></div></li>');
            }

            var li = menuLateral.find('li:last .lst_cities ul');
                
            $.each(value, function(index3, value3) {
                
                for(i = 0; i < value3.length; i++){
                    var novaLi =  '';
                        novaLi += '<li>';
                            novaLi += '<h5 class="tl_cities">'+value3[i].titulo+'</h5>';
                            novaLi += '<div class="ct_cities">';
                                novaLi += '<img src="application/assets/images/talk/stores_all_image.jpg" height="143" />';
                                novaLi += '<div class="address">';
                                    novaLi += '<div class="line"><span style="color: #2d3136;">Endereço:</span><span>'+value3[i].endereco+'.</span><br></div>';
                                    novaLi += '<span style="color: #2d3136;">Cep:</span><span>'+value3[i].cep+'</span>';
                                    novaLi += '<span style="color: #2d3136;">Gerente Geral:</span><span>'+value3[i].gerente+'</span>';
                                    novaLi += '<span style="color: #2d3136;">Email:</span><span>'+value3[i].email+'</span>';
                                novaLi += '</div>';
                                novaLi += '<div class="clear"></div>';
                                novaLi += '<div class="infos">';
                                    novaLi += '<div class="hours">';
                                        novaLi += '<span style="position: relative; color: #FFF; text-align: center; width: 100%;"><b>Horário de funcionamento:</b></span>';
                                        novaLi += '<div class="imgText"><span>'+value3[i].horarioS+' <br> '+value3[i].horarioF+'</span></div>';
                                    novaLi += '</div>';
                                    novaLi += '<div class="phones">';
                                        novaLi += '<span style="position: relative; color: #FFF; text-align: center; center; width: 100%;"><b>Informações:</b></span>';
                                        novaLi += '<div class="imgText"><span>(11) 2723-6200</span></div>';
                                    novaLi += '</div>';
                                novaLi += '</div>';
                            novaLi += '</div>';
                        novaLi += '</li>';

                    li.append(novaLi);
                }
            });
        });

        $( $elements.pages.list ).css({ display: 'block' });
        $( $elements.back ).css({ display: 'none' });
        
        $.fn.accordion.defaults.container = false;
        $( $elements.pages.accordionRegions ).accordion( { el: ".h", head: "h4, h5", next: "div" } );

        // CLOSE
        $( $elements.pages.buttonCloseListStore ).bind( 'click', closeAllStore ).css( { cursor: 'pointer' } );
    }

    function closeAllStore()
    {
        $( $elements.pages.list ).css({ display: 'none' });
        $( $elements.back ).css({ display: 'block' });
    }

    
    //=====================
    // FAQ
    //=====================
    function search()
    {
        // SEARCH
    }


    window.Talk = Talk;

})();