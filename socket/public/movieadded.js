
window.onload = function() {
 
    var socket = io.connect('http://192.168.1.13:5000');
 
    socket.on('movieaddedemit', function (data) {
        console.log(data);
        notifyMe(data.user.username, data.message+ " has been added in " + data.genre+".");
        addElement(data.message.substring(0,1), data.message);
    });

    for (var i = 0; i < data.user.genres.length; i++) {
    	socket.emit('joinroom', data.user.genres[i]);
    	console.log("Joined room " + data.user.genres[i]);
    };

    for(var i=0;i<data.movies.length;i++){
    	addElement(data.movies[i].name.substring(0,1), data.movies[i].name)
    }

    function addElement(initial, message){
    	var rightBox = document.getElementById("rightBox");
    	var newsFeedDiv = document.createElement('div');
    	newsFeedDiv.id = "newsFeedElem";
    	var circleDiv = document.createElement('div');
    	circleDiv.id = "circle";
    	var circleP = document.createElement('p');
    	circleDiv.appendChild(circleP);
    	var messageP = document.createElement('p');
    	messageP.id = "movieTitle";

    	circleP.innerHTML = initial;
    	messageP.innerHTML = message;

    	newsFeedDiv.appendChild(circleDiv);
    	newsFeedDiv.appendChild(messageP);
    	rightBox.insertBefore(newsFeedDiv, rightBox.firstChild);
    }

    function notifyMe(user,message) {
	  // Let's check if the browser supports notifications
	  if (!("Notification" in window)) {
	    alert("This browser does not support desktop notification");
	  }
	  // Let's check if the user is okay to get some notification
	  else if (Notification.permission === "granted") {
	    // If it's okay let's create a notification
	  var options = {
	        body: message,
	        dir : "ltr"
	    };
	  var notification = new Notification(user + " added a new movie.",options);
	  }
	  // Otherwise, we need to ask the user for permission
	  // Note, Chrome does not implement the permission static property
	  // So we have to check for NOT 'denied' instead of 'default'
	  else if (Notification.permission !== 'denied') {
	    Notification.requestPermission(function (permission) {
	      // Whatever the user answers, we make sure we store the information
	      if (!('permission' in Notification)) {
	        Notification.permission = permission;
	      }
	      // If the user is okay, let's create a notification
	      if (permission === "granted") {
	        var options = {
	                body: message,
	                dir : "ltr"
	        };
	        var notification = new Notification(user + " Posted a comment",options);
	      }
	    });
	  }
	  // At last, if the user already denied any notification, and you
	  // want to be respectful there is no need to bother them any more.
	}
}