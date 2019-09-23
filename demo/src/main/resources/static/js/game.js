// Global variables start
//for history
var currentUserName = "";
var time;
var userWord = "";
var computerWord = "";
var userGuessList = [];
var userCorrectCountList = [];
var computerGuessList = [];
var computerCorrectCountList = [];
var winner = "";

var concatedGuessList = userGuessList.concat(computerGuessList);
var concatedCountList = userCorrectCountList.concat(computerCorrectCountList);

//for gameplay
var numUserGuess = 0;
var numComGuess = 0;

/*var fullArray = []; changed to dictArray*/
var currentArray = [];
var firstTimePlaying = 1;

//for legal_words.txt
var dictArray = [];
var word_list_URL =
  "https://raw.githubusercontent.com/daeunnpark/daeunnpark.github.io/master/legal_words.txt";

// Global variables end

$(window).load(function() {
  $("#secretWordModal").modal("show");
});

/* Load txt file from web and store it in array Not working with local file */
$(document).ready(function() {
  $.get(word_list_URL, function(response) {
    /*alert("Word list is loaded");*/
    var word_list = response;
    dictArray = word_list.split("\n");
    userWord = random(dictArray).toUpperCase();
    currentArray = dictArray;
  });
});

/* attach a submit handler to the form */

$("#inputform").submit(function(e) {
  e.preventDefault();
  var value = document.getElementById("secret_word").value;
  if (is_valid(value)) {
    computerWord = value;
    set_secret_word_UI(value);
    $("#secretWordModal").modal("hide");
  }
  return false;
});

function set_secret_word_UI(str) {
  // User chooses computer's secret word
  document.getElementById("comp_letter_1").value = str.charAt(0);
  document.getElementById("comp_letter_2").value = str.charAt(1);
  document.getElementById("comp_letter_3").value = str.charAt(2);
  document.getElementById("comp_letter_4").value = str.charAt(3);
  document.getElementById("comp_letter_5").value = str.charAt(4);

  document.getElementById("user_letter_1").value = "?";
  document.getElementById("user_letter_2").value = "?";
  document.getElementById("user_letter_3").value = "?";
  document.getElementById("user_letter_4").value = "?";
  document.getElementById("user_letter_5").value = "?";
}

function set_secret_word_UI2(str) {
  // User chooses computer's secret word
  document.getElementById("user_letter_1").value = str.charAt(0);
  document.getElementById("user_letter_2").value = str.charAt(1);
  document.getElementById("user_letter_3").value = str.charAt(2);
  document.getElementById("user_letter_4").value = str.charAt(3);
  document.getElementById("user_letter_5").value = str.charAt(4);
}

$("#inputform2").submit(function(event) {
  var url = "/guess"; // the script where you handle the form input.

  $.ajax({
    type: "POST",
    url: url,
    data: $("#inputform2").serialize(), // serializes the form's elements.
    success: function(data) {
      alert(data); // show response from the php script.
    }
  });
  /*document.getElementById(letter_1).innerHTML = "";*/

  return false; // avoid to execute the actual submit of the form.
});

document.getElementById("inputform2").addEventListener("submit", function() {
  user_guess();
  computerGuess(currentArray);
});

/*
document.getElementById("submitbtn2").addEventListener("submit", function() {
  alert("submitted");
  user_guess();
  computerGuess(currentArray);
});
*/

document.querySelectorAll(".letterboard td").forEach(e =>
  e.addEventListener("click", function() {
    if (this.style.backgroundColor == "green") {
      this.style.backgroundColor = "red";
    } else if (this.style.backgroundColor == "red") {
      this.style.backgroundColor = "white";
    } else if (this.style.backgroundColor == "white") {
      this.style.backgroundColor = "green";
    } else {
      // first click
      this.style.backgroundColor = "green";
    }
    color_code(this.textContent.trim(), this.style.backgroundColor);
  })
);

/* event handler helper function start */
function is_valid(guess) {
  if (dictArray.includes(guess.toLowerCase())) {
    alert("List contains this word : " + guess);
    // Reset input field
    document.getElementById("letter_1").value = "";
    document.getElementById("letter_2").value = "";
    document.getElementById("letter_3").value = "";
    document.getElementById("letter_4").value = "";
    document.getElementById("letter_5").value = "";

    return true;
  } else {
    // Reset input field
    document.getElementById("letter_1").value = "";
    document.getElementById("letter_2").value = "";
    document.getElementById("letter_3").value = "";
    document.getElementById("letter_4").value = "";
    document.getElementById("letter_5").value = "";

    alert("List doesn't contain this word : " + guess);
  }
  return false;
}

