class NotFoundError extends Error {
	constructor(message) {
	  super(message);
	  this.name = 'NotFoundError';
	}
  }
  
  class ValidationError extends Error {
	constructor(message) {
	  super(message);
	  this.name = 'ValidationError';
	}
  }
  

function handleErrors(error, req, res, next) {
	console.error(error);
	
	  // 에러 유형에 따른 상태 코드 및 메시지 설정
	  let statusCode = 500; // 기본값: 서버 오류
	  let errorMessage = 'Internal Server Error';

	  if (error.code === 404) {
		error = new NotFoundError(error.message); // NotFoundError 객체로 변환
	  } else if (error.code === 400) {
		error = new ValidationError(error.message)
	  }
	
	  if (error instanceof NotFoundError) {
		statusCode = 404;
		errorMessage = 'Page Not Found';
	  } else if (error instanceof ValidationError) {
		statusCode = 400;
		errorMessage = 'Bad Request';
	  }
	  // ... 다른 에러 유형에 대한 조건 추가

	// 에러 응답
	res.status(statusCode).render('shared/error', {
		errorMessage: errorMessage,
		statusCode: statusCode
	});

	next();
};


module.exports = handleErrors;