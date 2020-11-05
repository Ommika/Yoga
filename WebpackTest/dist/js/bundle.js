/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 93:0-14 */
/***/ ((module) => {

function form(){


	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	};

	let form = document.querySelector('.main-form'),
		input = form.getElementsByTagName('input'),
		contactForm = document.getElementById('form'),
		contactFormInput = contactForm.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

  	statusMessage.classList.add('status');
  
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
}

module.exports=form;

/***/ }),

/***/ "./src/js/parts/modal.js":
/*!*******************************!*\
  !*** ./src/js/parts/modal.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 34:0-14 */
/***/ ((module) => {

function modal() {

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
	
}

module.exports=modal;

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 52:0-14 */
/***/ ((module) => {

function slider(){

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

	dotsWrap.addEventListener('click', function(event) {
		for(let i=0; i<dots.length+1; i++) {
			if(event.target.classList.contains('dot')&& event.target==dots[i-1]){
				currentSlide(i);
			}
		}
	});
}

module.exports=slider;

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 38:0-14 */
/***/ ((module) => {

function tabs(){

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
	
}

module.exports=tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 29:0-14 */
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
window.addEventListener('DOMContentLoaded', function () {

	'use strict';
	let tabs = __webpack_require__(/*! ./parts/tabs.js */ "./src/js/parts/tabs.js"),
		form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
		slider = __webpack_require__(/*! ./parts/slider.js */ "./src/js/parts/slider.js"),
		timer = __webpack_require__(/*! ./parts/timer.js */ "./src/js/parts/timer.js"),
		modal = __webpack_require__(/*! ./parts/modal.js */ "./src/js/parts/modal.js");

	tabs();
	form();
	timer();
	modal();
	slider();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map