package com.username918r818.lab3.util;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "Point")
@Table(name = "point")
public class Point {
    @Id
    @Column(name = "id")
    private long id = 0;
    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Column(name = "is_inside")
    private boolean isInside;

    public Point() {
    }

    public Point(double x, double y, double r, boolean isInside) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isInside = isInside;
    }

    public Point(long id, double x, double y, double r, boolean isInside) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isInside = isInside;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isInside() {
        return isInside;
    }

    public void setInside(boolean isInside) {
        this.isInside = isInside;
    }

    @Id
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
