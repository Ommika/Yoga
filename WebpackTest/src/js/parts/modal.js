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