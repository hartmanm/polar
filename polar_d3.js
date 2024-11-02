var screen_width=screen.availWidth;
var width = Math.floor(parseInt((screen_width*0.35)));
var height = Math.floor(parseInt((screen_width*0.35)));
var radius = Math.min(width, height);

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

function interpolate(a, b) {
var i = d3.interpolateString(a, b);
return function(t) {
return d3.hsl(i(t));};}