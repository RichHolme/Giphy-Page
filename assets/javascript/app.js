$(document).ready(function() {

	// to make sure user doesnt create empty button on page load
	$("#input").val(" ");

	// hide empty container
	$(".myContainer").hide();

	// array of instrument names
	var topics = ['Trumpet', 'Violin', 'Bongo', 'Snare Drum', 'Tuba', 'Flute', 'Guitar', 'Piano', 'Bass Guitar', 'Harmonica', 'Saxophone',
				  'Clarinet', 'Trombone', 'Drum', 'Banjo', 'Harp', 'Fiddle', 'Cello', 'Xylophone', 'Cymbal']

	// function to create buttons
	function buttonCreate(){

		// empty div for each new button
		$("#buttons").empty();

		// loop through animal array and display each as button
		for(var i = 0; i < topics.length; i++){

			// get array strings and use strings as button text value
			var newButton = $("<button>").attr('id', topics[i]).addClass('btn', 'btn-primary').text(topics[i]);

			// display buttons on screen
			$("#buttons").append(newButton);
		}
	}

	// call to display buttons
	buttonCreate();

	// determine name and call fucntion to display gifs
	$(document).on('click', 'button', function(event){

		// show container
		$(".myContainer").show();
		
		// get id of button
		var name = this.id;

		// clear div for new set of gifs
		$("#instruments").empty();

		// call showImage with name
		showImage(name);
	})

	// get gif & rating and display on screen
	function showImage(name){

		// concatenate url with given name
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&rating=g&api_key=5LkGwNVkAh0pq1YEhrHrJf9S43DQJ8S7&limit=10";

		$.ajax({
      		url: queryURL,
      		method: 'GET'
   		}).then(function(response) {
   			for (var i = 0; i < response.data.length; i++) {
   				// console.log(response.data);

      			// getting img url
      			var giphyURL = response.data[i].images.fixed_height.url;
      			// get index of 200 add 3 to insert _s
      			var n = giphyURL.indexOf('200') + 3;
      			// slice string insert _s concatenate
      			var output = [giphyURL.slice(0, n), '_s', giphyURL.slice(n)].join('');

      			// get rating
      			var rating = response.data[i].rating;

      			// creating img tag and p
    			var newImg = $("<img>");
    			var newRating = $("<p>");

    			// add attrs to img
    			newImg.addClass('giphImg');
    			newImg.attr("id", i);
    			newImg.attr('data-state', 'still');
    			newImg.attr('data-still', output);
    			newImg.attr('data-animate', giphyURL);
    			newImg.attr("src", output);
    			// console.log(newImg);
    			// add rating to p tag
    			newRating.append('Rating: ' + rating);

    			// play button
    			var playBtn = $("<img class='playBtn'>").attr('src', '../images/play.jpg');
    			playBtn.attr('id', 'play' + i);

    			// create complete div
    			var newInstruments = $("<div>").addClass('instrumentClass').append(newRating, newImg, playBtn);
    			
    			// append div to screen
    			$("#instruments").append(newInstruments);
        	}
    	});
	}

	// when user searches for gifs in input field
	$(document).on('click', '#addinput', function(event){

		// show container
		$(".myContainer").show();

		// prevent page reload
		event.preventDefault();

		// if statement to prevent creating blank button
		if($("#input").val() != ' '){

			// add input to topic array
			topics.push($("#input").val().trim());

			// call buttonCreate to display new button
			buttonCreate();

			// empty input field after creation
			$("#input").val(" ");
		}
		
	});

	// animate gif on click
	$(document).on('click', '.playBtn', function(event){
		$(this).attr('src', '../images/still.jpg');
		$(this).addClass('stillBtn');
		var id = $(this).attr('id');
		console.log(id);
		let giphId = id.charAt(id.length-1);
		console.log("#" + giphId);

		// change gif source and state
		$("#" + giphId).attr('src', $("#" + giphId).attr('data-animate'));
		$("#" + giphId).attr('data-state', 'animate');

	});

	// still gif on click
	$(document).on('click', '.stillBtn', function(event){
		// $(this).hide();
		$(this).attr('src', '../images/play.jpg');
		$(this).removeClass('stillBtn');
		var id = $(this).attr('id');
		console.log(id);
		let giphId = id.charAt(id.length-1);
		console.log("#" + giphId);
		
		$("#" + giphId).attr('src', $("#" + giphId).attr('data-still'));
		$("#" + giphId).attr('data-state', 'still');
		
		
	});
});