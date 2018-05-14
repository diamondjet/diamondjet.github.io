var tiles = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
var solved = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
var startTime, endTime, go = false, check, highscore = 0.0;

function gameBoardSetUp() {
    $('#gameboard').html("");
    var i, j, styleText;
    for (i = 0; i < 4; i += 1) {
        for (j = 0; j < 4; j += 1) {
            styleText = 'top:' + (i * 75) + 'px; left:' + (j * 75) + "px; position:absolute; height:75px; width:75px";
            $('#gameboard').html($('#gameboard').html() + '<div class="tile" style="' + styleText + '"><img src="src/img/' + tiles[i][j] + '.jpg" class="tile" id="' + i + j + '" style="width:75px; height:75px"></div>');
        }
    }
}
function preload() {
    $("*").css({
        'margin': '0',
        'padding': '0'
    });
    $("#but").click(function () {
        clearInterval(check);
        randomise();
        startTime = new Date().getTime();
        go = true;
        check = setInterval(function () {
            var message;
            $("#time").html("Current Time: " + (Math.round((new Date().getTime() - startTime) / 100))/10);
            if (solved.toString() === tiles.toString() && go) {
                endTime = new Date().getTime();
                timeTaken = (Math.round((endTime - startTime)/100))/10;
                $("#time").html("Current Time: " + timeTaken);

                if (timeTaken < highscore || highscore < 0.1) {
                    highscore = timeTaken;
                    Cookies.set("highScore", highscore, {expires: 100});
                }
                $("#high").html("&nbsp;&nbsp;&nbsp;Highscore: " + highscore);
                go = false;
                clearInterval(check);
            }
        }, 10);
    });
    $("#res").click(function() {
        go = false;
        clearInterval(check);
        $("#time").html("Current Time: 00.0");
        tiles = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
        gameBoardSetUp();
        setClasses();
    });
    gameBoardSetUp();
    setInterval(positionGameboard, 10);
}
function positionGameboard() {
    $("#gameboard").css({
        'left': window.innerWidth / 2 - 150,
        'top': '10px',
        'width': '300px',
        'height': '300px',
        'position': 'fixed'
    });
    $("#but").css({
        'left': window.innerWidth / 2 - 150,
        'top': window.innerHeight - 250,
        'width': '300px',
        'height': '50px',
        'position': 'fixed'
    });
    $("#res").css({
        'left': window.innerWidth / 2 - 150,
        'top': window.innerHeight - 75,
        'width': '300px',
        'height': '50px',
        'position': 'fixed'
    });
    $("#time").css({
        'left': window.innerWidth / 2 - 500,
        'top': window.innerHeight - 195,
        'text-align': 'center',
        'font-family': 'monospace',
        'font-size': '50px',
        'line-height': '50px',
        'width': '1000px',
        'height': '50px',
        'position': 'fixed'
    });
    $("#high").css({
        'left': window.innerWidth / 2 - 500,
        'top': window.innerHeight - 135,
        'text-align': 'center',
        'font-family': 'monospace',
        'font-size': '50px',
        'line-height': '50px',
        'width': '1000px',
        'height': '50px',
        'position': 'fixed'
    });
}
function getPos() {
    var i, j;
    for (i = 0; i < 4; i += 1) {
        for (j = 0; j < 4; j += 1) {
            if (tiles[i][j] === 16) {
                return [i, j];
            }
        }
    }
}
function isLeft() {
    if (getPos()[1] === 0) {
        return true;
    }
    return false;
}
function isRight() {
    if (getPos()[1] === 3) {
        return true;
    }
    return false;
}
function isTop() {
    if (getPos()[0] === 0) {
        return true;
    }
    return false;
}
function isBottom() {
    if (getPos()[0] === 3) {
        return true;
    }
    return false;
}
function setClasses() {
    $('.left').removeClass('left');
    $('.top').removeClass('top');
    $('.right').removeClass('right');
    $('.bottom').removeClass('bottom');
    if (!isLeft()) {
        $('#' + (getPos()[0]).toString() + (getPos()[1] - 1).toString()).addClass('left');
    }
    if (!isRight()) {
        $('#' + (getPos()[0]).toString() + (getPos()[1] + 1).toString()).addClass('right');
    }
    if (!isTop()) {
        $('#' + (getPos()[0] - 1).toString() + (getPos()[1]).toString()).addClass('top');
    }
    if (!isBottom()) {
        $('#' + (getPos()[0] + 1).toString() + (getPos()[1]).toString()).addClass('bottom');
    }
    addActionListeners();
}
function moveLeft() {
    var clickedPos, emptyPos, hold;
    emptyPos = getPos()[0].toString() + getPos()[1].toString();
    clickedPos = $(".left").attr('id');
    tiles[emptyPos[0]][emptyPos[1]] = tiles[clickedPos[0]][clickedPos[1]];
    tiles[clickedPos[0]][clickedPos[1]] = 16;
}
function moveRight() {
    var clickedPos, emptyPos, hold;
    emptyPos = getPos()[0].toString() + getPos()[1].toString();
    clickedPos = $(".right").attr('id');
    tiles[emptyPos[0]][emptyPos[1]] = tiles[clickedPos[0]][clickedPos[1]];
    tiles[clickedPos[0]][clickedPos[1]] = 16;
}
function moveTop() {
    var clickedPos, emptyPos, hold;
    emptyPos = getPos()[0].toString() + getPos()[1].toString();
    clickedPos = $(".top").attr('id');
    tiles[emptyPos[0]][emptyPos[1]] = tiles[clickedPos[0]][clickedPos[1]];
    tiles[clickedPos[0]][clickedPos[1]] = 16;
}
function moveBottom() {
    var clickedPos, emptyPos, hold;
    emptyPos = getPos()[0].toString() + getPos()[1].toString();
    clickedPos = $(".bottom").attr('id');
    tiles[emptyPos[0]][emptyPos[1]] = tiles[clickedPos[0]][clickedPos[1]];
    tiles[clickedPos[0]][clickedPos[1]] = 16;
}
function addActionListeners() {
    $(".left").click(function () {
        moveLeft();
        gameBoardSetUp();
        setClasses();
    });
    $(".right").click(function () {
        moveRight();
        gameBoardSetUp();
        setClasses();
    });
    $(".top").click(function () {
        moveTop();
        gameBoardSetUp();
        setClasses();
    });
    $(".bottom").click(function () {
        moveBottom();
        gameBoardSetUp();
        setClasses();
    });
}
function randomise() {
    var i, j;
    for(i = 0; i < 1000; i += 1) {
        j = Math.random();
        if (j < 0.25 && !isBottom()) {
            moveBottom();
        } else if (j < 0.5 && !isLeft()) {
            moveLeft();
        } else if (j < 0.75 && !isRight()) {
            moveRight();
        } else if (!isTop()) {
            moveTop();
        } else {
            i -= 1;
        }
        setClasses();
    }
    gameBoardSetUp();
    setClasses();
}
$(document).ready(function () {
    preload();
    setClasses();
    Cookies.set("highScore");
    if (Cookies.get("highScore") != undefined) {
        highscore = Cookies.get("highScore");
        $("#high").html("&nbsp;&nbsp;&nbsp;Highscore: " + highscore);
    }
    else {
        Cookies.set("highScore", 0, {expires: 100});
        highscore = 0;
        $("#high").html("&nbsp;&nbsp;&nbsp;Highscore: " + highscore);
    }
});
