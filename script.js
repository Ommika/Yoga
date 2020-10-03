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

	// timer (refactoring the code)

	let deadLine = '2020-09-29';
	let timer = document.getElementById('timer');

	function updateClock() {
		let diffTime = Date.parse(deadLine) / 1000 - new Date().getTime() / 1000;
		updateContent('.hours', Math.floor(diffTime / (60 * 60)), -3);
		updateContent('.minutes', Math.floor((diffTime / 60) % 60), -2);
		updateContent('.seconds', Math.floor(diffTime % 60), -2);
		if (diffTime <= 1) {
			clearInterval(timeInterval);
		}
	}

	function updateContent(label, value, slice) {
		timer.querySelector(label).textContent = ('0' + value).slice(slice);
	}
	var timeInterval = setInterval(updateClock, 1000);

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

	let closeModal = function (event) {
		let target = event.target;
		if (
			event.code === "Escape" ||
			target.classList.contains('popup-close') ||
			target.classList.contains('fade')
		) {
			overlay.style.display = 'none';
			more.classList.remove('more-splash');
			document.body.style.overflow = '';
			close.removeEventListener('click', closeModal);
			overlay.removeEventListener('click', closeModal);
			document.removeEventListener('keydown', closeModal);
		}
	};

	//form

	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...'
		//сообщения о состоянии
	};

	let form = document.querySelector('.main-form'),
		input = form.getElementsByTagName('input'),
		contactForm = document.getElementById('form'),
		contactFormInput = contactForm.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

	statusMessage.classList.add('status');


	//модальное окно

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		//отменяет перезагрузку страницы
		form.appendChild(statusMessage);
		//в окно формы добавлен блок со статусом сообщения

		let request = new XMLHttpRequest(); //создание запроса
		request.open('POST', 'server.php'); //настройка запроса методом POST(данные отправляются) и URL сервера

		//request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//настройка заголовков http запросов в обычном формате

		request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //настройка запросов в JSON формате 

		//для обработки GET-запросов применяется LiveServer (VSCode)
		//для обработки POST-запросов необходимо установить локальный сервер:
		//WAMP - для Windows
		//MAMP - для Mac
		//LAMP - для Linuх

		let formData = new FormData(form);
		//получение данных от пользователя через встроенный объект FormData

		let obj = {};
		formData.forEach(function (value, key) {
			obj[key] = value;
		});
		let json = JSON.stringify(obj);
		//для JSON формата

		// request.send(formData); отправка запроса в обычном формате
		request.send(json); //отправка запроса в JSON формате

		request.addEventListener('readystatechange', function () {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});

	//контактная форма

	contactForm.addEventListener('submit', function (event) {
		event.preventDefault();
		contactForm.appendChild(statusMessage);


		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');

		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		let formData = new FormData(contactForm);

		let obj = {};

		formData.forEach(function (value, key) {
			for (let i = 0; i < contactFormInput.length; i++) {
				obj.key[i] = value[i];
			}
		});
		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function () {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i < contactFormInput.length; i++) {
			contactFormInput[i].value = '';
		}
	});

});