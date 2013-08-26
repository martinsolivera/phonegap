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

    var $sample = null;

    var $elements = 
    {
        sample : '#viewer #sample',
    };

    
    
    
    //=====================
    // CONSTRUCTOR
    //=====================

    function Sample()
    {
        $sample = $( this );
        init();
    }

    
    
    
    //=====================
    // PUBLIC
    //=====================

    Sample.prototype.public = function(){}

    
    
    
    //=====================
    // SAMPLE
    //=====================

    function init()
    {
    }

    window.Sample = Sample;

})();