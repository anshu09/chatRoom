$(function(){
	var socket = io.connect();
	// id of user that is being private messaged
	var userToPM = undefined;
	var xhr = new XMLHttpRequest();

	$('#login-form-link').click(function(e) {
    	$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$("#message").keyup(function(event){
    if(event.keyCode == 13){
        $("#chat-message").click();
    }
	});

	$('#register-submit').click(function(e){
		e.preventDefault();
		var nick = $('#usernameRegister').val();
		var email = $('#emailRegister').val();
		var password = $('#passwordRegister').val();

		var url = "http://localhost:3000/register";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () {
			console.log("RESPONSE ", xhr);
    		if (xhr.readyState === 4 && xhr.status === 200) {
    			socket.emit('choose nickname', nick, function(err){
    				console.log(err);
    			});
    			$('#login-container').hide();
				$('#chat-container').show();
    		} else if (xhr.readyState === 4 && xhr.status === 400) {
    			alert("This user is already present");
    		}
    	};
    	var data = JSON.stringify({"username": nick, "email": email, "password": password});
		xhr.send(data);
	});

	$('#login-submit').click(function(e){
		e.preventDefault();
		var nick = $('#username').val();
		var password = $('#password').val();

		var url = "http://localhost:3000/login";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () {
			console.log("RESPONSE ", xhr);
    		if (xhr.readyState === 4 && xhr.status === 200) {
    			socket.emit('choose nickname', nick, function(err){
    				console.log(err);
    			});
    			$('#login-container').hide();
				$('#chat-container').show();
    		} else if (xhr.readyState === 4 && xhr.status === 404){
    			alert("username of password is incorrect");
    		}
    	};
    	var data = JSON.stringify({"username": nick, "password": password});
		xhr.send(data);
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
    	var date = new Date();
    	var hours   = date.getHours();
  		var minutes = date.getMinutes();
  		var seconds = date.getSeconds();
  		var day = date.getDate();
  		var month = date.getMonth();
  		var year = date.getFullYear();
  		var timeString = month+"."+day+"."+year+" " + ((hours > 12) ? hours - 12 : hours);
  		timeString  += ((minutes < 10) ? ":0" : ":") + minutes;
  		timeString  += (hours >= 12) ? " P.M." : " A.M.";

    	var html = "<span class='msg'><strong>" + nick + ":</strong> " + msg +"</span><a style='float: right;'>" +timeString+"</a>";
    	$('#chat').append(html);
    }

});