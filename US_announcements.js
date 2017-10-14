//Brendan Raimann

$(document).ready(function(){
  var feed = "https://www.pingry.org/rss.cfm?news=16";
  var announcements = [];

  $.get(feed, function (data) {
    $(data).find("item").each(function () {
      var el = $(this);
        announcements.push([
          el.find("title").text(),
          el.find("description").text(),
          el.find("pubDate").text()
        ]);
    });
    clean();
    execute();
  });

  //console.log(announcements);


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

      a[i] = document.createElement("div" + i);

      var title = document.createElement("div");
      title.innerHTML = announcements[i][0];
      title.id = "title";

      a[i].appendChild(title);

      var description = document.createElement("div");
      description.innerHTML = announcements[i][1];
      description.id = "description";

      a[i].appendChild(description);

      var hRule = document.createElement("hr");
      a[i].appendChild(hRule);

      document.body.appendChild(a[i]);
    }
  }
});
