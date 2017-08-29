/*
Created by: Kenrick Beckett

Name: Chat Engine
*/

var state = 0;

function Chat () {
    this.update = function(){
        $.ajax({
            type: "POST",
            url: "chat/chat.php",
            data: {
                'function': 'update',
                'state': state
            },
            dataType: "json",
            success: function(data){
                if(data.text){
                    for (var i = 0; i < data.text.length; i++) {
                        $('#chatInternal').append($("<p>"+ data.text[i] +"</p>"));
                    }
                }
                state = data.state;
                $('#chat').scrollTop($('#chat')[0].scrollHeight);
            },
        });
    }
    this.send = function(message, nickname){
        $.ajax({
            type: "POST",
            url: "chat/chat.php",
            data: {
                'function': 'send',
                'message': message,
                'nickname': nickname
            },
            dataType: "json",
        });
    };
    this.getState = function (){
        $.ajax({
            type: "POST",
            url: "chat/chat.php",
            data: {
                'function': 'getState'
            },
            dataType: "json",

            success: function(data){
                state = data.state;
            },
        });
    };
    //hidden function to clear chat file
    /*this.reset = function() {
        $.ajax({
            type: "POST",
            url: "chat/chat.php",
            data: {
                'function': 'reset'
            },
            dataType: "json",
        });
    }*/
}

//html stuff
var chat =  new Chat();
$(document).ready(function() {
    chat.getState();
    setInterval(chat.update, 5000);
    $("#chatSubmit").click(submitChat);
    $('#chatInput').keyup(function(e) {
        if (e.keyCode == 13) {
            submitChat();
        }
    });

});
function submitChat() {
    $("#chatInput").val().replace(/[^\s.,!?]/gi, '').length > 0 ? chat.send($("#chatInput").val().replace(/[^\w\s.,!?]/gi, '■'), name.replace(/[^\w\s]/gi, '')) : false;
    $("#chatInput").val("");
    chat.update()
}
