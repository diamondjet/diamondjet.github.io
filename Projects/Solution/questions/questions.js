
var instanseQ = false;

function Question () {
    this.get = getQuestion;
    this.correct = "a"
    this.answer = ["a","b","c","d"];
}
function getQuestion() {
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
                   var x = data.q.qu[Math.floor(Math.random()*data.q.qu.length)];
                   qu.answer = shuffle([x.c,x.a[0],x.a[1],x.a[2]]);
                   qu.correct = x.c;
                   $('#question').html(x.q);
                   $('.answer.a h4').html(qu.answer[0]);
                   $('.answer.b h4').html(qu.answer[1]);
                   $('.answer.c h4').html(qu.answer[2]);
                   $('.answer.d h4').html(qu.answer[3]);
				   instanseQ = false;
			   },
			});
	}
}
var jk;
var qu = new Question();
$(document).ready(function() {
    qu.get();
    var go = true;
    $('.answer').mouseenter(function(e) {
        go ? $(e.currentTarget).css('background','orange') : false;
    });
    $('.answer').mouseleave(function(e) {
        go ? $(e.currentTarget).css('background','inherit') : false;
    });
    $('.answer').click(function(e) {
        go = false;
        $('.answer').css('background','inherit');
        if (e.currentTarget.innerText == qu.correct) {
            $(e.currentTarget).css('background','green')
            score+=1
        } else {
            $(e.currentTarget).css('background','red')
        }
        setTimeout(function () {
            qu.get();
            $('.answer').css('background','inherit');
            go = true;
        },1000);
    });
});
function shuffle(arr) {
    return (arr.length <= 1 ? arr : arr.splice(Math.floor(Math.random()*arr.length),1).concat(shuffle(arr)));
    //recursive function that shuffles an array by taking a random item and moving it to the start then shuffling the remainder array and placing it after it
}
