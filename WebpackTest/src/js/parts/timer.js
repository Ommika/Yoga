function timer() {

	let deadLine = '2020-11-02 16:00:00',
		timer = document.getElementById('timer'),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds');

	function updateClock() {
		let diffTime = Date.parse(deadLine) / 1000 - new Date().getTime() / 1000;
		updateContent('.hours', Math.floor(diffTime / (60 * 60)), -2);
		updateContent('.minutes', Math.floor((diffTime / 60) % 60), -2);
		updateContent('.seconds', Math.floor(diffTime % 60), -2);
		if (diffTime <= 1) {
			clearInterval(timeInterval);
			hours.innerHTML = '00';
			minutes.innerHTML = '00';
			seconds.innerHTML = '00';
		}
	}

	function updateContent(label, value, slice) {
		timer.querySelector(label).textContent = ('0' + value).slice(slice);
	}
	let timeInterval = setInterval(updateClock, 1000);

}

module.exports = timer;