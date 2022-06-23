const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;
let audio = '';

function nextSequence() {
	userClickedPattern = [];
	if (gameStarted == false) {
		$('#level-title').html(`Level ${level}`);
		//random number
		const randomNumber = Math.round(Math.random() * 3);
		//getting a random color with the random number
		let randomChosenColour = buttonColours[randomNumber];
		// push the random colour in the pattern array
		gamePattern.push(randomChosenColour);
		// selecting with DOM
		const colorChosen = $(`#${randomChosenColour}`);
		//animation
		buttonAnimation(colorChosen);
		//playing the audio of the current button
		playSound(randomChosenColour);
		console.log(gamePattern);
		++level;
	} else {
		console.log('Você iniciou o jogo');
	}
}
function playSound(name) {
	name = new Audio(`./sounds/${name}.mp3`);
	name.play();
}
function buttonAnimation(color) {
	color.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
		if (userClickedPattern.length == gamePattern.length) {
			setTimeout(() => {
				gameStarted = false;
				nextSequence();
			}, 1000);
		}
	} else {
		playSound('wrong');
		setTimeout(() => {
			$('body').toggleClass('game-over');
		}, 200);
		$('body').toggleClass('game-over');
		$('#level-title').html('Game Over, press any key to restart');
		startOver();
	}
}
function startOver() {
	level = 0;
	gamePattern = [];
	gameStarted = false;
}

$('.btn').on('click', function handler(e) {
	let userChosenColour = e.target.id;
	userClickedPattern.push(userChosenColour);
	const divColor = $(`#${userChosenColour}`);
	playSound(userChosenColour);
	buttonAnimation(divColor);
	checkAnswer(userClickedPattern.length - 1);
});

document.addEventListener('keydown', () => {
	nextSequence();
	gameStarted = true;
});
