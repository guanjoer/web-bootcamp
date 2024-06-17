# 개념 정리

## 코드는 어떤 방식으로 작성해 나가야 하는가?

	중복을 제거하고, 유지 보수를 용이하게 하는 것. 앞선 행위들로 인해, 오류가 발생할 가능성을 낮춰준다.

## 메타 데이터

메타 데이터란 브라우저에는 영향을 미치지만, 사용자에게는 보이지 않는 정보를 말한다. 즉 브라우저 스크린에는 표시 되지 않는 정보를 말한다.

예를 들면, `style element`의 정보들은 브라우저에서 표시되지 않아, 사용자에게 보이지 않지만, 백그라운드 컬러 라든지 텍스트 정렬과 같은 영향을 브라우저에게 끼치고 있다. 이러한 메타 데이터는 보통 `head element` 안에 존재하고, 브라우저에 표시되는 정보들은 body element 안에 존재하게 된다. 

## VS Code Shortcut

[VS Code Shortcut-Related Video](https://academind.com/tutorials/visual-studio-code-introduction/)

## CSS

### 정렬과 관련하여.

**CSS**에서, `text-align: center;`와 같은 특성과 값은, **html 요소** 안에 존재하는 컨텐츠에 대해 작용하는 것이므로,
즉 `<p>test</p>`에서 **p element** 안에 **test**라는 컨텐츠에 대해 작용한다. 따라서, 빈 요소, 즉 `void element`의 경우, element 내에 컨텐츠가 존재하지 않으므로, **부모 element**를 이용하여, 부모 element 내에 존재하는 컨텐츠로 작동하도록 하여, 빈 요소를 중앙으로 정렬시키는 특성을 적용할 수 있다.
빈요소의 예는, `<img src="" alt"">`가 존재한다.

### 이미지 alt="" 속성과 관련하여.

`alt=""` 속성에는 이미지가 브라우저에 로드되지 않았을때, 표시하는 텍스트로, 이미지에 대한 설명을 추가하면 된다.

### 상속, 계단식, 우선순위

**CSS**의 경우, 부모의 특성을 자식이 상속 받고, 하지만, 자식에 직접적으로 스타일이 적용되어 있다면, 좀 더 구체적인 요소가 더 높은 우선순위를 가지므로, 자식에 직접적으로 정의된 스타일이 적용된다. 또한, 하나의 요소에 여러 특성을 적용할 경우, 가장 최신 규칙이 적용된다. 위에서 아래로 적용됨으로.

### inline & block level

인라인 레벨의 요소는 다른 요소에 영향을 미치고, `margin-top`, `margin-bottom`과 `padding`에 제한이 존재한다. 또한, `header`에 인라인 레벨의 요소가 존재하면, 전체가 영역으로 지정되지 않는다. 이러한 한계는, `display: inline-block`을 사용함으로써, 극복이 가능하다.

**inline level**의 경우, `text-aline: center` 가 작동하지만, **block level**의 경우, 위 특성이 작동하지 않는다.
따라서, block level의 경우, `margin-left & right`을 `auto`로 지정함으로써, 컨텐츠를 중앙으로 정렬시킬 수 있다.

### More informations about CSS

[위치 속성에 대한 추가 정보](https://academind.com/tutorials/the-position-property/)

[플렉스박스 - 플렉스 컨테이너](https://academind.com/tutorials/flexbox-basics-container/)

[플렉스박스 - 플렉스 아이템](https://academind.com/tutorials/flexbox-flex-items/)

[플렉스박스와 그리드 비교](https://academind.com/tutorials/css-grid-vs-flexbox/)

### mobile first

 	/* 768px */
	@media(min-width: 48rem) {}

### Desktop first

	@media(max-width: 48rem) {}

### CSS Units


`px: fixed value(not responsive)`


	%, em : having cascading nature by parents
	But, % was inherited from parents's width & 
	em was inherited from parents's font-size

`rem : inherited from root elemnt(i.e. inherited from choice of User's font-size setting)`


## Git & Github

### github repository remote update

	1. Checking: git status
	2. add: git add . (all files in pwd)
	3. commit: git commit -m "type message"
	4. push: git push origin main

### git & github

시간 경과에 따른, 코드 변화들에 대한 추적 및 제어를 효율적으로 하는 것(즉 버전 관리 도구).

**commit = code snapshot**

**add = track the modified things of the (selected) files.**

**staging area: located between working directory and commit what i want to create.**

```git remote add origin [repository url]```
```git push -u origin +main```(push files forced)


### Innitializing personal access token from github(windows)

	git credential reject
	host=github.com
	protocol=https

### Git Management

**local branch 제거**
`git branch -D branch-name`

**원격 저장소 remote branch 제거**
`git push origin :branch-name`

**commit logs**
`git log`

**가장 최근 commit 삭제**
`git reset HEAD~1`

Branch 관리하기 위해, 원격 저장소 연결 시 `git remote add origin(별칭) [Repository URL]`는 종속되지 않는 디렉토리 각각에 추가한다.
즉 `test/test-1` 디렉토리와 `test/test-2` 디렉토리가 존재할때, **test-1**과 **test-2**의 디렉토리가 종속되는
**test** 디렉토리에 
	git init
	git remote add origin [Repository url]
하는 것이 아닌,
**test 1**, **test 2** 디렉토리 각각에 `git init`,`git remote add`를 적용한다.

**.gitignore 파일 추가 시, 기존 git의 관리 받던 캐쉬 삭제.(그래야 .gitignore의 내용이 적용됨)**
`git rm --cached [dir-path/] -r`

**브랜치 생성 후 변경**
`git switch -c [branch-name]`

## Object, Property, Method

Object is a like a container that can contain variables, functions. The function inside object, We called **Method** also, The variable inside object, We called **Property**

## True, False

In the case of need boolean value like 'If statement's condition', if the value was **empty string** or **number of 0**, then the **boolean is False**.

## Node Js - express pakage

express is mainly use for **routing request**.


## Function is object.

함수는 기본적으로 함수 내부에 존재하는 코드를 실행하는 역할을 하지만, ```func()```이 아닌, ```func```을 사용하여, **property** 혹은 **function**을 추가할 수 있다. 객체에 존재하는 정보들은 ```console.dir(function)```을 통해 브라우저 console창에서 알 수 있다.

즉, test()라는 **function**에 **greeting**이라는 **key**에 **Welcome**이라는 **value**를 추가하고 싶으면,
	```test.greeting = 'Welcome'```;
을 작성하면 된다.

## Rest Parameter & Spread Operator

**Rest parameter**는 ```func(...parameter){//Some logics}```에서 파라미터의 입력을 받는 곳에서, ```...```을 통해, 여러 개의 콤마로 분리된 값들을 배열로 만들어 준다. 그럼으로써, 반복문을 통한 여러 작업이 가능해진다.

**Spread Operator**의 경우, 함수를 실행하는 쪽에서 파라미터에 할당해주는 값을 배열 -> 콤마로 분리된 각각의 값으로 변환해 준다. 표기법은 Rest parameter와 동일.

## Class & Blueprint & Constructor function & New & Object

class를 통해 정의한 blueprint를 ```new [className]````을 통해 **blueprint**에 기반한 새 **object**를 만들고,
비슷한 유형의 객체를 생성하는데 유용하다.

class에서의 키와 값은 **consturctor function** 안에서 정의가 가능하다.

## Const

**const**의 경우, 실제로 상수에 저장하는 것은 값이 아닌, 해당 값이 저장되는 메모리의 주소이다. 따라서, `const something = [arr1, arr2]`일 경우, `somthing.push(arr3)`이 작동하여, **something**인 상수에 **arr3**이라는 값을 저장할 수 있다. 왜냐하면, 해당 배열이 저장된 메모리의 주소는 동일하기 때문이다. 단지 메모리의 저장된 값만을 바꾸는 것이기 때문이다.

하지만, `const something = [newArr1, newArr2]`와 같이, `equal sign`을 통해 정의하는 것은 불가능하다.
**equal sign**은 값을 저장하는 것이 아닌, 메모리에 주소를 새로 할당하는 것이기 때문에 불가능하다.

## Database, RDBMS(SQL DB), NoSQL DB

파일시스템을 통해 파일을 읽어오거나 수정하거나 해당 사항의 경우, 항상 전체 파일의 내용을 읽어오고, 그 다음 작업(업데이트, 삭제)을 수행할 수 있다, 이는 항상 전체 파일의 내용을 읽어와야 하므로, 비효율적일 뿐더러, 동일한 시각에 동일한 파일에 대해 여러 요청이 들어오는 경우, 한 요청이 다른 요청을 덮어쓰거나 하는, 즉 파일 시스템이 overwhelm 될 확률이 높으므로, 이러한 파일 시스템이 overwhelm 될 확률을 제거하고, 수많은 데이터 내에서 특정 데이터 조각을 쉽게 찾을 수 있게끔, Query language를 지원하고 더욱 효율적으로 데이터를 저장하고, 제어하기 위한 software system이 DataBase Management System이다.

즉 DBMS를 통해 데이터의 저장 및 관리 및 검색을 최적화 시킬 수 있다.

DBMS에는, **Relational DB**인, **SQL DB**와 **Non-Relational DB`**인 **NoSQL DB**가 존재한다.

Relational DBMS인, **RDBMS**의 경우, 서로 다른 테이블을 고유한 `id`를 통해, 서로 연결 짓는 것이 가능해 진다.

예를들어, 항공편이라는 테이블에 출발지가 공항이름인 경우, 공항이라는 테이블을 만들어, 고유한 id를 공항이름으로 만들어, 둘 사이의 테이블을 관계 짓거나, 또, topic이라는 테이블과 author라는 테이블이 존재하는데, topic에 글을 쓴 저자의 id를 저장하고, 이를 author에 저장된 저자의 정보와 결합시켜, 해당 글을 쓴 저자의 정보까지 같이 관계지어 불러올 수 있는 기능을 가지고 있다.

NoSQL DB의 경우, 더 적은 테이블 내에, **JSON**형식으로 저장된 동일한 포맷의 여러 객체가 존재한다. 이러한 형식의 이점은 더 적은 쿼리를 통해 데이터를 볼러올 수 있다는 이점이 있다.
즉 병목현상은 주로 데이터 쿼리에서 나오는데, 데이터 쿼리를 적게함으로써, 병목현상을 줄일 수 있다는 이점이 존재한다. 즉 관계형 DB와는 다르게, 테이블에 고정된 `schema`가 존재하지 않으므로, 좀 더 유연하고, 쿼리를 적게 사용하여 데이터를 제어할 수 있다는 이점이 존재한다. 

## Ajax(Asynchronous JavaScript and XML) & Http request

`Http request`는 기본적으로 `GET`과 `POST` request가 존재하고, URL에 데이터가 표시되는, 즉 서버에서 브라우저로 데이터를 로드할 때, GET 요청을 url에 보내고, url에 대응되는 서버 측에서 해당 요청에 관한 응답으로 새 페이지를 반환한다. POST 요청의 경우, 브라우저 측에서 데이터를 입력 후, 해당 데이터를 서버 측(데이터베이스)에 저장할 때 사용하는 HTTP 메서드이다. 이 둘의 Request의 경우, 서버에서 응답으로 새 페이지를 로드(즉 모든 HTML코드를 전부 로드)한다는 것이다.

하지만, `Ajax`를 이용할 경우, **JavaScript**에서 `Request` 뿐만이 아닌, `Response` 또한 제어하여, 응답으로, 일부 데이터 조각만 업데이트 하여 보여줄 수 있다는 것이다.
즉 응답으로 새 페이지를 로드하여 HTML 코드를 전부 새로 가져오는 것이 아닌, 기존 HTML 코드에서 일부 HTML 코드의 업데이트만 일어나게끔 하는 것이 가능하다.

## HTTP Methods

	// Default Browser Http Methods //

		GET: Fetch some data(Enter a URL, Click a link, etc.)
		POST: Store some data
	
	// JavaScript-driven Http requests

		PUT: Replace or Update some data
		PATCH: Update some data
		DELETE: Delete some data

## CSRF(Cross Site Request Forgery) Attack

CSRF 공격은, 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위들을 특정 웹사이트에 요청하게 만드는 공격을 말한다.

예를들어, 뱅킹에서의 송금 요청 관련해서는 CSRF 공격은 사용자가 이미 은행 페이지에 로그인 되어 있다는 가정하에, 공격자의 피싱 이메일의 링크를 통해, 은행 웹사이트의 정상적인 송금 페이지와 동일한 외형을 갖춘 공격자의 송금 페이지에 접속하여, 사용자가 송금에 관련된 정보를 입력하고, 송금 요청(정상적인 홈페이지로의 요청)을 보내면, 사용자가 입력한 정보가 아닌,
input의 type이 hidden으로 이미 공격자가 설정한 값으로 피싱을 수행한 공격자의 계좌로 돈이 빠져나가게 되는 공격 방법을 말한다.

**`대응방안`**: CSRF 토큰을 올바른 홈페이지에서 request의 한 사이클 동안만 유효한 토큰을 생성하여 보유하고,
해당 CSRF 토큰을 가진 사용자만이 특정 페이지로의 요청이 가능하도록 한다.

node-express에서의 경우, csrf-csrf package 사용.(csurf는 2022년 9월경 취약점 보고서가 배포되었고, 저자는 더이상 해당 패키지에 대해 업데이트 하지 않음으로(또한 저자도 다른 패키지 사용을 권하고 있다.), 즉 deprecated 이므로, 대안으로 csrf-csrf npm 패키지를 사용할 것.)

## XSS(Cross Site Scripting)

사용자가 글과 같은 생성할 수 있는 공간(form)이 존재하고, 이를 출력하는 공간이 존재한다면, 악의적 목적을 수행하는 자바스크립트 코드를 `form`에 입력하고, 해당 코드가 출력됨으로써 실행되어, 공격자가 자신이 의도한 것을 완료하여 특정한 이득을 취하는 것.

**`대응방안`**: 사용자 생성 컨텐츠가 출력될 때, 브라우저에서 구문 분석되는 것이 아닌, 단순한 평문으로(Plain text)로 출력되게끔, 이스케이핑 처리 혹은 `sanitize` 처리.

node-express에서는 ejs파일을 렌더링하여 브라우저 보여주는데, ejs 파일에서 사용가능한 구문 중, `<%= %>`, 즉 `=` sign이 들어가도록 하여, 사용자가 입력한 값이 plain text로 출력되게끔 한다.

혹은 ```npm 패키지``` 중, ```xss```를 사용하여, 사용자 컨텐츠 생성이 가능한 인풋 필드에 입력한 값을 라우트에서 `post`요청으로 받을 때, 해당 데이터, 즉 `req.body`에서 해당 `name`에 `xss` 패키지를 적용시킨다. 그러면 사용자가 입력한 스크립트 태그 안의 코드는 `sanitizing` 되어 출력된다.

## SQL Injection

SQL문을 DB에 주입하여, 공격자가 악의적 이득을 취하는 공격을 말한다.

예를들어, SQL DB 중 하나인, MySQL에서 글의 저자를 필터링하여 해당 저자가 쓴 글만 볼 수 있게 한다고 해보자. 저자를 필터링할 때, 찾는 저자는 url에 get 방식으로 받아오게 되고, 즉 `input`의 `name="author"`이면, `req.query.author`에 사용자가 입력한 저자의 값이 할당되어,


	```SELECT * FROM ${tableName} WHERE author = "${req.query.author}"```


의 값이 실행되어, 해당 저자와 매칭되는 행만 보여주게 되는데, 이때 검색하는 인풋 필드에 악의적인 SQL문을 삽입하여, 테이블을 삭제하거나 하는 등의 SQL문을 실행 시킬 수 있다.

**`대응 방안`**: 이스케이프 처리. `VALUES`나 `WHERE` 뒤에 값을 입력하는 곳에 ?를 입력하여,
직접적으로 값을 전달하는 것이 아닌,

	```db.query(query, `[${?에 들어갈 값}]`)```

와 같은 방식으로 처리한다.

## Class 및 인스턴스화

`Class`는 객체 생성 시 Blueprint(청사진)가 들어있는 곳이라 보면 된다.
즉 객체 안에 생성자 함수를 통해 정의할 property가 존재하고 또한 객체에 정의한 프로퍼티를 사용할 method 또한 존재하는 곳이다. 

이렇게 객체화 시킬 청사진들이 들어있는 Class들을 실제로 객체화 시키는 작업을 **인스턴스화**라고 하며, 인스턴스화는 `new [Classname]`을 통해 가능하다.

## SQL 및 NoSQL

**SQL**의 경우 **NoSQL**에 비해 DB내 테이블의 **명료성**을 가진다. 하지만 그로 인해, 유연성이 많이 떨어진다.
즉 SQL의 경우, 개발 시, 코드를 작성하기 전에, 테이블의 설계가 필요하다. 그리고 테이블의 분리가 명확하여, 많은 테이블 수를 가질 수 밖에 없고(```Nested object```라는 개념이 존재하지 않는다), 그로 인해, 쿼리문이 길어질 수 밖에 없다.

이에 반해 `MongoDB`와 같은 **NoSQL**은 **collection**이 `JSON`형식으로 되어 있어, **JavaScript**를 다루는 개발자에게는 매우 익숙한 포맷이다. 또한 컬렉션의 설계가 크게 필요하지 않다. 왜냐하면, SQL의 테이블들이 테이블 내 포함시킬 데이터와 명확하게 연관된 것들로만 나눠져 있는데 반해, NoSQL의 경우, **중첩 객체**의 사용이 가능하여, 연관성이 명확하지 않아도, 다른 컬렉션에 분리시키지 않고, 하나의 컬렉션 안의, 중첩 객체의 형식으로 데이터 저장이 가능하다. 따라서 매우 큰 유연성을 가지는 DB의 형태이다. 또한 적은 컬렉션으로 인해, DB와의 통신에 필요한 쿼리 문의 양이 매우 적음을 알 수 있다.

## MVC Patterns

리팩토링 기법 중 하나로, `Model`, `View`, `Controller`로 나뉜다.

개발 시 **MVC 패턴**을 적용하는 사례를 예로 들면, **View**에는 브라우저에 렌더링 될 `ejs`파일들을 보관하고, **Model**은 Class가 정의 되어 있어, DB와의 통신(insert, find, update, etc.)을 주로 담당한다. **Controller**는 특정 경로로 요청이 들어왔을 때 수행 할 역할하는데, 보통 Route와 Model과 View를 잇는 다리 역할을 한다.

즉 Route에서 특정 경로로 요청이 들어오면 그것을 Controller로 넘기고, Controller에서는 특정 작업을 수행하기 위해, Model을 불러오고, 그 결과를 View에 전달하고 렌더링 하는 역할을 수행한다.