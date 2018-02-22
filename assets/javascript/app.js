$(document).ready(function() {
	var topics = ['cat', 'dog', 'snake', 'bird', 'deer', 'fox', 'squirrel', 'lion', 'bear', 'hippo', 'monkey',
				  'tiger', 'aligator', 'fish', 'lizard', 'giraffe', 'gorilla', 'panda', 'wolf', 'hawk']

	for(var i = 0; i < topics.length; i++){
		var newButton = $("<button>").attr('id', topics[i]).addClass('btn', 'btn-primary').text(topics[i]);
		$("#buttons").append(newButton);
	}

	$(document).on('click', 'button', function(event){
		// console.log(event);
		console.log(this.id);
		var name = this.id;
		$("#animals").empty();
		showImage(name);
	})

	function showImage(name){
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=5LkGwNVkAh0pq1YEhrHrJf9S43DQJ8S7&limit=10";

		$.ajax({
      		url: queryURL,
      		method: 'GET'
   		}).then(function(response) {
   			for (var i = 0; i < response.data.length; i++) {
      			console.log(response);
      			var giphyURL = response.data[i].images.fixed_height.url;
      			var rating = response.data[i].rating;
    			var newImg = $("<img>");
    			var newRating = $("<p>");
    			newImg.attr("src", giphyURL);
    			newRating.append('Rating: ' + rating);
    			var newAnimal = $("<div>").addClass('animalClass').append(newRating, newImg);
    			// newAnimal.prepend("Rating: " + rating);
    			$("#animals").append(newAnimal);
        	}
    	});
	}
});