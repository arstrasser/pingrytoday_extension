/*
*  Brendan Raimann, Billy Fallon, and Alex Strasser
*  Controls the main page
*/


/**
*  Sets the correct background set
*/
function backgroundManager(value) {
  //TODO: remove this temporary section
  standardButton();
  document.body.style.backgroundImage =  "url('photos/_standard/Image1.jpg')";
  return;



  if (parseInt(value) == 0){
    standardButton();
    document.body.style.backgroundImage =  "url('photos/_standard/Image" + (~~(Math.random() * 20) + 1) + ".jpg')";
    chrome.browserAction.setIcon({
         path : "photos/_standard/PIE-16.png"
    });
  }
  else {
    alternateButton();
    document.body.style.backgroundImage = "url('photos/_alternate/Image" + (~~(Math.random() * 23) + 1) + ".jpg')";
    chrome.browserAction.setIcon({
         path : "photos/_alternate/PIE-16.png"
    });
  }
}

/**
*  Searches for the cookie that toggles the bookmark bar
*  Creates the cookie if it doesn't exist
*  calls bookmarkManager(val) when it's found
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
*  Reads the "background_set" bookmark and switches the backgrounds appropriately
*/
chrome.cookies.get({name:"background_set", url:"http://localhost:8080"}, function(cookie) {
  if (cookie == null) {
    chrome.cookies.set({
      name: "background_set",
      value: "0",
      url:"http://localhost:8080",
      expirationDate: Date.now() + 126227808000  //4 years
    }, function(cookie) {
      backgroundManager("0");
    });
  }
  else {
    backgroundManager(cookie.value);
  }
});

function enableBookmarks(){
  document.getElementById('bookmark_bar').style.opacity = 1;
  document.getElementById('bookmark_bar').style.pointerEvents = "auto";
  document.getElementById("button_back").style.opacity = 0.9;
  document.getElementById("toggle").title = "hide bookmark bar";
}
function disableBookmarks(){
  document.getElementById('bookmark_bar').style.opacity = 0;
  document.getElementById('bookmark_bar').style.pointerEvents = "none";
  document.getElementById("button_back").style.opacity = 0;
  document.getElementById("toggle").title = "show bookmark bar";
}

/**
*  Toggles the visibility of the bookmark bar using the "bookmark_toggle" cookie as the parameter
*/
function bookmarkManager(value) {
  if (parseInt(value) == 0) {
    disableBookmarks();
  }
  else {
  enableBookmarks();
  }
  buttonManager();
}

/**
*  Manages the button that toggles the visibility of the bookmark bar
*/
function buttonManager() {
  var bar = document.getElementById('bookmark_bar');
  var button = document.getElementById("toggle");
  button.addEventListener("click", function() {
    if (bar.style.opacity === '0') {
      enableBookmarks();
      chrome.cookies.set({
        name: "bookmark_toggle",
        value: "1",
        url:"http://localhost:8080",
        expirationDate: Date.now() + 126227808000  //4 years
      });
    }
    else {
      disableBookmarks();
      chrome.cookies.set({
        name: "bookmark_toggle",
        value: "0",
        url:"http://localhost:8080",
        expirationDate: Date.now() + 126227808000  //4 years
      });
    }
  });
}


/**
*  Fading in shadows for the time, date, letterDay, classes
*/
setTimeout(function(){document.getElementById("stage1").style.opacity = 0;}, 300);

setTimeout(function(){document.getElementById("time").style.textShadow = "0px 0px 15px hsla(120, 100%, 0%, .05)"},500);
setTimeout(function(){document.getElementById("time").style.textShadow = "0px 0px 15px hsla(120, 100%, 0%, .1)"},750);
setTimeout(function(){document.getElementById("time").style.textShadow = "0px 0px 15px hsla(120, 100%, 0%, .15)"},1000);

setTimeout(function(){document.getElementById("date").style.textShadow = "0px 0px 15px hsla(120, 100%, 0%, .05)"},500);
setTimeout(function(){document.getElementById("date").style.textShadow = "0px 0px 15px hsla(120, 100%, 0%, .1)"},750);
setTimeout(function(){document.getElementById("date").style.textShadow = "0px 0px 15px hsla(120, 100%, 0%, .2)"},1000);

