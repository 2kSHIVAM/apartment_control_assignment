package com.apartment_building_task.backend.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
public class Building {
    private final String id;
    private double requestedTemperature;
    private final double tolerance = 0.5;

    @Getter(AccessLevel.NONE) // Lombok will not generate getter for this
    private final List<Room> rooms = new ArrayList<>();

    public Building(String id, double requestedTemperature) {
        this.id = id;
        this.requestedTemperature = requestedTemperature;
    }

    public void addRoom(Room room) {
        rooms.add(room);
    }

    public void recalculateStatuses() {
        rooms.forEach(r -> r.updateStatus(requestedTemperature, tolerance));
    }

    public void setRequestedTemperature(double requestedTemperature) {
        this.requestedTemperature = requestedTemperature;
        recalculateStatuses();
    }

    public List<Room> getRooms() {
        return Collections.unmodifiableList(rooms); // safe exposure
    }
}
