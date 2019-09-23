package com.white.demo.database.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Game {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    private int game_ID;

    private String player1;

    private String player2;

    private String date;



    public int getGame_ID(){
        return this.game_ID;
    }

    public int getID(){
        return this.id;
    }

    public void setID(int id){
        this.id = id;
    }

    public String getDate(){
        return this.date;
    }

    public void setDate(String date){
        this.date = date;
    }



    public String getPlayer1(){
        return player1;
    }

    public String getPlayer2(){
        return player2;
    }

    public void setGame_ID(int gameId){
        this.game_ID = gameId;
    }

    public void setPlayer1(String player1){
        this.player1 = player1;
    }

    public void setPlayer2(String player2){
        this.player2 = player2;
    }
}