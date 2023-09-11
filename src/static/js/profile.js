const form = document.forms['profile'];
const edit = async () => {
  axios({
    method: 'PATCH',
    url: '/api/user/profile',
    data: {
      user_id: form.userId.value,
      user_name: form.userName.value,
      password: form.userPw.value,
    },
  }).then(res => {
    if (res.data.result) {
      document.location.reload();
    }
  });
};

const destroy = async () => {
  if (!confirm('회원탈퇴 하시겠습니까?')) return;

  axios({
    method: 'DELETE',
    url: '/user/destroy',
    data: {
      id: Number(document.querySelector('#id').value),
    },
  }).then(res => {
    if (res.data.result) {
      alert('회원탈퇴 완료되었습니다');
      document.location.href = '/';
    }
  });
};
