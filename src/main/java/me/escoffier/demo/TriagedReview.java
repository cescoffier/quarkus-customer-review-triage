package me.escoffier.demo;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class TriagedReview extends PanacheEntity {

    public String customerId;
    public String review   ;

    public Sentiment sentiment;


    public enum Sentiment {
        POSITIVE,
        NEGATIVE;

        static Sentiment from(String sentiment) {
            if (sentiment.trim().toUpperCase().contains("POSITIVE")) {
                return POSITIVE;
            } else {
                return NEGATIVE;
            }
        }
    }

}
