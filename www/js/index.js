
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
var isloading=0;
var msgs=['Loading...','Counting the number of stars in the universe...','Waiting for winter to arrive...','Bringing Jon Snow back to life...','Casting a patronus...','Cooking some crystal meth','Erasing the rules of fight club...']

//JSON file endpoints
var cat_end=8;
var entertainment_end=412;
var games_end=16;
var handpicked_end=13;
var humour_end=221;
var music_end=549;
var self_improv_end=383;
var new_world_end=407;
var past_end=223;

//Retrieve content
function retr(){
	rand=random_gen(1,cat_end);
	rand=1
	
	//Entertainment
	if(rand==1){
		jQuery.getJSON("content/entertainment.json",function(data){
				rand=random_gen(1,entertainment_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//Games
	else if(rand==2){
		jQuery.getJSON("content/games.json",function(data){
				rand=random_gen(1,games_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//handpicked
	else if(rand==3){
		jQuery.getJSON("content/handpicked.json",function(data){
				rand=random_gen(1,handpicked_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//Humour
	else if(rand==4){
		jQuery.getJSON("content/humour.json",function(data){
				rand=random_gen(1,humour_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//Music
	else if(rand==5){
		jQuery.getJSON("content/music.json",function(data){
				rand=random_gen(1,music_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//Self improvement
	else if(rand==6){
		jQuery.getJSON("content/self_improv.json",function(data){
				rand=random_gen(1,self_improv_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//New world
	else if(rand==7){
		jQuery.getJSON("content/the_new_world.json",function(data){
				rand=random_gen(1,new_world_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
	
	//Past
	else if(rand==8){
		jQuery.getJSON("content/past.json",function(data){
				rand=random_gen(1,past_end);
				browser=window.open(data[rand],'_blank','location=yes');
		});
	}
}

//Randomizer
function random_gen(min_limit,max_limit){
	return Math.floor(Math.random()*(max_limit-min_limit+1)+min_limit);
}

//Change button image to pressed button
function press_button(){
	$('.the_button').attr('src','img/button_pressed.png');
}

function leave_button(){
	$('.the_button').attr('src','img/button_unpressed.png');
	if(isloading==0){
		isloading=1;
		rand=random_gen(1,msgs.length);
		$('.loader_text').text(msgs[rand]);
		$('.loading').show();
		retr();
	}
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