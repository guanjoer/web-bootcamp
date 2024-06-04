const checkEmailBtn = document.getElementById('check-email');
const emailInput = document.getElementById('email');

const csrfToken = document.querySelector('input[name="_csrf"]').value;


checkEmailBtn.addEventListener('click', async () => {
    const email = emailInput.value;

    try {
      const response = await fetch('/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email,  _csrf: csrfToken })
      });

      const data = await response.json();
      if (data.exists) {
        alert('이미 존재하는 이메일입니다.');
      } else {
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      alert('이메일 확인 중 오류가 발생했습니다.');
    }
  });