const headerToggle = document.querySelector('.header-nav__toggle');
const header = document.querySelector('.header-nav');
headerToggle.addEventListener('click', () => {
	const icon = headerToggle.querySelector('img');
	const navList = document.querySelector('.nav-list');
	if (navList.style.display === "block") {
		navList.style.display = "none";
		icon.setAttribute('src', '/client/images/icons/header-burger__icon.svg');
		headerToggle.style.background = 'rgba(255, 255, 255, 0.15)';
		headerToggle.style.padding = '11px';
		header.style.background = 'transparent';
		document.body.style.overflow = 'visible';
	} else {
		navList.style.display = "block";
		icon.setAttribute('src', '/client/images/icons/header-burger__icon-close.svg');
		headerToggle.style.background = '#5603C8';
		headerToggle.style.padding = '12.5px';
		header.style.background = '#0a0814';
		document.body.style.overflow = 'hidden';
	}
});

let sampleSlider = document.querySelector('#sampleSlider');
const widthDoc = document.body.clientWidth;
if (widthDoc > 767) {
	widthSlider = 400;
}
else {
	widthSlider = 260;
}
setInterval(function () {

}, 200);
const mySlider = new rSlider({
	target: '#sampleSlider',
	values: [1, 2, 3, 4, 5, 6],
	range: false,
	tooltip: false,
	scale: true,
	width: widthSlider,
	labels: true,
	onChange: function (vals) {
		myFunc(parseFloat(vals));
		const rangePointer = document.querySelector('.rs-pointer');
		setInterval(function () {
			const rSliderScaleSpan = document.querySelector('.rs-scale').querySelectorAll('span');
			let slideValue = mySlider.getValue()
			for (let i = 0; slideValue > i; i++) {
				rSliderScaleSpan[i].classList.add('bg')
			}
			for (let i = 5; slideValue <= i; i--) {
				rSliderScaleSpan[i].classList.remove('bg')
			}
		}, 1);

		if (sampleSlider.value == 1) {
			rangePointer.style.left = '-9px'
		} else {
			let res = parseInt(rangePointer.style.left) / 100 * 99.3
			if (sampleSlider.value == 6) {
				return rangePointer.style.left = `${res - 2}px`
			}
			rangePointer.style.left = `${res}px`
		}
	}
});
if (sampleSlider) {
	const rangePointer = document.querySelector('.rs-pointer');
	rangePointer.addEventListener('mousedown', () => {
		rangePointer.classList.add('blur');
	});
}

const listPosterEl = document.querySelector('.list-posters');
if (listPosterEl) {

	const postHtml = (title, url, alt, slug) => {
		return `
    <li class="post-item">
		<a href="/blog/${slug}" class="post-link"></a>
            <div class="image"><img src="/static/uploads/posts/${url}" alt="${alt}">
            <a
                class="btn btn-violet btn-violet--circle" href="/blog/${slug}">
                <svg class="icon">
                  <use href="/client/images/sprites/icons.svg#arrow"></use>
                </svg>
              </a>
            </div>
            <h2 class="text">
                ${title}
            </h2>
          </li>
  `
	}
	// pagination
	let quantityforselection = 9;
	const paginationEl = document.querySelector('.pagination')
	function paintResult(arr) {
		for (i = 0, r = ""; i < arr.length; i++) {
			r += `<li class="post-item">
					<a href="/blog/${arr[i].slug}" class="post-link"></a>
            <div class="image"><img src="/static/uploads/posts/${arr[i].preview.url}" alt="${arr[i].preview.alt}">
            <a
                class="btn btn-violet btn-violet--circle" href="/blog/${arr[i].slug}">
                <svg class="icon">
                  <use href="/client/images/sprites/icons.svg#arrow"></use>
                </svg>
              </a>
            </div>
            <h2 class="text">
                ${arr[i].title}
            </h2>
          </li>`
		}
		return r
	}
	function numberofbuttons(arr, num) {
		return Math.ceil(arr.length / num)
	}
	function paintPaginationButton(count) {
		for (i = 1, r = ""; i <= count; i++) {
			if (i === 1) {
				r += `<li class="page-item page-item--active"><span class="page-link">${i}</span></li>`
			} else {
				r += `<li class="page-item"><span class="page-link">${i}</span></li>`
			}
		}
		return r
	}


	fetch('/api/blogs')
		.then(response => response.json())
		.then(data => {
			if (!listPosterEl.closest('.home-last')) {
				console.log(numberofbuttons(data.results, quantityforselection))
				paginationEl.innerHTML = paintPaginationButton(numberofbuttons(data.results, quantityforselection));
				let dataReverse = data.results.reverse()
				listPosterEl.innerHTML = paintResult(dataReverse.slice(0, quantityforselection))
				document.addEventListener('click', function (event) {
					if ([...event.target.classList].includes("page-item") || [...event.target.classList].includes("page-link")) {
						let y = event.target.textContent;
						let start = quantityforselection * (y - 1);
						let end = quantityforselection * y;
						listPosterEl.innerHTML = paintResult(dataReverse.slice(start, end));
						const paginationItem = document.querySelector('.pagination .page-item--active')
						paginationItem.classList.remove('page-item--active')
						event.target.classList.add('page-item--active')
					} else {
						console.log(event.target)
					}
				});
			}
			if (listPosterEl.closest('.home-last')) {
				const dataSlice = data.results.slice(-3);
				dataSlice.map(post => {
					listPosterEl.insertAdjacentHTML('afterbegin', postHtml(post.title, post.preview.url, post.preview.alt, post.slug))
				})
			}
		})
		.catch(err => console.error(err))
}
