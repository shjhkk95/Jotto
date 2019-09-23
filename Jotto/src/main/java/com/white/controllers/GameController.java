package com.white.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.white.GamePlay.GamePlay;
@Controller
public class GameController {
    private boolean newGame = true;
    private GamePlay game;
    @GetMapping("/game")
    public void enterWord(){
        //method to show selected words on computer's UI if none
        if(newGame == false){
            game.init("GET IT FROM FRONTEND");
        }
        //method
        else{
            
        }
    }

}
