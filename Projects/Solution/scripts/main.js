var score = 0;
var answered = 0;
var name = 'guest';
function shuffle(arr) {
    return (arr.length <= 1 ? arr : arr.splice(Math.floor(Math.random()*arr.length),1).concat(shuffle(arr)));
    //recursive function that shuffles an array by taking a random item and moving it to the start then shuffling the remainder array and placing it after it
}
$(document).ready(function() {
    $('#score').html(score);
    $('#percentage').html("0%");
    $('#left a').click(function(e) { //menu
        $('#q,#d,#s').css('display','none'); //hide the main section
        $('#'+e.currentTarget.id[0]).css('display', 'block'); //display selected section
        $("#top h2").html(e.currentTarget.innerText.toUpperCase()); //change subheading
    });
    function enterName() {
        name = $("#SName").val().replace(/[^\w\s]/gi, '').replace(/ /g,"_");
        if(name.length > 0 && name.length < 10) {
            $('.login').html("<h4>Username: <span>"+name+"</span></h4>");
        }
        else {
            $('#SName').attr('placeholder','Try Again');
            $('#SName').val('');
            $('#SName').css('background','#ca0020');
            setTimeout(function() {
                $('#SName').css('background','#f7f7f7');
            }, 400);
        }
    }
    $('#BLogin').click(enterName);
    $('#SName').keyup(function(e) {
        if (e.keyCode == 13) {
            enterName();
        }
    });
});