function color_code(letter, color) {
  var table = document.getElementById("userGuessTable");
  for (var r = 1, n = table.rows.length; r < n; r++) {
    // skip header
    str = table.rows[r].cells[1].innerHTML;

    // replaceAll
    var find = letter;
    var re = new RegExp(find, "g");

    if (str.includes(letter)) {
      table.rows[r].cells[1].innerHTML = str.replace(
        re,
        '<span style="background-color:' + color + '">' + letter + "</span>"
      );
    }
  }
}
/* event handler helper function end */

/* User function start */
function user_init() {
  computerWord = document.getElementById("secret_word").value;
}

function user_guess() {
  var table = document.getElementById("userGuessTable");
  var char1 = document.getElementById("letter_1").value;
  var char2 = document.getElementById("letter_2").value;
  var char3 = document.getElementById("letter_3").value;
  var char4 = document.getElementById("letter_4").value;
  var char5 = document.getElementById("letter_5").value;

  if (
    !(
      char1 === "" ||
      char2 === "" ||
      char3 === "" ||
      char4 === "" ||
      char5 === ""
    )
  ) {
    var myGuess = (char1 + char2 + char3 + char4 + char5).toUpperCase();

    numUserGuess++;
    userGuessList.push(myGuess);
    var count1 = count(myGuess, userWord);
    userCorrectCountList.push(count1);
    printGuess(table, numUserGuess, myGuess, count1);
    checkGuess(myGuess, userWord, "user");
  }
}
/* User function end */

/* Computer function start */
function computerInit() {
  userWord = random(dictArray);
  currentArray = dictArray;
}

function computerGuess(current_array) {
  numComGuess++;
  var guess = random(current_array);
  computerGuessList.push(guess);
  var count1 = count(guess, computerWord);
  computerCorrectCountList.push(count1);
  var table = document.getElementById("computerGuessTable");
  printGuess(table, numComGuess, guess, count1);
  checkGuess(guess, computerWord, "computer");
  currentArray = refine_array(guess, count1, current_array);
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function count(word1, word2) {
  var charArr1 = word1.toUpperCase().split("");
  var charArr2 = word2.toUpperCase().split("");
  var i;
  var count1 = 0;
  for (i = 0; i < charArr1.length; i++) {
    if (charArr2.includes(charArr1[i])) {
      count1++;
    }
  }
  return count1;
}

function refine_array(word, count1, array) {
  var temp = [];
  var i;
  for (i = 0; i < array.length; i++) {
    if (count(word, array[i]) == count1) {
      temp.push(array[i]);
    }
  }
  return temp;
}

function printGuess(table, numGuess, guess, count) {
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = numGuess;
  cell2.innerHTML = guess.toUpperCase();
  cell3.innerHTML = count;
}

function checkGuess(guess, word, player) {
  if (guess.toUpperCase() === word.toUpperCase()) {
    winner = player;
    set_secret_word_UI2(userWord);
    saveHistory();
    $("#submitbtn2").attr("disabled", "disabled");

    popUpWinner();
  }
}

var counter1 = 0;
var counter = 0;
function userSaveLogs(callback) {
  $.ajax({
    url: "/log/saveGameLog",
    type: "GET",
    data:
      "username=" +
      "user@a.a" +
      "&word=" +
      userGuessList[counter] +
      "&letterCount=" +
      userCorrectCountList[counter] +
      "&winner=" +
      winner +
      "&userWord=" +
      userWord +
      "&computerWord=" +
      computerWord +
      "&numLine=" +
      (counter + 1),
    success: function(res) {
      counter++;
      if (counter < userGuessList.length) userSaveLogs();
    }
  });
  callback();
}

function computerSaveLogs() {
  $.ajax({
    type: "GET",

    url: "/log/saveGameLog",

    data:
      "username=" +
      "Computer" +
      "&word=" +
      computerGuessList[counter] +
      "&letterCount=" +
      computerCorrectCountList[counter] +
      "&winner=" +
      winner +
      "&userWord=" +
      userWord +
      "&computerWord=" +
      computerWord +
      "&numLine=" +
      (counter1 + 1),
    success: function() {
      counter1++;
      if (counter < computerGuessList.length) computerSaveLogs();
    }
  });
}

function saveHistory() {
  //SEND GAME DATAS
  $.ajax({
    type: "GET",

    url: "/game/saveGame",

    data: "player1=" + "user@a.a"
  });

  userSaveLogs(computerSaveLogs);

  /*
    for (var z = 0; z < computerGuessList.length; z++ ) {

      $.ajax({
        url:"/log/saveGameLog",
        type:"GET",
        data: "username=" + "user@a.a" + "&word=" + userGuessList[k] + "&letterCount=" + userCorrectCountList[k]+
            "&winner=" + winner + "&userWord=" + userWord + "&computerWord=" + computerWord,

      });
    }*/
}

function popUpWinner() {
  alert("Winner is " + winner);
  //pop up winner window
  //end the game
}
/* Computer function end */
