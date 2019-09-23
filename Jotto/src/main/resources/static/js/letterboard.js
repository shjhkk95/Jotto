// PHPDoc: https://en.wikipedia.org/wiki/PHPDoc

// Document cookie to set the buttons that stay open on page refresh
document.cookie = "level=2";

// Declare our instance variables to keep track of our HTML elements
// var calculator = document.getElementById( 'calculator' );
var buttons = document.getElementsByTagName( 'td' );   // buttons 
var answer = document.getElementById( 'answer' );     // answer field
var field = document.getElementById( 'inputArea' );   // input area

// Mathematical function specific variables
var expression = "";        // the String value of the WHOLE expression (necessary?)
var values = new Array();   // an array of input numbers
var currentValue = "";      // a String that keeps track of the current number (to convert to a number on operand input)
var previousValue = 0;      // the numeric value of the last number input
var operands = new Array(); // an array of clicked operands
var previousOperand = '';   // keep track of the operand we're on (for overwriting operands)
var runningTotal = 0;       // keep a running total AS numbers are input
var result = 0;             // the final result of our calculation (can be used to carry on further calculations)
var memory = 0;             // the value held in MEMORY

// Declare variables used for calculations
var validKeys = [ 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57 ]; // -, ., 0-9
var operatorKeys = [ 42, 43, 47, 37, 94, 33, 40, 41 ];              // *, +, /, %, ^, !, (, )
var validKeyDowns = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-", "+", "*", "/", "%", "^", "!", "(", ")" ];
var buttonClicked = false;  // keeps track of whether we're doing keyboard input or button input
var clearAllCount = 0;      // keep track of num of equals hits - reset input if 2 or more
var parensCount = 0;        // keep track of the number of parenthesis
var calculated = false;     // sets a true flag if we've run a calculation - used to reset the calculator

// function to listen for other calculator buttons to be turned on
doSettings();       // grabs the page cookie (if set) to keep parts of the calculator open even during refreshing
levelListener();    // sets up the top buttons to turn on/off different sets of calculator buttons
setupButtons();     // add an "onclick" listener to EVERY 'td' button element
setupKeyboard();    // listens for keyboard input and only accepts certain characters from the keyboard
// setupInputField();  // makes the inputArea ALWAYS have focus (but annoying if still writing code)

/**
 * TODO:
 * 1. Properly handle keyboard input
 * 2. Properly handle multiple operators
 * 3. After "calculated" if "equals", calculate AGAIN with previous value + operand
 * 4. Store "result" in memory to continue calculations; => DONE
 */

/**
 * INPUT FIELD AUTOFOCUS
 *
 * On page load, focuses the inputArea field, then also refocuses it on the inputArea field
 * after clicking any button, or clicking away from the field anywhere else on the page
 * (only useful after program is finalized)
 */
function setupInputField() {
  // make the inputArea focused by default
  field.focus();
  
  // refocus the inputArea whenever you click a button
  field.onblur = function () {
    setTimeout( function () {
        field.focus();
    });
  };
} // END setupInputField()

/**
 * BUTTON CLICKER
 *
 * Setup event listeners for every button in the calculator and perform actions based on input
 * Whenever a button is clicked, set the "buttonClicked" flag to TRUE and pass the innerHTML value
 * to the keyListener button handler. After keyListener runs, remark the "buttonClicked" flag to FALSE
 * to be ready for another click later (in case there is keyboard input in between)
 */
function setupButtons() {  
  for (var i = 0; i < buttons.length; i++) {   // for every single button
    buttons[i].onclick = function() {          // listen for a click
      var button = this.innerHTML;
      
      buttonClicked = true;                   // when we click a button, set the global var to TRUE so we can use keyListener() properly
      buttonListener( button );               // send data to buttonListener()
      buttonClicked = false;                  // reset buttonClicked to FALSE so we are ready for EITHER a button click OR keyboard input again
    };
  }
} // END setupButtons()

/**
 * KEYBOARD LISTENER
 *
 * Setup the keyboard to only allow certain input and also to detect certain other keypresses like BACKSPACE
 * onkeypress events, we check if the key is valid or not, 
 * if TRUE, we can input the value to inputArea - if FALSE, do something else, but don't send the value to inputArea
 * onkeydown events, we only listen for the BACKSPACE key - which doesn't fire onkeypress events
 * if BACKSPACE, take care of deletion of values
 */
