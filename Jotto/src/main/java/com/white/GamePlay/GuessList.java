package com.white.GamePlay;

import javax.validation.Valid;
import java.util.Iterator;
import java.util.List;

public class GuessList {
    List<ValidWord> guessList;

    public List<ValidWord> getGuessList() {
        return guessList;
    }

    public void addGuessList(ValidWord word){
        guessList.add(word);
    }
}
