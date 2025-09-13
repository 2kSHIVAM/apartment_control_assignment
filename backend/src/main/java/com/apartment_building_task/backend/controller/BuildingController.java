package com.apartment_building_task.backend.controller;

import com.apartment_building_task.backend.model.*;
import com.apartment_building_task.backend.service.BuildingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    // constructor injection
    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @PostMapping
    public Building createBuilding(@RequestParam String id, @RequestParam double requestedTemp) {
        return buildingService.createBuilding(id, requestedTemp);
    }

    @GetMapping("/{id}")
    public Building getBuilding(@PathVariable String id) {
        return buildingService.getBuilding(id);
    }

    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    @PutMapping("/{id}/temperature")
    public void setRequestedTemperature(@PathVariable String id, @RequestParam double temp) {
        buildingService.setRequestedTemperature(id, temp);
    }

    @PostMapping("/{id}/apartments")
    public void addApartment(@PathVariable String id, @RequestParam String ownerName, @RequestParam double temp) {
        buildingService.addApartment(id, new Apartment(temp, ownerName));
    }

    @PostMapping("/{id}/common-rooms")
    public void addCommonRoom(@PathVariable String id, @RequestParam String type, @RequestParam double temp) {
        CommonRoom.CommonRoomType roomType = CommonRoom.CommonRoomType.valueOf(type.toUpperCase());
        buildingService.addCommonRoom(id, new CommonRoom(temp, roomType));
    }
}