function setupKeyboard() {
  field.onkeypress = function( event ) {    // whenever a key is pressed, 
    var key = event.keyCode;
    
    if ( ( validKeys.indexOf( key ) != -1 || operatorKeys.indexOf( key ) != -1 ) && !hasDecimal( key ) )  // these keys are POSSIBLE to pass into the answer field
      if ( key == 46 ) // this is a decimal
        addDecimal( key );
      sendtoAnswerField( String.fromCharCode( key ) );
    
    return isValidKey( key );     // check whether it's valid or not, if FALSE - we don't allow that input
  }
  field.onkeydown = function( event ) {     // onkeydown fires with BACKSPACE or DELETE, but onkeypress will not
    var key = event.keyCode;                // get the numeric keyCode
    if ( key == 8 || key == 46 )            // keyCode = 8 is BACKSPACE, 46 is DELETE with onkeydown, but a decimal . onkeypress
      deleteValue( key );                   // call the deleteValue() function to handle this
    if ( key == 187 )
      field.value = "";
  }
  /*field.onkeydown = function( event ) {
    var key = event.keyCode;
    alert(key);
    if ( validKeyDowns.indexOf( key ) != -1 ) {
      if ( key == 190 && !hasDecimal( key ) )                 // this is a decimal point for onkeyup
        sendtoAnswerField( "." );
      sendtoAnswerField( convertKeytoChar( key ) );
    }
  }*/
} // END setupKeyboard()

/*function convertKeytoChar( key ) {
  switch ( key ) {
    case 190:
      return ".";
      break;
    default:
      return;
  }
}*/

/**
 * VALID KEYS HANDLER - allows only certain values in the inputArea
 *
 * This function handles the keyboard input values that are allowed to appear in the inputArea
 * Basically, we only allow numbers, a single minus sign (for negatives), a single 0, and a single decimal
 * Otherwise, if the key is an operand, we send it to be included in the answer area, but NOT the inputArea
 * If the key is a BACKSPACE, it's already handled by the previous onkeydown function
 *
 * @param   onkeypress event  e
 * @return  boolean           TRUE = allow in inputArea
 */
function isValidKey( key ) {
  if ( validKeys.indexOf( key ) != -1 && field.value == "0" ) field.value = "";
  else if ( validKeys.indexOf( key ) != -1 && field.value == "-0" ) field.value = "-";
  
  // the following key values can be TRUE (input into inputArea)
  if ( validKeys.indexOf( key ) != -1 && field.value != "0" && !hasDecimal( key ) ) { // if the key is in the validKeys array AND the field isn't "O" AND there's no decimal, then the key is VALID
    if ( key == 46 && field.value == "" ) {        // if we're typing a decimal (and there's no value in the field),
      field.value += "0";     // add a "0" to the start
      // sendtoAnswerField( "0" );
    }
    else if ( key == 45 ) { // else if we're typing a negative, and there isn't already one there,
      dealWithNegative();     // pass it to a function to deal with it (if empty, add the symbol, if not, perform a subtraction operation)
      return false;           // return FALSE so we don't add more than one negative sign to the inputArea
    }
    return true;  // TRUE - only for the keys that can fill the inputArea
  }
  
  // the following keys are always FALSE (not input into inputArea), but we do certain other actions FIRST before returning false
  else if ( operatorKeys.indexOf( key ) != -1 ) // if we pushed an operand key
    addOperand( key );
  else if ( key == 13 || key == 61 )  // if we pushed ENTER or =
    calculate();
  return false;   // FALSE if not in the validKeys array, OR the field is already "0", OR there's already a decimal
} // END isValidKey( e )

/**
 * DECIMAL POINT CHECKER
 *
 * This function not only checks the inputArea for a pre-existing decimal (returning FALSE if there isn't one),
 * it ALSO checks to be sure that if there IS a decimal already, we are not pushing the decimal key again.
 * If there IS a decimal and we are NOT pushing the decimal key, it returns FALSE 
 * Otherwise, there is no decimal and we're pushing the decimal key for the first time, it returns TRUE.
 *
 * @param   keyCode   key
 * @return  boolean   true if no decimal
 */
function hasDecimal( key ) {
  if( field.value.indexOf( "." ) == -1 )  // if there's NO decimal
    return false;
  else if ( field.value.indexOf( "." ) != -1 && ( key != 46 && key != 190 ) ) // OR if there is a decimal, and we're NOT pushing the decimal key
    return false;
  //sendtoAnswerField( "." );
  return true;
} // END hasDecimal( key )

/*
 * TOGGLE NEGATIVE SYMBOL
 * 
 * Adds a negative symbol at the beginning of a new number, 
 * OR performs a subtraction operation if pressed after there are already numbers in the inputArea
 */
function dealWithNegative() {
  if ( field.value == "" ) {  // if the inputArea is empty, add a single negative sign
    field.value += "-";
    //sendtoAnswerField( "-" );
  }
  else                        // OR, perform a subtraction operation
    addOperand( "-" );
}

