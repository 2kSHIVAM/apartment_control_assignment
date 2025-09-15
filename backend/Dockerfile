# Stage 1: Build with Maven and Run Tests
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copy pom and resolve dependencies first (for layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline
# Copy rest of the source code
COPY src ./src
# Run full build with tests (will fail if any test fails)
RUN mvn clean package

# Stage 2: Run with JDK
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
