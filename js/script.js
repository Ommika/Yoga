window.addEventListener('DOMContentLoaded', function () {

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	// timer

	let deadLine = '2020-09-29';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));
		//вычисление остатка времени в часах, минутах, секундах

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	let timer = document.getElementById('timer'),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds'),
		timeInterval = setInterval(updateClock, 1000);

	function updateClock() {
		let t = getTimeRemaining(deadLine);

		hours.textContent = ('0' + t.hours).slice(-2);
		minutes.textContent = ('0' + t.minutes).slice(-2);
		seconds.textContent = ('0' + t.seconds).slice(-2);
		//вывод полученных данных на страницу

		if (t.total <= 0) {
			clearInterval(timeInterval);
		}
		//остановка таймера
	}

	//modal

	let more = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		close = document.querySelector(".popup-close");

	more.addEventListener('click', function () {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
		close.addEventListener('click', closeModal);
		overlay.addEventListener('click', closeModal);
		document.addEventListener('keydown', closeModal);
	});

	const closeModal = function (event) {
		const target = event.target;
		console.log(event);
		if (
			event.code === "Escape" ||
			target.classList.contains('popup-close') ||
			target.closest('.overlay')
		) {
			overlay.style.display = 'none';
			more.classList.remove('more-splash');
			document.body.style.overflow = '';
			close.removeEventListener('click', closeModal);
			overlay.removeEventListener('click', closeModal);
			document.removeEventListener('keydown', closeModal);
		}
	};
});