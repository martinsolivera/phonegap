/*
    DICICO - Main
    ----------------------
    @author: NUCLEO
*/



//=====================
// CONSOLE
//=====================

if (!(window.console && console.log)){(function() { var noop = function() {}; var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn']; var length = methods.length; var console = window.console = {}; while (length--) { console[methods[length]] = noop; }}());}



//=====================
// GLOBALS
//=====================

// Views
var APP_VIEWS = [
					'home',
					'talk',
					'work',
					'tips',
					'assistance',
					'config',
					'calculator',
					'metrics',
					'colors',
					'visualize'
				];

// Paths
var PATH_VIEWS 		 = 'application/views/';
var PATH_CONTROLLERS = 'application/controllers/';
var PATH_MODELS 	 = 'application/models/';

// Controls
var FIRST	 = true;
var RELEASED = true;



//=====================
// VARS
//=====================

// Objects
var $intro 		= null;
var $viewer 	= null;
var $navigation = null;



//=====================
// APP
//=====================

function appLoad()
{
	//document.addEventListener( 'deviceready', appDidLoaded, false );
	$( document ).bind( 'load', appLoaded() );
}

function appLoaded( event )
{
	/*
	navigator.notification.alert
	(
		'Cordova is ready!', // message
		function(){}, 		 // callback
		'Congratulations',   // title
		'Done'               // buttonName
	);
	*/

	appInit();
}

function appInit()
{
	intro();
	viewer();
	navigation();
}



//=====================
// INTRO
//=====================

function intro()
{
	$intro = new Intro();
}

function introFinished()
{
	
}



//=====================
// VIEWPORT
//=====================

function viewer()
{
	$viewer = new Viewer();
	$( $viewer ).bind( 'ON_CHANGED_VIEWER', viewerChanged );
	$( $viewer ).bind( 'ON_RETURN_VIEWER', viewerReturned );
}

function viewerChanged()
{
	if( FIRST )
	{
		FIRST = false;
		$intro.hide();
	}

	RELEASED = true;
}

function viewerReturned()
{
	navigationReturn();
}

function viewerControl( view )
{
	$viewer.control( view );
}



//=====================
// NAVIGATION
//=====================

function navigation()
{
	$navigation = new Navigation();
	$( $navigation ).bind( 'ON_TAPPED_NAVIGATION', navigationControl );
}

function navigationControl( event )
{
	RELEASED = false;
	viewerControl( event.view );
}

function navigationReturn()
{
	$navigation.return();
}