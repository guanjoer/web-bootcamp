const imagePicker = document.querySelector('#image-preview-control input');
const imagePreview = document.querySelector('#image-preview-control img');

function updateImagePreview() {
	const files = imagePicker.files; // Return to array

	// 선택된 파일이 없거나 파일을 선택했다가 취소한 경우
	if(!files || files.length === 0) {
		imagePreview.style.display = 'none';

		return;
	};

	// 선택한 파일이 존재할 경우
	const pickedFile = files[0];

	imagePreview.src = URL.createObjectURL(pickedFile); // 사용자가 선택한 이미지를 url로 변환
	imagePreview.style.display = 'block';
}

imagePicker.addEventListener('change', updateImagePreview);