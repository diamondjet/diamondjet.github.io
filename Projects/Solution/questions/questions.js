
var instanseQ = false;

function Question () {
    this.get = function() {
        if(!instanseQ){
            instanseQ = true;
            $.ajax({
                type: "POST",
                url: "questions/questions.php",
                data: {
                    'function': 'getQuestions'
                },
                dataType: "json",

                success: function(data){
                    instanseQ = false;
                    changeQ(data.qu[Math.floor(Math.random()*data.qu.length)]);
                },
            });
        }
    };
    this.correct = "a"
    this.answer = ["a","b","c","d"];
    this.go = function(data) {
        this.answer = shuffle([data.c,data.a[0],data.a[1],data.a[2]]);
        this.correct = data.c;
        $('#question').html(data.q);
        $('.answer.a h4').html(this.answer[0]);
        $('.answer.b h4').html(this.answer[1]);
        $('.answer.c h4').html(this.answer[2]);
        $('.answer.d h4').html(this.answer[3]);
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
        go ? $(e.currentTarget).css('background','#0571b0') : false;
    });
    $('.answer').mouseleave(function(e) {
        go ? $(e.currentTarget).css('background','inherit') : false;
    });
    $('.answer').click(function(e) {
        if (go) {
            go = false;
            answered += 1;
            $('.answer').css('background','inherit');
            if (e.currentTarget.innerText == qu.correct) {
                $(e.currentTarget).css('background','#3cdf00')
                score+=1
            } else {
                $(e.currentTarget).css('background','#ca0020')
            }
            setTimeout(function () {
                qu.get();
                $('.answer').css('background','inherit');
                go = true;
            },1000);
            $('#score').html(score);
            $('#percentage').html(Math.round(score/answered*10000)/100 + "%");
        }
    });
});
