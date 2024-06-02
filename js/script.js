let currentString = "";
const displayValue = document.getElementById("result"); 

//  Get the number 
function appendNumber(number) {
    currentString += number;
    displayValue.value = currentString;
};

// Get the Operator
function appendOperator(operator) {
    currentString += operator;
    displayValue.value = currentString;
};

// Get the Decimal
function appendDecimal() {
    if(!currentString.includes(".")) {
        currentString += ".";
        displayValue.value = currentString;
    };
};

// Delete the End character
function deleteChar() {
    currentString = currentString.slice(0, -1);
    displayValue.value = currentString;
};

// Delete the whole string
function clearSection() {
    currentString = "";
    displayValue.value = currentString;
};


// Error handling function
function handleError(errorMessage) {
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.innerHTML = errorMessage;
    errorMessageDiv.style.display = "block";
  
    setTimeout(() => {
      errorMessageDiv.innerHTML = "";
      errorMessageDiv.style.display = "none";
    }, 2500);
  
    currentString = "";
    displayValue.value = currentString;
  }

// To get the KeyBoard Characters
document.addEventListener("keypress", function(event) {
    const key = event.key;
  
    // Handle number keys (0-9)
    if (!isNaN(key)) {
        appendNumber(key)
    } else if (key === ".") {
      // Handle decimal point (prevent multiple decimals)
      if (!currentString.includes(".")) {
        appendDecimal();
      }
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      // Handle operators (consider advanced logic like operator precedence)
        appendOperator(key);
    } else if (key === "^"){
        // Handle all other keys
        currentString += "**";
    } 
    else if (key === "D" || key === "d") {
      // Handle backspace to remove last digit
      deleteChar();
    } else if(key === "Enter"){
        // Handle enter to calculate
        calculate();
    } else if (key === "C" || key === "c"){
        // Handle all other keys
        clearSection();
    } else {
        return 0;
    }
    return displayValue.value = currentString;
});


// Calculate the expression
function calculate() {
    try {
        let result = eval(currentString);
        displayValue.value = result;
        currentString = result
    } catch(error) {
        handleError(error.message);
    };
};