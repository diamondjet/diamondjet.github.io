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
var name = 'guest';
var maxLength = 2000;
var chat =  new Chat();
$(document).ready(function() {
	 chat.getState();
     setInterval(chat.update, 5000);
	 $("#chatSubmit").click(function(e) {
			var text = $("#chatInput").val();
            var length = text.length;

            if (length <= maxLength + 1) {

		        chat.send(text, name);
		        $("#chatInput").val("");

            } else {

				$("#chatInput").val(text.substring(0, maxLength));
                chat.send(text, name);
		        $("#chatInput").val("");
			}
	 });
	 // watch textarea for key presses
     $("#chatInput").keydown(function(event) {

         var key = event.which;

         //all keys including return.
         if (key >= 33) {

             var length = this.value.length;

             // don't allow new content if length is maxed out
             if (length >= maxLength) {
                 event.preventDefault();
             }
          }
	 																																																});
	 // watch textarea for release of key press
	 $('#chatInput').keyup(function(e) {

		  if (e.keyCode == 13) {

            var text = $('#chatInput').val();
            var length = text.length;

            // send
            if (length <= maxLength + 1) {

		        chat.send(text, name);
		        $(this).val("");

            } else {

				$(this).val(text.substring(0, maxLength));
				chat.send(text, name);
		        $(this).val("");

			}


		  }
     });

});
