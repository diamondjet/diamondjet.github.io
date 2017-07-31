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
        name = $("#SName").val().replace(/[^\w\s]/gi, '');
        if(name.length > 0) {
            $('.login').html("<h4>Username: <span>"+name+"</span></h4>");
        }
        else {
            $('#SName').attr('placeholder','Try Again');
            $('#SName').val('');
            $('#SName').css('background','#ca0020');
            setTimeout(function() {
                $('#SName').css('background','#f7f7f7');
            }, 300);
        }
    });
});
