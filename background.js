
/*
*	Brendan Raimann
*/




/**
*	Opens demo.html and a new tab on install
*	50/50 chance of starting with either pingry or nature backgrounds
*/
	chrome.runtime.onInstalled.addListener(function (object) {
   		
    	if(object.reason === 'install')
    	{ 		
    		chrome.tabs.create({'url': chrome.extension.getURL('demo.html')}, function(tab) { });
    		
    		chrome.tabs.create({'active': false}, function(tab) { });
    		
    		var randomVal = (Math.floor(Math.random() * 2)).toString();   //either 0 or 1
    		//console.log("INSTALLED with variable " + randomVal);

			chrome.cookies.set({
				name: "background_set",
				value: randomVal,
				url:"http://localhost:8080",
				expirationDate: Date.now() + 126227808000  //4 years
			}, function(cookie) {
				console.log(cookie);
				console.log("background_set cookie created w/ value " + randomVal);
			});
			
    	}
    	
	});








$(document).ready(function(){


	$(document.body).css("background-size", "cover");
	
	/**
	*	Sets the correct background set
	*/
	function backgroundManager(value) {
		if (parseInt(value) == 0)
		{
			$(document.body).css("background-image", "url('photos/_standard/Image" + (~~(Math.random() * 20) + 1) + ".jpg')");
			chrome.browserAction.setIcon({
   				path : "photos/_standard/PIE-16.png"
			});
		}
		else
		{
			$(document.body).css("background-image", "url('photos/_alternate/Image" + (~~(Math.random() * 23) + 1) + ".jpg')");
			chrome.browserAction.setIcon({
   				path : "photos/_alternate/PIE-16.png"
			});
		}
	};
	
	
	$(".stage1").fadeOut(1500);
	
	/**
	*	Fading in shadows for the time, date, letterDay, classes
	*/
	
	window.setTimeout(function(){$(document.getElementById("time")).css("text-shadow", "0px 0px 15px hsla(120, 100%, 0%, .05)")},500);
	window.setTimeout(function(){$(document.getElementById("time")).css("text-shadow", "0px 0px 15px hsla(120, 100%, 0%, .1)")},750);
	window.setTimeout(function(){$(document.getElementById("time")).css("text-shadow", "0px 0px 15px hsla(120, 100%, 0%, .15)")},1000);
	
	window.setTimeout(function(){$(document.getElementById("date")).css("text-shadow", "0px 0px 15px hsla(120, 100%, 0%, .05)")},500);
	window.setTimeout(function(){$(document.getElementById("date")).css("text-shadow", "0px 0px 15px hsla(120, 100%, 0%, .1)")},750);
	window.setTimeout(function(){$(document.getElementById("date")).css("text-shadow", "0px 0px 15px hsla(120, 100%, 0%, .2)")},1000);
	
	window.setTimeout(function(){$(document.getElementById("letterDay")).css("color", "#f2f2f2")},750);
	window.setTimeout(function(){$(document.getElementById("letterDay")).css("text-shadow", "0px 0px 40px hsla(120, 100%, 0%, .3)")},1000);
	window.setTimeout(function(){$(document.getElementById("letterDay")).css("text-shadow", "0px 0px 40px hsla(120, 100%, 0%, .4)")},1250);
	window.setTimeout(function(){$(document.getElementById("letterDay")).css("text-shadow", "0px 0px 40px hsla(120, 100%, 0%, .5)")},1500);
	
	window.setTimeout(function(){$(document.getElementById("classes")).css("color", "#f2f2f2")},750);
	window.setTimeout(function(){$(document.getElementById("classes")).css("text-shadow", "0px 0px 40px hsla(120, 100%, 0%, .3)")},500);
	window.setTimeout(function(){$(document.getElementById("classes")).css("text-shadow", "0px 0px 40px hsla(120, 100%, 0%, .4)")},750);
	window.setTimeout(function(){$(document.getElementById("classes")).css("text-shadow", "0px 0px 40px hsla(120, 100%, 0%, .5)")},1000);


	/**
	*	Places the container and bookmark_bar correctly in the window
	*/
	
	document.getElementById("bookmark_bar").width = 
		parseInt(window.getComputedStyle(document.getElementById('bookmark_shelf')).getPropertyValue('width')) - 30;
	
	if (document.getElementById('container').clientWidth <= 385)
		$(document.getElementById('container')).scrollLeft(300);
	else
		$(document.getElementById('container')).scrollLeft((980 - $(document.getElementById('container')).width())/2);
	
	$(document.getElementById("container")).fadeOut(0);
	
	if (document.getElementById('container').clientWidth == 250)
		$(document.getElementById('container')).css({"right":"-62.5","bottom":"-13.5vw"});
	else
		$(document.getElementById('container')).css({"right":"-9.8vw","bottom":"-13.5vw"});
	
	
	$(document.getElementById("iframe_announcements")).fadeOut(0);
	$(document.getElementById('iframe_announcements')).css({"left":"0","bottom":"-13.5vw"});

	/**
	*	Maintains the correct position for the container and bookmark_bar
	*/
	$(window).resize(function() {
		document.getElementById("bookmark_bar").width = 
			parseInt(window.getComputedStyle(document.getElementById('bookmark_shelf')).getPropertyValue('width')) - 30;
		
		if (document.getElementById('container').clientWidth <= 385)
			$(document.getElementById('container')).scrollLeft(300);
		else
			$(document.getElementById('container')).scrollLeft((980 - $(document.getElementById('container')).width())/2);
		
		
		if (document.getElementById('container').clientWidth == 250)
			$(document.getElementById('container')).css("right","-62.5");
		else
			$(document.getElementById('container')).css("right","-9.8vw");
		
	});

	/**
	*	Event Listeners to make the Lunch Menu tab work
	*/
	$(document.getElementById("lunch").addEventListener("mouseover", mouseOver));
	$(document.getElementById("container").addEventListener("mouseout", mouseOut));
	
	function mouseOver() {
		$(document.getElementById("container")).fadeIn(300);
	}
	
	function mouseOut() {
		$(document.getElementById("container")).fadeOut(200);
	}
	
	/**
	*	Event Listeners to make the Announcements tab work
	*/
	$(document.getElementById("US_announcements").addEventListener("mouseover", mouseOver2));
	$(document.getElementById("iframe_announcements").addEventListener("mouseout", mouseOut2));
	
	function mouseOver2() {
		$(document.getElementById("iframe_announcements")).fadeIn(400);
		$(document.getElementById("US_announcements")).fadeOut(200);
		$(document.getElementById("US_announcements_overlay")).fadeOut(200);
	}
	
	function mouseOut2() {
		$(document.getElementById("iframe_announcements")).fadeOut(200);
		$(document.getElementById("US_announcements")).fadeIn(200);
		$(document.getElementById("US_announcements_overlay")).fadeIn(200);
	}
	
	/**
	* Disables tab indexing
	*/
	
	$(document).keydown(function (e) 
	{
		var keycode1 = (e.keyCode ? e.keyCode : e.which);
		if (keycode1 == 0 || keycode1 == 9) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	
	/**
	*	Searches for the cookie that toggles the bookmark bar
	*	Creates the cookie if it doesn't exist
	*	calls bookmarkManager(val) when it's found
	*/
	chrome.cookies.get({name:"bookmark_toggle", url:"http://localhost:8080"}, function(cookie) {
		if (cookie == null) {
			chrome.cookies.set({
			name: "bookmark_toggle",
			value: "1",
			url:"http://localhost:8080",
			expirationDate: Date.now() + 126227808000  //4 years
			}, function(cookie) {
				console.log(cookie);
				console.log("bookmark_toggle cookie created w/ value 1");
				bookmarkManager("1");
			});
		}
		else {
			bookmarkManager(cookie.value);
		}
   	});
   	
   	
   	/**
   	*	Reads the "background_set" bookmark and switches the backgrounds appropriately
   	*/
   	chrome.cookies.get({name:"background_set", url:"http://localhost:8080"}, function(cookie) {
		if (cookie == null) {
			chrome.cookies.set({
			name: "background_set",
			value: "0",
			url:"http://localhost:8080",
			expirationDate: Date.now() + 126227808000  //4 years
			}, function(cookie) {
				console.log(cookie);
				console.log("background_set cookie created w/ value 0");
				backgroundManager("0");
			});
		}
		else {
			//console.log("cookie exists \t value = " + cookie.value);
			//console.log(cookie);
			backgroundManager(cookie.value);
		}
   	});
   	
   	/**
   	*	Toggles the visibility of the bookmark bar using the "bookmark_toggle" cookie as the parameter
   	*/
   	function bookmarkManager(value) {
   		if (parseInt(value) == 0) {
   			//console.log("initial state: hidden");
   			$(document.getElementById('bookmark_bar')).css("opacity","0");
   			$(document.getElementById('bookmark_bar')).css("pointer-events","none");
   			document.getElementById("button_back").style.opacity = 0;
   			document.getElementById("toggle").title = "show bookmark bar";
   		}
   		else {
   			//console.log("initial state: visible");
   			$(document.getElementById('bookmark_bar')).css("opacity","1");
   			$(document.getElementById('bookmark_bar')).css("pointer-events","auto");
   			document.getElementById("button_back").style.opacity = 0.9;
   			document.getElementById("toggle").title = "hide bookmark bar";
   		}
   		buttonManager();
   	
   	}
   	
   	/**
   	*	Manages the button that toggles the visibility of the bookmark bar
   	*/
   	function buttonManager() {
   		var bar = document.getElementById('bookmark_bar');
   		var button = document.getElementById("toggle");
		$(button).click(function() {
			if (window.getComputedStyle(bar).opacity === '0') {
				$(bar).css("opacity","1");
				$(bar).css("pointer-events","auto");
				chrome.cookies.set({
					name: "bookmark_toggle",
					value: "1",
					url:"http://localhost:8080",
					expirationDate: Date.now() + 126227808000  //4 years
				});
				document.getElementById("button_back").style.opacity = 0.9;
				button.title = "hide bookmark bar";
			}
			else {
				$(bar).css("opacity","0");
				$(bar).css("pointer-events","none");
				chrome.cookies.set({
					name: "bookmark_toggle",
					value: "0",
					url:"http://localhost:8080",
					expirationDate: Date.now() + 126227808000  //4 years
				});
				document.getElementById("button_back").style.opacity = 0;
				button.title = "show bookmark bar";
			}
		});
   	}

   	/**
   	*	Deletes the appropriate bookmark when the "delete" option is clicked
   	*/
   	chrome.contextMenus.onClicked.addListener(function(info) {
   		console.log(info.menuItemId);
   		if (info.menuItemId === "delete") {
   			console.log(info);
   			chrome.bookmarks.search(info.linkUrl, function(results) {
   				chrome.bookmarks.remove(results[0].id);
   			});
   		}
   	});
});

