/**
*	Brendan Raimann
*	2/28/17
*	Manages a cookie that controls the set of backgrounds and displays the correct button and background.
*/

$(document).ready(function() {
	
	
	//Fades the popup from white
	$(".stage1").fadeOut(500);
	
	
	//Fades in the button from an opacity of 0
	window.setTimeout(function(){$("#btn").css("opacity", "0.3")},400);
	window.setTimeout(function(){$("#btn").css("opacity", "0.45")},475);
	window.setTimeout(function(){$("#btn").css("opacity", "0.6")},550);
	window.setTimeout(function(){$("#btn").css("opacity", "0.75")},625);
	window.setTimeout(function(){$("#btn").css("opacity", "0.9")},700);
	
	

	//Calls the function that reads a cookie and sets the correct button
	initButton();
	
	
	//Makes a "page refresh" effect when the button is clicked
	document.getElementById("btn").addEventListener("click", function(){
    	switchBackgrounds();
    	$(".stage1").fadeIn(0);
    	$(".stage1").fadeOut(500);
    });
    
    
    /**
	*	Function is called when the popup is loaded
	*	Sets the text on the button and the banner behind it (by calling standardButton() or alternateButton())
	*/
    function initButton() {
    	chrome.cookies.get({name:"background_set", url:"http://localhost:8080"}, function(cookie) {
    	if (cookie == null) {
			chrome.cookies.set({
			name: "background_set",
			value: "0",
			url:"http://localhost:8080",
			expirationDate: Date.now() + 126227808000  //4 years
    		});
    	} else {
    		if (parseInt(cookie.value) == 0) { //standard
    			standardButton();
    		} else {  //alternate
    			document.getElementById("btn").innerText = "Switch to Standard";
    			alternateButton();
    		}
    	}
    	});
    };
    
    
    
    /**
    *	Function is called when the button is clicked
    *	Toggles the "background_set" cookie or creates the cookie if it does not exist
    *	Changes the icon to make the background set
    *	Changes the text on the button and the banner behind it (by calling standardButton() or alternateButton())
    */
    function switchBackgrounds() {
		chrome.cookies.get({name:"background_set", url:"http://localhost:8080"}, function(cookie) {
		if (cookie == null) {
			chrome.cookies.set({
			name: "background_set",
			value: "0",
			url:"http://localhost:8080",
			expirationDate: Date.now() + 126227808000  //4 years
			}, function(cookie) {
				console.log(cookie);
				console.log("background_set cookie created w/ value 0");  //standard
				standardButton();
			});
		} else {
			if (parseInt(cookie.value) == 0) {
				chrome.cookies.set({
				name: "background_set",
				value: "1",
				url:"http://localhost:8080",
				expirationDate: Date.now() + 126227808000  //4 years
				}, function(cookie) {
					console.log(cookie);
					console.log("background_set cookie created w/ value 1");
					alternateButton();
				});
				chrome.browserAction.setIcon({
   				path : "photos/_alternate/PIE-16.png"
				});
			} else {
				chrome.cookies.set({
				name: "background_set",
				value: "0",
				url:"http://localhost:8080",
				expirationDate: Date.now() + 126227808000  //4 years
				}, function(cookie) {
					console.log(cookie);
					console.log("background_set cookie created w/ value 0");
					standardButton();
				});
				chrome.browserAction.setIcon({
   				path : "photos/_standard/PIE-16.png"
				});
			}
		}
		});
	
	};
	
	
	
    /**
    *	Function is called when the popup needs to change the extension to standard
    */
    function standardButton() {
    	document.getElementById("btn").innerText = "Switch to Alternate";
    	document.getElementById("image").src = "photos/banner2.png";
    };
    
    
    /**
    *	Function is called when the popup needs to change the extension to alternate
    */
    function alternateButton() {
    	document.getElementById("btn").innerText = "Switch to Standard";
    	document.getElementById("image").src = "photos/banner.png";
    };
    
    
    /**
    *	Prevents tab indexing on the page
    */
    $(document).keydown(function (e) 
	{
		var keycode1 = (e.keyCode ? e.keyCode : e.which);
		if (keycode1 == 0 || keycode1 == 9) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
});