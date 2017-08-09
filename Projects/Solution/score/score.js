function Score() {
    this.addWrong = function    () {
        $.ajax({
            type: "POST",
            url: "score/score.php",
            data: {
                'function': 'addWrong',
                'username': name
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
                'username': name
            },
            dataType: "json",

            success: function(data){
                score = data[0];
                answered = data[1];
                changeScore();
            },
        });
    };

}

var scoreKeeper = new Score();
