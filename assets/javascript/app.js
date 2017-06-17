var emotions = ["happy", "sad", "angry"];
var count = 0;

// Submit button add the val in the inout to the array 
// and deletes what ever the user was typing
$(document).ready(function() {
	
	
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
		
		$("#Gifs").html("");

		var searchId = $(this).attr("value");
		var key = "&api_key=dc6zaTOxFJmzC";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchId + key;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(responce) {
			console.log(responce.data[i].rating);
			for (i=0; i < 10; i++) {
				var newdiv = $("<div>");
				var stillURL =  responce.data[i].images.fixed_width_still.url ;
				var gifData = ("<h3>Rating:" + responce.data[i].rating + "</h3>" +'<img class="giphys" id="' +i + '"src=' + stillURL + '/>' )
				newdiv.attr("value", i);
				newdiv.append(gifData);
				$("#Gifs").append(newdiv);

				
			}

			$(document.body).on("click",".giphys", function() {

					var y = $(this).attr("id");
					var still = $(this).attr("src");
					var check = responce.data[y].images.fixed_width_still.url+ "/";
					console.log(still);
					console.log(check);
					if (check == still) {
						$(this).attr("src", responce.data[y].images.fixed_width.url)
					}
					else {
						$(this).attr("src", responce.data[y].images.fixed_width_still.url +"/")
					}	
				})

		})

		
	})
	
	// create for loop function that:
	// 1.) creates button for each string in emotions
	// 2.)"optional" create a derlete icon that deles the button
	// 3.)when button is cliked display gifys


})
