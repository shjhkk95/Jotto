package jotto;

import org.springframework.data.annotation.Id;

public class User {

    @Id
    public String email;

    public String name;



}
