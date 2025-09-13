package com.apartment_building_task.backend.dto;

import lombok.Data;

@Data
public class RoomDTO {
    private String id;
    private double temperature;
    private boolean heatingEnabled;
    private boolean coolingEnabled;
    private String type;      // "Apartment" or "CommonRoom"
    private String ownerName; // only for Apartment
    private String commonRoomType; // only for CommonRoom
    // Getters & setters
}
