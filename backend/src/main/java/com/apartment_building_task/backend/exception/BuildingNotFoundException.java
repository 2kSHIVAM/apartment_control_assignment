package com.apartment_building_task.backend.exception;

public class BuildingNotFoundException extends RuntimeException {
    public BuildingNotFoundException(String id) {
        super("Building with id '" + id + "' not found");
    }
}