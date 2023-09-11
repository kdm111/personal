const { User } = require('../models');
const { bcryptPassword, compareFunc } = require('../utils/encrypt');

exports.index = (req, res) => {
  res.render('index', { data: req.session.userInfo });
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.getUsers = async (req, res) => {
  if (req.session.userInfo) {
    const result = await User.findAll();
    res.render('users', {
      user_name: req.session.userInfo.user_name,
      users: result,
    });
  } else {
    res.redirect('/login');
  }
};

exports.getProfile = async (req, res) => {
  const result = await User.findOne({
    where: { id: req.session.userInfo.id }, // 세션으로 아이디 꺼내와서 한 명 조회
  });
  res.render('profile', { data: result });
};

exports.postRegister = async (req, res) => {
  try {
    const { password, user_name, user_id } = req.body;
    // Step1. 아이디를 찾아서 사용자 존재 유무 체크
    const userid = await User.findOne({
      where: { user_id },
    });
    const username = await User.findOne({
      where: { user_name },
    });
    if (userid) {
      res.json({ result: false, message: '아이디 중복체크를 해주세요' });
      // return res.status(400).json({
      //   status: 'error',
      //   message: 'The ID that already exists.',
      // });

    } else if (username) {
      res.json({ result: false, message: '닉네임 중복체크를 해주세요' });
      // return res.status(400).json({
      //   status: 'error',
      //   message: 'This nickname already exists.',
      // });
    } else {
      const hash = await bcryptPassword(password); // 비밀번호 암호화하여 저장
      // console.log(password, hash);
      await User.create({ user_id, user_name, password: hash });
      res.json({ result: true });
    }

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while register.',
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    // Step1. 아이디를 찾아서 사용자 존재 유무 체크
    const { user_id, password } = req.body;
    const user = await User.findOne({
      where: { user_id },
    });

    // Step2. 입력된 비밀번호 암호화하여 기존 데이터와 비교
    if (user) {
      const result = await compareFunc(password, user.password); // true or false
      if (result) {
        req.session.userInfo = { user_name: user.user_name, id: user.id }; // 세션 생성
        res.json({ result: true, data: user });
      } else {
        res.json({ result: false, message: '비밀번호가 틀렸습니다.' });
      }
    } else {
      res.json({ result: false, message: '존재하는 사용자가 없습니다' });
    }
  } catch (err) {
    console.error('에러 정보: ', err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while login.',
    });
  }
};

exports.patchProfile = async (req, res) => {
  try {
    const { user_name, password, id } = req.body;
    await User.update({ user_name, password }, { where: { id } });

    res.json({ result: true });
  } catch (err) {
    console.error('에러 정보: ', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while change profile.',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await User.destroy({
      where: { id },
    });
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.send('Internal Server Error');
      }
      res.json({ result: true });
    }); // 세션 삭제
  } catch (err) {
    console.error('에러 정보: ', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while delete user.',
    });
  }
};
