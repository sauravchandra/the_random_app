
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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
    }
};

//Variable Declarations
var rand;
var browser;

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

function random_gen(min_limit,max_limit){
	return Math.floor(Math.random()*(max_limit-min_limit+1)+min_limit);
}