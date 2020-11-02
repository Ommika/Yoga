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
			hours.innerHTML='00';
			minutes.innerHTML='00';
			seconds.innerHTML='00';
		}
	}

	function updateContent(label, value, slice) {
		timer.querySelector(label).textContent = ('0' + value).slice(slice);
	}
	let timeInterval = setInterval(updateClock, 1000);

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


	// form.addEventListener('submit', function (event) {
	// 	event.preventDefault();
	// 	//отменяет перезагрузку страницы
	// 	form.appendChild(statusMessage);
	// 	//в окно формы добавлен блок со статусом сообщения

	// 	let request = new XMLHttpRequest(); //создание запроса
	// 	request.open('POST', 'server.php'); //настройка запроса методом POST(данные отправляются) и URL сервера

	// 	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// 	//настройка заголовков http запросов в обычном формате

	// 	//для обработки GET-запросов применяется LiveServer (VSCode)
	// 	//для обработки POST-запросов необходимо установить локальный сервер:
	// 	//WAMP - для Windows
	// 	//MAMP - для Mac
	// 	//LAMP - для Linuх

	// 	let formData = new FormData(form);
	// 	//получение данных от пользователя через встроенный объект FormData

	// 	let obj = {};
	// 	formData.forEach(function (value, key) {
	// 		obj[key] = value;
	// 	});

	// 	request.send(formData); //отправка запроса 
		
	// 	request.addEventListener('readystatechange', function () {
	// 		if (request.readyState < 4) {
	// 			statusMessage.innerHTML = message.loading;
	// 		} else if (request.readyState === 4 && request.status == 200) {
	// 			statusMessage.innerHTML = message.success;
	// 		} else {
	// 			statusMessage.innerHTML = message.failure;
	// 		}
	// 	});

	// 	for (let i = 0; i < input.length; i++) {
	// 		input[i].value = '';
	// 	}
	// });
	// //в обычном формате



	form.addEventListener('submit', function (event) {
		event.preventDefault();
		form.appendChild(statusMessage);
		
		let request = new XMLHttpRequest();
		request.open('POST', 'server.php'); 
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); 

		let formData = new FormData(form);

		let obj = {};
		formData.forEach(function (value, key) {
			obj[key] = value;
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

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});
	//в JSON формате(предпочитаемый вариант)


	// function sendForm(elem) {
	//  	elem.addEventListener('submit', function(e){
	//  		e.preventDefault();
	// 			elem.appendChild(statusMessage);
	// 			let formData = new FormData(elem);

	// 			function postData(data) {
	// 				return new Promise(function(resolve, reject){
	// 					let request= new XMLHttpRequest();
	// 					request.open('POST', 'server.php');
	// 					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

 	// 					request.onreadystatechange = function(){
	// 						if(request.readyState<4) {
	// 							resolve()
	// 						} else if (request.readyState===4){
	// 							if(request.status ==200 && request.status<300){
	// 								resolve()
	// 							} else {
	// 								reject()
	// 	 						}	
	// 						}
	// 					}

	// 					request.send(data);
	// 				})
	// 			}//end postData

	// 			function clearInput () {
	// 				for(let i=0; i<input.length; i++){
	// 					input[i].value='';
	// 				}
	// 			}

	// 			postData(formData)
	// 				.then(()=>statusMessage.innerHTML=message.loading)
	// 				.then(()=> {
	// 					thankModal.style.display='block';
	// 					mainModal.style.display='none';
	// 					statusMessage.innerHTML='';
	// 				})
	// 				.catch(()=> statusMessage.innerHTML=message.failure)
	// 				.then(clearInput)

	//		});
	// 		sendForm(form);
	// 		sendForm(formButton);
	// };
	//ES6 with promise


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

 	//slider

	let slideIndex=1,
	slides = document.querySelectorAll('.slider-item'),
	prev = document.querySelector('.prev'),
	next = document.querySelector('.next'),
	dotsWrap= document.querySelector('.slider-dots'),
	dots = document.querySelectorAll('.dot');


	showSlides(slideIndex);

	function showSlides(n) {

		if(n>slides.length){
			slideIndex=1;
		}
		if(n<1) {
			slideIndex=slides.length;
		}

		slides.forEach((item)=> item.style.display='none');

		// for(let i=0; i<slides.length; i++){
		// 	slides[i].style.display='none';
		// }
		//you can use forEach method or this note

		dots.forEach((item)=> item.classList.remove('dot-active'));
		slides[slideIndex-1].style.display='block';
		dots[slideIndex-1].classList.add('dot-active');

	}

	function plusSlides(n){
		showSlides(slideIndex+=n);
	}

	function currentSlide(n){
		showSlides(slideIndex=n);
	}

	prev.addEventListener('click', function() {
		plusSlides(-1);
	});

	next.addEventListener('click', function(){
		plusSlides(1);
	});
	//click on Prev and Next arrows

	dotsWrap.addEventListener('click', function(event) {
		for(let i=0; i<dots.length+1; i++) {
			if(event.target.classList.contains('dot')&& event.target==dots[i-1]){
				currentSlide(i);
			}
		}
	});
	//click on dots



	//calc

	let persons = document.querySelectorAll('.counter-block-input')[0],
	restDays = document.querySelectorAll('.counter-block-input')[1],
	place = document.getElementById('select'),
	totalValue = document.getElementById('total'),
	personsSum=0,
	daysSum=0,
	total=0;

	totalValue.innerHTML=0;

	persons.addEventListener('change', function(){
		personsSum=+this.value;
		total=daysSum*personsSum*7000;

		if(restDays.value =='' || persons.value =='') {
			totalValue.innerHTML=0;
		} else {
			totalValue.innerHTML=total;
		}
	});

	restDays.addEventListener('change', function(){
		daysSum=+this.value;
		total=daysSum*personsSum*7000;

		if(restDays.value =='' || persons.value =='') {
			totalValue.innerHTML=0;
		} else {
			totalValue.innerHTML=total;
		}
	});

	place.addEventListener('change', function(){
		if(restDays.value =='' || persons.value ==''){
			totalValue.innerHTML=0;
		} else {
			let a= total;
			totalValue.innerHTML = a*this.options[this.selectedIndex].value;
		}
	});
	
});