/**
 * BUTTON LISTENER - listens for button clicks on the calculator Object itself
 *
 * @param   String  innerHTML of the button clicked
 */
function buttonListener( keyValue ) { 
  if ( keyValue == "=" )
    // 1 click = calculate total
    // 2 clicks = re-calculate using "result" and "previousOperand"
    calculate();
  else if ( keyValue == "." ) 
    // search the "inputArea" for a decimal
    // if empty, add "0."
    // if not empty, add "."
    addDecimal( 46 );
  else if ( keyValue == "-" )
    dealWithNegative();
  else if ( keyValue == "+" || keyValue == "*" || keyValue == "&times;" || keyValue == "/" || keyValue == "&divide;" || keyValue == "%" )
    // clear inputArea
    // 1. if inputArea is empty AND "-", add "-" to the value and make it negative
    // 2. if inputArea is empty and NOT "-", rewrite "previousOperand" with this one + push onto stack
    // 3. if inputArea is NOT empty, add " " + operand + " " to the expression, but 
    // 2. OR 
    addOperand( keyValue );
  else if ( keyValue == "( )" )
    doInput( addParens() );
  else if ( keyValue == "←" )
    deleteValue( keyValue );
  else if ( keyValue == "AC" )
    clearAll();
  /*else if ( field.value == "" && keyValue == "0" )
    return;*/
  else
    doInput( keyValue );
} // END keyListener( keyValue )


function doInput( e ) { 
  if( buttonClicked ) {
    field.value += e;
    //sendtoAnswerField( e );
  }
}

function sendtoAnswerField( char ) {
  if ( char == "." && currentValue.indexOf( "." ) == -1 )
    currentValue += "."
  else if ( char != "." )
    currentValue += char;
  answer.innerHTML = expression + currentValue;
}

/**
 * DECIMAL POINT handling functions
 */
function addDecimal( keyCode ) {
  if ( !hasDecimal( keyCode ) ) {
    if ( field.value == "" || field.value == "-" ) {
      field.value += "0";
      //sendtoAnswerField( "0" );
    } 
    field.value += ".";
    //sendtoAnswerField( "." );
  }
} // END addDecimal()

/**
 * OPERAND handling functions
 */
function addOperand( operand ) {

  // if nothing, do nothing (negative is already taken care of)
  // if field has some value, push it to values array, keep in field.value, push it AND operand to current expression
  if ( field.value == "" ) { 
    if ( previousOperand != "" ) {
      previousOperand = operand;
      operands.pop();
      operands.push( operand );
      expression = expression.substring( 0, expression.length-1 ) + operand;
      answer.innerHTML = expression;
    }
  } 
  
    // Else if there is already a previous operand, change it to the new operand
    if ( field.value != "" && operands.length > 0 ) {  
      var oldOp = operands.pop();
      operands.push( operand );
      //formula = formula.replace( /.$/, operand );
    } // else nothing
  //} 
  
  // OR, if there IS something in the inputArea right now
  else {
    operands.push( operand );
  }
  
  values.push( field.value );
  field.value = "";
  //formula = formula + " " + operand + " ";
  // answer.innerHTML = answer.innerHTML + " " + operand + " ";
} // END addOperand( operand )

function addParens() {
  return "(";
}

function deleteValue( event ) {
  if ( field.value == "" && operands.length > 0 ) {
    values.pop();
    answer.innerHTML = "";
    // delete entire last value from answerfield
    // delete entire last value from formula
  }
  else if ( event == 8 || event == 46 || event == "←" ) {
    if ( field.value == "" ) {
      answer.innerHTML = "";
    } else {
      answer.innerHTML = answer.innerHTML.replace( /.$/, '' );
      //formula = formula.replace( /.$/, '' );
      if ( event == "←" )
        field.value = field.value.replace( /.$/, '' );
    }
  }
}
/**
 * EQUALS handling functions
 */
function calculate() {
  if ( field.value == "" ) 
    doInput( 0 );
  
  if ( equalsCount > 1 && operands.length < 1 ) {
    field.value = "";
    answer.innerHTML = "";
  } else {
    values.push( field.value );
  }
  // For every operand in our values array
  for (var i = 0; i < operands.length; i++) {
    var value1 = Number( values.shift() );
    var value2 = Number( values.shift() );

    switch (operands[i]) {
      case '%':
        field.value = mod( value1, value2 );
        break;
      case '/':
        field.value = divide(value1, value2);
        break;
      case '*':
        field.value = multiply(value1, value2);
        break;
      case '+':
        field.value = add(value1, value2);
        break;
      case '-':
        field.value = subtract(value1, value2);
        break;
      default:
        return;
    }
  }
  field.style.color = "#2196f3";
  result = field.value;
  calculated = true;
}

