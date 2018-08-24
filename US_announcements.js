//Brendan Raimann
//Edited by Alex Strasser

window.onload = (function(){
  var feed = "http://compsci.pingry.k12.nj.us:3000/v1/news?api_key="+"eiJE660YnzsV4WvJSgkJzPkJVROYQAa4YN4Knl3P";
  var announcements = [];

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        annnouncements = JSON.parse(xhttp.responseText);
        console.log(announcements);
        execute();
      }
  };
  xhttp.open("GET", feed, true);
  xhttp.send();


  /**
  *  Fixes the links in the RSS feed and removes iframes
  */
  function clean() {
    var index;
    for (var x = 0; x < announcements.length; x++) {   //adds 'https://www.pingry.org' to the beginning of links that are missing it
      index = announcements[x][1].indexOf("src=");
      while (index != -1){
        if (announcements[x][1].charAt(index + 5) == '/')
        {
          announcements[x][1] =
            announcements[x][1].substring(0, index + 5) +
            "https://www.pingry.org" +
            announcements[x][1].substring(index + 5);
            //console.log(announcements[x][1]);
        }
        temp = announcements[x][1].substring(index + 27).indexOf("src=");
        if (temp == -1)
          break;
        else
          index += temp + 27;
      }
    }

    for (var y = 0; y < announcements.length; y++) {  //replaces unsecure http links with secure https
      index = announcements[y][1].indexOf("http:");
      while (index != -1){
        announcements[y][1] =
          announcements[y][1].substring(0, index + 4) +
          "s" +
          announcements[y][1].substring(index + 4);
        temp = announcements[y][1].substring(index + 5).indexOf("http:");
        if (temp == -1)
          break;
        else
          index += temp + 5;
      }
    }

    for (var z = 0; z < announcements.length; z++) {  //removes iframes from the RSS feed
      index = announcements[z][1].indexOf("<iframe");
      var index2 = announcements[z][1].indexOf("iframe>");
      while (index != -1){
          announcements[z][1] =
            announcements[z][1].substring(0, index) +
            announcements[z][1].substring(index2 + 7);
        //console.log(announcements[z][1]);
        temp = announcements[z][1].substring(index2 + 7).indexOf("<iframe");
        if (temp == -1)
          break;
        else
          index += temp + 7;
      }
    }
  }


  /**
  *  Adds all of the RSS data in the 'announcements' list to the body of the html
  */
  function execute() {
    a = [];
    for (var i = 0; i < announcements.length; i++) {

      a[i] = document.createElement("div");

      var title = document.createElement("div");
      title.innerHTML = announcements[i].title;
      title.className = "title";

      a[i].appendChild(title);

      var description = document.createElement("div");
      description.innerHTML = announcements[i].description;
      description.className = "description";

      a[i].appendChild(description);

      var hRule = document.createElement("hr");
      a[i].appendChild(hRule);

      document.body.appendChild(a[i]);
    }
  }
});
