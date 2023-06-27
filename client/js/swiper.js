import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'
var menu = ['Удаленная запись', 'Актеры', 'Инвентарь']
const swiper = new Swiper('.home-swiper', {
	autoHeight: true,
	slidesPerView: "auto",
	effect: "fade",
	breakpoints: {
		320: {
			pagination: {
				el: '.swiper-pagination--mob',
				type: 'bullets',
				clickable: true,
				renderBullet: function (index, className) {
					return `<button class='btn btn-clean ${className}'><span>0${index + 1}</span>${menu[index]}  </button>`;
				},
			},
		},
		576: {
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				renderBullet: function (index, className) {
					return `<button class='btn btn-clean ${className}'><span>0${index + 1}</span>${menu[index]}  </button>`;
				},
			},
		}
	}

})