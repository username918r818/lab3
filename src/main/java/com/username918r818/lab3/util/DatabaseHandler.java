package com.username918r818.lab3.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

import java.util.ArrayList;
import java.util.Vector;



public class DatabaseHandler {

    private static final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    private static final EntityManager entityManager = entityManagerFactory.createEntityManager();

    public static void insertPoint(Point point) {
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        entityManager.persist(point);
        transaction.commit();
    }

    public static ArrayList<Point> getPoints() {
        Vector<Point> points = (Vector<Point>) entityManager.createQuery("SELECT p FROM Point p", Point.class).getResultList();
        return new ArrayList<>(points);
    }

    public static void removePoint(Point point) {
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        entityManager.remove(entityManager.find(Point.class, point.getId()));
        transaction.commit();
    }

    public static void merge(ArrayList<Point> points) {
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        for (Point point : points) {
            entityManager.merge(point);
        }
        transaction.commit();
    }

    public static void clearPoints() {
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        entityManager.createQuery("DELETE FROM Point p").executeUpdate();
        transaction.commit();
    }

    public static void close() {
        entityManager.close();
        entityManagerFactory.close();
    }

}

