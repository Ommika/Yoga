window.addEventListener('DOMContentLoaded', function () {

	'use strict';
	let tabs = require('./parts/tabs.js'),
		form = require('./parts/form.js'),
		slider = require('./parts/slider.js'),
		timer = require('./parts/timer.js'),
		modal = require('./parts/modal.js');

	tabs();
	form();
	timer();
	modal();
	slider();

});