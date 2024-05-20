
class Job {
	constructor(jobTitle, jobLocation, jobSalary) {
		this.title = jobTitle;
		this.location = jobLocation;
		this.salary = jobSalary;
	};

	describe() {
		console.log(`I'm a ${this.title}, I work in ${this.location}, I earn ${this.salary} per year.`)
	}
};

const tester = new Job('Developer', 'Silicon Valley', '200000 USD');

// tester.describe();


