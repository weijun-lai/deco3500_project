var margin = 20,
    size = 10,
    diameter = $(window).height(),
    winWidth = $(window).width();

if ($(window).height() <= $(window).width()) {
    diameter = $(window).height();
    winWidth = $(window).width();
} else {
    diameter = $(window).width();
    winWidth = $(window).width();
}


var color = d3.scale.linear().domain([-1, 5]).range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
.interpolate(d3.interpolateHcl);

var pack = d3.layout.pack().padding(2).size([diameter - margin, diameter - margin])
.value(function (d) {
    return d.size;
})

var userpanel = d3.select("body")
.append("div")
.style("position","absolute")
.style("top","0px")
.style("z-index","1")

var svg_g = d3.select("body").append("svg")
  .attr("width", "100%").attr("height", diameter)
  
var svg = svg_g.append("g")
  .attr("transform", "translate(" + winWidth / 2 + "," + diameter / 2 + ")");


addJS("js/userpanel.js");
addJS("js/storyPage.js");
addJS("js/data.js");

