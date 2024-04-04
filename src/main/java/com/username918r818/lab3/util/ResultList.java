package com.username918r818.lab3.util;

import java.util.ArrayList;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;

@SessionScoped
@Named("resultList")
public class ResultList implements Serializable {
    private static long serialVersionUID = 1L;
    Point tmpPoint = new Point(0, 0, 0, false);
    ArrayList<Point> points = new ArrayList<Point>();

    public void insertR(double r) {
        tmpPoint.setR(r);
        tmpPoint.setInside(isInside(tmpPoint.getX(), tmpPoint.getY(), r));
        var newPoint = new Point(serialVersionUID, tmpPoint.getX(), tmpPoint.getY(), r, tmpPoint.isInside());
        points.add(newPoint);
        DatabaseHandler.insertPoint(newPoint);
        serialVersionUID++;
    }

    public void insertPoint(double x, double y, double r) {
        Point point = new Point(tmpPoint.getX(), tmpPoint.getY(), tmpPoint.getR(), tmpPoint.isInside());
        if (isInside(x, y, r)) {
            point.setInside(true);
        } else {
            point.setInside(false);
        }
        points.add(point);
        DatabaseHandler.insertPoint(point);
    }

    private boolean isInside(double x, double y, double r) {
        return x * x + y * y <= r;
    }

    public ArrayList<Point> getPoints() {
        this.points = DatabaseHandler.getPoints();
        if (this.points == null) {
            this.points = new ArrayList<Point>();
        }
        return points;
    }
    public void setPoints(ArrayList<Point> points) {
        this.points = points;
    }
    public Point getTmpPoint() {
        return tmpPoint;
    }
    public void setTmpPoint(Point tmpPoint) {
        this.tmpPoint = tmpPoint;
    }
}
