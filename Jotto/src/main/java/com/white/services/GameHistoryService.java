package com.white.services;

import com.white.domain.GameHistory;

public interface GameHistoryService {
    Iterable<GameHistory> listAllGameHistory();

    GameHistory getGameHistoryByID(GameHistory.GameHistoryId id);

    GameHistory saveGameHistory(GameHistory gameHistory);

}
