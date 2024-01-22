package me.escoffier.demo;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

import java.util.List;
import java.util.stream.Collectors;

@Path("/reviews")
public class ReviewEndpoint {

    @Inject
    TriageAi ai;

    public record Review(String customerId, String review) {}

    @POST
    @Transactional
    public TriagedReview triage(Review review) {
        var sentiment = ai.triage(review.review());
        var triaged = new TriagedReview();
        triaged.review = review.review();
        triaged.customerId = review.customerId();
        triaged.sentiment = TriagedReview.Sentiment.from(sentiment);

        triaged.persist();
        return triaged;
    }

    @GET
    public List<TriagedReview> getAllTriagedReviews() {
        return TriagedReview.<TriagedReview>streamAll().limit(5).collect(Collectors.toList());
    }

}
