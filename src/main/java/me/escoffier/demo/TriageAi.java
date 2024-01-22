package me.escoffier.demo;

import dev.langchain4j.service.UserMessage;
import io.quarkiverse.langchain4j.RegisterAiService;
import io.smallrye.faulttolerance.api.RateLimit;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.faulttolerance.Timeout;

import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

@RegisterAiService
public interface TriageAi {

    @UserMessage("""
            [INST] Instructions: Analyze the review and determine if it is positive or negative.
            
            ---
            {review}
            ---
                        
            If the review is positive, say:'POSITIVE', otherwise:'NEGATIVE'.
            Don't add any other text.
            [/INST]
            """)
    @Timeout(value = 1, unit = ChronoUnit.MINUTES)
    @Retry(maxRetries = 2, delay = 1, delayUnit =ChronoUnit.SECONDS)
    @RateLimit(value = 1, window = 2, windowUnit = ChronoUnit.SECONDS)
    @Fallback(fallbackMethod = "fallback")
    String triage(String review);

    static String fallback(String review) {
        return "NEGATIVE";
    }

}
