package com.white.demo.database.Repositories;

import com.white.demo.database.model.GameLog;

import org.springframework.data.repository.CrudRepository;



// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface GameLogRepository extends CrudRepository<GameLog, Integer> {

}

