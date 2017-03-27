var items = [["Fuji Apples", 5, false], ["Jonathan Apples", 4.5, true],['Carrots',1.5,false],['Bananas',2.5,true],['Long Beans',7,false],['Brushed Potatoes',5,false],['Nectarines (Yellow)',3.5,true],['Washed Potatoes',6,false],['Butter Beans',7,false],['Strawberries',4,true],['Nectarines (White)',3.5,false]]
//SORT FILTER SEARCH DELETE
$(document).ready(function() {
    for (var i = 0; i < items.length; i ++) {
        addItemToScreen(items[i][0],items[i][1],items[i][2])
    }
});
function addItemToScreen(name, price, onSale) {
    var newElement = "<article><ul><li>" + name + "</li><li>"+ prettyPrice(price) + "</li>"
    if (onSale) {
        newElement += "<li>"+prettyPrice(price*.75)+"</li>"
    }
    else {
        newElement += "<li>N/a</li>"
    }
    newElement += "<li>Delete</li></ul></article>"
    $("section").html($("section").html() + newElement)
}
function prettyPrice(x) {
    return "$" + Math.floor(x) + "." + (((x%1).toString())+"0000").substr(2,2)
}
function clearScreen() {
    $("section").html("<div><ul><li>Fruit</li><li>Price</li><li>Sale Price</li><li>Delete</li></ul></div>")
}
function sortedVersion(byName) {
    //if(byName)
}
