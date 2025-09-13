package com.apartment_building_task.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class BuildingDTO {
    private String id;
    private double requestedTemperature;
    private List<RoomDTO> rooms;
}

