package com.username918r818.lab3;

import java.io.Serializable;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

@Named("exampleBean")
@SessionScoped
public class ExampleBean implements Serializable {
 
    private String name = "Александр";
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }

    public void sayHi() {
        this.name = this.name + "123";
    }
}