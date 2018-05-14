var items = [["Fuji Apples", 5, false], ["Jonathan Apples", 4.5, true],['Carrots',1.5,false],['Bananas',2.5,true],['Long Beans',7,false],['Brushed Potatoes',5,false],['Nectarines (Yellow)',3.5,true],['Washed Potatoes',6,false],['Butter Beans',7,false],['Strawberries',4,true],['Nectarines (White)',3.5,false]]
var current = []
//SEARCH

function addCurrentToScreen() {
    for (var i = 0; i < current.length; i ++) {
        addItemToScreen(current[i])
    }
    deleteA()
    toggleSale()
}
function addItemToScreen(item) {
    var newElement = "<article><ul><li>" + item[0] + "</li><li>"+ prettyPrice(item[1]) + "</li>"
    if (item[2]) {
        newElement += "<li>"+prettyPrice(item[1]*.75)+"</li>"
    }
    else {
        newElement += "<li>N/A</li>"
    }
    newElement += "<li>Toggle</li><li>Delete</li></ul></article>"
    $("section").html($("section").html() + newElement)
}
function prettyPrice(x) {
    return "$" + Math.floor(x) + "." + (((x%1).toString())+"0000").substr(2,2)
}
function clearScreen() {
    $("section").html("<div><ul><li>Fruit</li><li>Price</li><li>Sale Price</li><li>Toggle Sale</li><li>Delete</li></ul></div>")
}
function sortedVersion(byName) {
    var mini = ""
    if(byName) {
        for(var i =0;i<current.length;i++) {
            mini = i;
            for (var j=i+1;j<current.length;j++) {
                if (current[mini][0].toLowerCase()>current[j][0].toLowerCase()) {
                    mini = j
                }
            }
            var holder = current[mini]
            current[mini] = current[i]
            current[i] = holder
        }
    }
    else {
        for(var i =0;i<current.length;i++) {
            mini = i;
            for (var j=i+1;j<current.length;j++) {
                if (current[mini][1]>current[j][1]) {
                    mini = j
                }
            }
            var holder = current[mini]
            current[mini] = current[i]
            current[i] = holder
        }
    }
    clearScreen()
    addCurrentToScreen()
}
function deleteA() {
    $("section article li:nth-child(5)").click(function() {
        var x = ($(this).parent().parent())
        var name = $($(x).children().children('li')[0]).html()
        $(x).remove()
        for(var i=0;i<items.length;i++) {
            if (items[i][0].toLowerCase() == name.toLowerCase()) {
                items.splice(i,1)
            }
        }
    })
}
function toggleSale() {
    $("section article li:nth-child(4)").click(function() {
        var name = $($(this).parent().children('li')[0]).html()
        for (var i = 0;i<items.length;i++) {
            if (items[i][0] == name) {
                if (items[i][2]) {
                    items[i][2] = false
                    $($(this).parent().children('li')[2]).html("N/A")
                }
                else {
                    items[i][2] = true
                    $($(this).parent().children('li')[2]).html(prettyPrice(items[i][1]*.75))
                }
            }
        }

    })
}
function filter(all, sale) {
    current = []
    if (all) {
        current = items
    }
    else if (sale) {
        for (var i =0;i<items.length;i++) {
            if (items[i][2]) {
                current.push(items[i])
            }
        }
    }
    else {
        for (var i =0;i<items.length;i++) {
            if (items[i][2] == false) {
                current.push(items[i])
            }
        }
    }
    clearScreen()
    addCurrentToScreen()
}
function search(string) {
    var searchS = string.toLowerCase()
    current = []
    for (var i=0;i<items.length;i++) {
        if ((items[i][0].toLowerCase()).includes(searchS)) {
            current.push(items[i])
        }
    }
    clearScreen()
    addCurrentToScreen()
}
function addItem() {
    if ($('#name').val().length > 0) {
        $('#name').css("background", '#fff')
        var x = [$('#name').val(),parseFloat($('#price').val()),$('#onSale')[0].checked]
        items.push(x)
        clearScreen()
        addCurrentToScreen()
    }
    else {
        $('#name').css("background", '#c00')
    }

}
function addClickListeners() {
    $('aside div:nth-child(1)').click(function() {
        sortedVersion(true)
    });
    $('aside div:nth-child(2)').click(function() {
        sortedVersion(false)
    });
    $('aside div:nth-child(3)').click(function() {
        filter(true)
    });
    $('aside div:nth-child(4)').click(function() {
        filter(false,true)
    });
    $('aside div:nth-child(5)').click(function() {
        filter(false,false)
    });
    $('aside article h2:nth-child(2)').keyup(function() {
        search($('aside article h2:nth-child(2)').html())
    });
    $('#submit').click(function() {
        addItem()
    });
}

$(document).ready(function() {
    current = items
    addCurrentToScreen()
    addClickListeners()
});
