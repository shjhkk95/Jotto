package com.white.domain;

import javax.persistence.*;

@Entity
public class GameHistory {

    @EmbeddedId
    private GameHistoryId id;

    @Embeddable
    public class GameHistoryId{
        int userID;
        int Date;
    }

}




