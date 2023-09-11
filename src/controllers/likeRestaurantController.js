const {User, LikeRestaurant, Restaurant} = require("../models")

exports.postLike = async (req, res) => {
  const { id } = req.session.userInfo
  const { restaurant_id } = req.body
  if (!id) {
    res.status(400).send("세션을 체크해주세요"); return ;
  }
  if (!restaurant_id) {    
    res.status(400).send("body에 restaurant_id 값이 json으로 저장되어 있는지 체크해주세요"); return ;
  }
  const exist = await LikeRestaurant.findOne({
    where : { id : id, restaurant_id : restaurant_id}
  });
  if (exist) {
    res.status(400).send("이미 생성되었습니다.");
  } else {
    LikeRestaurant.create({
      id : id,
      restaurant_id : restaurant_id
    })
    .then(() => {
      res.status(201).send("잘 생성되었습니다.");
    })
    .catch(() => {
      res.status(400).send("유효하지 않은 id나 restaurant_id입니다.");
    })
  };
}

exports.deleteLike = async (req, res) => {
  const { id } = req.session.userInfo;
  const { restaurant_id } = req.body;
  if (!id) {
    res.status(400).send("세션을 체크해주세요"); return ;
  };
  if (!restaurant_id) {    
    res.status(400).send("body에 restaurant_id 값이 json으로 저장되어 있는지 체크해주세요"); return ;
  };
  const exist = await LikeRestaurant.findOne({
    where : { id : id, restaurant_id : restaurant_id}
  });
  if (!exist) {
    res.status(400).send("테이블에 존재하지 않습니다. 이미 지워졌거나, 올바르지 않은 id나 restaurant_id일수도 있습니다.")
  } else {
    LikeRestaurant.destroy({
      where : {
        id : id, 
        restaurant_id : restaurant_id
      }
    })
    .then(() => {
      res.send("성공적으로 삭제되었습니다."); // 204에서는 response body를 의도적으로 전송하지 않는다.
    })
    .catch(() => {
      res.status(500).send("알 수 없는 에러");
    })
  }
}

exports.getUserLikes = async (req, res) => {
  const { id } = req.session.userInfo;
  if (!id) {
    res.status(400).send("세션을 체크해주세요"); return ;
  }
  const currUser = await User.findOne({
    where : {id : id}
  })
  // if (!currUser) {
  //   res.status(400).send("존재하지 않는 user pk입니다."); return ;
  // } else {
  //   const response = await LikeRestaurant.findAll({
  //     where : {id : id},
  //     include : [
  //       {model : Restaurant, as :"restaurants"},
  //     ]
  //   })
  //   res.send(response)
  // }

  LikeRestaurant.findAll({
    where : {id : id},
    include : [
      {model : Restaurant, as :"restaurants"}
    ]
  })
  .then((response) => {
    res.send(response)
  })
}