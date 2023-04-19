import axios, { AxiosError } from "axios";

const URL: string = "https://server-54cbxxg5ca-ts.a.run.app/";
let TOKEN: string;

async function runTests() {
	let errors: string[] = [];
	let success: string[] = [];

	// Add functions to tests
	let functions = [
    () => addUser(success, errors),
    () => checkUser(success, errors),
    () => getUsers(success, errors),
    () => getTasks(success, errors),
    () => addTask(success, errors),
    () => changeTask(success, errors),
    () => editTask(success, errors),
    () => translateTask(success, errors),
    () => deleteTask(success, errors),
    () => deleteUser(success, errors)
	];


  function delay(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
	// Execute tests one after another
    for (let i = 0; i < functions.length; i++) {
      functions[i]()
      await delay(1000);
  } 

	console.log(
		" \n \n -----------------------------------------------------------------"
	);
	console.log(
		"\n successfuly executed " +
			success.length +
			" out of " +
			functions.length +
			" functions:" +
			success
	);
	console.log("\n errors in " + errors.length + " functions : " + errors);
}

// Add test user
function addUser(success: string[], errors: string[]) {
  console.log("Executing addUser")
	const options = {
		method: "POST",
		url: URL + "addUser",
		data: { username: "test", password: "test" },
		headers: {
			"Content-Type": "application/json",
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			TOKEN = response.data.token;
			success.push("addUser");
		})
		.catch(function (error: any) {
			errors.push("addUser");
		});
}

// check test user
function checkUser(success: string[], errors: string[]) {
  console.log("Executing checkUser")
	const options = {
		method: "POST",
		url: URL + "checkUser",
		data: { username: "test", password: "test" },
		headers: {
			"Content-Type": "application/json",
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			TOKEN = response.data.token;
			success.push("checkUser");
		})
		.catch(function (error: any) {
			errors.push("checkUser");
		});
}

// Get all users
function getUsers(success: string[], errors: string[]) {
  console.log("Executing getUsers")
	const options = {
		method: "POST",
		url: URL + "getUsers",
		data: {},
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};
	return axios
		.request(options)
		.then(function (response: any) {
			success.push("getUsers");
		})
		.catch(function (error: AxiosError) {
			if (error.response?.status == 403) return success.push("getUsers");
			return errors.push("getUsers");
		});
}

// Get all tasks from user 1
function getTasks(success: string[], errors: string[]) {
  console.log("Executing getTasks")
	const options = {
		method: "POST",
		url: URL + "getTasks",
		data: { username: "test" },
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			success.push("getTasks");
		})
		.catch(function (error: any) {
			errors.push("getTasks");
		});
}

// Add task to user 1
function addTask(success: string[], errors: string[]) {
  console.log("Executing addTask")
	const options = {
		method: "POST",
		url: URL + "addTask",
		data: { name: "test", description: "test", username: "test" },
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			success.push("addTask");
		})
		.catch(function (error: any) {
			errors.push("addTask");
		});
}

// Edit task 1
function editTask(success: string[], errors: string[]) {
  console.log("Executing editTask")
	const options = {
		method: "POST",
		url: URL + "editTask",
		data: { name: "test", description: "test", id: 1 },
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			success.push("editTask");
		})
		.catch(function (error: any) {
			errors.push("editTask");
		});
}

//Change task n 1
function changeTask(success: string[], errors: string[]) {
  console.log("Executing changeTask")
	const options = {
		method: "POST",
		url: URL + "changeTask",
		data: { id: 1 },
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			success.push("changeTask");
		})
		.catch(function (error: any) {
			errors.push("changeTask");
		});
}

// Translate task  n 1
function translateTask(success: string[], errors: string[]) {
  console.log("Executing translateTask")
	const options = {
		method: "POST",
		url: URL + "translateTask",
		data: { id: 1, text: "test" , name: "test" },
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			success.push("translateTask");
		})
		.catch(function (error: any) {
			errors.push("translateTask");
		});
}

// Delete task  n 1
function deleteTask(success: string[], errors: string[]) {
  console.log("Executing deleteTask")
	const options = {
		method: "POST",
		url: URL + "deleteTask",
		data: { id: 1 },
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			success.push("deleteTask");
		})
		.catch(function (error: any) {
			errors.push("deleteTask");
		});
}

// Delete user test
function deleteUser(success: string[], errors: string[]) {
  console.log("Executing deleteUser")
	const options = {
		method: "POST",
		url: URL + "deleteUser",
		data: { username: "test" },
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TOKEN,
		},
	};

	return axios
		.request(options)
		.then(function (response: any) {
			success.push("deleteUser");
		})
		.catch(function (error: any) {
			errors.push("deleteUser");
		});
}

// Run tests
runTests();
