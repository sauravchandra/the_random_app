
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
		rand=random_gen(0,titles.length-1);
		$('.main_message').html(titles[rand]);
		setTimeout(function(){$('#splash').hide();},1000);
	
		//Load saved links
		var s_link;
		var r_key=0;
		var len=localStorage.length;
		if(len==0){
			$('#no_links').html('No links saved');
		}
		else{
			for(var i=0;i<len;i++){
				r_key=localStorage.key(i);
				s_link=localStorage.getItem(r_key);
				$('#linklist').append('<div id="'+r_key+'_div"><p class="link_wrapper" style="float:left;"><a id="'+r_key+'_link" class="native_link" onclick="open_link('+r_key+')">'+s_link+'</a></p><p class="glyphicon glyphicon-trash" style="float:right;" onClick="del_link('+r_key+')"></p></div>');
			}
		}
		key_var=parseInt(r_key)+1;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
    }
};

//Variable Declarations
var key_var=1;
var rand;
var browser;
var curr_url="";
var div_on_focus=0;
var isloading=0;
var dis=new Array(8); 
dis=[0,0,0,0,0,0,0,0]; //dis.fill() apparently not supported on older devices
var msgs=['Loading...','Counting the number of stars in the universe...','Waiting for winter to arrive...','Bringing Jon Snow back to life...','Casting a patronus...','Cooking some crystal meth...','Erasing the rules of fight club...','Flinging you across the internet...','Activating warp drive...','Hacking into Pied Piper...','Getting coffee at Central Perk...'];
var titles=['Bored?<br>No more.','Stuck on a shopping trip with your family?','One of those days that goes on for too long?','Trying to look busy?','Have nothing to do?','A rainy day and forgot to save up something?','Want to explore the internet?','Have some time to waste?','Feeling curious?'];
var swiper=new Hammer(document.getElementById('main'));

//Number of categories
var cat_end=8;

