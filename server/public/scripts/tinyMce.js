tinymce.init({
	selector: 'textarea#content',
	automatic_uploads: true,
	images_upload_url: '/upload/image',
	convert_urls: false,
	forced_root_block: 'div',
	plugins: [
		'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export', 'pageembed',
		'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
		'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
	],
	toolbar: 'undo redo | formatpainter casechange blocks | bold italic backcolor | image | ' +
		'pageembed alignleft aligncenter alignright alignjustify  | ' +
		'bullist numlist code checklist outdent indent  | table help',
	formats: {
		cite: { block: 'cite' }
	},
	preview_styles: false,
	content_style: `
	@font-face {
  font-family: "Inter";
  src: url("/client/fonts/Inter-Medium.eot");
  src: local("/client/fonts/Inter Medium"), local("/client/fonts/Inter-Medium"), url("/client/fonts/Inter-Medium.eot?#iefix") format("embedded-opentype"), url("/client/fonts/Inter-Medium.woff2") format("woff2"), url("/client/fonts/Inter-Medium.woff") format("woff"), url("/client/fonts/Inter-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Inter";
  src: url("/client/fonts/Inter-Bold.eot");
  src: local("/client/fonts/Inter Bold"), local("/client/fonts/Inter-Bold"), url("/client/fonts/Inter-Bold.eot?#iefix") format("embedded-opentype"), url("/client/fonts/Inter-Bold.woff2") format("woff2"), url("/client/fonts/Inter-Bold.woff") format("woff"), url("/client/fonts/Inter-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

body {
	font-family: 'Inter';
	background-color: #06040E;
	color: #e9e9e9;
	font-size: 20px;
	line-height: 24px;
}
	 h1 {
  font-weight: 700;
  font-size: 64px;
  line-height: 77px;
  color: #ffffff;
}
 p {
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  margin: 40px 0;
}
 p a {
  display: inline-block;
  background-image: linear-gradient(258.19deg, #ff6c4b 0%, #ff2943 99.21%), linear-gradient(0deg, #e9e9e9, #e9e9e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}
 p a::after {
  position: absolute;
  content: "";
  height: 1px;
  width: 100%;
  background-image: linear-gradient(258.19deg, #ff6c4b 0%, #ff2943 99.21%), linear-gradient(0deg, #e9e9e9, #e9e9e9);
  bottom: 0;
  left: 0;
}
 h2 {
  margin: 60px 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
}
 ol li {
  font-weight: 700;
}
 ul li {
  position: relative;
  padding-left: 22px;
}
 ul li::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 4px;
  background-image: linear-gradient(102.21deg, #4b03c1 0%, #ad00ff 100%);
  border-radius: 100%;
  left: 0;
  top: 50%;
}
 ul li a {
  background-image: linear-gradient(102.21deg, #4b03c1 0%, #ad00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: relative;
}
 ul li a::after {
  position: absolute;
  content: "";
  height: 1px;
  width: 100%;
  background-image: linear-gradient(102.21deg, #4b03c1 0%, #ad00ff 100%);
  bottom: 0;
  left: 0;
}
.blogs blockquote {
  background-color: #141120;
  border-radius: 22px;
  padding: 38px 45px;
}
.blogs blockquote h3 {
  max-width: 618px;
  font-style: italic;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  padding-left: 0;
}
.blogs blockquote cite {
  display: block;
  text-align: right;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  margin-top: 30px;
}
	`
});