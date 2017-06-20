/**
*	Brendan Raimann
*	10/15/16
*	Builds the inline bookmark bar
*/

$(document).ready(function(){

	// loads/refreshes the bookmark bar
	$("html").fadeOut(0);
	$("html").fadeIn(refreshSpeed);
	
	var bookmarks = [];
	var refreshSpeed = 500;
	
	fillBookmarks('1');   //0 = bookmark bar + other bookmarks. 1 = just bookmark bar. 2 = just other bookmarks. 
	
	/**
	*	Adds all of the user's bookmarks into the list "bookmarks"
	*	Calls the method "execute()" when it is done
	*/
	function fillBookmarks(id) {
		chrome.bookmarks.getChildren(id, function(children) {
			children.forEach(function(bookmark) {
	   			if (bookmark.url != undefined)
				bookmarks.push([bookmark.title, bookmark.url, bookmark.id]); //bookmarks[i][0-2] return title, url, and id
				fillBookmarks(bookmark.id);
			});
			execute();
		});
	}
	
	/**
	*	Creates all of the bookmarks and puts them onto bookmarks.html
	*/
   	function execute() {
   		var a = {}; //link
   		var linkText; //name
   		for (var i = 0; i < bookmarks.length; i++)
   		{ 
   			a[i] = document.createElement('a');
   			if (bookmarks[i][0].length <= 19)  //Makes the maximum bookmark size 19 characters
				linkText = document.createTextNode(bookmarks[i][0]);
			else
				linkText = document.createTextNode(bookmarks[i][0].substring(0, 16) + "...");
			a[i].appendChild(linkText); //adds text
			a[i].id = bookmarks[i][2];  //adds id
			a[i].href = bookmarks[i][1]; //adds url
			document.body.appendChild(a[i]); //adds bookmark to the html
			$(a[i]).css({"border-radius":"4", "border":"solid 1px #20538D", "z-index":"1", "-webkit-transition-duration":"0.2s",
				"text-shadow":"0px -1px 0px rgba(0, 0, 0, 0.4)", "text-decoration":"none", "white-space":"nowrap",
				"box-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2)", "-webkit-user-select":"none"});
			
			makeDynamic(bookmarks[i][2]); //adds hover styling, click styling, and option to delete bookmark
			
			a[i].style.color = "#FFF";
			a[i].style.padding = "5px 10px";
			a[i].style.margin = "2";
   			a[i].style.background = "rgba(68, 121, 186, .7)";
			a[i].style.position = "relative";
			a[i].style.top = "8px";
			a[i].style.left = "5";
			a[i].style.fontSize = "13";
			a[i].style.fontWeight = "normal";
   		}
   		bookmarks = []; //prevents looping
   	}
   	
   	/**
   	*	Adds styling to the button when it is being hovered or clicked
   	*	Adds a "delete" option to the right-click context menu when hovering
   	*	Removes the "delete" option when the cursor comes off of the bookmark
   	*/
   	function makeDynamic(id) {
   		$(document.getElementById(id)).hover(function() {
			$(document.getElementById(id)).css({"background":"rgba(53, 96, 148, 1)", "border":"solid 1px rgba(42, 78, 119, 1)"});
			chrome.contextMenus.create( { 
				id: "delete", 
				title: "Delete this Bookmark", 
				contexts:["frame"]
			}, function() {
				chrome.runtime.lastError;
			});
		}, function() {
				$(document.getElementById(id)).css({"border":"solid 1px #20538D", "background":"rgba(68, 121, 186, .7)",
					"box-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2)"});
				chrome.contextMenus.remove("delete", function() {
				chrome.runtime.lastError;
				});
		});
		
		
		$(document.getElementById(id)).focus(function() {
			$(document.getElementById(id)).css({"box-shadow":"inset 0 1px 4px rgba(0, 0, 0, 0.6)", 
				"border":"solid 1px #203E5F", "background":"#2E5481"});
		});
   	};
   	
   	
   	//refreshes the bookmarks when a bookmark is removed
   	chrome.bookmarks.onRemoved.addListener(function () {
   		$("html").fadeOut(refreshSpeed/2);
   		window.setTimeout(function(){location.reload()},refreshSpeed/2);
   	});
   	
   	//refreshed the bookmarks when a bookmark is changed
   	chrome.bookmarks.onChanged.addListener(function () {
   		$("html").fadeOut(refreshSpeed/2);
   		window.setTimeout(function(){location.reload()},refreshSpeed/2);
   	});
   	
   	//refreshes the bookmarks when a bookmark is moved
   	chrome.bookmarks.onMoved.addListener(function () {
   		$("html").fadeOut(refreshSpeed/2);
   		window.setTimeout(function(){location.reload()},refreshSpeed/2);
   	});
   	
   	//refreshes the bookmarks when a bookmark is created
   	chrome.bookmarks.onCreated.addListener(function () {
   		$("html").fadeOut(refreshSpeed/2);
   		window.setTimeout(function(){location.reload()},refreshSpeed/2);
   	});
   	
});