function mod( num1, num2 ) {
  return parseInt( num1 / num2 ) + "r" + num1 % num2;
}
function divide(num1, num2) {
  return num1 / num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

/**
 * Clears calculator fields in two steps:
 * 1. On first press, clears the current inputArea field
 * 2. On second press, resets all interactions
 */
function clearAll() {
  if ( clearAllCount > 0 ) {
    resetInteractions();
    clearAllCount = 0;
  } else {
    field.value = "";
    decimalCount = 0;
    clearAllCount++;
  }
}

function resetInteractions() {
  // reset all of our values
  operands.splice( 0, operands.length );
  values.splice( 0, values.length );
  field.value = "";
  answer.innerHTML = "";
  expression = "";
  currentValue = "";
  decimal = false;
  calculated = false;
}

/**
 * Load initial app settings depending on the cookie value set for the open interface buttons
 */
function doSettings() {
  // Uses a cookie to remember to keep certain buttons open while programming
  var levelNumber = getLevelCookie();
  
  if ( levelNumber < 5 && levelNumber > 1 ) { // only allow numbers 2, 3, 4
    var currentLevel = "level" + levelNumber + "button";
    var currentKeys = "level" + levelNumber;
  
    var pressedButton = document.getElementById( currentLevel );
    var openKeys = document.getElementById( currentKeys );
 
    if ( levelNumber == 2 ) {
      pressedButton.className = "active";
      openKeys.className = "";
    }
    
    else if ( levelNumber == 3 ) {
      widenCalculator();
      pressedButton.className = "active";
      openKeys.className = "";
    } // end level3 check
    
    else if ( levelNumber == 4 ) {
      widenCalculator();
      for( var i=2; i<4; i++ ) {
        var bothButtons = document.getElementById( "level" + i + "button" );
        var allKeys = document.getElementById( "level" + i );
        bothButtons.className = "active";
        allKeys.className = "";
      } 
      openKeys.className = "";
    } 
    
  } // end level number check
} // END doSettings()

/**
 * LEVEL LISTENER
 *
 * Listens for other calculator buttons to be turned on and toggles the appropriate buttons
 */
function levelListener() { 
  var l2button = document.getElementById( 'level2button' );
  var l2 = document.getElementById( 'level2' );
  var l3button = document.getElementById( 'level3button' );
  var l3 = document.getElementById( 'level3' );
  var l4 = document.getElementById( 'level4' );
   
  l2button.onclick = function() { 
    toggleButtons( l2button, l3button, l2 ); 
    if ( l2button.className != "active" )
      l4.className = "hidden";
  }
  l3button.onclick = function() { toggleButtons( l3button, l2button, l3 );
    if ( l3button.className == "active" ) {
      widenCalculator();
    } else {
      shrinkCalculator();
    }
  }
} // END levelListener()

function toggleButtons( clicked, other, buttons ) {
  var l4 = document.getElementById( 'level4' );
 
  if ( clicked.className == "active" ) {
    clicked.className = "";
    buttons.className = "hidden";
  } else {
    clicked.className = "active";
    buttons.className = "";
  }
  
  if ( other.className == "active" ) {
    l4.className = "";
  } else {
    l4.className = "hidden";
  }
}

function widenCalculator() {
  calculator.style.width = "550px";
  field.style.width = "550px";
  document.getElementById( 'answerArea' ).style.width = "550px";
  document.getElementById( 'calcButtons' ).style.float = "right";
  document.getElementById( 'level3' ).style.float = "left";
}

function shrinkCalculator() {
  calculator.style.width = "300px";
  field.style.width = "300px";
  document.getElementById( 'answerArea' ).style.width = "300px";
}

function getLevelCookie() {
  var find = "level=";
  var cookieArray = document.cookie.split( ';' );

  for( var i=0; i<cookieArray.length; i++ ) {
    var currentCookie = cookieArray[i];
    while ( currentCookie.charAt(0) == ' ' ) currentCookie = currentCookie.substring( 1 );
    if ( currentCookie.indexOf( find ) == 0 ) { return currentCookie.substring( find.length, currentCookie.length); }
  }
  return "";
}


/************
 * OLD CODE *
 ************/
/**
 * Checks the validity of keypresses from the keyboard
 * If FALSE, nothing is input - if TRUE, allow that keypress value in the inputArea
 * 
 * @param   keypress event  e
 * @return  bool            true for valid input, false for invalid
 *
 * @link: https://www.kirupa.com/html5/keyboard_events_in_javascript.htm
 * @link: http://javascript.info/tutorial/keyboard-events
 *
function sendtoKeyListener( e ) {  // onkeypress doesn't fire on BACKSPACE key
  var key = e.keyCode;      // which key was typed (unicode)

  if ( key == 13 || key == 61 ) // 13 is ENTER on main keyboard and numpad, 61 is the = sign
    keyListener( "=" );
  else if ( key == 42 )
    keyListener( "*" );
  else if ( key == 43 )
    keyListener( "+" );
  else if ( key == 45 )
    keyListener( "-" );
  else if ( key == 47 )
    keyListener( "/" );
  else if ( key == 46 )   // here, 46 is a decimal, but "onkeydown" it's DELETE - in that case, a different function is called ( deleteValue( key ) )
    keyListener( "." );
  else if ( ( key > 47 && key < 58 ) && ( field.value != "0" ) ) {
    keyListener( String.fromCharCode( key ) ); // returns the actual ASCII numeric value of the buttons pressed
    //return true;
  }
  //return false;
}

/*
function isEquals( button ) {
  if ( button == "=" ) {
    equalsCount++;
    return true;
  } else {
    equalsCount = 0;
    return false;
  }
} // END isEquals( button )

/* FROM isValidKey( e )
 
 if ( key == 13 ) {
    keyListener( "=" );
    //calculate();
    /*equalsCount++;
    if ( equalsCount > 1 ) {  // if Equals is pressed more than once
      field.value = "";       // clear the input field
      equalsCount = 0;        // reset equalsCount
    } else {                  // else, calculate()
      answer.innerHTML = calculate();
    }
    return false;             // DISALLOW key input
  }
  
  // else if an operand key is pressed, DISALLOW key input
  else if ( key == 42 || key == 43 || key == 45 || key == 47 ) {
    addOperand( getKey( key ) );
    return false;
  }
  // else if not decimal AND not a number, OR there's already a decimal, DISALLOW key input
  else if ( ( key != 46 && ( key < 48 || key > 57 ) ) || ( key == 46 && decimal == true ) ) {
    return false;   // don't allow key input
  } 
  // else, if it's a decimal and we don't have one yet, ALLOW key input
  else if ( key == 46 && decimal == false ) { 
    decimal = true; // set decimal to true to remember to only allow ONE
    return true;    // allow THIS SINGLE decimal key input
  } 
  // else (that means it's a number), ALLOW key input
  else {
    return true;    // allow key input
  }
  
  
  FROM setupButtons()
   // if we've previously calculated something and now we're adding an operand, continue
      if ( calculated && isOperand( this.innerHTML ) ) {
        resetInteractions();                  // reset arrays and fields
        answer.innerHTML = result + " " + this.innerHTML + " "; // use previous result
        values.push( result );                // push previous result to values array
        operands.push( this.innerHTML );      // push current operand to operands array
      } 
      // else if we've previously calculated and hit equals AGAIN, continue with previous operand
      else if ( calculated && isEquals( this.innerHTML ) ) {
        resetInteractions();
        answer.innerHTML = result + " " + previousOperand + " " + previousValue;
        values.push( result );
        values.push( previousValue );
        operands.push( previousOperand );
        calculate();
      }
      // else, we've calculated and are starting something NEW
      else if ( calculated ) {
        resetInteractions();
      }
    
      // if it's an OPERAND
      if ( isOperand( this.innerHTML ) ) {  
        addOperand( this.innerHTML );
      } 
    
      // else if it's a decimal point
      else if ( isDecimal( this.innerHTML ) ) {
        addDecimal();
      }
    
      // else if we're adding a parenthesis
      /*else if ( isParens( this.innerHTML ) ) {
        addParens();
      }
    
      // else if it's ALL CLEAR
      else if ( isAllClear( this.innerHTML ) ) {
        clearAll();
      }
    
      // else if it's the EQUALS sign
      else if ( isEquals( this.innerHTML ) ) { 
        calculate();
      } 
    
      // it must be a NUMBER
      else {
        field.value += this.innerHTML;
        answer.innerHTML += this.innerHTML;
      }
    }
	
	
FUNCTION getKey( key ) 
/*function addOperand( key ) {
  alert( key );
  answer.innerHTML = answer.innerHTML + " " + getKey( key ) + " ";
}

function getKey( key ) {
  switch( key ) {
    case 42:
      return '&times;';
      break;
    case 43:
      return '+';
      break;
    case 45:
      return '-';
      break;
    case 47:
      return '&divide;'
      break;
    default:
      return '';
  }
}*/