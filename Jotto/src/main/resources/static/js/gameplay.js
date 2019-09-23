
var userWord;
var computerWord;
var started = 0;

function enterWord(input){
    if(started == 0){
        init();
        if (checkValidWord(userInput) == 0) {
            return 0;//Send request to Front-End that the word entered is invalid.
        }
        userWord = input;
        setUsersWord(userInput);
        computerWord = "input"; //draw from a dictionary in DB
        setComputersWord(randomInput);
        started = 1;
        return 1;
    }
    else {
        guess()
    }
}
function init(){
    started = 0;
    userWord = "";
    computerWord = "";
}

function checkValidWord(word){
    if(word.matches("[a-zA-Z]+") == false && word.length() != 0 && wordInDictionary(word) != 0)
        return 0;
    else
        return 1;
}

function wordInDictionary(word){
    //check word is in Dictionary(TXT file)
    return 0;
}

function guess(userGuess, answer){
    userGuess = "guess";
    answer = "computer";
    if(userGuess == answer){
        return -1;
    }
    else
        return countLetter(userGuess, answer);
}

function countLetter(input, answer){
    var i;
    var count = 0;
    for(i = 0; i<input.length; i++){
        if(answer.includes(input[i])){
            count++;
        }
    }
    return count;
}

function setUsersWord(word){
    document.getElementById("ID").
}