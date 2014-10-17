var ProfileName = "DECO3500",
VoteCase = 0,
LinksContributed = 0,
TopticAdded = 0;

var user_profile = null;

var button_submit_story = userpanel
.append("div")
.append("input")
.attr("class","btn btn-primary")
.attr("type","button")
.attr("value","Submit Story")
.style("position","absolute")
.style("top","0px")
.style("z-index","1")
.attr("onclick","setArticleBodyHTML_SubmitPage();")

var button_view_story = userpanel
.append("div")
.append("input")
.attr("class","btn btn-primary")
.attr("type","button")
.attr("value","View Story")
.style("position","absolute")
.style("top","40px")
.style("z-index","1")
.attr("onclick","setArticleBodyHTML();")

var button_fullscreen = userpanel
.append("div")
.append("input")
.attr("class","btn btn-primary")
.attr("type","button")
.attr("value","Fullscreen")
.style("position","absolute")
.style("top","80px")
.style("z-index","1")
.attr("onclick","toggleScreen();")

// var button_fullscreen = userpanel
// .append("div")
// .append("input")
// .attr("class","btn btn-primary")
// .attr("type","button")
// .attr("value","Exitscreen")
// .style("position","absolute")
// .style("top","120px")
// // .style("left",winWidth/2+"px")
// .style("z-index","1")
// .attr("onclick","exitFullscreen();")
var user_profile = userpanel
.append("div")
.style("position","absolute")
.style("top","120px")
// .style("width","380px")
.style("display","table")
.append("ul")
.attr("class","nav nav-pills nav-stacked")

var toggle_screen = true;
function toggleScreen(){
	if (toggle_screen) {
		launchIntoFullscreen(document.body);
		button_fullscreen.attr("value","ExitFullScreen");
	} else {
		exitFullscreen();
		button_fullscreen.attr("value","FullScreen");
	}
	toggle_screen ^= true;
}

update_userpanel();

function update_userpanel(){
	user_profile.remove();
	addUserPanel();
}


function addUserPanel() {
	user_profile = userpanel
	.append("div")
	.style("position","absolute")
	.style("top","120px")
	// .style("width","380px")
	.style("display","table")
	.append("ul")
	.attr("class","nav nav-pills nav-stacked")

	user_profile
	.append("li")
	// .append("a").attr("href","#")
	.append("span")
	.attr("class","glyphicon glyphicon-user badge pull-left")
	.text("ProfileName: "+ProfileName)

	user_profile
	.append("li")
	// .attr("class","active")
	// .append("a").attr("href","#")
	.append("span")
	.attr("class","glyphicon glyphicon-user badge pull-left")
	.text("UserLevel: Ultimate")

	user_profile
	.append("li")
	// .append("a").attr("href","#")
	.append("span")
	.attr("class","glyphicon glyphicon-pencil badge pull-left")
	.text("EditProfile")

	user_profile
	.append("li")
	// .append("a").attr("href","#")
	.append("span")
	.attr("class","glyphicon glyphicon-cog badge pull-left")
	.text("Setting")

	user_profile
	.append("li")
	// .append("a").attr("href","#")
	.append("span")
	.attr("class","glyphicon glyphicon-hand-up badge pull-left")
	.text("VoteCase: "+VoteCase)

	user_profile
	.append("li")
	// .append("a").attr("href","#")
	.append("span")
	.attr("class","glyphicon glyphicon-paperclip badge pull-left")
	.text("LinksContributed: "+LinksContributed)

	user_profile
	.append("li")
	// .append("a").attr("href","#")
	.append("span")
	.attr("class","glyphicon glyphicon-plus-sign badge pull-left")
	.text("TopticAdded: "+TopticAdded)

}

