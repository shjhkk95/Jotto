package com.white.bootstrap;

import com.white.domain.User;
import com.white.repositories.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;


@Component
public class UserLoader implements ApplicationListener<ContextRefreshedEvent> {

    private UserRepository userRepository;

    private Logger log = LogManager.getLogger(UserLoader.class);

    @Autowired
    public void setProductRepository(UserRepository productRepository) {
        this.userRepository = productRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        User newUser = new User();
        newUser.setUsername("tvetere");
        newUser.setPassword("password");
        userRepository.save(newUser);

        log.info("Saved User - username: " + newUser.getUsername());

    }
}