var fontSize = 12;
var toggle = false;
var k = 1;
var n=1;
var circle = null;
var data_json = null;
var selectedCircle = null;
var foreignObjects_g = null;
var node = null;
var root = null;
var focus = null,
        nodes = null,
        view;

var transform = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(function (p, v) {
        return v + "transform" in document.body.style ? v : p;
    }) + "transform";


load_data("data/data.json");

function load_data(datafile) {

    d3.json(datafile, function (error, data) {
        if (error) return console.error(error);
        root = data;
        data_json = root;

        focus = root,
            nodes = pack.nodes(root),
            view;
        run_app();
    });
}


function run_app() {

    data_json = root;
        focus = root,
        nodes = pack.nodes(root),
        view;

    // console.log(data_json.children.length," data_json:",data_json.children);
    TopticAdded = data_json.children.length;

    LinksContributed = 0;
    for (var child in data_json.children) {
        LinksContributed +=data_json.children[child].children.length;
    }

    VoteCase = 0;
    for (var child in data_json.children) {
        for  (var child_ in data_json.children[child].children) {
            VoteCase +=parseInt(data_json.children[child].children[child_].voteUpScore);
            VoteCase +=parseInt(data_json.children[child].children[child_].voteDownScore);
        }
    }

    update_userpanel();

    // var circle_svg = svg
    // .append("svg")
    // .attr("x",0)
    // .attr("y",0)
    // .attr("width","100%")
    // .attr("height","100%")
    // .attr("fill","black")

    // var circle_test = svg.append("g")
    // .attr("transform", "translate("+diameter/-2+","+diameter/-2+")")
    // .append("foreignObject")
    // .attr("width",diameter/6)
    // .attr("height",diameter/6)
    // .style("background","red")
    // .append("xhtml:body")
    // .attr("xmlns","http://www.w3.org/1999/xhtml")
    // .style("width","100%")
    // .style("height","100%")
    // .style("opacity",1)
    // .style("background","red")
    // .html('<div>Here is a <strong>paragraph</strong> that requires <em>word wrap</em></div>')

    circle = svg.selectAll("circle")
    .data(nodes).enter()
    .append("circle")
    // circle_all = circle.append("g")
    // .attr("transform", "translate("+diameter/-2+","+diameter/-2+")")
    // circle_g = circle_all.append("circle")
    .attr("r",function (d) {return d.r;})
    .attr("class", function (d) {
        return d.depth == 1 ? d.children ? "node" : "node node--root" : "node node--leaf node-no-event";
    })
    // .attr("class", function(d) {  d.children ? "node node--leaf" : "node node--root"; })
    // .style("fill", function (d) {
    //     return d.children ? color(d.depth) : null;
    // })
    // .attr("fill", function (d) {
    //     if (d.depth == 0) return "rgba(117, 220, 205, 0.2);";
    //     return d.children ? color(d.depth) : null;
    // })
    //
    // .style("fill-opacity", function (d) {
    //     return d.depth > 1 ? 0 : 1;
    // })

    .on("click", moveTo)
    /*.style("fill", function(d) { return d.depth === 1 ? color(d.depth) : "url(#bgImage)"; })*/
    // .on("click", function(d) { if (focus !== d) moveTo(d), d3.event.stopPropagation(); });
    // .on("mouseover", 
    //   function(d){
    //     storytileBg = "url('http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/10/7/1412658540311/8bc43f3a-8bff-4276-8538-2c434f166a34-140x84.jpeg')";
    //     circleBg = storytileBg;
    //     storytileWidth=(d.r*2+"px");storytileHeight=storytileWidth;headline=d.name;
    //     circleSize=(d.r*2+"px");topictitle=d.name;
    //     update_story_page_small();
    //     update_story_page_circle();
    //     // update_story_page_detail();
    //      d3.select(this).style("fill", color(2));})
    // .on("mouseout", 
    //   function(d){
    //     storytileBg = "url('images/oscar-background.jpg')";
    //     circleBg = storytileBg;
    //     storytileWidth=(d.r*2+"px");storytileHeight=storytileWidth;
    //     headline=d.name;circleSize=(d.r*2+"px");topictitle=d.name;
    //     update_story_page_small();
    //     update_story_page_circle();
    //     // update_story_page_detail();
    //      d3.select(this).style("fill", color(3));})


    foreignObjects_g = svg.selectAll("g")
    .data(nodes).enter()
    .append("g")
    .on("click", moveTo)
    // .attr("x",function (d){return -d.r;})
    // .attr("y",function (d){return -d.r;})
    .attr("transform", "translate(0,0)")
    .append("foreignObject")
    // .transition().duration(3000).ease("elastic")    // foreignObject
    // .transition().duration(3000).ease("elastic")
    // .attr("transform", function (d) {return "translate(" + (d.x - root.x) * k + "," + (d.y - root.y) * k + ")";})
    // .attr("r",function (d){
    //     if (d.depth==0) return d.r*2;
    //     // if (d.depth==1) return -d.r;
    //     // if (d.depth==2) return -75;
    //     // return -d.r;
    // })
    .attr("x",function (d){
        if (d.depth==0) return -d.r*(2.75)/2;
        if (d.depth==1) return -d.r;
        if (d.depth==2) return -75;
        return -d.r;
    })
    .attr("y",function (d){
        if (d.depth==0) return -d.r*(2.75)/2;
        if (d.depth==1) return -d.r;
        if (d.depth==2) return -35;
        return -d.r;
    })

    // .attr("width",function (d){return d.r*2;})
    // .attr("height",function (d){return d.r*2;})
    // .style("font-size","16px")
    // .style("background","rgba(139,255,123,0.5)")
    // .style("fill-opacity",0)
    // .on("click", moveTo)
    // .on("mouseover", 
    //   function(d){
    //     if (d.depth==0){return;}
    //     storytileBg = "url('http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/10/7/1412658540311/8bc43f3a-8bff-4276-8538-2c434f166a34-140x84.jpeg')";
    //     circleBg = storytileBg;
    //     storytileWidth=(d.r*2+"px");storytileHeight=storytileWidth;headline=d.name;
    //     circleSize=(d.r*2+"px");topictitle=d.name;
    //     update_story_page_small();
    //     update_story_page_circle();
    //     // update_story_page_detail();
    //      d3.select(this).style("fill", color(2));})
    // .on("mouseout", 
    //   function(d){
    //     if (d.depth==0){return;}
    //     storytileBg = "url('images/oscar-background.jpg')";
    //     circleBg = storytileBg;
    //     storytileWidth=(d.r*2+"px");storytileHeight=storytileWidth;
    //     headline=d.name;circleSize=(d.r*2+"px");topictitle=d.name;
    //     update_story_page_small();
    //     update_story_page_circle();
    //     // update_story_page_detail();
    //      d3.select(this).style("fill", color(3));})
    .append("xhtml:body")
    .attr("xmlns","http://www.w3.org/1999/xhtml")
    // .style("width","100%")
    // .style("height","100%")
    .style("opacity", function (d) {
        return (d.depth==0) ? 0 : 1;
    })

    // .style("visibility", function (d) {
    //     return (d.depth==0)||(d.depth==2) ? "hidden" : "visible";
    // })

    update_view_data();

    

    // var text = svg.selectAll("text")
    // .data(nodes).enter()
    // .append("text")
    // .attr("class", "label label-primary")
    // .style("font-size", fontSize)
    // .style("fill-opacity", function (d) {
    //     return d.parent === root ? 1 : 0;
    // })
    // // .style("display", function(d) { return d.parent === root ? null : "none"; })
    // .text(function (d) {
    //     return d.name;
    // });
    // .append("tspan")
    // .attr("x",10);
    circle.style("fill-opacity",function(dd){return dd.depth==0? 1:0;});
    // text.style("fill-opacity",0);


    // var rect = svg.selectAll("rect")
    // .append("rect")
    // .attr("width","100%")
    // .attr("height","100%")
    // .attr("x","-50%")
    // .attr("y","-50%")
    // .attr("fill","blue")


    // var node = svg.selectAll("rect,circle,text,g");
    node = svg.selectAll("circle,g");

    

    d3.select("body").style("background", color(-1));
    // .on("click", function() { zoom(root); });
    zoomTo([root.x, root.y, root.r * 2 + margin]);


    node.style("visibility", function (dd) {
        return (dd.depth <= 1) ? "visible" : "hidden";
    })

    

    function moveTo(d) {
        
        selectedCircle = d;

        // console.log(d.depth, node);
        // console.log("d:", d);
        // console.log("node:",node);
        var radius0 = diameter * 2;
        d[0] = d3.event.x / 2;
        d[1] = diameter / 4;

        // storytileWidth=(d.r*2+"px");storytileHeight=storytileWidth;headline=d.name;update_story_page_small();
        // circleSize=(d.r*2+"px");topictitle=d.name;update_story_page_circle();

        // update_view_data();
        
        if (selectedCircle.depth == 1) {
            toggle ^= true;
            if (toggle) {
                node.transition().duration(2000).ease("elastic")
                .attr("transform", "translate(0,0)")
                .style("fill-opacity", function (dd) {
                    return (dd.depth == 0 || dd.name == selectedCircle.name) ? 1 : 0;
                })
                .style("visibility", function (dd) {
                    // if (dd.name == selectedCircle.name){console.log("name:",selectedCircle.name);}
                    return (dd.depth == 0 || dd.name == selectedCircle.name) ? "visible" : "hidden";
                })
                .transition().duration(1000)
                .style("visibility", function (dd) {
                    // if (dd.name == selectedCircle.name){console.log("name:",selectedCircle.name);}
                    return (dd.depth == 0 || (selectedCircle.children.indexOf(dd) != -1) || dd.name == selectedCircle.name) ? "visible" : "hidden";
                })
                .style("opacity", function (dd) {
                    return (dd.depth == 0 || (selectedCircle.children.indexOf(dd) != -1) || dd.name == selectedCircle.name) ? 1 : 0;
                })
                .attr("r", function (dd) {
                    return (dd.depth == 2 && (selectedCircle.children.indexOf(dd) != -1)) ? dd.r * 2 : dd.r;
                })
                .style("pointer-events", function (dd) {
                    // if (Object.is(dd.parent, selectedCircle)) {console.log("--true",dd)};
                    return ((selectedCircle.children.indexOf(dd) != -1) || dd.name == selectedCircle.name) ? "auto" : "none";
                })
                // .attr("r", 
                //   function(dd) { 
                //     // if (Object.is(dd.parent, selectedCircle)) {console.log("--true",dd)};
                //     return (Object.is(dd.parent, selectedCircle)) ? 
                //     "100" : "100"; })
                .attr("transform", function (dd) {
                    var x = 0,
                        y = 0,
                        t = 0,
                        i = 0,
                        a = 0;
                    if ((selectedCircle.children.indexOf(dd) != -1)) {
                        // console.log(
                        //     selectedCircle.parent.children.indexOf(selectedCircle),
                        //     dd.parent.children.valueOf(),
                        // selectedCircle.children.indexOf(dd),
                        // dd);
                        // x = a * cos(t) ; y = a * sin(t);
                        selectedCircle.children.sort(date_sort);

                        i = selectedCircle.children.indexOf(dd);
                        t = ((Math.PI / 180) * (i * 360 / selectedCircle.children.length) - Math.PI / 2);
                        // t = ((Math.PI/180) * (i*dd.r)-Math.PI/2);
                        a = diameter / 2.8;
                        x = a * Math.cos(t);
                        y = a * Math.sin(t) - margin*1.2; //+ (i*diameter/8);
                    };
                    return (selectedCircle.children.indexOf(dd) != -1) ? "translate(" + x + "," + y + ")" : "translate(0,0)";
                })
                
                foreignObjects_g.transition().duration(5000).ease("elastic")
                .style("opacity", function (d) {
                    return (d.depth==0)?1:(d.depth==2?0.8:1);
                })
                
            } else {
                node.transition().duration(2000).ease("elastic").style("fill-opacity", function (dd) {
                    return dd.depth > 1 ? 0 : 1;
                })
                .style("pointer-events", function (dd) {
                    return dd.depth == 1 ? "auto" : "none";
                })
                .style("visibility", function (dd) {
                    return (dd.depth <= 1) ? "visible" : "hidden";
                })
                .attr("transform", function (dd) {
                    return "translate(" + (dd.x - root.x) * k + "," + (dd.y - root.y) * k + ")";
                });
                // text.style("fill-opacity", function (dd) {
                //     return dd.depth == 1 ? 1 : 0;
                // });
                foreignObjects_g.transition().duration(5000).ease("elastic")
                .style("opacity", function (d) {
                    return (d.depth==0) ? 0 : 1;
                })
                storyPageMoveDown();
            }

        } else if (selectedCircle.depth == 2) {

            var dataVaild = selectedCircle.publishdate.replace(/\-/g, ' ');
            
            var oldData = new Date(selectedCircle.publishdate+"");
            // story_page_title.text(selectedCircle.name);
            // story_page_timestamp.text(oldData.toDateString());
            // story_page_source.text("Google News");
            // story_page_rate.text();
            topictitle = selectedCircle.name;
            headline = selectedCircle.headline;
            publishdate = time_format(oldData);
            publisher = selectedCircle.publisher;
            publisherimage = "url('"+selectedCircle.publisherimage+"')";
            vote_up_number = Math.floor(Math.random()*10);
            vote_up_number = parseInt(selectedCircle.voteUpScore);
            vote_down_number = parseInt(selectedCircle.voteDownScore);
            detailBg = "url('"+selectedCircle.backgroundimage+"')";
            articleBodyHTML = selectedCircle.bodyHTML;

            if (selectedCircle.publisher.length < 1) {
                publisher = "unknow";
            }
            if (selectedCircle.publishdate.length < 1) {
                publishdate = "unknow";
            }
            if (selectedCircle.voteUpScore.length < 1) {
                vote_up_number = "unknow";
            }
            if (selectedCircle.publisherimage.length < 1) {
                publisherimage = "unknow";
            }
            if (selectedCircle.backgroundimage.length < 1) {
                detailBg = "url('http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/10/7/1412658540311/8bc43f3a-8bff-4276-8538-2c434f166a34-140x84.jpeg')";
            }
            update_story_page_detail();
            // update_story_page_small();
            // update_story_page_circle();
            setArticleBodyHTML();

            console.log("d3.event.y:",d3.event.y,diameter/2);

            node.transition().duration(1000)
            .attr("transform", function (dd) {
                    var x = 0,
                        y = 0,
                        t = 0,
                        i = 0,
                        a = 0;
                    if ((selectedCircle.parent.children.indexOf(dd) != -1)) {
                        // console.log(
                        //     selectedCircle.parent.children.indexOf(selectedCircle),
                        //     dd.parent.children.valueOf(),
                        // selectedCircle.children.indexOf(dd),
                        // dd);
                        // x = a * cos(t) ; y = a * sin(t);
                        selectedCircle.parent.children.sort(date_sort);

                        i = selectedCircle.parent.children.indexOf(dd);
                        t = ((Math.PI / 180) * (i * 360 / selectedCircle.parent.children.length) - (Math.PI / 2));
                        // t = ((Math.PI/180) * (i*dd.r)-Math.PI/2);
                        d3.event.y > diameter/2? t+=0.1*(n++):t-=0.1*(n++);
                        
                        a = diameter / 2.8;
                        x = a * Math.cos(t);
                        y = a * Math.sin(t) - margin*1.2; //+ (i*diameter/8);
                    };
                    return (selectedCircle.parent.children.indexOf(dd) != -1) ? "translate(" + x + "," + y + ")" : "translate(0,0)";
                })

        }
        circle.style("opacity",function(dd){return dd.depth==0? 1:0;});
        // text.style("opacity",0);

    }

    function zoom(d) {
        var focus0 = focus;
        focus = d;

        // var transition = d3.transition()
        //     .duration(d3.event.altKey ? 7500 : 750)
        //     .tween("zoom", function(d) {
        //       var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
        //       return function(t) { zoomTo(i(t)); };
        //     });
        // d3.selectAll("text").filter(function (d) {
        //     return d.parent === focus || this.style.display === "inline";
        // }).style("fill-opacity", function (d) {
        //     return d.parent === focus ? 1 : 0;
        // })
        // .each("start", function(d) { if (d.depth === 1) this.style.display = "inline"; })
        // .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function zoomTo(v) {
        var k = diameter / v[2];
        view = v;
        node.transition().duration(1000).attr("transform", "translate(0,0)")
        node.transition().duration(1000).attr("transform", function (d) {
            return d.depth > 1 ? "translate(0,0)" : "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
        });

        circle.attr("r", function (d) {
            return d.r * k;
        });
    }

    function windowResize() {
        // storyPageClose("back",1,1);
        // allCirclesMoveToEdge();
        k=1;
        if ($(window).height() <= $(window).width()) {
            diameter = $(window).height();
            winWidth = $(window).width();
        } else {
            diameter = $(window).width();
            winWidth = $(window).width();
        }
        d3.select("svg").attr("width", "100%").attr("height", diameter)
        // .attr("transform", "translate(" + winWidth / 2 + "," + diameter / 2 + ")");
        pack.size([diameter - margin, diameter - margin])
        // .value(function(d) { return d.size; });
        // zoomTo([root.x, root.y, (root.r*2+margin)]);

        // circle.attr("r",function (d) {return d.r;});

        svg.transition().duration(1000)
        .attr("transform", "translate(" + winWidth / 2 + "," + diameter / 2 + ")")
        update_view_data();

        // node.transition().duration(2000).ease("elastic")
        // .style("opacity", function (dd) {
        //     return dd.depth > 1 ? 0 : 1;
        // })
        // updateAll();

        // .style("pointer-events", function (dd) {
        //     return dd.depth == 1 ? "auto" : "none";
        // })
        // .style("visibility", function (dd) {
        //     return (dd.depth <= 1) ? "visible" : "hidden";
        // })
        // // .attr("transform", function (dd) {
        // //     return "translate(" + (dd.x - root.x) * 1 + "," + (dd.y - root.y) * 1 + ")";
        // // });
        // text.style("fill-opacity", function (dd) {
        //     return dd.depth == 1 ? 1 : 0;
        // });

                // node.attr("r",function (d) {return d.r;})
        // foreignObjects_g.html(
        // function (d){
        //     var visibility = "visibility:hidden;";
        //     (d.depth==0||d.depth > 1) ? visibility=visibility : visibility = "visible";

        //     var depth_1_html = '<div class="topiccircle" style="position:fixed;width: '+d.r*2+'px; height: '+d.r*2+'px;'+'" ><div class="topiccontainer"><div class="topictitle"><h2 style="font-size:16px;">'+d.name+'</h2></div></div></div>';

        //     var depth_2_html = '<div class="storytile" style="position:fixed;width: '+150+'px; height: '+150+'px;background:'+storytileBg+';"><div class="voting-buttons"><a href="#up" class="upvote-link"><div class="upvote"></div></a><a href="#down" class="downvote-link"><div class="downvote"></div></a></div><a href="#" class="story-link"><div class="tile-container"><h3 class="headline">'+d.name+'</h3><div class="meta-details"><span class="publisher the-guardian">The Guardian</span><span class="publishdate">2 days ago</span></div></div></a></div>';
        //     return d.depth==1 ? d.depth==2 ? depth_1_html:depth_1_html:depth_2_html;
        // })

    };
    $(window).resize(function () {windowResize();});

    function allCirclesMoveToCenter() {
        node.transition().duration(1000)
        .attr("transform", "translate(0,0)")
        .style("fill-opacity", function (dd) {
            return (dd.depth == 0 || dd.name == selectedCircle.name) ? 1 : 0;
        })
        .style("visibility", function (dd) {
            // if (dd.name == selectedCircle.name){console.log("name:",selectedCircle.name);}
            return (dd.depth == 0 || dd.name == selectedCircle.name) ? "visible" : "hidden";
        })
    }
    function allCirclesMoveToEdge() {
        // console.log("selectedCircle",selectedCircle);
        // console.log("parent",selectedCircle.parent);
        node.transition().duration(2000).ease("elastic")
        .attr("transform", function (dd) {
        var x = 0,
            y = 0,
            t = 0,
            i = 0,
            a = 0;
        if ((selectedCircle.parent.children.indexOf(dd) != -1)) {
            i = selectedCircle.parent.children.indexOf(dd);
            t = ((Math.PI / 180) * (i * 360 / selectedCircle.parent.children.length) - Math.PI / 2);
            a = diameter / 2.4;
            x = a * Math.cos(t);
            y = a * Math.sin(t); 
        };
        return (selectedCircle.parent.children.indexOf(dd) != -1) ? "translate(" + x + "," + y + ")" : "translate(0,0)";
    })
    }

    // circle.exit().remove();
    // foreignObjects_g.exit().remove();
    // node.exit().remove();
}



