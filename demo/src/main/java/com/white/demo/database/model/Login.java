package com.white.demo.database.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity // This tells Hibernate to make a table out of this class
public class Login {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int loginID;

    //private String username;

    private String email;

    private String password;

    //public String getUser_name(){return username;}
    public int getLoginID(){ return loginID;}
    public String getEmail(){
        return email;
    }

    public String getPassword(){
        return password;
    }

   // public void setUsername(String username){ this.username = username; }

    public void setLoginID(int loginID){this.loginID = loginID;}

    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }

}