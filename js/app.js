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
	if (guess == secretNum) {
		giveFeedback('You Win')
	}
	else if(Math.abs(guess - secretNum) < 10){
		giveFeedback('Very hot')
	} else if(Math.abs(guess - secretNum) < 20 && Math.abs(guess - secretNum) > 10){
		giveFeedback('Hot')
	} else if(Math.abs(guess - secretNum) < 30 && Math.abs(guess - secretNum) > 20){
		giveFeedback('Warm')
	} else if(Math.abs(guess - secretNum) < 50 && Math.abs(guess - secretNum) > 30){
		giveFeedback('Cold')
	} else if(Math.abs(guess - secretNum) > 50){
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
	handleInstructionsModal();
	newGame();

	// get user guess when user hits submit button
	$('form').submit(function(event) {
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


