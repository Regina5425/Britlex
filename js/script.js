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