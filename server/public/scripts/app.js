const blogsWrapper = document.querySelector('.blogs');
if(blogsWrapper) {

	const myfunc = (url, alt, slug, title) => {
		return `
		<div class="card">
		<a href="/admin/blog/${slug}" class="card-link"></a>
			<a href="/admin/blog/${slug}/edit" class="card-edit">Изменить</a>
			<div class="card-header">
			<img src="/static/uploads/posts/${url}" alt="${alt}">
			</div>
			<h2>${title}</h2>
		</div>
		`
	}
	fetch('/api/blogs').then(response => response.json()).then(data => {
		data.results.map(data => {
			blogsWrapper.insertAdjacentHTML('afterbegin', myfunc(data.preview.url, data.preview.alt, data.slug, data.title))
	})
})
}