//Retrieve content
function retr(){
	//Check which categories are disabled
	//dis.fill(0); <--Don't use this
	dis=[0,0,0,0,0,0,0,0];
	
	if(!($("#entertainment").is(':checked'))){
		dis[0]=1;
	}
	if(!($("#games").is(':checked'))){
		dis[1]=1;
	}
	if(!($("#humour").is(':checked'))){
		dis[2]=1;
	}
	if(!($("#music").is(':checked'))){
		dis[3]=1;
	}
	if(!($("#self_improv").is(':checked'))){
		dis[4]=1;
	}
	if(!($("#the_new_world").is(':checked'))){
		dis[5]=1;
	}
	if(!($("#the_past").is(':checked'))){
		dis[6]=1;
	}
	if(!($("#handpicked").is(':checked'))){
		dis[7]=1;
	}
	
	//Check if everything is not deselected and if device is online
	if(!(dis.every(function(d){return d==1})) && navigator.connection.type!="unknown" && navigator.connection.type!="none" && navigator.connection.type!="cell"){
		//Show loader and caption
		rand=random_gen(0,msgs.length-1);
		$('.savelink').hide();
		$('.loader_text').text(msgs[rand]);
		$('.loading').show();
		
		do{
			rand=random_gen(1,cat_end);
		}while(dis[rand-1]==1)
		
		rand=1;
		//Entertainment
		if(rand==1){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/entertainment.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=cordova.ThemeableBrowser.open(data[rand],'_blank',{	
					toolbar: {
						height: 44,
						color: '#666'
					},
					title: {
						color: '#CCC',
						showPageTitle: true
					},
					backButton: {
						wwwImage: 'img/left.png',
						wwwImagePressed: 'img/left.png',
						wwwImageDensity: 4,
						align: 'left',
					},
					forwardButton: {
						wwwImage: 'img/right.png',
						wwwImagePressed: 'img/right.png',
						wwwImageDensity: 4,
						align: 'left',
					},
					closeButton: {
						wwwImage: 'img/close.png',
						wwwImagePressed: 'img/close.png',
						wwwImageDensity: 4,
						align: 'left',
					},
					menu: {
						wwwImage: 'img/menu.png',
						wwwImagePressed: 'img/menu.png',
						wwwImageDensity: 4,
						align: 'right',
						items: [
							{
								event: 'clip',
								label: 'Copy URL'
							}
						]
					},
					backButtonCanClose: true
				}).addEventListener('clip', function(e) {
					alert('URL Copied!');
				});
					
					
					
					
					
					
					
					//browser=window.open(data[rand],'_blank','location=yes');
					//browser.addEventListener('loadstart',function(e){browser.show();});
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	
		//Games
		else if(rand==2){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/games.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=window.open(data[rand],'_blank','location=yes');
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	
		//handpicked
		else if(rand==8){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/handpicked.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=window.open(data[rand],'_blank','location=yes');
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	
		//Humour
		else if(rand==3){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/humour.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=window.open(data[rand],'_blank','location=yes');
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	
		//Music
		else if(rand==4){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/music.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=window.open(data[rand],'_blank','location=yes');
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	
		//Self improvement
		else if(rand==5){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/self_improv.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=window.open(data[rand],'_blank','location=yes');
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	
		//New world
		else if(rand==6){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/the_new_world.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=window.open(data[rand],'_blank','location=yes');
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	
		//Past
		else if(rand==7){
			jQuery.getJSON("https://agzuniverse.github.io/content_random/the_past.json",function(data){
					rand=random_gen(1,Object.keys(data).length);
					browser=window.open(data[rand],'_blank','location=yes');
					browser.addEventListener('exit',reset_button(data[rand]));
			});
		}
	}
	//If everything is deselected
	else if(dis.every(function(d){return d==1})){
		//Warning toast
		$('#toastbar').text("You have disabled all categories!");
		$('#toastbar').fadeIn(500);
		$('#toastbar').fadeOut(1000);
		isloading=0;
	}
	//If no network connection
	/*else if(navigator.connection.type=="unknown" || navigator.connection.type=="none" || navigator.connection.type=="cell"){
		$('#toastbar').text("No internet connection!");
		$('#toastbar').fadeIn(500);
		$('#toastbar').fadeOut(1000);
		isloading=0;
	}*/
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
		retr();
	}
}

function reset_button(url){
	$('.loading').hide();
	curr_url=url;
	$('.savelink').show();
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
	div_on_focus=4;
	$('#menu').animate({"left":"-75vw"},250).removeClass('visible');
	$('#linklist').fadeIn(500);
}


//Save a link
function save_link(){
	if($('#no_links').html()!=""){
		$('#no_links').html("");
		
	}
	$('#linklist').append('<div id="'+key_var+'_div"><p class="link_wrapper" style="float:left;"><a id="'+key_var+'_link" class="native_link" onclick="open_link('+key_var+')">'+curr_url+'</a></p><p class="glyphicon glyphicon-trash" style="float:right;" onClick="del_link('+key_var+')"></p></div>');
	localStorage.setItem(key_var.toString(),curr_url);
	key_var++;
	$(".savelink").fadeOut(250);
	$('#toastbar').text("Saved!");
	$('#toastbar').fadeIn(500);
	$('#toastbar').fadeOut(1000);
	
}

//Open links from saved links directly in the browser
function open_link(k){
	window.open($('#'+k+'_link').text(),'_system','location=yes');
}

//Delete link on clicking trash button
function del_link(k){
	navigator.notification.confirm('Are you sure?',confirm_del_link,'Delete link','Okay,Cancel');
	function confirm_del_link(b){
		if(b==1){
			localStorage.removeItem(k.toString());
			$("#"+k+"_div").hide();
			if(localStorage.length==0){
				$('#no_links').html('No links saved');
			}
		}
	}
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
	else if(div_on_focus==4){
		div_on_focus=0;
		$('#linklist').fadeOut(500);
	}
}