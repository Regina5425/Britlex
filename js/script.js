//burger-menu
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
				.then(data => console.log(data))
				.catch(error => console.log(error));
		}

		inputEmail.value = '';
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
				.then(modalData => console.log(modalData))
				.catch(modalErr => console.log(modalErr));
		}

		inputsModal.forEach(input => {
			input.value = '';
		});
	});
});