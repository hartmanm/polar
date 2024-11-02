const polar_transformation_copyright=`
Copyright (c) 2016 Michael Neill Hartman. All rights reserved.
mnh_license@proton.me
https://github.com/hartmanm
`

if(document.getElementById("chart")){
document.getElementById("chart").align = "center";
var rotation_direction = 1;
var flip_rotation = document.getElementById("chart");
flip_rotation.addEventListener("click", function(e){var target = e.target || e.srcElement; switch_rotation()}, false);
};

function number(a,b){
if (rotation_direction == 0){a = -a, b = -b;} // change direction to counter clockwise
if (rotation_direction == 1){a = +a, b = +b;} // default clockwise
return function(t){
return a*(1-t)+b*t;};}

function switch_rotation(){
if(rotation_direction === 0){rotation_direction = 1}
else if(rotation_direction === 1){rotation_direction = 0}
}