setTimeout(function(){document.getElementById("letterDay").style.color = "#f2f2f2"},750);
setTimeout(function(){document.getElementById("letterDay").style.textShadow = "0px 0px 40px hsla(120, 100%, 0%, .3)"},1000);
setTimeout(function(){document.getElementById("letterDay").style.textShadow = "0px 0px 40px hsla(120, 100%, 0%, .4)"},1250);
setTimeout(function(){document.getElementById("letterDay").style.textShadow = "0px 0px 40px hsla(120, 100%, 0%, .5)"},1500);

setTimeout(function(){document.getElementById("classes").style.color = "#f2f2f2"},750);
setTimeout(function(){document.getElementById("classes").style.textShadow = "0px 0px 40px hsla(120, 100%, 0%, .3)"},500);
setTimeout(function(){document.getElementById("classes").style.textShadow = "0px 0px 40px hsla(120, 100%, 0%, .4)"},750);
setTimeout(function(){document.getElementById("classes").style.textShadow = "0px 0px 40px hsla(120, 100%, 0%, .5)"},1000);

/**
*  Places the container and bookmark_bar correctly in the window
*/
function reposition(){
  document.getElementById("container").style.transitionDuration = "0"
  document.getElementById("bookmark_bar").width =
    parseInt(window.getComputedStyle(document.getElementById('bookmark_shelf')).getPropertyValue('width')) - 30;

  if (document.getElementById('container').clientWidth <= 385)
    document.getElementById('container').scrollLeft = 300;
  else
    document.getElementById('container').scrollLeft = (980 - document.getElementById('container').clientWidth)/2;

  document.getElementById("container").style.display = "none";
  document.getElementById("container").style.opacity = 0;


  document.getElementById('container').style.bottom = "-13.5vw";
  if (document.getElementById('container').clientWidth == 250)
    document.getElementById('container').style.right = "-62.5";
  else
    document.getElementById('container').style.right = "-9.8vw";
  document.getElementById("container").style.transitionDuration = "0.2s"
}
reposition();

/**
* Manage the settings menu
*/
document.getElementById("settingsIcon").addEventListener("click", function(){
  currentStyle = document.getElementById("settingsMenu").style;
  console.log(currentStyle.display);
  if(currentStyle.opacity == 1){
    setTimeout(function(){currentStyle.opacity = 0;});
    setTimeout(function(){currentStyle.display = "none";}, 300);
  }else if(currentStyle.opacity == 0) {
    currentStyle.display = "block";
    setTimeout(function(){currentStyle.opacity = 1;});
  }
})

/**
*  Function is called when the button is clicked
*  Toggles the "background_set" cookie or creates the cookie if it does not exist
*  Changes the icon to make the background set
*  Changes the text on the button and the banner behind it (by calling standardButton() or alternateButton())
*/
function switchBackgrounds() {
  chrome.cookies.get({name:"background_set", url:"http://localhost:8080"}, function(cookie) {
    if(cookie == null || parseInt(cookie.value) == 0) newCookie = "1";
    else newCookie = "0";
    chrome.cookies.set({
      name: "background_set",
      value: newCookie,
      url:"http://localhost:8080",
      expirationDate: Date.now() + 126227808000  //4 years
    }, function(cookie) {
      console.log(cookie);
      console.log("background_set cookie created w/ value "+newCookie);
      backgroundManager(newCookie);
    });
    chrome.browserAction.setIcon({
      path : "photos/_standard/PIE-16.png"
    });
  });
};
/**
*  Function is called when the popup needs to change the extension to standard
*/
function standardButton() {
  document.getElementById("changeBackgroundBtn").innerText = "Switch to Nature Backgrounds";
  document.getElementById("image").src = "photos/banner2.png";
};
/**
*  Function is called when the popup needs to change the extension to alternate
*/
function alternateButton() {
  document.getElementById("changeBackgroundBtn").innerText = "Switch to Pingry Backgrounds";
  document.getElementById("image").src = "photos/banner.png";
};
document.getElementById("changeBackgroundBtn").style.opacity = 0.9;
document.getElementById("changeBackgroundBtn").addEventListener("click", function(){
  switchBackgrounds();
});


/**
*  Maintains the correct position for the container and bookmark_bar
*/
window.addEventListener("resize", function(){reposition()});

