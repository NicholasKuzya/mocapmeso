
const blogSwiper = new Swiper('.blog-swiper', {
	// Optional parameters
	slidesPerView: 4,
	spaceBetween: 50,
	// Navigation arrows
	navigation: {
		nextEl: '.blog-swiper__btn--next',
		prevEl: '.blog-swiper__btn--prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 50,
		}
	}
});

