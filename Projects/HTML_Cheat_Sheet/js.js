var col1inner;
var col2inner;
var col3inner;
var col4inner;
var col1innerb;
var col2innerb;
var maxWidth = 1081;
function resize() {
    var width = window.innerWidth;
    if (width < maxWidth) {
        document.getElementById("col1").innerHTML = col1inner;
        document.getElementById("col2").innerHTML = col2inner;
        document.getElementById("col3").innerHTML = "";
        document.getElementById("col4").innerHTML = "";
        document.getElementById("col1").style.width = "47%";
        document.getElementById("col2").style.width = "47%";
    } else {
        document.getElementById("col1").innerHTML = col1innerb;
        document.getElementById("col2").innerHTML = col2innerb;
        document.getElementById("col3").innerHTML = col3inner;
        document.getElementById("col4").innerHTML = col4inner;
        document.getElementById("col1").style.width = "23%";
        document.getElementById("col2").style.width = "23%";
    }
}
function run() {
    col1inner = document.getElementById("col1").innerHTML;
    col2inner = document.getElementById("col2").innerHTML;
    col3inner = document.getElementById("col3").innerHTML;
    col4inner = document.getElementById("col4").innerHTML;
    document.getElementById("table1").innerHTML = "";
    document.getElementById("list1").innerHTML = "";
    document.getElementById("format1").innerHTML = "";
    col1innerb = document.getElementById("col1").innerHTML;
    col2innerb = document.getElementById("col2").innerHTML;
    var x = window.setInterval(resize, 1);
}