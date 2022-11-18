const burger = document.querySelector('[data-burger]');
const headerNav = document.querySelector('[data-nav]');
const navItems = headerNav.querySelectorAll('a');
const body = document.body;
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

burger.addEventListener('click', () => {
	body.classList.toggle('stop-scroll');
	burger.classList.toggle('burger--active');
	headerNav.classList.toggle('header-nav--visible');
});

navItems.forEach(el => {
	el.addEventListener('click', () => {
		body.classList.remove('stop-scroll');
		burger.classList.remove('burger--active');
		headerNav.classList.remove('header-nav--visible');
	});
});

//anchors
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener('click', (e) => {
		e.preventDefault();

		const id = anchor.getAttribute('href').substring(1);

		document.getElementById(id).scrollIntoView({
			behavior: 'smooth'
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	//modal
	const modalBtn = document.querySelector('.header__btn'),
		modal = document.querySelector('.modal');

	const message = {
		successModal: 'Thank you! We will contact you soon!',
		successSub: 'Thanks for subscribing!',
		failure: 'Something went wrong... Try later'
	};

	modalBtn.addEventListener('click', openModal);
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
			`;

		modal.append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// forms
	const contactForm = document.querySelector('.contact__form'),
		modalForm = document.querySelector('.modal-form'),
		inputsModal = document.querySelectorAll('.modal-form > input'),
		inputEmail = document.querySelector('.contact__form-text');

	function createErr(element) {
		const errBlock = document.createElement('p');
		errBlock.classList.add('err');
		errBlock.textContent = '*Invalid data';
		element.append(errBlock);

		setTimeout(() => {
			errBlock.textContent = '';
		}, 3000);
	}

	//subscribe form
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();

		//form validation
		if (inputEmail.validity.typeMismatch || inputEmail.value === '') {
			const contactBlock = document.querySelector('.contact__content');

			createErr(contactBlock);
		}

		//post subscribe form
		const email = inputEmail.value;

		const userMail = {
			email
		};

		if (email !== '') {
			fetch('https://httpbin.org/post', {
					method: 'POST',
					headers: {
						'Content-type': 'applciation/json; charset=utf-8'
					},
					body: JSON.stringify(userMail)
				})
				.then(response => response.json())
				.then(data => {
					console.log(data);
					showThanksModal(message.successSub);
				})
				.catch(error => {
					console.log(error);
					showThanksModal(message.failure);
				})
				.finally(() => {
					contactForm.reset();
				});
		}
	});

	//modal form
	modalForm.addEventListener('submit', (e) => {
		e.preventDefault();

		inputsModal.forEach(input => {
			if (input.validity.typeMismatch || input.value === '') {
				const modalForm = document.querySelector('.modal-form');

				createErr(modalForm);
			}
		});

		//post modal form
		const modalArr = [];
		inputsModal.forEach(inputModal => {
			modalArr.push(inputModal.value);
		});

		if (modalArr.length !== 0) {
			fetch('https://httpbin.org/post', {
					method: 'POST',
					headers: {
						'Content-type': 'applciation/json; charset=utf-8'
					},
					body: JSON.stringify(modalArr)
				})
				.then(response => response.json())
				.then(modalData => {
					console.log(modalData);
					showThanksModal(message.successModal);
				})
				.catch(modalErr => {
					console.log(modalErr);
					showThanksModal(message.failure);
				})
				.finally(() => {
					modalForm.reset();
				});
		}
	});
});