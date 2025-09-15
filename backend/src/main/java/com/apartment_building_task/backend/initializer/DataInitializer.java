package com.apartment_building_task.backend.initializer;

import com.apartment_building_task.backend.model.*;
import com.apartment_building_task.backend.service.BuildingService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    private final BuildingService buildingService;
    private final Random random = new Random();

    public DataInitializer(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @Override
    public void run(String... args) {
        // Create building with requested temp = 25.0
        Building building = buildingService.createBuilding("1", 25.0);

        // Add Apartments 101 and 102
        buildingService.addApartment("1", new Apartment(getRandomTemp(), "101", "Owner 1"));
        buildingService.addApartment("1", new Apartment(getRandomTemp(), "102", "Owner 2"));

        // Add Gym and Library
        buildingService.addCommonRoom("1", new CommonRoom(getRandomTemp(), CommonRoom.CommonRoomType.GYM));
        buildingService.addCommonRoom("1", new CommonRoom(getRandomTemp(), CommonRoom.CommonRoomType.LIBRARY));

        // Recalculate heating/cooling statuses
        building.recalculateStatuses();
    }

    private double getRandomTemp() {
        double temp = 10 + (40 - 10) * random.nextDouble(); // between 10 and 40
        return Math.round(temp * 10) / 10.0; // round to one decimal place
    }
}
