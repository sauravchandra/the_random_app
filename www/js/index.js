
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		document.addEventListener("backbutton",back_handler,false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
    }
};

//Variable Declarations
var rand;
var browser;
var div_on_focus=0;

//JSON file endpoints
var cat_end=7;
var music_end=45;
var past_end=25;

//Retrieve content
function retr(){
	rand=random_gen(1,cat_end);
	rand=6;
	
	//Music
	if(rand==6){
		jQuery.getJSON("content/music.json",function(data){
				rand=random_gen(1,music_end);
				$("#lolz").text(data[rand]);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//Past
	else if(rand==1){
		jQuery.getJSON("content/the_past.json",function(data){
				rand=random_gen(1,past_end);
				$("#lolz").text(data[rand]);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
}

//Randomizer
function random_gen(min_limit,max_limit){
	return Math.floor(Math.random()*(max_limit-min_limit+1)+min_limit);
}

//Show menu
$('#menu_button').click(function(){
	if(!($('#menu').hasClass('visible'))){
		$('#menu').animate({"left":"0%"},250).addClass('visible');
		div_on_focus=1;
	}
});

//Hide menu when tapped outside
$('#main').click(function(){
	div_on_focus=0;
	$('#menu').animate({"left":"-75vw"},250).removeClass('visible');
});

//About app
function about_app(){
	div_on_focus=2;
	$('#menu').animate({"left":"-75vw"},250).removeClass('visible');
	$('#about_app').fadeIn(500);
}

//View saved content
function saved_content(){
}

//How to contribute
function contribute(){
}

//Handles back key
function back_handler(){
	if(div_on_focus==0){
		navigator.notification.confirm('',exit_app,'Exit','Okay,Cancel');
		function exit_app(button){
			if(button==1){
				navigator.app.exitApp();
			}
		}
	}
	else if(div_on_focus==1){
		div_on_focus=0;
		$('#menu').animate({"left":"-75vw"},250).removeClass('visible');
	}
	else if(div_on_focus==2){
		div_on_focus=0;
		$('#about_app').fadeOut(500);
	}
}