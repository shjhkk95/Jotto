package com.white.demo.database.Repositories;

import com.white.demo.database.model.Game;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface GameRepository extends CrudRepository<Game, Integer> {
    List<Game> findByplayer1(String gameID);
}