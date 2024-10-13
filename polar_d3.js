var screen_width=screen.availWidth;
var width = Math.floor(parseInt((screen_width*0.35)));
var height = Math.floor(parseInt((screen_width*0.35)));
var radius = Math.min(width, height);
var spacing = .09;
var formatSecond = d3.time.format("%S s");
var formatMinute = d3.time.format("%M m");
var formatHour = d3.time.format("%H h");

var color = d3.scale.linear()
.range(["hsl(-180,50%,50%)", "hsl(180,50%,50%)"])
.interpolate(interpolateHsl);

var arc = d3.svg.arc()
.startAngle(0)
.endAngle(function(d){return d.value * 2 * Math.PI;})
.innerRadius(function(d){return d.index * radius;})
.outerRadius(function(d){return (d.index + spacing) * radius;});

var svg = d3.select("#chart").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
if(document.getElementById("chart")){
document.getElementById("chart").align = "center";
var rotation_direction = 1;
var flip_rotation = document.getElementById("chart");
flip_rotation.addEventListener("click", function(e){var target = e.target || e.srcElement; switch_rotation()}, false);
//console.log("in switch_rotation: " + rotation_direction);
};

var field = svg.selectAll("g")
.data(fields)
.enter().append("g");

field.append("path");
d3.transition().duration(0).each(tick);
d3.select(self.frameElement).style("height", height + "px");

function tick(){
field = field
.each(function(d) {this._value = d.value;})
.data(fields)
.each(function(d) {d.previousValue = this._value;});

field.select("path")
.transition()
.ease("elastic")
.attrTween("d", arcTween)
.style("fill", function(d) {return color(d.value);});

setTimeout(tick, 1000 - Date.now() % 1000);}

function number(a, b){
if (rotation_direction == 0){a = -a, b = -b;} // change direction to counter clockwise
if (rotation_direction == 1){a = +a, b = +b;} // default clockwise
return function(t){
return a * (1 - t) + b * t;};}

function switch_rotation(){
//console.log("in switch_rotation in: " + rotation_direction);
if(rotation_direction === 0){rotation_direction = 1}
else if(rotation_direction === 1){rotation_direction = 0}

//console.log("in switch_rotation out: " + rotation_direction);
}

function arcTween(d){
//var i = number((d.value + (d.value - d.previousValue)), d.value);  // tween back half a second
var i = number(d.previousValue, d.value);
return function(t){
d.value = i(t);
return arc(d);};}

function fields(){
var now = new Date;
return [
{index: .3,
value: now.getSeconds() / 60},
{index: .2,
value: now.getMinutes() / 60},
{index: .1,
value: now.getHours() / 24}];}

function interpolateHsl(a, b) {
var i = d3.interpolateString(a, b);
return function(t) {
return d3.hsl(i(t));};}