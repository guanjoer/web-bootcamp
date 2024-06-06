// E-mail 중복확인
const checkEmailBtn = document.getElementById('check-email');
const emailInput = document.getElementById('email');


// 비밀번호 일치 확인
const checkPwdBtn = document.getElementById('check-password');
const pwdElement = document.getElementById('pwd');
const confirmPwdElemnt = document.getElementById('confirm-pwd');

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

      if (data.message) {
        alert(data.message);
        return;
      }

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

checkPwdBtn.addEventListener('click', function() {
  const password = pwdElement.value.trim(); // 앞뒤 공백 제거
  const confirmPassword = confirmPwdElemnt.value.trim(); // 앞뒤 공백 제거
  
  if (!password || !confirmPassword) { // 둘 중 하나라도 공백이면
    alert('비밀번호를 입력해주세요!');
  } else if (password === confirmPassword) {
    alert('비밀번호가 일치합니다!');
  } else {
    alert('비밀번호가 일치하지 않습니다!');
  }
})