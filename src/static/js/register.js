const form = document.forms['register'];
const pwMsg = document.querySelector('#pwMsg');
const idMsg = document.querySelector('#idMsg');
const nameMsg = document.querySelector('#nameMsg');

const overlapId = async () => {
  try {
    const res = await axios({
      url: '/api/user/register',
      method: 'POST',
      data: {
        user_id: form.inputId.value,
      },
    });

    if (res.data.result) {
      console.log('ok');
      idMsg.textContent = '사용 가능한 아이디입니다.';
      form.checkedId.value = 'Y';
    } else {
      idMsg.textContent = '중복된 아이디입니다.';
      form.inputId.value = '';
    }
  } catch (error) {
    console.log(error);
  }
};

const overlapName = async () => {
  try {
    const res = await axios({
      url: '/api/user/register',
      method: 'POST',
      data: {
        user_name: form.inputName.value,
      },
    });

    if (res.data.result) {
      nameMsg.textContent = '사용 가능한 닉네임입니다.';
      form.checkedName.value = 'Y';
    } else {
      nameMsg.textContent = '중복된 닉네임입니다.';
      form.inputName.value = '';
    }
  } catch (error) {
    console.log(error);
  }
};

const doRegister = async () => {
  const inputPw = form.inputPw.value;
  const confirmPw = form.confirmPw.value;
  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  try {
    if (inputPw !== confirmPw) {
      pwMsg.textContent = '비밀번호가 일치하지 않습니다.';
    }

    if (form.checkedId.value !== 'Y' && form.checkedName.value !== 'Y') {
      alert('중복 확인을 다시 해주세요.');
      throw new Error('중복 확인 오류');
    }

    if (pwPattern.test(inputPw)) {
      const res = await axios({
        url: '/api/user/register',
        method: 'POST',
        data: {
          user_id: form.inputId.value,
          user_name: form.inputName.value,
          password: form.inputPw.value,
        },
      });
      if (res.data.result) {
        alert('회원가입 성공!');
        document.location.href = '/';
      }
    } else {
      pwMsg.textContent =
        '비밀번호는 8자 이상 영문 + 숫자를 혼합하여야 합니다.';
    }
  } catch (error) {
    console.log(error);
  }
};
