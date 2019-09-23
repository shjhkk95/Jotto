package com.white.demo.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfigurer implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/game").setViewName("game");
        registry.addViewController("/menu").setViewName("menu");
        registry.addViewController("/game/history").setViewName("history");
        registry.addViewController("/history_game").setViewName("history_game");
    }

}
