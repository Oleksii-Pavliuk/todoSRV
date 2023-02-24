import axios from 'axios';


async function runTests() {
  let errors: string[] = [];
  let success : string[] = []

// Add functions to tests
  let functions = [
    getUsers(success,errors),
    addUser(success,errors), 
    checkUser(success,errors),
    getTasks(success,errors),
    changeTask(success,errors),
    addTask(success,errors),
    editTask(success,errors),
    translateTask(success,errors),
    deleteTask(success,errors),
    deleteUser(success,errors)
  ]


// Execute tests one affter another 
for(let i=0; i<functions.length; i++) {
    await functions[i];
}
  console.log(' \n \n -----------------------------------------------------------------')
  console.log ('\n successfuly executed '+success.length + ' out of '+ functions.length + ' functions:'+ success)
  console.log('\n errors in '+errors.length + ' functions : ' + errors);
}




// Get all users
function getUsers(success : string[] ,errors: string[]) {
  const options = {
    method: 'GET',
    url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/getUsers',
    params: {},
    headers: {},
  };

  return axios.request(options)
    .then(function (response: any) {
      success.push('getUser')
    })
    .catch(function (error: any) {
      console.error(error)
      errors.push('getUser');
    });
}


// Add test user
function addUser(success : string[] ,errors: string[]) {
    const options = {
      method: 'POST',
      url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/addUser',
      data: {"username" : "test",
            "password" : "test"
        },
      headers: {
          "Content-Type": "application/json"
        },
    };
  
    return axios.request(options)
      .then(function (response: any) {
        success.push('checkUser')
      })
      .catch(function (error: any) {
        console.error(error)
        errors.push('checkUser');
      });
  }


// check test user
function checkUser(success : string[] ,errors: string[]) {
  const options = {
    method: 'POST',
    url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/checkUser',
    data: {"username" : "test",
          "password" : "test"
      },
    headers: {
        "Content-Type": "application/json"
      },
  };

  return axios.request(options)
    .then(function (response: any) {
      success.push('checkUser')
    })
    .catch(function (error: any) {
      console.error(error)
      errors.push('checkUser');
    });
}


// Get all tasks from user 1 
function getTasks(success : string[] ,errors: string[]) {
  const options = {
    method: 'POST',
    url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/getTasks',
    data: {"user_id" : 1},
    headers: {
        "Content-Type": "application/json"
      },
  };

  return axios.request(options)
    .then(function (response: any) {
      success.push('getTasks')
    })
    .catch(function (error: any) {
      console.error(error)
      errors.push('getTasks');
    });
}


// Add task to user 1
function addTask(success : string[] ,errors: string[]) {
  const options = {
    method: 'POST',
    url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/addTask',
    data: {"name" : 'test',
           "description": "test",
           "user_id": 1
          },
    headers: {
        "Content-Type": "application/json"
      },
  };

  return axios.request(options)
    .then(function (response: any) {
      success.push('addTask')
    })
    .catch(function (error: any) {
      console.error(error)
      errors.push('addTask');
    });
}

// Edit task 1
function editTask(success : string[] ,errors: string[]) {
  const options = {
    method: 'POST',
    url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/editTask',
    data: {"name" : 'test',
           "description": "test",
           "id": 1
          },
    headers: {
        "Content-Type": "application/json"
      },
  };

  return axios.request(options)
    .then(function (response: any) {
      success.push('editTask')
    })
    .catch(function (error: any) {
      console.error(error)
      errors.push('editTask');
    });
}


//Change task n 1
function changeTask(success : string[] ,errors: string[]) {
    const options = {
      method: 'POST',
      url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/changeTask',
      data: {"id" : 1},
      headers: {
          "Content-Type": "application/json"
        },
    };
  
    return axios.request(options)
      .then(function (response: any) {
        success.push('changeTask')
      })
      .catch(function (error: any) {
        console.error(error)
        errors.push('changeTask');
      });
  }


// Translate task  n 1
  function translateTask(success : string[] ,errors: string[]) {
    const options = {
      method: 'POST',
      url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/translateTask',
      data: {"id" : 1},
      headers: {
          "Content-Type": "application/json"
        },
    };
  
    return axios.request(options)
      .then(function (response: any) {
        success.push('translateTask')
      })
      .catch(function (error: any) {
        console.error(error)
        errors.push('translateTask');
      });
  }

  // Delete task  n 1
  function deleteTask(success : string[] ,errors: string[]) {
    const options = {
      method: 'POST',
      url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/deleteTask',
      data: {"id" : 1},
      headers: {
          "Content-Type": "application/json"
        },
    };
  
    return axios.request(options)
      .then(function (response: any) {
        success.push('deleteTask')
      })
      .catch(function (error: any) {
        console.error(error)
        errors.push('deleteTask');
      });
  }

  // Delete user test
  function deleteUser(success : string[] ,errors: string[]) {
    const options = {
      method: 'POST',
      url: 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/deleteUser',
      data: {"username" : "test",
        },
      headers: {
          "Content-Type": "application/json"
        },
    };
  
    return axios.request(options)
      .then(function (response: any) {
        success.push('deleteUser')
      })
      .catch(function (error: any) {
        console.error(error)
        errors.push('deleteUser');
      });
  }

  
// Run tests
runTests();
