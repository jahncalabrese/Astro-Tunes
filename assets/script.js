// Function to handle "Blast Off" button click
function blastOff() {
	const signInput = document
		.getElementById('signInput')
		.value.trim()
		.toLowerCase();
	// Save the birthdate to local storage
	localStorage.setItem('signInput', JSON.stringify(signInput));
	// Redirect to the horoscope page
	document.location.replace('index2.html');

	// getHoroscopeData(signInput);
}


// Function to handle "Back to Earth" button click
function backToEarth() {
	// Clear local storage
	localStorage.removeItem('signInput');

	// Redirect to the first page
	window.location.href = 'index.html';
}
