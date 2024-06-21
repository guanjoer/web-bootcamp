# WEB BOOTCAMP

Udemy의 웹 부트캠프([View more](https://www.udemy.com/course/100-2022-web-development/))를 진행해나가면서 수행한 프로젝트들 입니다.

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

**생각 정리**: https://github.com/mrguanjo/web-bootcamp/blob/main/notepad.md

## WEB 01 ~ WEB 02: HTML & CSS BASIC

- WEB 01: 기본적인 HTML & CSS 지식을 학습하여, 해당 코스와 관련된 목표가 무엇인지를 나타내는 웹 페이지들을 만들었습니다. ([WEB 01 Codes](https://github.com/mrguanjo/web-bootcamp/tree/main/web01-challenges))
- WEB 02: 학습한 HTML & CSS 지식을 요약 정리한 내용들을 나타내는 웹 페이지를 만들었습니다. ([WEB 02 Codes](https://github.com/mrguanjo/web-bootcamp/tree/main/web02-html-css-summary))

**배운 개념들**: 기본적인 HTML & CSS 지식과 해당 지식들을 이용한 웹 페이지들

## WEB 03: TRAVEL

조금 더 HTML & CSS 지식들을 진보시켜나가, 여행 목적지 리스트가 포함되어 있는 **여행 프론트엔드 웹사이트**를 구축하였습니다. ([WEB 03 Codes](https://github.com/mrguanjo/web-bootcamp/tree/main/web03-travel))

- **웹사이트**: 🌎[GO TO TRAVEL WEBSITE](https://travel-guanjo.netlify.app/)

## WEB 04: Responsive CSS Design | Food Order

**Food Order** 웹 사이트를 만들어, **반응형 CSS**를 구현하여, 모바일 일 때, `#main-header`가 3개의 `span` Element로 이루어진 버거 모양의 헤더로 바뀌게 하여, 해당 헤더를 클릭할 경우, 모바일 메뉴가 열리도록 하였습니다.

즉 흔히 토글 버튼이라 불리는 것에 모바일 메뉴인 `#side-drawer`, 즉 `<a href="#side-drawer" class="menu-btn">`을 통해, 모바일 메뉴에 **pseudo selector** 중 `:target`을 지정하여, `#side-drawer`가 `diplay: block`이 되도록 하여 모바일 메뉴가 열리도록 하였습니다. 

그리고 모바일 메뉴는 `postion: fixed`를 통해 문서 흐름을 벗어나도록 하여, 기존 웹 페이지보다 레이어가 상승하게 하고, `top: 0`, `left: 0`를 통해 기존의 웹 페이지를 전부 가리고, 모바일 메뉴만 보이도록 하였습니다.

- **웹사이트**: 🍟[GO TO FOOD ORDER WEBSITE](https://food-order-guanjo.netlify.app/)