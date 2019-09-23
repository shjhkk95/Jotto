package com.white.demo.database.model;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;




@Entity // This tells Hibernate to make a table out of this class
public class GameLog {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int logID;

    private String username;

    private int game_ID;

    private String word;

    private int letter_count;

    private String winner;

    private String user_word;

    private String computer_word;

    private int numLine;

    public int getNumLine(){
        return this.numLine;
    }

    public void setNumLine(int numLine){
        this.numLine = numLine;
    }

    public String getWinner(){
        return this.winner;
    }

    public void setWinner(String winner){
        this.winner = winner;
    }

    public String getUserWord(){
        return this.user_word;
    }

    public void setUserWord(String userWord){
        this.user_word = userWord;
    }

    public String getComputerWord(){
        return this.computer_word;
    }

    public void setComputerWord(String computerWord){
        this.computer_word= computerWord;
    }

    public String getUsername(){
        return this.username;
    }


    public String getWord(){
        return this.word;
    }

    public int getGame_ID(){
        return this.game_ID;
    }

    public int getCount(){
        return this.letter_count;
    }

    public void setUsername(String usn){
        this.username = usn;
    }

    public void setGame_ID(int gid){
        this.game_ID = gid;
    }


    public void setWord(String word){
        this.word = word;
    }

    public void setLetterCount(int count){
        this.letter_count = count;
    }

}