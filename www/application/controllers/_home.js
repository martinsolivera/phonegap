/*
    DICICO - Home
    ----------------------
    @author: NUCLEO
*/



(function() 
{
    "use strict";

    //=====================
    // VARS
    //=====================

    var $home = null;
    var $width = $(window).width();
    var $height = $(window).height();

    var $elements = 
    {
        home: '#home',
        scroll: '#home .scroll',
        update: '#home .scroll .update',
        oferta: '#home .scroll .oferta'
    };

    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Home()
    {
        $home = $( this );
        init();
    }


    //=====================
    // PUBLIC
    //=====================

    Home.prototype.close = function(){}


    //=====================
    // HOME
    //=====================

    function init()
    {
        renderJson(1);

        $($elements.oferta).find('img').each(function(index, value){
            $(value).css('width', $width);
        });

        setTimeout(function(){
            $($elements.scroll).css('height', $height);
            $($elements.scroll).scrollTop(68);
        }, 500);

        $($elements.scroll).scroll(function (){
            var top = Math.floor($($elements.oferta).offset().top);

            if(top > 68 && top >= 117){
                renderJson(0);
            }
        });
    }

    function renderJson(tipo){
            $.getJSON('application/assets/json/oferta.json', function(json){
            // $.getJSON('http://www.appdicico.com.br/site/ofertas', function(json){
            // removo todas das ofertas
            $($elements.oferta).find('img').remove();

            // lendo json de ofertas
            $.each(json, function(index, value){
                // busco no json a oferta destaque
                if(tipo == value['destaque'] && tipo == 1){
                    $($elements.oferta).append('<img src="http://www.appdicico.com.br/'+value['galeria']+'" />');

                    // busco no json demais ofertas
                }else if(tipo == value['destaque'] && tipo == 0){
                    $($elements.oferta).append('<img src="http://www.appdicico.com.br/'+value['galeria']+'" />');
                }
            });

            $($elements.oferta).find('img').each(function(index, value){
                $(value).css('width', $width);
            });

            // caso não seja possivel a leitura do json
        }).error(function(){
            alert('Serviço indisponível no momento.');

            // sucesso na leitura
        }).success(function(){
            if(tipo == 0){
                $($elements.scroll).animate({scrollTop: 68}, 200);
            }
        });
    }

    window.Home = Home;

})();