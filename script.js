// Assignment Code
var generateBtn = document.querySelector("#generate");

//My code starts here

//this function is the prompt for the number of characters in the password 
//note: I am using ES6 notation for anonymous functions (https://www.w3schools.com/js/js_es6.asp#mark_arrow)
const numOfCharactersPrompt = () => {

  //get an input for the number of characters and coerces type to Number
  let numOfCharsInput = Number(prompt("How many characters will be in your password? Choose between 8-128 characters:"));
  console.log(input);
  
  //if user inputs a number, loop until input is less than 8 and greater than 128 until user inputs a valid number
  if (numOfCharsInput < 8) {
    //set input to the output of the looped function
    numOfCharsInput = numOfCharactersPrompt();
  } else if (input > 128) {
    numOfCharsInput = numOfCharactersPrompt();
  } 
  
  //if user cancels, or inputs a string instead of a number (the isNaN method), exit prompt 
  //(because you are looping, you want this after the previous if statements and not before
  //so that you can escape the function properly)
  if (!numOfCharsInput || Number.isNaN(numOfCharsInput)) {
    return;
  }

  //return input if an acceptable number is entered
  return numOfCharsInput;
}

//declaring variables for the character types to include in password
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = lowercase.toUpperCase();
const numeric = "1234567890";
//most special characters can be put within backticks (`, below the tilde)
//if a character is escaped even in backticks, use \ right before to be able to use them in the string 
//(don't delete the extra \)
const special = ` !"#$%&'()*+,-./:;<=>?@[\\]^_\`\{|\}~`;

//this function prompts the user to include certain characters in password
const includeCharacterPrompts = () => {
  //these are the user prompts, they are stored in their respective variables as booleans
  let includeLowercase = confirm("Include lowercase?");
  let includeUppercase = confirm("Include uppercase?");
  let includeNumeric = confirm("Include numbers?");
  let includeSpecial = confirm("Include special characters?");

  //create an empty string that we will add the list of characters that are acceptable in the password to
  let charList = "";

  //if user clicked OK, add these characters to the charList string
  if (includeLowercase) {
    charList += lowercase;
  }

  if (includeUppercase) {
    charList += uppercase;
  }

  if (includeNumeric) {
    charList += numeric;
  }

  if (includeSpecial) {
    charList += special;
  }

  //if user did not click OK to any of the prompts, password will not be generated
  if (charList === "") {
    alert("Cannot make a password. Password must include at least one type of character.")
    return;
  }

  return charList;
}

const generatePassword = () => {

  //get the number of characters for the password
  const numOfCharacters = numOfCharactersPrompt();

  //exit the prompt if user cancels
  if (numOfCharacters === undefined) {
    //return an empty string, otherwise it will say "undefined" in the text box where the password should go
    return "";
  }

  //get the type of characters the password will contain as a string
  const passwordCanContain = includeCharacterPrompts();

  //exit the prompt if user clicks cancel on every prompt
  if (passwordCanContain === undefined) {
    return "";
  }
  
  //create an empty string for our new password
  let newPassword = "";

  //variable for the random number generator 
  let randomIndex;

  //use a for loop to iterate for each character in the password 
  for(i=0; i <= numOfCharacters; i++){
    //random number generator chooses a number between 0
    //and the length of the string that contains all the characters
    //that are acceptable to use in the password
    randomIndex = Math.floor(Math.random() * passwordCanContain.length);

    //add a randomly chosen character to the end of the newPassword string
    newPassword += passwordCanContain[randomIndex];
  }

  return newPassword;
}

//My code ends here

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);