var cssList = [
"css/circle.css",
"css/bootstrap.min.css"
];

var jsList = [
"js/d3.v3.min.js",
"js/jquery-2.1.1.min.js",
"js/bootstrap.min.js",
"js/circle.js"
];

addJS("js/submitPage.js");

function initial() {
	for (var index in cssList) {
		addCSS(cssList[index]);
	}
	for (var index in jsList) {
		addJS(jsList[index]);
	}
}

function addJS(FilePath) {
	var js = document.createElement("script");
	js.src = FilePath;
	document.head.appendChild(js);
}

function addCSS(FilePath) {
	var css = document.createElement("link");
	css.rel = "stylesheet";
	css.href = FilePath;
	document.head.appendChild(css);
}
function removeElement(element) {
	var elem = document.getElementById(element);
	elem.parentNode.removeChild(elem);
}

function date_sort(a, b) {
    return new Date(a.publishdate).getTime() - new Date(b.publishdate).getTime();
}

function time_format(oldData) {
  var publishdate = "";
  var nowDate = new Date();
  var years = nowDate.getFullYear() - oldData.getFullYear();
  var month = nowDate.getMonth() - oldData.getMonth();
  var days = nowDate.getDate() - oldData.getDate();
  var hrs = nowDate.getHours() - oldData.getHours();
  var mins = nowDate.getMinutes() - oldData.getMinutes();
  var seconds = nowDate.getSeconds() - oldData.getSeconds();
  if (years>1){publishdate+=years+" yrs ";} else if (years==1){publishdate+=years+" yr ";}
  if (month>1){publishdate+=month+" months ";} else if (month==1){publishdate+=month+" month ";}
  if (days>1){publishdate+=days+" days ";} else if (days==1){publishdate+=days+" day ";}
  if (hrs>1){publishdate+=hrs+" hrs ";} else if (hrs==1){publishdate+=hrs+" hrs ";}
  if (mins>1){publishdate+=mins+" mins ";} else if (mins==1){publishdate+=mins+" min ";}
  if (seconds>1){publishdate+=seconds+" sec ";} else if (seconds==1){publishdate+=seconds+" sec ";}
  publishdate += " ago";
  return publishdate
}

function getlastmod(url)
{
    var ifrm = document.createElement("IFRAME"); 
    ifrm.setAttribute("src", url);
    ifrm.setAttribute("id", "oIFRAME");
    ifrm.style.display = "none"; 
    var spanTag = document.createElement("span"); 
    spanTag.id = "oSpan"; 
    document.body.appendChild(ifrm);
    document.body.appendChild(spanTag);

    try 
    {
        var oIFrame = document.getElementById("oIFRAME");
        var oSpan = document.getElementById("oSpan");
        var result = oIFrame.src + " last modified " +
        oIFrame.contentDocument.lastModified;
        // outUpdate=oSpan;
        console.log(result);
        $('#datetimepicker').value=oIFrame.contentDocument.lastModified+"";
    } 
    catch(E) {
      // setTimeout("getlastmod();",50);
  }
}



// Find the right method, call on correct element
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Launch fullscreen for browsers that support it!
// launchIntoFullscreen(document.documentElement); // the whole page
// launchIntoFullscreen(document.getElementById("videoElement")); // any individual element

// Whack fullscreen
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// Cancel fullscreen for browsers that support it!
// exitFullscreen();

