package com.white.repositories;

import com.white.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface GameHistoryRepository extends CrudRepository<User, String> {
}
