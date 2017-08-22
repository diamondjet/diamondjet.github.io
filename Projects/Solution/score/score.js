function Score() {
    this.addWrong = function    () {
        $.ajax({
            type: "POST",
            url: "score/score.php",
            data: {
                'function': 'addWrong',
                'username': 'u'+name
            },
            dataType: "json",

            success: function(data){
                score = data[0];
                answered = data[1];
                changeScore();
            },
        })
    }
    this.addScore = function() {
        $.ajax({
            type: "POST",
            url: "score/score.php",
            data: {
                'function': 'addScore',
                'username': 'u'+name
            },
            dataType: "json",

            success: function(data){
                score = data[0];
                answered = data[1];
                changeScore();
            },
        });
    };
    this.getTop = function() {
        $.ajax({
            type: "POST",
            url: "score/score.php",
            data: {
                'function': 'getTop'
            },
            dataType: "json",

            success: function(data){
                //magic to sort
                var Arr = []
                for (var keys in data) {
                    Arr.push([keys,data[keys]])
                }
                var min, hold;
                for (var i = 0; i<10; i++) {
                    max = i;
                    for (var j = i+1; j<Arr.length; j++) {
                        parseInt(Arr[max][1])<parseInt(Arr[j][1]) ? max = j : false;
                    }
                    hold = Arr[i];
                    Arr[i] = Arr[max];
                    Arr[max] = hold;
                    if (Arr[i]) {
                        $('#s li:nth-child('+(i+1)+')').html('<b>' + (i+1) + ':</b> ' + Arr[i][0] + ' - <span>'+Arr[i][1]+'</span>');
                    }
                    else {
                        $('#s li:nth-child('+(i+1)+')').html('<b>'+(i+1)+'</b>:&nbsp;');
                    }

                }
            },
        });
    }
    this.getCurrent = function () {
        $.ajax({
            type: "POST",
            url: "score/score.php",
            data: {
                'function': 'getCurrent',
                'username': 'u'+name
            },
            dataType: "json",

            success: function(data){
                score = data[0];
                answered = data[1];
                changeScore();
            },
        });
    }
    //hidden function to remove all scores
    /*this.reset = function    () {
        $.ajax({
            type: "POST",
            url: "score/score.php",
            data: {
                'function': 'reset'
            },
            dataType: "json",
            success: function(data){
                score = data[0];
                answered = data[1];
                changeScore();
            },
        })
    }*/
}

var scoreKeeper = new Score();
