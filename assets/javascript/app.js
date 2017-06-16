var emotions = ["happy", "sad", "angry"];
var count = 0;

// Submit button add the val in the inout to the array 
// and deletes what ever the user was typing
$(document).ready(function() {
	console.log("yes");
	
	function createButton (x) {
		var searchButton = $("<button>")
		searchButton.attr("id", "item-"+ count);
		searchButton.addClass("search");
		searchButton.attr("value", x)
		searchButton.append(x);
		$("#buttons").append(searchButton);
		count++;
	}
	// for loop that creates buttons for original/starting array
	for (i=0; i < emotions.length; i++) {
		createButton(emotions[i]);
	}
	
	$("#userSubmit").on("click", function(event) {
	
		event.preventDefault();
		var input = $("#userInput").val().trim();
		createButton(input);
		$("#userInput").val("");
	
	});
	
	$(document.body).on("click",".search",function() {
		var searchId = $(this).attr("value");
		var key = "&api_key=dc6zaTOxFJmzC";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchId + key;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(responce) {
			console.log(responce.data[i].rating);
			for (i=0; i < 10; i++) {
				var newdiv = $("<div>")
				var rating = ("<h3>Rating:" + responce.data[i].rating + "</h3>" + "<br>" +'<img src=' + responce.data[i].images.fixed_width_still.url + '/>' )
				newdiv.append(rating);
				// newdiv.append('<img src=' + responce.data[i].images.fixed_width_still.url + '/>')
				// newdiv.append('<img src=' + responce.data[i].images.fixed_width_still.url  '/>');
				$("#Gifs").append(newdiv); 
			}

		})

		
	})
	
	// create for loop function that:
	// 1.) creates button for each string in emotions
	// 2.)"optional" create a derlete icon that deles the button
	// 3.)when button is cliked display gifys


})
