const updateOrderFormElements = document.querySelectorAll('.order-actions form');

// const updateOrderBtns = document.querySelectorAll('.order-item form button');
  
  async function updateOrder(event) {
	event.preventDefault();
	const form = event.target;
	//   const form = event.target.closest('form');
	//   form.preventDefault(); // form의 기본 전송 방지
  
	const formData = new FormData(form); // form 태그 내, input 혹은 select의 값 추출 가능.
	const newStatus = formData.get('status'); // select tag
	const orderId = formData.get('orderid'); // input type="hidden"
	const csrfToken = formData.get('_csrf'); // input type="hidden"
  
	let response;
  
	try {
	  response = await fetch(`/admin/orders/${orderId}`, {
		method: 'PATCH',
		body: JSON.stringify({
		  newStatus: newStatus,
		  _csrf: csrfToken,
		}),
		headers: {
		  'Content-Type': 'application/json',
		},
	  });
	} catch (error) {
	  alert('Something went wrong - could not update order status.');
	  return;
	}
  
	if (!response.ok) {
	  alert('Something went wrong - could not update order status.');
	  return;
	}
  
	const responseData = await response.json();
  
	form.closest('article').querySelector('.badge').textContent =
	  responseData.newStatus.toUpperCase();
  }
  
  for (const updateOrderFormElement of updateOrderFormElements) {
	updateOrderFormElement.addEventListener('submit', updateOrder);
  }

//   for(const updateOrderBtn of updateOrderBtns) {
// 	updateOrderBtn.addEventListener('click', updateOrder);
//   };