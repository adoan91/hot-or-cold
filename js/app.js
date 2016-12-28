var secretNum;

function handleInstructionsModal() {
	// when users click on the element with
	// `.js-what` class, we'll fade in
	// the instructions modal
	$('.js-what').click(function() {
		$('.overlay').fadeIn(1000);
	});

	// when users click on the element with the
	// `.js-close` class, we'll fade out
	// the instructions modal
	$('.js-close').click(function(){
  		$(".overlay").fadeOut(1000);
  	});
}

function getSecretNum() {
	secretNum = Math.floor(Math.random()*100)+1;
}

function newGame() {
	getSecretNum();
	giveFeedback("Make your Guess!")
	$('span.count').text(0);
	listReset();
	$('#js-user-guess').val('');
}

function listItemInsert(num) { 

	var out =
		'<li>' +
			num
		'</li>';

	return out;
}

function listReset() {
	//var r = parseInt($('span.count').text());
	$('ul#guessList').children('li').remove();
}

function checkUserGuess(guess) {
	var r = Math.abs(guess - secretNum);

	if (guess == secretNum) {
		giveFeedback('You Win')
	}
	else if(r < 10){
		giveFeedback('Very hot')
	} else if(r < 20 && r > 10){
		giveFeedback('Hot')
	} else if(r < 30 && r > 20){
		giveFeedback('Warm')
	} else if(r < 50 && r > 30){
		giveFeedback('Cold')
	} else if(r > 50){
		giveFeedback('Ice cold')
	}

	//listItemInsert(guess);
	$('ul#guessList').append(listItemInsert(guess));
}

function giveFeedback(feedback) {
	$('h2#feedback').text(feedback);
}

function trackCount() {
	var temp = parseInt($('span.count').text());
	$('span.count').text(temp + 1);
}


// `$(document).ready` lets you specify a
// function that should execute when all the
// resources required by your web page have loaded.
// This code says, when the document is ready, run the
// `handleInstructionsModal` function.
$(document).ready(function(){
	newGame();
	handleInstructionsModal();

	// get user guess when user hits submit button
	$('form').submit(function(event) {
		event.preventDefault();
  		var guess = $('#js-user-guess').val();
  		//prompt(guess);

  		checkUserGuess(guess);
  		trackCount();
  		
  		$('#js-user-guess').val('');
  	});

  	$('ul.clearfix').on('click', 'a.new.js-new-game', function(event) {	
  		//prompt('clicked new game');
  		newGame();
  	});

});


