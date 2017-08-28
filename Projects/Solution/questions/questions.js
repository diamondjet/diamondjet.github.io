function Question () {
    this.get = function() {

        $.ajax({
            type: "POST",
            url: "questions/questions.php",
            data: {
                'function': 'getQuestions'
            },
            dataType: "json",

            success: function(data){
                changeQ(data.qu[Math.floor(Math.random()*data.qu.length)]);
            },
        });
    };
    this.correct = "a"
    this.answer = ["a","b","c","d"];
    this.go = function(data) {
        this.answer = shuffle([data.c,data.a[0],data.a[1],data.a[2]]);
        this.correct = data.c;
        $('#question').html(data.q.toUpperCase());
        $('.answer.a h4').html(this.answer[0].toUpperCase());
        $('.answer.b h4').html(this.answer[1].toUpperCase());
        $('.answer.c h4').html(this.answer[2].toUpperCase());
        $('.answer.d h4').html(this.answer[3].toUpperCase());
    }
}
var qu = new Question();
function changeQ(data) {
    qu.go(data);
}
$(document).ready(function() {
    qu.get();
    var go = true;
    $('.answer').mouseenter(function(e) {
        go ? $(e.currentTarget).css('background','#aaa') : false;
    });
    $('.answer').mouseleave(function(e) {
        go ? $(e.currentTarget).css('background','inherit') : false;
    });
    $('.answer').click(function(e) {
        if (go) {
            go = false;
            answered += 1;
            var correct = qu.correct.toUpperCase();
            $('.answer').css('background','inherit');
            if (e.currentTarget.innerText.toUpperCase() == correct) {
                $(e.currentTarget).css('background','#3cdf00')
                if (name != 'guest') {
                    scoreKeeper.addScore();
                }
            } else {
                $(e.currentTarget).css('background','#ca0020');
                if ($('.answer')[0].innerText.toUpperCase() == correct) {
                    $($('.answer')[0]).css('background','#3cdf00')
                } else if ($('.answer')[1].innerText.toUpperCase() == correct) {
                    $($('.answer')[1]).css('background','#3cdf00')
                } else if ($('.answer')[2].innerText.toUpperCase() == correct) {
                    $($('.answer')[2]).css('background','#3cdf00')
                } else {
                    $($('.answer')[3]).css('background','#3cdf00')
                }
                if (name != 'guest') {
                    scoreKeeper.addWrong();
                }
            }
            setTimeout(function () {
                qu.get();
                $('.answer').css('background','inherit');
                go = true;
            },1500);
        }
    });
});

function changeScore() {
    $('#score').html(score);
    answered == 0 ? $('#percentage').html('0%') : $('#percentage').html(Math.round(score/answered*10000)/100 + "%");
}
