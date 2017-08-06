function Score() {
    this.addScore = function() {
        $.ajax({
            type: "POST",
            url: "score/score.php",
            data: {
                'function': 'addScore',
                'username': name
            },
            dataType: "json",

            success: function(data){
                console.log(data);
            },
        });
    };
}

var score = new Score();
score.addScore();
