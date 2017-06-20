alert("Thank you for using Pingry PIE. The extension will be available again after the summer.");

chrome.management.uninstallSelf();

/**
*	Brendan Raimann
*/

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
	*	Places the menu and bookmark_bar correctly in the window
	*/
	
	document.getElementById("bookmark_bar").width = 
		parseInt(window.getComputedStyle(document.getElementById('bookmark_shelf')).getPropertyValue('width')) - 30;
	$(document.getElementById("menu")).css("visibility","hidden");
	if (document.getElementById('menu').clientWidth == 250)
		$(document.getElementById('menu')).css({"right":"-63","bottom":"-13.5vw"});
	else
		$(document.getElementById('menu')).css({"right":"-9.9vw","bottom":"-13.5vw"});

	/**
	*	Maintains the correct position for the menu and bookmark_bar
	*/
	$(window).resize(function() {
		document.getElementById("bookmark_bar").width = 
			parseInt(window.getComputedStyle(document.getElementById('bookmark_shelf')).getPropertyValue('width')) - 30;
		if (document.getElementById('menu').clientWidth == 250)
			$(document.getElementById('menu')).css("right","-63");
		else
			$(document.getElementById('menu')).css("right","-9.9vw");
	});

	/**
	*	Event Listeners to make the Lunch Menu tab work
	*/
	$(document.getElementById("lunch").addEventListener("mouseover", mouseOver));
	$(document.getElementById("menu").addEventListener("mouseout", mouseOut));
	
	function mouseOver() {
		$(document.getElementById("menu")).css("visibility","visible");
		$(document.getElementById("lunch")).css("visibility","hidden");
	}
	
	function mouseOut() {
		$(document.getElementById("menu")).css("visibility","hidden");
		$(document.getElementById("lunch")).css("visibility","visible");
	}
	
	/**
	* Disables tab indexing
	*/
	$('twitter').click(false);
	$(document).keydown(function (e) 
	{
		var keycode1 = (e.keyCode ? e.keyCode : e.which);
		if (keycode1 == 0 || keycode1 == 9) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	
	//chrome.contextMenus.onClicked.addListener
	
	//chrome.cookies.remove({url:"http://localhost:8080", name:"bookmark_toggle"});
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
			//console.log("cookie exists \t value = " + cookie.value);
			//console.log(cookie);
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
			value: "1",
			url:"http://localhost:8080",
			expirationDate: Date.now() + 126227808000  //4 years
			}, function(cookie) {
				console.log(cookie);
				console.log("background_set cookie created w/ value 1");
				backgroundManager("1");
			});
		}
		else {
			//console.log("cookie exists \t value = " + cookie.value);
			//console.log(cookie);
			backgroundManager(cookie.value);
			console.log(cookie);
			console.log(cookie.value);
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
   		if (info.menuItemId === "delete") {
   			console.log(info);
   			chrome.bookmarks.search(info.linkUrl, function(results) {
   				chrome.bookmarks.remove(results[0].id);
   			});
   		}
   		else {
   			//console.log("add was pressed");
   		}
   	});
});

