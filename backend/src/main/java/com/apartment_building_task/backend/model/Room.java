package com.apartment_building_task.backend.model;

import lombok.Data;

import java.util.UUID;

@Data
public abstract class Room {
    protected String id;
    protected double temperature;
    protected boolean heatingEnabled;
    protected boolean coolingEnabled;

    public Room(double initialTemp) {
        this.id = UUID.randomUUID().toString();
        this.temperature = initialTemp;
    }

    public void updateStatus(double requestedTemp, double tolerance) {
        if (Math.abs(temperature - requestedTemp) <= tolerance) {
            heatingEnabled = false;
            coolingEnabled = false;
        } else if (temperature < requestedTemp) {
            heatingEnabled = true;
            coolingEnabled = false;
        } else {
            heatingEnabled = false;
            coolingEnabled = true;
        }
    }
}