var tempToggle = true;
function updateAll() {
    clearAll();
    tempToggle ? load_data("data/data.json"):load_data("data/data3.json");
    // update_view_data();
}

function clearAll() {
    circle.remove();
    foreignObjects_g.remove();
    node.remove();
}


function update_vote_data() {
    foreignObjects_g.attr("r",function(d){
        if (selectedCircle === d) {
            d.voteUpScore = vote_up_number;
            d.voteDownScore = vote_down_number;
            update_view_data();
            // console.log("selectedCircle:",selectedCircle);
        }
    })
}

function update_view_data() {
        foreignObjects_g.html(
        function (d){
            var publishdate = "";
            var oldData = new Date(d.publishdate+"");

            // var nowDate = new Date();
            // var years = nowDate.getFullYear() - oldData.getFullYear();
            // var month = nowDate.getMonth() - oldData.getMonth();
            // var days = nowDate.getDate() - oldData.getDate();
            // var mins = nowDate.getMinutes() - oldData.getMinutes();
            // var seconds = nowDate.getSeconds() - oldData.getSeconds();
            // if (years>1){publishdate+=years+" years ";} else if (years==1){publishdate+=years+" year ";}
            // if (month>1){publishdate+=month+" months ";} else if (month==1){publishdate+=month+" month ";}
            // if (days>1){publishdate+=days+" days ";} else if (days==1){publishdate+=days+" day ";}
            // if (mins>1){publishdate+=mins+" mins ";} else if (mins==1){publishdate+=mins+" min ";}
            // if (seconds>1){publishdate+=seconds+" seconds ";} else if (seconds==1){publishdate+=seconds+" seconds ";}
            // publishdate += " ago";

            publishdate = time_format(oldData);

            d.publishdate = oldData.toUTCString();
            //publishdate = oldData.toUTCString();

            var headline = "";
            var topicname = "";
            var limited = 40;
            var size = 160;
            if (d.headline != null) {
                headline = d.headline;
                if (d.headline.length > limited) {
                    headline = d.headline.substring(0, limited);
                    headline += "...";
                }
            }

            if (d.name != null) {
                topicname = d.name;
                if (d.name.length > limited/2) {
                    topicname = d.name.substring(0, limited/2);
                    topicname += "...";
                }
            }

            

            var visibility = "visibility:hidden;";
            (d.depth==0||d.depth > 1) ? visibility=visibility : visibility = "visible";
            if (d.backgroundimage != null) {
                d.backgroundimage.length < 1 ? d.backgroundimage="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+" : d.backgroundimage = d.backgroundimage;
            }

            var depth_0_html = '<div class="topiccircle" style="background:url(\''+d.backgroundimage+'\');position:fixed;width: '+d.r*2.75+'px; height: '+d.r*2.75+'px;background-size: cover;border: 0px" ></div>';

            var depth_1_html = '<div class="topiccircle" onclick="moveTo();" style="background:url(\''+d.backgroundimage+'\');position:fixed;width: '+d.r*2+'px; height: '+d.r*2+'px;background-size: cover;" ><div class="topiccontainer"><div class="topictitle"><h2 style="font-size:16px;">'+d.name+'</h2></div></div></div>';

            var depth_2_html = '<div class="storytile" onclick="moveTo();" style="position:fixed;width: '+size+'px; height: '+size+'px;background:url(\''+d.backgroundimage+'\');background-size: cover;"><div class="voting-buttons"><a href="javascript:void(0)" onclick="voteUpNoClose();" class="upvote-link"><div class="upvote" ><span class="badge pull-right" style="position: relative;top: 12px;">'+d.voteUpScore+'</span></div></a><a href="javascript:void(0)" onclick="voteDownNoClose();" class="downvote-link"><div class="downvote"><span class="badge pull-right">'+d.voteDownScore+'</span></div></a></div><a href="javascript:void(0)" onclick="moveTo();" class="story-link"><div class="tile-container"><h3 class="headline">'+headline+'</h3><div class="meta-details"><span class="publisher the-guardian" style="background:url(\''+d.publisherimage+'\');background-size: 20px;padding-left: 25px;background-repeat: no-repeat;">'+d.publisher+'</span><span class="publishdate">'+publishdate+'</span></div></div></a></div>';
            return d.depth==1 ? depth_1_html:(d.depth==2 ? depth_2_html:depth_0_html);
        })
}