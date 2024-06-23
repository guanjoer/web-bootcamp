// Elements
const filePicker = document.getElementById('image');
const imgPreview = document.getElementById('image-preview');

function showPreview() {
	const files = filePicker.files;

	if(!files || files.length === 0) {
		imgPreview.style.display = 'none';
		return
	};

	const pickedFile = files[0];

	imgPreview.src = URL.createObjectURL(pickedFile);
	imgPreview.style.display = 'block';
};

filePicker.addEventListener('change', showPreview);