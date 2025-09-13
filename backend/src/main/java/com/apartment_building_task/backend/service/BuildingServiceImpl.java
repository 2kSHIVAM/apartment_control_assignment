package com.apartment_building_task.backend.service;

import com.apartment_building_task.backend.exception.BuildingAlreadyExistsException;
import com.apartment_building_task.backend.exception.BuildingNotFoundException;
import com.apartment_building_task.backend.exception.RoomNotFoundException;
import com.apartment_building_task.backend.model.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BuildingServiceImpl implements BuildingService {

    // here we are using in memory space to store data, when scaling it we can integrate db like postgres
    private final Map<String, Building> buildingStore = new HashMap<>();

//    Used to create a building
    @Override
    public Building createBuilding(String id, double requestedTemperature) {
        if (buildingStore.containsKey(id)) {
            throw new BuildingAlreadyExistsException(id);
        }
        Building building = new Building(id, requestedTemperature);
        buildingStore.put(id, building);
        return building;
    }

//    Used to fetch a building based on id
    @Override
    public Building getBuilding(String id) {
        Building building = buildingStore.get(id);
        if (building == null) {
            throw new BuildingNotFoundException(id);
        }
        return building;
    }

    @Override
    public List<Building> getAllBuildings(){ return buildingStore.values().stream().toList(); }

//    Used to update the requested temperature of a building
    @Override
    public void setRequestedTemperature(String buildingId, double temp) {
        Building b = getBuilding(buildingId);
        if (b != null) {
            b.setRequestedTemperature(temp);
        } else{
            throw new BuildingNotFoundException(buildingId);
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

    @Override
    public void editApartment(String buildingId, String roomId, String ownerName, double temp) {
        Building building = getBuilding(buildingId);
        Apartment apt = (Apartment) building.findRoom(roomId);
        if (apt == null) throw new RoomNotFoundException(roomId);
        apt.setOwnerName(ownerName);
        apt.setTemperature(temp);
        building.recalculateStatuses();
    }

    @Override
    public void editCommonRoom(String buildingId, String roomId, CommonRoom.CommonRoomType type, double temp) {
        Building building = getBuilding(buildingId);
        CommonRoom room = (CommonRoom) building.findRoom(roomId);
        if (room == null) throw new RoomNotFoundException(roomId);
        room.setType(type);
        room.setTemperature(temp);
        building.recalculateStatuses();
    }

    @Override
    public void removeRoom(String buildingId, String roomId) {
        Building building = getBuilding(buildingId);
        if (building.findRoom(roomId) == null) throw new RoomNotFoundException(roomId);
        building.removeRoom(roomId);
    }

    @Override
    public void deleteBuilding(String buildingId) {
        if (!buildingStore.containsKey(buildingId)) throw new BuildingNotFoundException(buildingId);
        buildingStore.remove(buildingId);
    }

}
