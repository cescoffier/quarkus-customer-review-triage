# Quarkus, Langchain4J, OpenShift AI - All together

This is a demo project to show how to use Quarkus, Langchain4J (through quarkus-langchain4j) and OpenShift AI together.

## Requirements

Make sure you have deployed your model on OpenShift AI. This demo uses mistra-7b, and is served using the caikit model server.
Then, open the `application.properties` file and change the base url and model id properties to match your model server URL and model.

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```
./mvnw quarkus:dev
```

Then, open your browser to `http://localhost:8080`.


