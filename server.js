//create a text file, perform the salting and slow hashing algorithm on it, be able to call and decypher and dehash the text, edit it, and update the file - until we have real cloud integration
//const form = document.getElementById("register-form");
const fs = require('fs').promises; //allows writing, and reading to json file through node
const path = require("path"); //allows path building
const USER_FILE = path.join(__dirname, "users.json"); //holds the exact path of the json file to a const variable
const users = [];

// async function appendToFile() {
  
//   try {
//     const username = document.getElementById("register-username");
//     const password = document.getElementById("register-password");
//     await fs.appendFile('C:\Users\saifu\OneDrive\Documents\Arman Help Desk Web App\login_info.txt', username, 'utf8'); //adds to file, creates file if it doesnt exist 
//     await fs.appendFile('C:\Users\saifu\OneDrive\Documents\Arman Help Desk Web App\login_info.txt', password, 'utf8'); //adds password, and username is added above
//     console.log('Log entry added - new username and password added');
//   } catch (err) {
//     console.error('Error appending to file:', err);
//   }
// }

// appendToFile(); //do we need to call this if its already being called when the button is pressed?

async function appendToFile() {
  fs.readFile(USER_FILE, "utf-8").then(console.log);
  
}
appendToFile();

async function writeToFile()
{
  try 
  {
    //array.push() to the user array, and then add that to the json file
    //const username = document.getElementById("register-username");
    const username = "saif";
    //const password = document.getElementById("register-password");
    const password = "12345";
    const hash = username + password; // create real hash
    const role = "admin";

    users.push( 
      {username: username,
      password: password,
      passwordHash: hash,
      role: role}); //add a role (admin or customer), hash
      
    const s = JSON.stringify(users, 2, null); //possibly change to where it just adds a single user and not add the entire file again each time
    await fs.writeFile(USER_FILE, s, "utf8");
    console.log('Log entry added - new username and password added');
    console.log(await fs.readFile(USERS_FILE, "utf8"));
  }
  catch(err)
  {
    console.error("Error editing file: ", err); //shows an error message and the error itself
  }
}

writeToFile();