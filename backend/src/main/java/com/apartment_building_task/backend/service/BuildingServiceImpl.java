package com.apartment_building_task.backend.service;

import com.apartment_building_task.backend.model.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BuildingServiceImpl implements BuildingService {

    // here we are using in memory space to store data, when scaling it we can integrate db like postgres
    private final Map<String, Building> buildingStore = new HashMap<>();

//    Used to create a building
    @Override
    public Building createBuilding(String id, double requestedTemperature) {
        Building building = new Building(id, requestedTemperature);
        buildingStore.put(id, building);
        return building;
    }

//    Used to fetch a building based on id
    @Override
    public Building getBuilding(String id) {
        return buildingStore.get(id);
    }

//    Used to update the requested temperature of a building
    @Override
    public void setRequestedTemperature(String buildingId, double temp) {
        Building b = getBuilding(buildingId);
        if (b != null) {
            b.setRequestedTemperature(temp);
            b.recalculateStatuses();
        }
    }

//    Used to add apartment in a building
    @Override
    public void addApartment(String buildingId, Apartment apartment) {
        Building b = getBuilding(buildingId);
        if (b != null) b.addRoom(apartment);
    }

//    Used to add common rooms in a building
    @Override
    public void addCommonRoom(String buildingId, CommonRoom room) {
        Building b = getBuilding(buildingId);
        if (b != null) b.addRoom(room);
    }
}
