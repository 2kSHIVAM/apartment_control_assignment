package com.apartment_building_task.backend.exception;

public class BuildingAlreadyExistsException extends RuntimeException {
    public BuildingAlreadyExistsException(String id) {
        super("Building with id '" + id + "' already exists");
    }
}
