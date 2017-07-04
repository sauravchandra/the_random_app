
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
		rand=random_gen(0,titles.length);
		$('.main_message').html(titles[rand]);
		setTimeout(function(){$('#splash').hide();},1000);
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
var msgs=['Loading...','Counting the number of stars in the universe...','Waiting for winter to arrive...','Bringing Jon Snow back to life...','Casting a patronus...','Cooking some crystal meth...','Erasing the rules of fight club...','Flinging you across the internet...','Activating warp drive...']
var titles=['Bored?<br>No more.','Stuck on a shopping trip with your family?','One of those days that goes on for too long?','Trying to look busy?','Have nothing to do?','A rainy day and forgot to save up something?','Want to explore the internet?','Have some time to waste?']
var swiper=new Hammer(document.getElementById('main'));

//Number of categories
var cat_end=8;

//Retrieve content
function retr(){
	rand=random_gen(1,cat_end);
	rand=5;
	
	//Entertainment
	if(rand==1){
		jQuery.getJSON("content/entertainment.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
		});
	}
	
	//Games
	else if(rand==2){
		jQuery.getJSON("content/games.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
		});
	}
	
	//handpicked
	else if(rand==3){
		jQuery.getJSON("content/handpicked.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
		});
	}
	
	//Humour
	else if(rand==4){
		jQuery.getJSON("content/humour.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
		});
	}
	
	//Music
	else if(rand==5){
		jQuery.getJSON("content/music.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
		});
	}
	
	//Self improvement
	else if(rand==6){
		jQuery.getJSON("content/self_improv.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
		});
	}
	
	//New world
	else if(rand==7){
		jQuery.getJSON("content/the_new_world.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
		});
	}
	
	//Past
	else if(rand==8){
		jQuery.getJSON("content/past.json",function(data){
				rand=random_gen(1,Object.keys(data).length);
				browser=window.open(data[rand],'_blank','location=yes');
				browser.addEventListener('exit',reset_button);
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
	if(isloading==0 && !($("#menu").hasClass('visible'))){
		isloading=1;
		rand=random_gen(0,msgs.length);
		$('.loader_text').text(msgs[rand]);
		$('.loading').show();
		retr();
	}
}

function reset_button(){
	$('.loading').hide();
	isloading=0;
}


//Show menu via swipe
swiper.on('swiperight',function(e){
	if(!($('#menu').hasClass('visible'))){
		$('#menu').animate({"left":"0%"},250).addClass('visible');
		div_on_focus=1;
	}
});

//Hide menu via swipe
swiper.on('swipeleft',function(e){
	if($('#menu').hasClass('visible')){
		div_on_focus=0;
		$('#menu').animate({"left":"-75vw"},250).removeClass('visible');
	}
});

//Show menu via tap
$('#menu_button').click(function(){
	if(!($('#menu').hasClass('visible'))){
		$('#menu').animate({"left":"0%"},250).addClass('visible');
		div_on_focus=1;
	}
});

//Hide menu when tapped outside
$('#main').click(function(){
	if($('#menu').hasClass('visible')){
		div_on_focus=0;
		$('#menu').animate({"left":"-75vw"},250).removeClass('visible');
	}
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
	div_on_focus=3;
	$('#menu').animate({"left":"-75vw"},250).removeClass('visible');
	$('#contribute').fadeIn(500);
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
	else if(div_on_focus==3){
		div_on_focus=0;
		$('#contribute').fadeOut(500);
	}
}