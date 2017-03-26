var j, k, x;
var go = 0;
var dvds = ["Gravity 2013", "Frozen 2013", "The Lego Movie 2014", "Edge of Tomorrow 2014", "The Martian 2015"];
var dvdDivs = [];

function popUpLayout() {
    $('.popUp input').css({
        'left': '10px',
        'font-size': '5vw',
        'padding': '20px',
        'margin': '0',
        'margin-left': '5%'
    });
    $('.popUp #rightBut').css({
        'float': 'right',
        'margin-left': '0%',
        'margin-right': '10%'
    });
    $('.popUp h1').css({
        'text-align': 'center',
        'font-size': '4vw'
    });
    $('.popUp span').css({
        'background': 'PowderBlue',
        'padding': '2px'
    });
    $("#inputText").css({
        'width': '60%',
        'padding': '0',
        'background': '#ddd',
        'border': '0'
    });
    $("#goButton").css('padding', '0');
}
function run() {
    $(".returnButton").css({
        'right': window.innerWidth * .05,
    });
    $(".returnButton input").css({
        'width': window.innerWidth * .2,
    });
    $(".dvdHolder").css('height', window.innerHeight);
    $(".dvdOut").css('height', window.innerWidth * .3 * .8 * .8);
    $(".disc").css({
        'width': (window.innerWidth * .3 * .8 * .8) - 35,
        'height': (window.innerWidth * .3 * .8 * .8) - 35,
        'left': (window.innerWidth * .3 * .8 * .8) - ((window.innerWidth * .3 * .8 * .8) - 35) - 7.5,
        'top': (window.innerWidth * .3 * .8 * .8) - ((window.innerWidth * .3 * .8 * .8) - 35) - 15
    });
    $(".w").css('height', window.innerWidth * .3 * .8 * .8);
}
function dvdDiv(dvdName) {
    return "<div class='dvd' id='" + dvdName.replace(/\s/g, '') + "' onclick='remove(\""+dvdName.replace(/\s/g, '')+"\")'><div class='dvdSide'></div><p>" + dvdName + "</p></div>";
}
function layout() {
    $('body').css({
        'padding': '0px',
        'margin': '0px'
    });
    $(".returnButton").css({
        'position': 'fixed',
        'bottom': '10px'
    });
    $(".disc").css({
        'position': 'relative',
        'border-radius': '100%',
        'background': '#ddd'
    });
    $(".dvdHolder").css({
        'width': '70%',
        'margin': '0px',
        'background': 'khaki',
        'overflow': 'auto'
    });
    $(".dvdSlot").css({
        'position': 'relative',
        'left': '10%',
        'top': '5%',
        'width': '80%',
        'height': '40px',
        'background': 'grey'
    });
    $(".dvdOut").css({
        'position': 'relative',
        'left': '10%',
        'top': '50%',
        'width': '80%',
        'height': window.innerWidth * .3 * .8 * .8,
        'background': '#aaa',
        'display': 'none'
    });
    $(".dvd").css({
        'width': '150px',
        'height': '150px',
        'margin': '10px',
        'background': '#aaa',
        'display': 'inline-flex'
    });
    $(".dvd p").css({
        'font-size': '1.2em',
        'margin': '0 0 0 25px',
        'width': '125px',
        'padding': '5px 0 0 0px',
        'display': 'block',
        'overflow': 'auto'
    });
    $(".dvdSide").css({
        'width': '20px',
        'height': '150px',
        'margin': '0px',
        'background': '#444',
        'display': 'flex',
        'float': 'left'
    });
    $('.innerDisc').css({
        'position': 'relative',
        'width': '20%',
        'height': '20%',
        'top': '40%',
        'left': '40%',
        'border-radius': '100%',
        'background': '#555'
    });
    $(".moneyInput").css({
        'position': 'fixed',
        'right': '10%',
        'bottom': '10%'
    });
    $('.popUp').css({
        'top': '5%',
        'left': '5%',
        'position': 'fixed',
        'width': '60%',
        'height': '90%',
        'background': 'MediumSeaGreen',
        'display': 'none'
    });
    $(".rightContainer").css({
        'right': '0',
        'width': '30%',
        'height': '100%',
        'margin': '0px',
        'background': 'navy',
        'position': 'fixed',
        'top': '0'
    });
    $(".w").css({
        'word-break': 'break-all',
        'color': 'white',
        'overflow': 'hidden',
        'font-size': '22px',
        'text-align': 'center',
        'line-height': '19px'
    });
}
function cLose() {
    $('.popUp').css('display', 'none');
    $('.popUp').html("");
}
function money(id) {
    $('.popUp').html("<h1>Waiting on payment...</h1>");
    popUpLayout();
    setTimeout(function () {
        cLose();
        $(id).fadeOut(1000);
        $(".w").html($(id).children('p').html().replace(/\s/g, '<br><br>'));
        setTimeout(function () {
            $(id).remove();
            clearInterval(x);
            sortDvds();
            $(".dvdOut").slideDown(2000);
            setTimeout(function () {
                x = window.setInterval(run, 100);
            }, 2000)
        }, 2000);
    }, 3000);
}
function remove(id) {
    $('.popUp').css('display', 'block');
    $('.popUp').html("<h1>Are you sure you want to rent:<br><span>" + $('#'+id).children('p').html() + "</span></h1><input type='button' value='Yes' onclick='money(" + id + ")' /><input type='button' id='rightBut' value='No' onclick='cLose()' />");
    popUpLayout();
}
function sortDvds() {
    var hold, z, dvdDivs = [], dvdSorted = [];
    var lDVDID = $(".dvdHolder").children();
    for(j = 0;  j<lDVDID.length; j += 1) {
        dvdSorted.push($(lDVDID[j]).attr('id').toLowerCase());
        dvdDivs.push($(lDVDID[j]).children()[1].textContent);
        $(lDVDID[j]).remove();
    }
    for(j = 0; j<dvdSorted.length; j+=1) {
        for(k = j; k<dvdSorted.length; k+=1) {
            if(dvdSorted[k]<[dvdSorted[j]]) {
                hold = dvdDivs[k];
                dvdDivs[k] = dvdDivs[j];
                dvdDivs[j] = hold;
                
                hold = dvdSorted[k];
                dvdSorted[k] = dvdSorted[j];
                dvdSorted[j] = hold;
            }
        }
        dvds.push(dvdDivs[j]);
        $(".dvdHolder").html($(".dvdHolder").html() + dvdDiv(dvdDivs[j]));
    }
    layout();
}
$(document).ready(function () {
    var i;
    for (i = 0; i < dvds.length; i += 1) {
        $('.dvdHolder').html($('.dvdHolder').html() + dvdDiv(dvds[i]));
    }
    layout();
    sortDvds();
    x = window.setInterval(run, 100);
});
function takeDVD() {
    $(".dvdOut").fadeOut(1000);
}
function returnGo() {
    $('.dvdHolder').html($('.dvdHolder').html() + dvdDiv($("#inputText").val()));
    sortDvds();
    $('.popUp').css('display', 'none');
    $('.popUp').html("");
}
function returnDVD() {
    $('.popUp').css('display', 'block');
    $('.popUp').html("<h1>Which DVD are you returning: </h1><input type='text' id='inputText' placeHolder='DVD Name' /><input type='button' value='Go' onclick='returnGo()' />");
    popUpLayout();
}