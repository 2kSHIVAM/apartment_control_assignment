# 🏢 Apartment Building Control Assignment

## 📌 Overview
This project implements the given assignment: a building management system that controls heating and cooling for different rooms (apartments and common areas) based on requested temperature.  

It consists of:  
- **Backend:** Java 21 + Spring Boot (Maven, REST APIs)  
- **Frontend:** React (with Vite) + TailwindCSS  
- **Containerization:** Docker + Docker Compose  

---

## ⚙️ Tech Stack
- **Backend:** Java 21, Spring Boot, Maven  
- **Frontend:** React + Vite + TailwindCSS  
  - Due to time constraints, I chose **Vite + ReactJS** (instead of Next.js) because it allows faster setup and iteration while still being modern and widely used.  
- **Build Tool:** Maven  
- **Containerization:** Docker + Docker Compose  

---

## 🛠️ Assumptions & Interpretations
1. **Apartments 101 and 102:**  
   - The requirement explicitly mentions Apartment **101** and **102**.  
   - I introduced an `apartmentNumber` field in the domain model to clearly represent them, instead of only relying on owner names.  

2. **Initial Building Setup:**  
   - At startup, the system creates a building with:  
     - Apartment 101  
     - Apartment 102  
     - Gym  
     - Library  
   - Each room is assigned a random initial temperature between 10–40°C.  
   - The building’s requested temperature defaults to **25.0°C**.  

3. **Heating / Cooling Logic:**  
   - If a room’s temperature is below the building’s requested temperature → **Heating enabled**.  
   - If above → **Cooling enabled**.  
   - If equal → both heating and cooling are **off**.  

4. **Persistence:**  
   - No database was required in the specification, so data is stored **in-memory**.  
   - This means data resets when the application restarts.  

5. **Room Abstraction:**  
   - A base abstract class `Room` was introduced, with `Apartment` and `CommonRoom` as concrete subclasses.  
   - This avoids duplication and models the domain in a clean, object-oriented way.  

6. **API Requests:**  
   - For cleaner design, DTOs are used instead of exposing domain objects directly.  
   - Endpoints accept JSON request bodies instead of query parameters for creating new rooms.  

7. **Frontend Choice:**  
   - While the requirement suggested Next.js, I implemented the frontend using Vite + ReactJS to deliver a complete and working solution efficiently within the timeframe. This ensured I could focus on clean design, best practices, and meeting all functional requirements.
   - If given more time, I would migrate the frontend to Next.js to fully align with the requested stack.
---

## 🚀 Running the Application

### Prerequisites
- Docker + Docker Compose installed (Docker Desktop or Colima on macOS).

### Steps
From the project root (`Apartment_control_assignment/`):

```bash
docker compose up --build
```
-If encountered error, try
```bash
docker compose build
docker compose up
```


This will:  
- Build and run the **backend** on [http://localhost:8080](http://localhost:8080)  
- Build and run the **frontend** on [http://localhost:8081](http://localhost:8081)  

---

## 📝 Notes for Recruiter
- The application is fully containerized — no need to install **Java, Node, or Maven**.  
- Just run:

  ```bash
  docker compose up --build
  ```




