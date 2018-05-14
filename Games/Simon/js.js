$(document).ready(function() {
    var sequence = [], playerSequence = [], score = 0, playing = false, scores = [[0,0,0],[0,0,0],[0,0,0]], level = 0;
    var audio0 = new Audio('tones/0.wav'), audio1 = new Audio('tones/1.wav'), audio2 = new Audio('tones/2.wav'), audio3 = new Audio('tones/3.wav');
    function lightUp(buttonID, short, length) {
        if(length != 500) {
            length = 1000;
        }
        if(!short) {
            switch (buttonID) {
                case 0:
                    audio0.play();
                    break;
                case 1:
                    audio1.play();
                    break;
                case 2:
                    audio2.play();
                    break;
                case 3:
                    audio3.play();
                    break;
            }
            $("#b"+buttonID).css('opacity', '1');
            setTimeout(function () {
                $("#b"+buttonID).css('opacity', '0.33');
                switch (buttonID) {
                    case 0:
                        audio0.pause();
                        audio0.currentTime = 0;
                        break;
                    case 1:
                        audio1.pause();
                        audio1.currentTime = 0;
                        break;
                    case 2:
                        audio2.pause();
                        audio2.currentTime = 0;
                        break;
                    case 3:
                        audio3.pause();
                        audio3.currentTime = 0;
                        break;
                }
            }, length);
        }
        else {
            $("#b"+buttonID).css('opacity', '1');
            setTimeout(function () {
                $("#b"+buttonID).css('opacity', '0.33');
            }, 200);
        }
    }
    function playSequence() {
        playing = true;
        function go(i) {
            setTimeout(function () {
                lightUp(sequence[i]);
            }, i*1300);
        }
        for (var i = 0; i < sequence.length; i ++) {
            go (i);
        }
        setTimeout(function() {
            lightUp(0, true);
            lightUp(1, true);
            lightUp(2, true);
            lightUp(3, true);
        }, i * 1300);
        setTimeout(function() {
            playing = false;
            playerSequence = [];
        }, (i+0.2) * 1300);
    }
    function addToSequence() {
        if (level == 2) {
            var length = sequence.length;
            for (var i = 0; i < length; i++) {
                sequence.push(Math.floor(Math.random() * 4));
            }
        }
        else if (level == 1) {
            sequence.push(Math.floor(Math.random() * 4));
            sequence.push(Math.floor(Math.random() * 4));
        }
        else {
            sequence.push(Math.floor(Math.random() * 4));
        }
    }
    function checkPlayerSequence() {
        var ok = true;
        for (var i = 0; i < playerSequence.length; i ++) {
            if (playerSequence[i] != sequence[i]) {
                ok = false;
            }
        }
        if (ok && playerSequence.length == sequence.length && !playing) {
            setScore(sequence.length);
            addToSequence();
            playerSequence = [];
            flash(1000);
            setTimeout(playSequence, 1500);
        }
        else if (!playing && !ok) {
            endGame()
        }
    }
    function flash(delay) {
        setTimeout(function() {
            lightUp(0, true);
            lightUp(1, true);
            lightUp(2, true);
            lightUp(3, true);
        }, delay);
    }
    function endGame() {

        for (var i = 0; i < 5; i++) {
            flash(i*400);
        }
        setTimeout(function() {
            $("#game").css("display", "none");
            $("#menu").css("display", "block");
            highScoresCheck();
            displayScores();
            setScore(0);
            sequence = [];
        }, i*400);
    }
    function highScoresCheck() {
        if(score > scores[level][0]) {
            scores[level][2] = scores[level][1];
            scores[level][1] = scores[level][0];
            scores[level][0] = score;
        }
        else if (score > scores[level][1]) {
            scores[level][2] = scores[level][1];
            scores[level][1] = score;
        }
        else if (score > scores[level][0]) {
            scores[level][0] = score;
        }
        Cookies.set("e0", scores[0][0], {expires: 100});
        Cookies.set("e1", scores[0][1], {expires: 100});
        Cookies.set("e2", scores[0][2], {expires: 100});
        Cookies.set("m0", scores[1][0], {expires: 100});
        Cookies.set("m1", scores[1][1], {expires: 100});
        Cookies.set("m2", scores[1][2], {expires: 100});
        Cookies.set("h0", scores[2][0], {expires: 100});
        Cookies.set("h1", scores[2][1], {expires: 100});
        Cookies.set("h2", scores[2][2], {expires: 100});
    }
    function startGame() {
        sequence.push(Math.floor(Math.random() * 4));
        level = $("#difficulty form input:checked").val();
        setTimeout(playSequence, 1000);
    }
    function setScore(amount) {
        score = amount;
        $("#score h2").html(score);
    }
    function addClickListeners() {
        function addFunction(idNum) {
            $("#b" + idNum).mousedown(function() {
                playerSequence.push(idNum);
                checkPlayerSequence();
                if (!playing){
                    lightUp(idNum, false, 500);
                }
            });
        }
        for (var i = 0; i<4; i++) {
            addFunction(i);
        }
        $("#playButton").click(function() {
            $("#menu").css("display", "none");
            $("#game").css("display", "block");
            startGame();
        });
    }
    function baseCookies() {
        if(Cookies.get("e0") == undefined) {
            Cookies.set("e0", scores[0][0], {expires: 100});
        }
        else {
            scores[0][0] = Cookies.get("e0");
        }
        if(Cookies.get("e1") == undefined) {
            Cookies.set("e1", scores[0][1], {expires: 100});
        }
        else {
            scores[0][1] = Cookies.get("e1");
        }
        if(Cookies.get("e2") == undefined) {
            Cookies.set("e2", scores[0][2], {expires: 100});
        }
        else {
            scores[0][2] = Cookies.get("e2");
        }
        if(Cookies.get("m0") == undefined) {
            Cookies.set("m0", scores[1][0], {expires: 100});
        }
        else {
            scores[1][0] = Cookies.get("m0");
        }
        if(Cookies.get("m1") == undefined) {
            Cookies.set("m1", scores[1][1], {expires: 100});
        }
        else {
            scores[1][1] = Cookies.get("m1");
        }
        if(Cookies.get("m2") == undefined) {
            Cookies.set("m2", scores[1][2], {expires: 100});
        }
        else {
            scores[1][2] = Cookies.get("m2");
        }
        if(Cookies.get("h0") == undefined) {
            Cookies.set("h0", scores[2][0], {expires: 100});
        }
        else {
            scores[2][0] = Cookies.get("h0");
        }
        if(Cookies.get("h1") == undefined) {
            Cookies.set("h1", scores[2][1], {expires: 100});
        }
        else {
            scores[2][1] = Cookies.get("h1");
        }
        if(Cookies.get("h2") == undefined) {
            Cookies.set("h2", scores[2][2], {expires: 100});
        }
        else {
            scores[2][2] = Cookies.get("h2");
        }
    }
    function displayScores() {
        $("#h2").html(scores[2][2]);
        $("#h1").html(scores[2][1]);
        $("#h0").html(scores[2][0]);
        $("#m2").html(scores[1][2]);
        $("#m1").html(scores[1][1]);
        $("#m0").html(scores[1][0]);
        $("#e2").html(scores[0][2]);
        $("#e1").html(scores[0][1]);
        $("#e0").html(scores[0][0]);
    }
    $("#game").css('display', 'none');
    addClickListeners();
    baseCookies();
    displayScores();
});
