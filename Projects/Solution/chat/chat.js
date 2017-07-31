/*
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state = 0;
var mes;

function Chat () {
    this.update = updateChat;
    this.send = sendChat;
	this.getState = getStateOfChat;
}

//gets the state of the chat
function getStateOfChat(){
	if(!instanse){
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "chat/chat.php",
			   data: {
			   			'function': 'getState'
						},
			   dataType: "json",

			   success: function(data){
				   state = data.state;
				   instanse = false;
			   },
			});
	}
}

//Updates the chat
function updateChat(){
	 if(!instanse){
		 instanse = true;
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
				   document.getElementById('chatInternal').scrollTop = document.getElementById('chatInternal').scrollHeight;
				   instanse = false;
				   state = data.state;
			   },
			});
	 }
	 else {
		 setTimeout(updateChat, 1500);
	 }
}

//send the message
function sendChat(message, nickname)
{
    updateChat();
     $.ajax({
		   type: "POST",
		   url: "chat/chat.php",
		   data: {
		   			'function': 'send',
					'message': message,
					'nickname': nickname
				 },
		   dataType: "json",
		   success: function(data){
			   updateChat();
		   },
		});
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
    chat.send($("#chatInput").val().replace(/[^\w\s]/gi, ''), name.replace(/[^\w\s]/gi, ''));
    $("#chatInput").val("");
}
