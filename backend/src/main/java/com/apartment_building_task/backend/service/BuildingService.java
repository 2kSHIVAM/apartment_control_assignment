package com.apartment_building_task.backend.service;

import com.apartment_building_task.backend.model.*;

import java.util.List;

public interface BuildingService {
    Building createBuilding(String id, double requestedTemperature);
    Building getBuilding(String id);
    List<Building> getAllBuildings();
    void setRequestedTemperature(String buildingId, double temp);
    void addApartment(String buildingId, Apartment apartment);
    void addCommonRoom(String buildingId, CommonRoom room);
    void editApartment(String buildingId, String roomId, String ownerName, double temp);
    void editCommonRoom(String buildingId, String roomId, CommonRoom.CommonRoomType type, double temp);
    void removeRoom(String buildingId, String roomId);
    void deleteBuilding(String buildingId);

}
