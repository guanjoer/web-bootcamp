// This is how a comment is added to JavaScript
// Comments are not executed - they are just there to provide extra
// information to you or other developers

// Exercise Time!

// 1) Create three new variables:
//    - A variable that stores the name of an online course of your choice
//    - A variable that stores the price of that course
//    - A variable that stores the three main goals that you have, when taking this course

let courseName = 'webBootCamp';
// 웹해킹 지식을 학습해나가기 위해 웹개발의 지식을 향상시켜나가는 것.
// 웹 개발의 전체적인 프로세스의 그림(청사진)을 그릴 수 있도록 하는 것.
// 웹에서의 취약점을 찾기 위해, 웹과 관련된 코드들의 이해도를 향상시켜나가는 것. 
let courseMainGoals = ['Level up knowleadge that need to learning webHacking', 'Understading the whole pictures of web development process', 'To find vulnerability about web, Level up to the understanding of the codes relation to web '];

// 2) Output ("alert") the three variable values

// alert(courseName)
// alert(coursemainGoals[0])
// alert(coursemainGoals[1])
// alert(coursemainGoals[2])

// 3) Try "grouping" the three variables together and still output their values thereafter

let course = {
	name: courseName,
	mainGoals: courseMainGoals
};

// alert(course.name);
// alert(course.mainGoals);

// 4) Also output the second element in your "main goals" variable

// alert(course.mainGoals[1]);

// 5) Add a custom command that does the following:
//    - Use your "main goals" variable and access an element by its identifier
//    - The concrete identifier value should be dynamic / flexible 
//      (i.e. the command can be executed for different identifier)
//    - The "main goals" variable should also be dynamic: The command should work 
//      with ANY list of values
//    - The custom command should provide the accessed value (i.e. the list element)

function getListItem(array, arrayIndex) {
	let arrayElement = array[arrayIndex];
	return arrayElement;
};


// 6) Execute your custom command from (5) and output ("alert") the result

let selectGoal = getListItem(course.mainGoals, 0);
alert(selectGoal);






