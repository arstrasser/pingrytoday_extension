/*
* Brendan Raimann and Alex Strasser
*/

/**
* Opens demo.html and a new tab on install
* 50/50 chance of starting with either pingry or nature backgrounds
*/
chrome.runtime.onInstalled.addListener(function (object) {
   if(object.reason === 'install'){
     chrome.tabs.create({'url': chrome.extension.getURL('demo.html')}, function(tab) { });
     chrome.tabs.create({'active': false}, function () { });
     var randomVal = (Math.floor(Math.random() * 2)).toString(); // either 0 or 1

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


/**
*  Deletes the appropriate bookmark when the "delete" option is clicked
*/
chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId === "delete") {
    chrome.bookmarks.search(info.linkUrl, function(results) {
      chrome.bookmarks.remove(results[0].id);
    });
  }
});
