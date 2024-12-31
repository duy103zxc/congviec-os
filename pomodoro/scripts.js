const circleElement = document.querySelector('.circle');
const timeElement = document.querySelector('.time');
const timeModeElement = document.querySelector('.time-mode');
const turnElement = document.querySelector('.turns');
const controlButton = document.querySelector('.timer-control');
const resetButton = document.querySelector('.reset-button');
const notificationSound = document.querySelector('#notification');
const timeContainerElement = document.querySelector('.time-container');

let isRunning,
	isBreakTime,
	workTime,
	breakTime,
	longBreakTime,
	totalTurns,
	currentTurn,
	totalTime,
	timeRemaining,
	timer;

controlButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', reset);

Notification.requestPermission();

function startValues() {
	let workTimeElement = document.querySelector('#work-time-options');
	let totalTurnsElement = document.querySelector('#total-turns-options');

	isRunning = false;
	isBreakTime = false;
	workTime = (workTimeElement.options[workTimeElement.selectedIndex].value) * 60;
	breakTime = ((workTimeElement.options[workTimeElement.selectedIndex].value) / 5) * 60;
	longBreakTime = ((workTimeElement.options[workTimeElement.selectedIndex].value) - 10) * 60;
	totalTurns = totalTurnsElement.options[totalTurnsElement.selectedIndex].value;
	currentTurn = 1;
	totalTime = workTime;
	timeRemaining = totalTime;
	timer = null;
}

function toggleStartPause() {
	isRunning ? pause() : start();
}

function start() {
	isRunning = true;
	controlButton.innerText = 'Pause';
	timer = setInterval(updateTimer, 1000);
	timeContainerElement.classList.remove('rotateIn');
}

function pause() {
	isRunning = false;
	controlButton.innerText = 'Continue';
	clearInterval(timer);
}

function reset() {
	pause();
	startValues();
	drawTime();
	drawTurn();
	runAnimation('rotateIn');
	document.querySelector('.config-message').style.display = 'none';
}

function updateTimer() {
	if (timeRemaining > 0) {
		timeRemaining--;
	}
	else {
		finishTurn();
	}
	drawTime();
}

function finishTurn() {
	notificationSound.play();
	runAnimation('swing');
	nextTurn();
	drawTurn();
}

function runAnimation(animation) {
	timeContainerElement.classList.add(animation);
	timeContainerElement.addEventListener('animationend', () => {
		timeContainerElement.classList.remove(animation);
	});
}

function nextTurn() {
	isBreakTime = !isBreakTime;
	if (!isBreakTime) {
		currentTurn++;
	}

	if (currentTurn <= totalTurns) {
		if (isBreakTime) {
			totalTime = currentTurn < totalTurns ? breakTime : longBreakTime;
			showNotification("Time to rest", "It's time to take a short break now!");
		} else {
			totalTime = workTime;
			showNotification("Back to work", "You're almost there, just a few more minutes of work");
		}
		timeRemaining = totalTime;
	} else {
		reset();
	}
}

function drawTime() {
	const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
	const seconds = Math.floor(timeRemaining % 60).toString().padStart(2, '0');

	timeElement.innerText = `${minutes}:${seconds}`;
	setCirclePercent(timeRemaining / totalTime * 100);
}

function drawTurn() {
	let timeMode = 'Trabalho';
	if (isBreakTime) {
		timeMode = currentTurn < totalTurns ? 'Descanso' : 'Descanso Longo';
	}
	timeModeElement.innerText = timeMode;
	turnElement.innerText = `${currentTurn}/${totalTurns}`;
}

function setCirclePercent(percent) {
	const circlePerimeter = 597;
	const dashOffset = (circlePerimeter * (percent / 100));

	circleElement.style.setProperty('--dash-offset', circlePerimeter - dashOffset);
}

function showNotification(messageHeader, messageBody) {
	const notification = new Notification(messageHeader, { body: messageBody });
	setTimeout(notification.close.bind(notification), 4000);
}

function showResetMessage() {
	document.querySelector('.config-message').style.display = 'inline';
}

reset();
