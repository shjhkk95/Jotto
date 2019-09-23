package com.white.domain;

import javax.persistence.*;

@Entity
public class User {

    @Id
    private String username;

    /*@Version
    private Integer version;*/


    private String password;


    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword(){
        return this.password;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    /*public Integer getVersion(){
        return this.version;
    }*/

    /*public void setVersion(Integer version) {
        this.version = version;
    }*/
}
