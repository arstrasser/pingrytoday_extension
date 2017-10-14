/**
* Brendan Raimann
* 10/15/16
*
* Alex Strasser
* 10/09/17
*
*  Builds the inline bookmark bar
*/

// loads/refreshes the bookmark bar
document.body.style.opacity = 0;
document.body.style.transitionDuration = "0.2s";

//Animates fade in
setTimeout(function(){document.body.style.opacity = 1;});

fillBookmarks('1');   //0 = bookmark bar + other bookmarks. 1 = just bookmark bar. 2 = just other bookmarks.
/**
*  Adds all of the user's bookmarks into the list "bookmarks"
*  Calls the method "execute()" when it is done
*/
function fillBookmarks(id) {
  chrome.bookmarks.getChildren(id, function(children) {
    children.forEach(function(bookmark) {
       if (bookmark.url)
        addBookmark(bookmark.title, bookmark.url, bookmark.id);
      else
        fillBookmarks(bookmark.id);
    });
  });
}

/**
*  Creates all of the bookmarks and puts them onto bookmarks.html
*/
function addBookmark(title, url, id){
  var a = document.createElement('a');
  if(title.length > 17){
    title = title.substring(0, 17)+"...";
  }
  a.innerHTML = title; //adds text
  a.id = id;  //adds id
  a.href = url; //adds url
  a.className = "bookmark";
  a.onmouseenter = function() {
    chrome.contextMenus.create({
      id: "delete",
      title: "Delete this Bookmark",
      contexts:["frame"]
    }, function() {
      if(chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    });
  };
  a.onmouseleave = function() {
    chrome.contextMenus.remove("delete", function() {
      if(chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    });
  };
  document.getElementById("bookmark_container").appendChild(a);
}


//refreshes the bookmarks when a bookmark is removed
chrome.bookmarks.onRemoved.addListener(function() {
  document.body.style.opacity = 0;
  setTimeout(function(){location.reload()}, 200);
});

//refreshed the bookmarks when a bookmark is changed
chrome.bookmarks.onChanged.addListener(function() {
  document.body.style.opacity = 0;
  setTimeout(function(){location.reload()}, 200);
});

//refreshes the bookmarks when a bookmark is moved
chrome.bookmarks.onMoved.addListener(function() {
  document.body.style.opacity = 0;
  setTimeout(function(){location.reload()}, 200);
});

//refreshes the bookmarks when a bookmark is created
chrome.bookmarks.onCreated.addListener(function() {
  document.body.style.opacity = 0;
  setTimeout(function(){location.reload()}, 200);
});
