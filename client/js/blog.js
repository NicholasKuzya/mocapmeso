const blogsWrapper = document.querySelector('.blogs-wrapper');
const breadcrubsList = document.querySelector('.breadcrumbs-list');
function getLastPart(url) {
	const parts = url.split('/');
	return parts.at(-1);
}
const locationUrl = window.location.href;
const htmlCode = (title, content, date, views, author) => {
	return `
		<article class="blogs-content">
						<h1>${title}</h1>
						<div class="blogs-container">
							${content}
						</div>
					</article>
					<aside class="sidebar sidebar--info">
						<div class="sidebar-wrapper">
							<time class="sidebar-date">${date}</time>
							<div class="sidebar-views"><i><img src="/client/images/icons/eyes.svg"
										alt="eyes icon"></i><span>${views}</span></div>
						</div>
						<div class="sidebar-author">
							<div class="sidebar-wrapper">
								<div class="sidebar-author__image"></div>
								<div class="sidebar-author__name">${author}</div>
							</div>
						</div>
					</aside>
	`
}
let authorName;
fetch(`/api/blog/${getLastPart(locationUrl)}`).then(response => response.json()).then(data => {
	data.map(blog => {
		const previewImageEl = document.querySelector('.preview-image img');
		previewImageEl.setAttribute('src', `/static/uploads/posts/${blog.preview.url}`);
		previewImageEl.setAttribute('alt', blog.preview.alt);
		const content = blog.content.normalize();
		breadcrubsList.insertAdjacentHTML('beforeend', `<li class="breadcrumbs-list__item"><span class="breadcrumbs-list__link">${blog.title}</span></li>`)
		blogsWrapper.insertAdjacentHTML('beforeend', htmlCode(blog.title, content, blog.date, blog.views, blog.author))
		authorName = blog.author;
	})
})

const sliderHtml = (url, alt, title, author, date, views, slug) => {
	return `<div class="swiper-slide post">
					<a href="/blog/${slug}" class="post-link"></a>
									<div>
										<img src="/static/uploads/posts/${url}" alt="${alt}">
									</div>
									<h2>${title}</h2>
									<div>
										<span>${author}</span>
										<time>${date}</time>
									</div>
									<div>
										<div>
											<i>
												<img src="/client/images/icons/eyes.svg" alt="">
											</i>
											<span>${views}</span>
										</div>
									</div>
								</div>`
}

const tabsControllers = document.querySelectorAll('.tabs-btn__link')
const swiperWrapper = document.querySelector('.swiper-wrapper')
tabsControllers.forEach(tabsController => {
	tabsController.addEventListener('click', (e) => {
		const el = e.target;
		let dataController = el.getAttribute('data-controller')
		if (dataController == 1) {
			const btn = document.querySelector(`.tabs-btn__link[data-controller='2']`)
			btn.classList.remove('tabs-btn__link--active')
			fetch('/api/blogs').then(response => response.json()).then(data => {
				data.results.forEach(blog => {
					swiperWrapper.insertAdjacentHTML('afterbegin', sliderHtml(blog.preview.url, blog.preview.alt, blog.title, blog.author, blog.date, blog.views, blog.slug))
				})
			})
		} else {
			const btn = document.querySelector(`.tabs-btn__link[data-controller='1']`)
			btn.classList.remove('tabs-btn__link--active')
			swiperWrapper.textContent = ''
			fetch('/api/blogs').then(response => response.json()).then(blogs => {
				blogs.results.forEach(author => {
					if (authorName === author.author) {
						swiperWrapper.insertAdjacentHTML('afterbegin', sliderHtml(author.preview.url, author.preview.alt, author.title, author.author, author.date, author.views, author.slug))
					}
				});
			});
		}
		return el.classList.add('tabs-btn__link--active')
	})
})
fetch('/api/blogs').then(response => response.json()).then(data => {
	data.results.forEach(blog => {
		swiperWrapper.insertAdjacentHTML('afterbegin', sliderHtml(blog.preview.url, blog.preview.alt, blog.title, blog.author, blog.date, blog.views, blog.slug))
	})
})


