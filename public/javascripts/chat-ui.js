$(function(){
	var socket = io.connect();
	// id of user that is being private messaged
	var userToPM = undefined;

	$('#login-form-link').click(function(e) {
    	$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
		console.log("HERE!!!");
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
		console.log("HERE!!!");
	});

	$("#message").keyup(function(event){
    if(event.keyCode == 13){
        $("#chat-message").click();
    }
	});
	$('#login-submit').click(function(e){
		e.preventDefault();
		var nick = $('#username').val();
		socket.emit('choose nickname', nick, function(err){
			if (err) {
				$('#nick-error').text(err);
				$('#nickname').val('');
			} else {
				$('#nickname-container').hide();
				$('#chat-container').show();
			}
		});
	});

	socket.on('names', function(users) {
		displayUsers(users);
	});

	socket.on('new user', function(user) {
		displayUsers([user]);
	});

	function displayUsers(users){
		var html = '';
		for (var i = 0; i < users.length; i++) {
			html += '<div class="user" id="user' + users[i].id + '">' + users[i].nick + '</span>';
		}
		$('#users').append(html);
	    // $('.user').click(function(e){
	    // 	if (!userToPM) {
	    // 		$('#pm-col').show();
	    // 	}
	    // 	userToPM = $(this).attr('id').substring(4);
	    // 	$('#user-to-pm').html('<h2>' + $(this).text() + '</h2>');
	    // });
	}

	socket.on('user disconnect', function(id){
		console.log(id);
		$('#user'+id).remove();
	});

    $('#chat-message').click(function(e){
        e.preventDefault();
        var msg = $('#message').val();
        socket.emit('message', msg);
        $('#message').val('');
    });

    socket.on('message', function(data){
    	displayMsg(data.msg, data.nick)
    });

    socket.on('load old msgs', function(docs){
    	for (var i = docs.length-1; i >= 0; i--) {
    		displayMsg(docs[i].msg, docs[i].nick);
    	}
    });

    function displayMsg(msg, nick){
    	var html = "<span class='msg'><strong>" + nick + ":</strong> " + msg;
    	$('#chat').append(html);
    }

    $('#send-pm').submit(function(e){
    	e.preventDefault();
    	socket.emit('private message', {msg: $('#new-pm').val(), userToPM: userToPM});
    	$('#new-pm').val('');
    });

    socket.on('private message', function(data){
    	var html = "<span class='pMsg'><strong>" + data.from + ":</strong> " + data.msg;
    	$('#chat').append(html);
    });

});