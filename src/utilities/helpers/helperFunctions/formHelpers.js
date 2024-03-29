//--------------------------------------------------------------------------------- Formatting -----------

export const handleInputChangeForCustomNumberInputField = (
  e,
  setAmountState,
  setPreventSubmitState,
  allowNegativeValues
) => {
  const newAmountStr = e.currentTarget.value;


  if(allowNegativeValues){
    if(!isNumerical(newAmountStr)) {
      return;
    }
  } else if(!allowNegativeValues){
    if(!isPositiveNumericalValue(newAmountStr)) {
      return;
    }
  }

  //assuming value is numerical, remove any prior popups that may have been triggered
  removePopUp(e.currentTarget);
  setAmountState(newAmountStr);
  setPreventSubmitState(valueIsZeroOrBlank(newAmountStr));
};

//------------------------------------------------------------------------- PopUps -----------

export const createPopUpOnZeroValueSubmit = (domInputElement) => {
  domInputElement.setCustomValidity("empty");
  domInputElement.reportValidity();
};

export const removePopUp = (domInputElement) => {
  domInputElement.setCustomValidity("");
  domInputElement.reportValidity();
};

export const handleAddCategoryInputPopUpMessage = (
  categories,
  domInputElement,
  newValue
) => {
  //returns true if currentInput is a duplicate. Else, returns false.
  //This boolean value is used to set an isDuplicate duplicate state inside the function component in use.
  const duplicateFound = categories.includes(newValue);
  const trimmedDuplicateFound = categories.includes(newValue.trim());
  if (duplicateFound) {
    domInputElement.setCustomValidity("duplicate");
    domInputElement.reportValidity();
    return true;
  } else if (trimmedDuplicateFound) {
    domInputElement.setCustomValidity("");
    domInputElement.reportValidity();
    return true;
  } else {
    domInputElement.setCustomValidity("");
    domInputElement.reportValidity();
    return false;
  }
};

//------------------------------------------------------------------------- helping the helpers -----------

export const valueIsZeroOrBlank = (inputValue) => {
  //if amount is not a number greater than or less than zero, return true (i.e. blank values also return true)
  return !(Number(inputValue) < 0 || Number(inputValue) > 0);
};

export const isNumerical = (inputValue) => {
  const isNumericalValueRegex = /^(-?\d*\.?\d*)?$/
  return isNumericalValueRegex.test(inputValue);
};

export const isPositiveNumericalValue = (inputValue) => {
  const isPositiveNumericalValueRegex = /^(\d*\.?\d*)?$/;
  return isPositiveNumericalValueRegex.test(inputValue);
};

//------------------------------------------------------------------------- unused helpers -----------



// export const createPopUpOnNonNumericalValueInput = (domInputElement) => {
//   domInputElement.setCustomValidity("input must be a number");
//   domInputElement.reportValidity();
// };


// export const removeUnnecessaryZeros = (inputString) => {
//   // Pattern to remove extra zeros preceding integers (non floating points):  /^0+(\d+)$/
//   //The above pattern returns the actual integer number value minus the preceding zero's. The relevant part of the value is captured in the capturedIntegers functionParam using a regex capture group. The capture group is the part of the expression surrounded by parentheses "(\d+)"

//   // Pattern to remove unnecessary preceding zeros (in case of a floating point value, more than one zero):  /^0(\d+\.\d*)$/
//   //The above pattern returns all numbers following the decimal point. The relevant part of the value is captured in the capturedDecimals functionParam using a regex capture group. The capture group is the part of the expression surrounded by parentheses "(\d+\.\d*)"

//   const myCustomRegex = /^0+(\d+)$|^0(\d+\.\d*)$/;

//   const replacer = (match, capturedIntegers, capturedFloatingPoints) => {
//     // console.log("capturedIntegers: ", capturedIntegers);
//     // console.log("capturedFloatingPoints: ", capturedFloatingPoints);
//     if (capturedIntegers) {
//       return capturedIntegers;
//     } else if (capturedFloatingPoints) {
//       return capturedFloatingPoints;
//     } else {
//       return "";
//     }
//   };
//   return inputString.replace(myCustomRegex, replacer);
// };