/**
*  Event Listeners to make the Lunch Menu and Announcements tabs work
*/
document.getElementById("lunch").addEventListener("mouseover", function() {
  document.getElementById("container").style.display = "initial";
  setTimeout(function(){document.getElementById("container").style.opacity = 1;});
});
document.getElementById("container").addEventListener("mouseout", function() {
  setTimeout(function(){document.getElementById("container").style.opacity = 0;});
  setTimeout(function(){document.getElementById("container").style.display = "none";}, 200)
});
document.getElementById("US_announcements").addEventListener("mouseover", function() {
  document.getElementById("iframe_announcements").style.display = "initial";
  setTimeout(function(){document.getElementById("iframe_announcements").style.opacity = 1;});
});
document.getElementById("iframe_announcements").addEventListener("mouseout", function() {
  setTimeout(function(){document.getElementById("iframe_announcements").style.opacity = 0;});
  setTimeout(function(){document.getElementById("iframe_announcements").style.display = "none";}, 200)
});

/**
* Disables tab indexing
*/
document.addEventListener("keydown", function (e){
  var keycode1 = (e.keyCode ? e.keyCode : e.which);
  if (keycode1 == 0 || keycode1 == 9) {
    e.preventDefault();
    e.stopPropagation();
  }
});


//helper arrays for the date
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/*
*  Recursive method to keep time.
*/
function startTime() {
  var half = true;
  var today = new Date();
  if (today.getHours() <= 12)
    h = today.getHours();
  else
    h = today.getHours() - 12;
  if (h == 0)
    h = 12;
  m = (today.getMinutes()<10?"0":"")+today.getMinutes();
  document.getElementById('time').innerHTML = h + ":" + m;
  var d = new Date();
  document.getElementById("date").innerHTML = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
}
startTime();
setInterval(startTime, 1000);

/*
*  Gets the letter day using the unique int for each calendar day
*/
function letterDay(){
  var times = [
    ["A", 17423, 17434, 17444, 17456, 17465, 17478, 17487, 17498, 17512, 17521, 17546, 17556, 17567, 17576, 17589, 17598, 17623, 17633, 17644, 17654, 17665, 17674, 17683],
    ["B", 17424, 17435, 17445, 17457, 17469, 17479, 17490, 17504, 17513, 17522, 17547, 17557, 17568, 17577, 17590, 17599, 17624, 17634, 17645, 17655, 17666, 17675, 17687],
    ["C", 17427, 17436, 17448, 17458, 17470, 17480, 17491, 17505, 17514, 17525, 17548, 17560, 17569, 17578, 17591, 17602, 17625, 17637, 17646, 17658, 17667, 17676, 17688],
    ["D", 17428, 17438, 17449, 17459, 17471, 17483, 17492, 17506, 17515, 17526, 17549, 17561, 17570, 17581, 17592, 17603, 17626, 17638, 17647, 17659, 17668, 17679, 17689],
    ["E", 17429, 17441, 17450, 17462, 17472, 17484, 17493, 17507, 17518, 17527, 17550, 17562, 17571, 17582, 17595, 17604, 17630, 17639, 17651, 17660, 17669, 17680],
    ["F", 17430, 17442, 17451, 17463, 17476, 17485, 17494, 17508, 17519, 17528, 17554, 17563, 17574, 17583, 17596, 17605, 17631, 17640, 17652, 17661, 17672, 17681],
    ["G", 17431, 17443, 17452, 17464, 17477, 17486, 17497, 17511, 17520, 17529, 17555, 17564, 17575, 17584, 17597, 17606, 17632, 17641, 17653, 17662, 17673, 17682]
  ];

  var currentTime = Date.now();
  currentTime = currentTime/86400000;
  currentTime = currentTime - .16667;
  //currentTime = 17360;
  currentTime = Math.floor(currentTime, 10)+ 7;
  //All days were off by 7, so I adjusted the currentTime accordingly
  //In the future (i.e. next year, this system can be replaced with strings instead of ints to represent the days
  //So it would be more difficult to make a mistake
  var day = ""

  for(i = 0; i < times.length; i++){
    for(v = 1; v < times[i].length; v++){
      if(times[i][v] == currentTime){
        document.getElementById('letterDay').innerHTML = times[i][0];
        day = times[i][0];
        break;
      }
    }
  }

  if(day == "A") document.getElementById('classes').innerHTML = "1-2-3-4";
  else if(day == "B") document.getElementById('classes').innerHTML = "5-6-7-1";
  else if(day == "C") document.getElementById('classes').innerHTML = "2-3-4-5";
  else if(day == "D") document.getElementById('classes').innerHTML = "6-7-1-2";
  else if(day == "E") document.getElementById('classes').innerHTML = "3-4-5-6";
  else if(day == "F") document.getElementById('classes').innerHTML = "7-1-2-3";
  else if(day == "G") document.getElementById('classes').innerHTML = "4-5-6-7";
}
letterDay();
setInterval(letterDay, 60000);
