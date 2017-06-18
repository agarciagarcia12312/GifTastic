var emotions = ["Happy", "Sad", "Angry"];
var count = 0;

// Function used to create new search icons for new keywords
function createButton (x) {
		var searchButton = $("<button>")
		searchButton.attr("id", "item-"+ count);
		searchButton.addClass("search");
		searchButton.attr("value", x)
		searchButton.append(x);
		$("#buttons").append(searchButton);
		count++;
	};

$(document).ready(function() {
	

	// for loop that creates buttons for original/starting array
	for (i=0; i < emotions.length; i++) {
		createButton(emotions[i]);
	}
	
	$("#userSubmit").on("click", function(event) {
		event.preventDefault();
		// gets user input and creates button from their info
		var input = $("#userInput").val().trim();
		// function that creates buttons
		createButton(input);
		$("#userInput").val("");
	
	});
	// global variables used to store the 2 urls
	var movingURLs = [];
	var stillURLs= [];

	$(document.body).on("click",".search", function() {
	// clear previous gif divs	
		$("#Gifs").html("");

		// empties our url arrays
		movingURLs = [];
		stillURLs = [];	
		// Generates conytent url using key word (search id)
		var searchId = $(this).attr("value");
		var key = "&api_key=dc6zaTOxFJmzC";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchId + key;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(responce) {
 // for loops that creates new gif div for every gif genrated
			for (i=0; i < 10; i++) {
				var newdiv = $("<div>");
				stillURL = responce.data[i].images.fixed_width_still.url;
				stillURLs.push(stillURL);
				movingURLs.push(responce.data[i].images.fixed_width.url);
				var gifData = ("<h3>Rating: " + responce.data[i].rating + "</h3>" +'<img class="giphys" id="' +i + '"src=' + stillURLs[i] + '/>' );
				newdiv.append(gifData);
				newdiv.addClass("images");
				$("#Gifs").append(newdiv);		
			};
		});		
	});
// on click funtion that changes the source of img to playing if its on pause
	$(document.body).on("click",".giphys", function() {
		var y = $(this).attr("id");
		var source = $(this).attr("src");
		// added dash lines to fix problem with urls;
		var notMoving = stillURLs[y] + "/";
		var moving = movingURLs[y] + "/";
		// if statement to chek if the video is playing ot not
		if (notMoving == source) {
		$(this).attr("src", moving)
		} else {
			$(this).attr("src", notMoving)
		};	
	});
});
	
	// create for loop function that:
	// 1.) creates button for each string in emotions
	// 2.)"optional" create a derlete icon that deles the button
	// 3.)when button is cliked display gifys



