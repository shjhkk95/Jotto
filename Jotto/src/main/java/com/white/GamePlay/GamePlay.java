package com.white.GamePlay;

public class GamePlay {

    final String ivalnidWord = "Invalid Entry: alphabets only without repeating letters";
    String usersWord;
    String computersWord;
    final char[] alphabets = "abcdefghijklmnopqrstuvwxyz".toCharArray();

    /*
        When the user enters the word to start with, check the validity (letters only, no repeating letters, word in the dictionary)
    */
    public String init(String userInput1){
        String userInput = "basic";
        if(checkValidWord(userInput) == 0){
            return invalidWord;
        }
        setUsersWord(userInput);
        String randomInput = "input"; //draw from a dictionary in DB
        setComputersWord(randomInput);
        return "Initilized successfully";
    }

    public int checkValidWord(String word){
        if(word.matches("[a-zA-Z]+") == false && word.length() != 0 && wordInDictionary(word) != 0)
            return 0;
        else
            return 1;
    }

    /*
       check the word is in the dictionary in DB
    */
    public int wordInDictionary(String word){
        return 0;
    }

    /*
        When the user enters the guess,
        1. check if the guess is the answer(if correct, return -1)
        2. If not, count the number of correct letter and returns it.
        3.
     */
    public int guess(String userGuess, String answer){
        userGuess = "guess";
        answer = "computer";
        if(userGuess == answer){
             return -1;
        }
        else
            return countLetter(userGuess, answer);
    }

    public int countLetter(String input, String answer){
        return 0;
    }

    public String getUsersWord() {
        return usersWord;
    }

    public String getComputersWord() {
        return computersWord;
    }

    public char[] getAlphabets() {
        return alphabets;
    }

    public void setUsersWord(String usersWord) {
        this.usersWord = usersWord;
    }

    public void setComputersWord(String computersWord) {
        this.computersWord = computersWord;
    }

}
/*

JOTTO

1. The user enters the 5-letter word ( an object with 5 letters )
    - check if the entry is valid
        - 1. all letters (no numbers nor special characters)
        - 2. no repeating letters
        - 3. known word (check the word with DB)
    - Computer pull a 5-letter word from DB randomly

2. The user makes a guess
    - if the user's guess is the word, the user win
    - if the computer's guess is the word, the user win
    - count the number of correct letters of Computer Word
    - computer also makes a guess
    - shows

2-2. When the user wins,
    - save the game result in DB

3. The user toggles a letter (DONE BY FRONT END)
    - toggle all the words in my guesses


*/