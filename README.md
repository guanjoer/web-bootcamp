# WEB BOOTCAMP

Udemy의 웹 부트캠프(<a href="https://www.udemy.com/course/100-2022-web-development/" target="_blank">View Web Bootcamp</a>)를 진행해나가면서 수행한 프로젝트들 입니다.

**주요 배우는 것들**:

- HTML
- Javascript
- CSS
- Node.js
- Express.js
- Multer
- Ajax
- Cookie & Session
- MySQL
- MongoDB
- XSS & CSRF & SQL Injection
- MVC Pattern
- Vue.js
- API
- etc.

📕**생각 정리**: https://github.com/mrguanjo/web-bootcamp/blob/main/notepad.md


## WEB 01 ~ WEB 02 | HTML & CSS BASIC

- **WEB 01**: 기본적인 HTML & CSS 지식을 학습하여, 해당 코스와 관련된 목표가 무엇인지를 나타내는 웹 페이지들을 만들었습니다. ([WEB 01 Codes](https://github.com/mrguanjo/web-bootcamp/tree/main/web01-challenges))
- **WEB 02**: 학습한 HTML & CSS 지식을 요약 정리한 내용들을 나타내는 웹 페이지를 만들었습니다. ([WEB 02 Codes](https://github.com/mrguanjo/web-bootcamp/tree/main/web02-html-css-summary))

**배운 개념들**: 기본적인 HTML & CSS 지식과 해당 지식들을 이용한 웹 페이지들


## WEB 03 | TRAVEL

조금 더 HTML & CSS 지식들을 진보시켜나가, 여행 목적지 리스트가 포함되어 있는 **여행 프론트엔드 웹사이트**를 구축하였습니다.

- **웹사이트**: 🌎<a href="https://travel-guanjo.netlify.app/" target="_blank">GO TO TRAVEL WEBSITE</a>
- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web03-travel" target="_blank">WEB 03 Codes</a>


## WEB 04 | Responsive CSS Design | Food Order

**Food Order** 웹 사이트를 만들어, **반응형 CSS**를 구현하여하도록 하였습니다.

즉 `@media(max-width:48rem)`를 통해 화면 사이즈가 모바일 우선일 때, `span` 요소를 통해 구축된 모바일 메뉴 버튼이 보이도록 하였고, 해당 모바일 버튼을 누르면 `<a href="#side-drawer" class="menu-btn">`를 통해 **pseudo selector**인 `:target`으로 모바일 메뉴인 `#side-drawer`가 `diplay: block`이 되도록 하여 화면에 보이도록 하였습니다.

또한 

```html
<aside id="side-drawer">
	<header>
		<a href="#" class="menu-btn">
			<span></span>
			<span></span>
			<span></span>
		</a>
	</header>
</aside>
```

`#side-drawer`가 열리고 난 뒤, 모바일 메뉴의 버튼을 누르면, `:target`이 제거되도록 하여 모바일 메뉴는 디스플레이에서 사라지게 됩니다.

그리고 모바일 메뉴는 `postion: fixed`를 통해 문서 흐름을 벗어나도록 하여, 기존 웹 페이지보다 레이어가 상승하게 하고, `top: 0`, `left: 0`를 통해 기존의 웹 페이지를 전부 가리고, 화면 전체에서 모바일 메뉴만 보이도록 하였습니다.

- **웹사이트**: 🍟<a href="https://food-order-guanjo.netlify.app/" target="_blank">GO TO FOOD ORDER WEBSITE</a>
- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web04-food-order" target="_blank">WEB 04 Codes</a>


## WEB 05 | Contact us Form

주로 `text`, `radio`, `checkbox`로 이루어진 `Input type`들과 `select` 및 `option`, `textarea`를 이용하여 **Contact us** Form을 만들었습니다.

`CSS`의 `transform`, `transition`을 이용하여, **서비스 구독 페이지**를 구현하였습니다.


- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web05-forms" target="_blank">WEB 05 Codes</a>


## WEB 06 | JS Input Event

주로 `JavaScript`를 이용하여, **input field**에 **input event**가 일어 날 때, 입력된 글자 만큼 **최대 허용 글자 수**에서 **차감** 하도록 하고, 허용 글자 수가 **10 미만** 이 되면, `warning` `class`를 추가하여 인풋 필드와 입력 가능 글자 수에 **연분홍**으로 스타일링을 하여, 허용 가능 글자 수가 얼마 남지 않았다는 것을 **시각적**으로 알려주고, 허용 글자 수가 **0**이 되면, `error`클래스를 추가하여, 더이상 입력이 **불가능**하다는 것을 **빨간색** 스타일링을 통해 시각적으로 보여주는 기능을 구현하였습니다.

즉 최대 혀용 글자 수가 60인 `60/60`에서 입력 글자 수 만큼 차감, 즉 **(60 - 입력 글자 수)/60**가 되도록 하고, `9/60`이 되면, `warning`클래스를 추가하여 경고 표시를 시각적으로 보여줄 수 있게끔 스타일링을 하고, `0/60`이 되면, 더 이상 입력이 불가능 하다는 것을 알리는 스타일링을 `Javscript`를 통해 구현하였습니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web06-js-input-event" target="_blank">WEB 06 Codes</a>


## WEB 07 | JS Loops in Action

반복문을 이용한, **총 4가지**의 `click`이벤트가 존재합니다.

1. 유저가 값(숫자)을 입력하면, **0부터 유저가 입력한 값**까지 1씩 증가하여 **전부 더하여** 결과를 반환합니다.

2. `#highlight-links` `Section` 내에 존재하는 모든 `anchor` 요소에 대해, `click`이벤트가 발생하면, 전부 **하이라이트** 처리 됩니다.

3. **JS Object** 형태로 정의되어 있는 유저의 정보들을 반복문을 통해, 순회하여, 디스플레이에 보여줍니다.

4. **1 ~ 6까지의 숫자** 중, **유저가 선택한 숫자**와 주사위를 돌려, **랜덤으로 나오는 숫자**가 몇 번만에 **일치**하는 지 확인하는, 운을 테스트하는 요소가 가미 된 기능입니다. `while` 반복문을 통해, 유저가 입력한 값과, 랜덤으로 나오는 값이 일치할 때까지 주사위를 돌리도록 하여, 유저가 정한 숫자가 나오기 까지 **몇번의 시도**가 존재했는지 등을 화면에 표시합니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web07-js-loops-in-action" target="_blank">WEB 07 Codes</a>


## WEB 08 | Tic Tac Toe Game

마일스톤 프로젝트로, 오직 **프론트엔드 자바스크립트**만을 이용하여, **틱 택 토 게임**을 구현하였습니다.


- **웹사이트**: 🎲<a href="https://tictactoe-guanjo.netlify.app/" target="_blank">GO TO Tic Tac Toe</a>
- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web08-tic-tac-toe" target="_blank">WEB 08 Codes</a>

---

**주요기능**:

- **플레이어 이름**을 **모두 등록**하여야만 게임을 시작할 수 있습니다.
- 플레이어의 이름이 **공백** 인 경우 혹은 두 플레이어의 **이름이 같은 경우** 경고 메시지를 추가하고 설정하지 못하도록 하였습니다.
- 설정이 정상적으로 완료되어 게임을 시작하는 버튼을 누르면, **3 X 3**의 틱 택 토 게임을 할 수 있는 **보드**가 나타납니다.
- 플레이어 1부터 게임을 시작하고, **현재 턴**인 플레이어의 이름을 **화면에서 확인**할 수 있습니다.
- 보드를 누르면 **플레이어의 심볼**(X 혹은 O)이 표시가 되고, 해당 영역은 더 이상 **클릭이 불가능**합니다.
- 만약 플레이어가 **이미 선택된 영역**을 클릭하면, **경고 메시지**가 출력됩니다.
- **게임 도중**, 게임 시작 버튼을 누르면, **게임이 리셋**되어 처음부터 시작하게 됩니다.
- 3 X 3 보드에서 먼저 가로, 세로 혹은 대각선으로 **먼저 한 줄을 완성한 유저**가 **승리**하게 되고, **승리 메시지**가 화면에 출력됩니다.
- **게임이 끝난 후**, 클릭 가능 한 보드가 **남아도**, **클릭이 불가능**하도록 하였습니다.
- 게임이 끝난 후, 게임 시작 버튼을 누를 시, 게임이 리셋되어, **처음부터 게임**이 가능합니다.


## WEB 09 | Styling Third Parties

스타일링과 관련된 제 3자 서비스인 **Bootstrap**, **Simple Parallax**을 코드에 통합하여 사용하는 방법에 관해 알아보았습니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web09-third-parties" target="_blank">WEB 09 Codes</a>


## WEB 10 | Share & Browse Restaurants

**맛집을 공유하고, 공유한 맛집들을 탐색**할 수 있는 주로 `Node.js`및 `Express.js` 프레임워크로 구축한 **풀스택**웹 사이트 입니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web10-node.js-restaurant" target="_blank">WEB 10 Codes</a>

---

**주요 기능**:

- `/restaurants`로의 `GET` 요청을 통해, 사용자가 공유한 **모든 맛집** 데이터(**JSON**)을 가져와 보여줍니다.
- `/recommend`로의 `GET` 요청을 통해, 사용자가 맛집 데이터를 **공유** 할 수 있는 **Form**이 로드됩니다.
- `/recommend`로의 `POST` 요청을 통해, 사용자가 입력한 맛집에 대한 데이터가 `JSON` 포맷으로 **로컬 컴퓨터에 저장 및 업데이트**가 됩니다.
- `/restaurants/:id`로의 `GET` 요청을 통해, 사용자가 보고 싶은 특정 맛집에 대한 **자세히 보기**가 로드됩니다.
- `/restaurants`로의 `GET` 요청을 통해 가져온 모든 맛집 목록에서 **Change Order** `button`을 누르면, 사용자가 추가한 **날짜**를 기준으로, **오름차 순**, **내림차 순**으로 보여지는 맛집 목록의 **순서를 변경**할 수 있습니다.
- **반응형 CSS 디자인**을 구현하였습니다.


## WEB11 | Blog With MySQL

주로 `Node.js`, `Express.js`, `MySQL`을 이용하여 기본적인 `CRUD` 기능이 포함된 **풀스택 블로그** 웹사이트를 구현하였습니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web11-node.js-mysql-blog-crud" target="_blank">WEB 11 Codes</a>

---

**주요 기능**: 

- `/posts`로의 `GET`요청이 오면 **라우트**를 통해 **DB**에 저장되어 있는 **모든 블로그 게시물**을 보여줍니다.
- `/new-post`로의 `GET`요청을 통해, 블로그 게시물을 **생성**할 수 있는 **Form** 및 **저자 정보**가 로드됩니다.
- `/posts`로의 `POST`요청을 통해, **사용자가 입력한** 게시물 관련 **데이터를 DB에 저장**합니다.
-  `/posts/:id`로의 `GET`요청을 통해 사용자가 **선택한 게시물**에 대한 정보를 **자세히** 보여줍니다.
- `/posts/:id/edit`로의 `GET`요청을 통해, 사용자가 선택한 게시물에 대한 데이터를 **업데이트** 할 수 있는 **미리 데이터가 채워진 Form**을 가져옵니다.
- `/posts/:id/edit`로의 `POST`요청을 통해, 사용자가 **수정한 데이터**로 **게시물을 업데이트** 합니다.
- `/posts/:id/delete`로의 `GET`요청을 통해, 사용자가 **선택한 게시물**을 **삭제** 합니다.


## WEB 12 | Blog With MongoDB

`WEB 11`과 **동일한 기능**을 수행하는 풀스택 블로그 웹 사이트 이지만, Node.js와의 연결된 `DB`를 **MongoDB**로 대체하여 사용하였습니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web12-node.js-mongodb-blog-crud" target="_blank">WEB 12 Codes</a>


## WEB13 | File Upload | Profile Image

`npm`패키지 중 하나인 `multer`라이브러리를 프로필 웹 사이트인, 해당 웹 사이트(Node.js, Express.js, MongoDB)에 적용하여, 프로필 이름, **이미지**(acceptable formats: png, jpg, jpeg) 생성 시, DB 및 **서버 컴퓨터**에 저장하여 **메인 홈페이지에 로드**합니다.

또한, **Frontend Javscript**를 이용하여, 프로필 생성 페이지에서, **이미지 선택 시**, 프로필 **이미지 미리보기** 기능을 구현하였습니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web13-file-upload" target="_blank">WEB 13 Codes</a>


## WEB 14 | Ajax

`WEB12`의 풀스택 블로그 웹 사이트에 **댓글 관련 페이지** 및 **기능**을 추가하여, **댓글을 생성**하고 **로드**할 때, **클라이언트**와 **서버** 간의 통신을 **비동기 통신** 방법 중 하나인, `Ajax`로 처리하여, 페이지가 **새로고침** 되어, 페이지의 **모든 내용**을 브라우저가 **다시 읽어들이는 것**이 아닌, Ajax 비동기 통신 통해 일어난 **데이터 교환**(JSON)을 가지고, 특정 부분의 `DOM`만 **업데이트** 하도록 하였습니다.

- 👨‍💻<a href="https://github.com/mrguanjo/web-bootcamp/tree/main/web14-ajax-handling-comments" target="_blank">WEB 14 Codes</a>

---

**주요 기능**:

- **클라이언트 Javscript**에서 `fetch`함수를 이용하여, `/posts/${postId}/comments`로의 `GET`요청 시, **클라이언트**에서 `postId`를 **JSON 형태**로 전달하고, **서버**에서는 해당 ID를 가지고 적합한 `comments`의 내용을 **JSON 포맷**으로 클라이언트에 **반환**하여, 해당 내용을 가지고 **DOM을 업데이트**하여, 해당 글에 생성된 **모든 댓글**을 보여줍니다.
- `fetch`함수를 이용하여, `/posts/${postId}/comments`로의 `POST` 요청 시, **사용자가 입력한 댓글 관련 데이터**를 `body`에 담아, **JSON** 형태로 **서버**에 보내고, 서버에서는 해당 데이터를 받아, **DB에 저장**시킨 후, 성공 message를 **JSON 형식**으로 반환하고, **프로미스** 반환이 정상적으로 완료 되면, 프론트엔드에서 **DOM을 업데이트** 하여, **추가된 댓글을 포함**하여 해당 글에 작성된 **모든 댓글**을 보여줍니다.


## WEB 15 | 