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
        //this.addWrong();
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
                var Arr = [];
                for (var dataPoint in data) {
                    Arr.push([dataPoint, data[dataPoint]]);
                }

                Arr.sort(function(a, b) {
                    return a[1] - b[1];
                });
                console.log(Arr);
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
