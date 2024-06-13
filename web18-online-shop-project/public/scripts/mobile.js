const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');
const deleteItemBtns = document.querySelectorAll('#delete-item-btn');
const deleteItemIcons = document.querySelectorAll('#delete-item-btn img');

function toggleMobileMenu() {
	mobileMenuElement.classList.toggle('open');

	if(mobileMenuElement.classList.contains('open')) {
		deleteItemBtns.forEach(button => {
			button.style.display = 'none';
		});

		deleteItemIcons.forEach(icon => {
			icon.style.display = 'none';
		});

	} else {
		deleteItemBtns.forEach(button => {
			button.style.display = 'inline';
		});

		deleteItemIcons.forEach(icon => {
			icon.style.display = 'inline';
		});
	}
};

mobileMenuBtn.addEventListener('click', toggleMobileMenu);