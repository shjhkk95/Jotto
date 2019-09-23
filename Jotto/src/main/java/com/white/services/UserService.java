package com.white.services;

import com.white.domain.User;

public interface UserService {
    Iterable<User> listAllUsers();

    User getUserByID(Integer id);

    User saveUser(User user);

}

