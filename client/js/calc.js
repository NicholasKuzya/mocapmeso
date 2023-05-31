const dataCalc = new Map([
	['body_remote', 4000],
	['body_offline', 8000],
	['body_remote_added', 1000],
	['body_offline_added', 2000],
	['face_remote', 2000],
	['face_offline', 4000],
	['face_remote_added', 0],
	['face_offline_added', 0]
]);
const retarget = 1000;
const totalCountEl = document.querySelector('.total span');
const radioBtns = document.querySelectorAll('.custom-radio');
const calcResult = document.getElementById('calc-result');
function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const result = (post, type, count) => {
	const data = (count * dataCalc.get(post + '_' + type)) + dataCalc.get(post + '_' + type + '_added')
	return data
};

const myFunc = (count) => {
	const retargetEl = document.querySelector('.custom-radio--retarget').checked
	const bodyEl = document.querySelector('.custom-radio--body').checked;
	const faceEl = document.querySelector('.custom-radio--face').checked;
	let dataPost = calcResult.getAttribute('data-result-post');
	let dataType = calcResult.getAttribute('data-result-type');
	if (retargetEl) {
		retargetRes = 1000;
	}
	else {
		retargetRes = 0;
	}
	if (result(dataPost, dataType, count) !== NaN) {

		if (bodyEl && faceEl) {
			let dataPost_body = 'body';
			let dataPost_face = 'face';
			totalResult = retargetRes + (result(dataPost_face, dataType, count) + result(dataPost_body, dataType, count));
			totalCountEl.innerHTML = numberWithSpaces(totalResult) + '&#8381;';
		}

		else {
			totalCountEl.innerHTML = numberWithSpaces(result(dataPost, dataType, count) + retargetRes) + '&#8381;';
		}
	}
}
radioBtns.forEach(radioBtn => {
	radioBtn.addEventListener('click', (e) => {
		const bodyEl = document.querySelector('.custom-radio--body').checked;
		const faceEl = document.querySelector('.custom-radio--face').checked;
		const countVal = sampleSlider.value;
		const type = e.target.getAttribute('data-result-type');
		const post = e.target.getAttribute('data-result-post');
		if (!bodyEl && !faceEl) {
			// for default
			setTimeout(function () {
				document.querySelector('.custom-radio--body').checked = true;
				calcResult.setAttribute('data-result-post', 'body');
				myFunc(countVal);
			}, 1500);

		}
		if (bodyEl) {
			calcResult.setAttribute('data-result-post', 'body');
		}
		if (faceEl) {
			calcResult.setAttribute('data-result-post', 'face');
		}
		if (type !== null) {
			calcResult.setAttribute('data-result-type', type)
		}
		myFunc(countVal);
	})
})
const popup = document.querySelector('.popup');
const popupBtns = document.querySelectorAll('.popup-close');
popupBtns.forEach(popupBtn => {
	popupBtn.addEventListener('click', () => {
		popup.classList.remove('open')
	})
});

const btnContact = document.querySelector('.contact-btn');
const inputsContact = document.querySelectorAll('.contact-input .input');
btnContact.addEventListener('click', async () => {
	const data = {
		making: String,
		bodyPart: String,
		facePart: String,
		retarget: String,
		totalHours: Number,
		name: String,
		email: String,
		phone: Number
	}
	popup.classList.add('open')
	radioBtns.forEach((radioBtn, index) => {
		if (index === 0 || index === 1) {
			const radioText = radioBtn.closest('label').textContent.trim()
			if (radioBtn.checked) {
				data.making = radioText
				console.log(radioText)
			}
		}
		if (index === 2) {
			const radioText = radioBtn.closest('label').textContent.trim()
			if (radioBtn.checked) {
				data.bodyPart = radioText
			}
		}
		if (index === 3) {
			const radioText = radioBtn.closest('label').textContent.trim()
			if (radioBtn.checked) {
				data.facePart = radioText
				console.log(radioText)
			}
		}

		if (index === 4) {
			const radioText = radioBtn.closest('label').textContent.trim()
			if (radioBtn.checked) {
				data.retarget = radioText
			}
		}
		data.totalHours = mySlider.getValue()
	})
	inputsContact.forEach((input, index) => {
		if (index === 0) {
			data.name = input.value
		}
		if (index === 1) {
			data.email = input.value
		}
		if (index === 2) {
			data.phone = input.value
		}
	})
	console.log(popup)
	console.log(data)
	let response = await fetch('/application', {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) { // если HTTP-статус в диапазоне 200-299
		// получаем тело ответа (см. про этот метод ниже)
		return json = await response.json();
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
})