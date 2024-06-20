const Like = require('../models/like.model');

async function getMainPage(req, res, next) {
  let likes;

  try {
    likes = await Like.getLikes(); // 최신순으로 정렬하여 likes collection 가져오기
  } catch (error) {
    return next(error);
  }

  if (likes.length === 0) {
    return res.render('main', { numberOfLikes: 0, lastLikedDate: null });
  }

  const lastLiked = likes[0].date.toLocaleDateString('ko-Kr', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
  
  // 'I like that'버튼을 누르면, likes 컬렉션 내, 실시간 날짜가 저장되고, 좋아요 갯수는 누를때마다 날짜가 새로 저장되니, 날짜가 저장된 숫자, 즉 likes라는 배열의 길이가 좋아요 갯수가 된다
  res.render('main', { numberOfLikes: likes.length, lastLikedDate: lastLiked });
}

async function addLike(req, res, next) {
  const like = new Like();

  try {
    await like.save(); // 버튼 누를 때의 실시간 시간을 DB에 저장
  } catch (error) {
    return next(error);
  }

  res.redirect('/');
}

module.exports = {
  getMainPage: getMainPage,
  addLike: addLike,
};
