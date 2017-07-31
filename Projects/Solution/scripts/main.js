var score = 0;
var answered = 0;
var name = 'guest';
$(document).ready(function() {
    $('#left a').click(function(e) { //menu
        $('#q,#d,#s').css('display','none'); //hide the main section
        $('#'+e.currentTarget.id[0]).css('display', 'block'); //display selected section
        $("#top h2").html(e.currentTarget.innerText.toUpperCase()); //change subheading
    });
    $('#BLogin').click(function() {
        name = $("#SName").val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        $('.login').html("<h4>Username: <span>"+name+"</span></h4>")
    });
});
