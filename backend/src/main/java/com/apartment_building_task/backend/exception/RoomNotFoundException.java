package com.apartment_building_task.backend.exception;

public class RoomNotFoundException extends RuntimeException {
    public RoomNotFoundException(String id) {
        super("Room with id '" + id + "' not found");
    }
}

