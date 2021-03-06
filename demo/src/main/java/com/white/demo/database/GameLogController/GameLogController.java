package com.white.demo.database.GameLogController;

import com.white.demo.database.GameController.GameController;
import com.white.demo.database.LoginController.LoginController;
import com.white.demo.database.Repositories.GameLogRepository;

import com.white.demo.database.model.Game;
import com.white.demo.database.model.GameLog;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import com.white.demo.database.GameController.GameController;
import org.springframework.web.servlet.ModelAndView;
import java.util.ArrayList;
import org.json.simple.JSONObject;


import java.util.Date;

import org.json.*;
import org.json.simple.JSONObject;

import java.util.List;
import java.util.Date;


@Controller    // This means that this class is a Controller
@RequestMapping(path="/log") // This means URL's start with /demo (after Application path)
public class GameLogController {
    @Autowired // This means to get the bean called userRepository





    // Which is auto-generated by Spring, we will use it to handle the data

    private GameLogRepository logRepository;

    Date d = new Date();

    public static int logCount = 0;



    @GetMapping(path="/addGameLog") // Map ONLY GET Requests
    public @ResponseBody String addNewGameLog (@RequestParam String username, @RequestParam int game_ID,
                                               @RequestParam String word, @RequestParam int letterCount) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request


        GameLog l = new GameLog();
        l.setUsername(username);
        l.setGame_ID(game_ID);
        l.setWord(word);
        l.setLetterCount(letterCount);
        this.logRepository.save(l);
        return "LogCount : " + logCount++;

    }

    @RequestMapping(value="/saveGameLog") // Map ONLY GET Requests
    public @ResponseBody String addNewGameLog (@RequestParam(value = "username") String username,
                                               @RequestParam(value = "word") String word,
                                               @RequestParam(value = "letterCount") int letterCount,
                                               @RequestParam(value = "winner") String winner,
                                               @RequestParam(value = "userWord") String userWord,
                                               @RequestParam(value = "computerWord") String computerWord,
                                               @RequestParam(value = "numLine")int numLine) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("FFFFFF");
        GameLog logData = new GameLog();
        logData.setComputerWord(computerWord);
        logData.setGame_ID(GameController.gamecount);
        logData.setLetterCount(letterCount);
        logData.setUsername(username);
        logData.setUserWord(userWord);
        logData.setWinner(winner);
        logData.setWord(word);
        logData.setNumLine(numLine);

        System.out.println(GameController.gamecount);
        this.logRepository.save(logData);

        return "saved";

    }

    @RequestMapping(value="/redirectTest") // Map ONLY GET Requests
    public String addNewGameLog (){

        return "redirect:/game/history";

    }

    @RequestMapping(value = "/getAllLogs/{game_ID}", method = RequestMethod.GET)
    public @ResponseBody ModelAndView showAll(@PathVariable int game_ID) {
        List<GameLog> gl = new ArrayList<GameLog>();
        List<GameLog> gl2 = new ArrayList<GameLog>();
        for (GameLog g : logRepository.findAll()){
            if (g.getGame_ID() == game_ID){
                if (g.getUsername().equals("Computer")) {


                    gl.add(g);
                }
                else {
                    gl2.add(g);
                }
            }
        }


        ModelAndView mv =  new ModelAndView("history_game");


        mv.addObject("logs", gl);
        mv.addObject("logs2", gl2);


        return mv;



    }









    @GetMapping(path="/allGameLog")
    public @ResponseBody Iterable<GameLog> getAllGameLog() {
        // This returns a JSON or XML with the users
        return logRepository.findAll();
    }




}
