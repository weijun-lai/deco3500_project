

  var sPageWidth = diameter/1.25;
  var sPageHeight = diameter/1.1;


  var topictitle = "This topic is trending and has a long title";
  var headline = "Apple unveils iPhone 6 and iPhone 6 Plus - video";
  var publishdate = "2 days ago";
  var publisher = "The Guardian";
  var publisherimage = "url('../images/the-guardian.png');";
  var vote_up_number = 0;
  var vote_down_number = 0;

  var circleSize = "150px";
  var circleBg = "url('images/oscar-background.jpg')";

  var storytileWidth = "200px";
  var storytileHeight = "200px";

  var storytileBg = "url('http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/10/7/1412658540311/8bc43f3a-8bff-4276-8538-2c434f166a34-140x84.jpeg')";

  var detailWidth = diameter/1.25;
  var detailHeight = "25%";
  var articletitle = "This topic is trending and has a long title";
  var detailBg = "url('http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/10/7/1412658540311/8bc43f3a-8bff-4276-8538-2c434f166a34-140x84.jpeg')";

  var articleBodyHTML = articleExampleHTML;


  var story_page_g = d3.select("svg").append("g")
    .attr("transform", "translate("+0*winWidth/4+"," + -diameter*1.5 + ")");
    
  var story_page_svg = story_page_g
    .append("svg")
    .attr("width","100%")
    .attr("height","100%")

  var story_page = story_page_svg.append("g")
    .attr("x",0)
    .attr("y",0)

  var story_page_detail_svg = story_page
    .append("svg")
    .attr("width", "100%")
    .attr("height", diameter)
    .attr("x",0)
    .attr("y",0)


  var story_page_detail_foreignObject = story_page_detail_svg
      .append("foreignObject")
      .attr("x","25%")
      .attr("y",0)
      .attr("width","50%")
      .attr("height","100%")
      
  var story_page_detail = story_page_detail_foreignObject
      .append("xhtml:body")
      
    var story_page_detail_tile_newsarticle = story_page_detail
    .append("div")
    .attr("class","newsarticle")
    
    .style("width",sPageWidth)
    .style("position","fixed")

    
    var story_page_detail_tile_articleheader = story_page_detail_tile_newsarticle
    .append("div")
    .attr("class","articleheader")
    .style("height","150px")
    .style("position","relative")
    .style("background",detailBg)
    .style("background-size","cover")

    var story_page_detail_tile_container = story_page_detail_tile_articleheader
    .append("div")
    .attr("class","headercontainer")
    .on("click", storyPageMoveDown)

    story_page_detail_tile_container
    .append("button")
    .attr("type","button")
    .attr("class","btn btn-primary")
    .attr("onclick","storyPageMoveDown();")
    .style("position","fixed")
    .style("right","15px")
    .html("Close");


    var story_page_detail_meta_details = story_page_detail_tile_container
    .append("div")
    .attr("class","meta-details")

    var story_page_detail_headline = story_page_detail_meta_details
    .append("h3")
    .attr("class","headline")
    .text(headline);

    var story_page_detail_publishdate = story_page_detail_meta_details
    .append("span")
    .attr("class","publishdate")
    .text(publishdate);

    var story_page_detail_publisher = story_page_detail_meta_details
    .append("span")
    .attr("class","publisher the-guardian")
    .style("background-image",publisherimage)
    .style("background-size","20px")
    .style("padding-left","25px")
    .text(publisher);

    var story_page_detail_articlescore = story_page_detail_meta_details
    .append("span")
    .attr("class","articlescore")
    
    var story_page_detail_actualscore = story_page_detail_articlescore
    .append("span")
    .attr("class","actualscore")
    .text(vote_up_number);

     var story_page_detail_actualscore_down = story_page_detail_articlescore
    .append("span")
    .text("/"+vote_down_number);


    var story_page_detail_articlecontent = story_page_detail_tile_newsarticle
    .append("div")
    .attr("class","articlecontent")
    .style("height",(diameter-210)+"px")
    .style("opacity",1);

    var story_page_detail_contentcontainer = story_page_detail_articlecontent

    .append("div")
    .attr("class","contentcontainer")
    .style("background","white")
    .style("color","black")
    .style("padding","10px")
    .style("opacity",1)
    .html(articleBodyHTML)

    var articlefooter = story_page_detail_tile_newsarticle
    .append("div")
    .attr("class","articlefooter")
    .style("background","rgb(48, 189, 103)")
    .style("height","0px")

    var footercontainer = articlefooter
    .append("div")
    .attr("class","footercontainer")
    .style("width","100%")
    .style("position","absolute")
    .style("height","70px")
    var footer_upvote = footercontainer
    .append("div")
    .attr("class","footer-upvote")
    .on("click", voteUp)
    .append("a")
    .append("span")
    .attr("class","upvote")
    .text("Upvote");

    var footer_downvote = footercontainer
    .append("div")
    .attr("class","footer-downvote")
    .on("click", voteDown)
    .append("a")
    .append("span")
    .attr("class","downvote")
    .text("Downvote");

    

  function storyPageClose(type,dx,dy) {
    story_page_detail_contentcontainer.html("");
    story_page_detail.transition().duration(1000).ease(type).style("opacity", 0)
    .attr("transform", "translate(0," + dy*diameter*1.2 + ")");

    story_page_g.transition().duration(1000).ease(type)
    .attr("transform", "translate(0," + dy*diameter*1.2 + ")")
    svg.transition().duration(1000)
        .attr("transform", "translate(" + winWidth / 2 + "," + diameter / 2 + ")")
  }

  function storyPageOpen() {
    story_page_detail.transition().duration(1000).ease("elastic").style("opacity", 1);
    story_page_g.transition().duration(2000).ease("elastic")
    .attr("transform", "translate(0,"+margin+")")
    update_story_page_detail();
    svg.transition().duration(1000)
        .attr("transform", "translate(" + winWidth + "," + diameter / 2 + ")")
  }

  function storyPageMoveDown(){
    storyPageClose("back",1,1);
  }

  function storyPageMoveUp(){
    storyPageClose("back",1,-1);
  }

  function voteUp() {
    voteUpNoClose();
    storyPageClose("back",1,-1);
  }

  function voteUpNoClose() {
    VoteCase++;
    vote_up_number>=0?vote_up_number++:0;
    update_story_page_detail();
    update_vote_data();
    update_userpanel();
  }

  function voteDown() {
    voteDownNoClose();
    storyPageClose("back",0,1);
  }

  function voteDownNoClose() {
    VoteCase++;
    vote_down_number>=0?vote_down_number++:0;
    update_story_page_detail();
    update_vote_data();
    update_userpanel();
  }
  function update_story_page_detail(){


    story_page_detail_tile_articleheader
    .style("background",detailBg)
    .style("background-size","cover")

    story_page_detail_headline
    .text(headline);

    story_page_detail_publisher
    .style("background-image",publisherimage)
    .text(publisher);

    story_page_detail_publishdate
    .text(publishdate);

    story_page_detail_actualscore
    .text(vote_up_number);

    story_page_detail_actualscore_down
    .text("/"+vote_down_number);

    story_page_detail_contentcontainer
    .html(articleBodyHTML);

  }


  function setArticleBodyHTML_SubmitPage() {
    footercontainer.style("opacity",0);
    story_page_detail_svg
    .attr("height", (diameter-diameter*0.05)+"px")
    story_page_detail_articlecontent
    .style("height",(diameter-diameter*0.05)+"px")
    .style("position","fixed")
    .style("opacity",1);
    story_page_detail_tile_articleheader.style("height","0px")
    footercontainer.style("visibility","hidden")
    articleBodyHTML = submitPageHTML;
    update_story_page_detail();
    storyPageOpen();

    var topics = [];
    $("#inputTopic").empty();

    for (var children_ in root.children) {
      topics.push(root.children[children_].name);
    }
    for (var t in topics) {
      $("#inputTopic").append("<option value="+t+">"+topics[t]+"</option>");
    }
  }

  function setArticleBodyHTML() {
    footercontainer.style("opacity",1);
    story_page_detail_svg
    .attr("height", sPageHeight)
    story_page_detail_articlecontent
    .style("height",(diameter-150-diameter*0.18)+"px")
    .style("position","relative")
    .style("opacity",1);
    story_page_detail_tile_articleheader.style("height","151px")
    footercontainer.style("visibility","visible")
    storyPageOpen();
  }

  function loginBodyHTML() {
    footercontainer.style("opacity",0);
    story_page_detail_svg
    .attr("height", (diameter-diameter*0.35)+"px")
    story_page_detail_articlecontent
    .style("height",(diameter-diameter*0.35)+"px")
    .style("position","fixed")
    .style("opacity",1);
    story_page_detail_tile_articleheader.style("height","0px")
    footercontainer.style("visibility","hidden")
    articleBodyHTML = loginHTML;
    storyPageOpen();
    if (loginState) {
      loginState = false;
      logoff();
    }
  }

  function login() {
    // alert($('#Username').val(),$('#Password').val());
    // console.log($('#Username').val(),$('#Password').val());
    //$('#info_label').text():$('#info_label').text();$('#Username').val()+" "+$('#Password').val());
    
    if (check_login()){
      loginState = true;
      $('#info_label').text("Login success.");
      button_login.attr("value","Logoff");
      storyPageMoveUp();
    } else {
      loginState = false;
      $('#info_label').text("Login Failure. Tips:Username:demo,Passwd:123456");
     logoff();
    }
    
  }

  function check_login(){
    var username = $('#Username').val();
    var password = $('#Password').val();
      console.log("data_user_json ",data_user_json);
    for (var user in data_user_json.users) {
      // console.log(user,data_user_json.username[user].passwd,data_user_json.username[user].level);
      
      if (data_user_json.users[user].username == username &&
        password == data_user_json.users[user].passwd
        ) {
        ProfileName = username;
        VoteCase = data_user_json.users[user].VoteCase;
        LinksContributed = data_user_json.users[user].LinksContributed;
        TopticAdded =data_user_json.users[user].TopticAdded;
        UserLevel = data_user_json.users[user].level;
        updateUserpanel();
        return true;
      }
    }
    return false;
  }

  function logoff(){
     button_login.attr("value","Login");
      ProfileName = "NoAccount";
        VoteCase = 0;
        LinksContributed = 0;
        TopticAdded =0;
        UserLevel = 0;
        updateUserpanel();
  }

  function sigin_newuser(){
    var username = $('#Username').val();
    var password = $('#Password').val();
    console.log(username,password);
      
    if (!check_login() && username.length>0 && password.length>0) {
      var newChildren = 
              {
                "username":username,
                "passwd": password,
                "level": "Newly",
                "VoteCase": "0",
                "LinksContributed":"0",
                "TopticAdded": "0"
              };
      console.log("newChildren ",newChildren);
      data_user_json.users.push(newChildren);
      console.log("data_user_json ",data_user_json.users);
      $('#info_label').text("NewUser:"+username+" signin success. You could login now.");
    } else {
      $('#info_label').text("Signin Failure.");
    }

  }

  function sumbitStory() {
   clearAll();
    
    console.log(
    $('#inputHeadline').val(),
    $('#inputStoryLink').val(),
    $('#inputPublisher').val(),
    $('#datetimepicker').val(),
    $('#inputPublisherimage').val(),
    $('#inputBackgroundimage').val(),
    $('#inputTopic').find(":selected").text()
       )
    var bodyhtml = "<iframe style='width:100%;height:100%;' src='"+$('#inputStoryLink').val()+"'></iframe>";

    var myJson = '{'
      +'"name" : "'+$('#inputTopic').find(":selected").text()+'",'
      +'"backgroundimage" : "'+$('#inputBackgroundimage').val()+'",'
      +'"children": ['
      +'{'
      +'"name" : "article",'
       +'"headline" : "'+$('#inputHeadline').val()+'",'
       +'"publisher"  : "'+$('#inputPublisher').val()+'",'
       +'"publisherimage" : "'+$('#inputPublisherimage').val()+'",'
       +'"publishdate" : "'+$('#datetimepicker').val()+'",'
       +'"voteUpScore" : "'+0+'",'
       +'"voteDownScore" : "'+0+'",'
       +'"backgroundimage" : "'+$('#inputBackgroundimage').val()+'",'
       +'"bodyHTML" : "'+bodyhtml+'",'
       +'"size" : "'+1+'"'
       +'}'
       +']'
       +'}';

    var newChildren = {
    "name":$('#inputTopic').find(":selected").text(),
    "backgroundimage":$('#inputBackgroundimage').val(),
    "children": [
            {
              "name": "article",
              "headline": $('#inputHeadline').val(),
              "publisher": $('#inputPublisher').val(),
              "publisherimage": $('#inputPublisherimage').val(),
              "publishdate": $('#datetimepicker').val(),
              "voteUpScore": "0",
              "voteDownScore": "0",
              "backgroundimage":  $('#inputBackgroundimage').val(),
              "bodyHTML": bodyhtml,
              "size": 1
            }
        ]
    };


    var counter = 0;
    for (var children_ in root.children) {
        if (root.children[children_].name == newChildren.name) {
            counter++;
            for (var newChild in newChildren.children) {
            root.children[children_].children.push(newChildren.children[newChild]);
            }
        }
    }
    counter==0? root.children.push(newChildren):counter=counter;
    storyPageMoveDown();
    run_app();
    update_view_data();
    return;
    

    var json = JSON.stringify(myJson);
    var encoded = btoa(json);

    console.log(myJson);
    console.log(encoded);

    alert("send:"+myJson);

    $.get( "sumbitStory.php?json="+myJson)
    .done(function( data ) {
      alert( "Server response: " + data );
    });
    
  }
  

