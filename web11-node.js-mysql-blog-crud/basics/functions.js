// Rest Parameter // Like parameter from comma seperated values to array.
function sumUp(...numbers) { // The sum of the numbers
	let result = 0;

	for(num of numbers) {
		result += num;
	}
	
	return result;
};

const inputNumbers = [1, 5, 10, 11, 50];

// Spread Operator
console.log(sumUp(...inputNumbers)); // Like input from array to comma seperated values.  
