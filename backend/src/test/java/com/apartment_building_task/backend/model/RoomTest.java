package com.apartment_building_task.backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RoomTest {

    @Test
    void heatingShouldBeEnabledWhenRoomTempIsBelowRequested() {
        Room room = new Apartment(18, "User1");
        room.updateStatus(25, 0.5);
        assertTrue(room.isHeatingEnabled());
        assertFalse(room.isCoolingEnabled());
    }

    @Test
    void coolingShouldBeEnabledWhenRoomTempIsAboveRequested() {
        Room room = new Apartment(30, "User12");
        room.updateStatus(25, 0.5);
        assertFalse(room.isHeatingEnabled());
        assertTrue(room.isCoolingEnabled());
    }

    @Test
    void neitherHeatingNorCoolingWithinTolerance() {
        Room room = new Apartment(25, "User1");
        room.updateStatus(25, 0.5);
        assertFalse(room.isHeatingEnabled());
        assertFalse(room.isCoolingEnabled());
    }

    @Test
    void heatingShouldBeOffWhenExactlyAtLowerToleranceLimit() {
        Room room = new Apartment(24.6, "User2"); // requested=25, tolerance=0.5
        room.updateStatus(25, 0.5);
        assertFalse(room.isHeatingEnabled());
        assertFalse(room.isCoolingEnabled());
    }

    @Test
    void coolingShouldBeOffWhenExactlyAtUpperToleranceLimit() {
        Room room = new Apartment(25.4, "User3"); // requested=25, tolerance=0.5
        room.updateStatus(25, 0.5);
        assertFalse(room.isHeatingEnabled());
        assertFalse(room.isCoolingEnabled());
    }

    @Test
    void heatingAndCoolingShouldBeOffWhenRequestedTemperatureChanges() {
        Room room = new Apartment(20, "User4");
        room.updateStatus(20, 0.5);
        assertFalse(room.isHeatingEnabled());
        assertFalse(room.isCoolingEnabled());

        // Change requested temp
        room.updateStatus(19.5, 0.5);
        assertFalse(room.isHeatingEnabled()); // within tolerance
        assertFalse(room.isCoolingEnabled());
    }

    @Test
    void roomTemperatureCanBeUpdatedManually() {
        Apartment room = new Apartment(22, "Admin");
        assertEquals(22, room.getTemperature());

        room.setTemperature(28);
        assertEquals(28, room.getTemperature());
    }

    @Test
    void roomHasUniqueId() {
        Room room1 = new Apartment(20, "User2");
        Room room2 = new Apartment(21, "User3");

        assertNotEquals(room1.getId(), room2.getId()); // each room should have unique id
    }

    @Test
    void commonRoomShouldHaveTypeAssigned() {
        CommonRoom room = new CommonRoom(22, CommonRoom.CommonRoomType.GYM);
        assertEquals(CommonRoom.CommonRoomType.GYM, room.getType());
    }

    @Test
    void commonRoomTypeCanBeUpdated() {
        CommonRoom room = new CommonRoom(22, CommonRoom.CommonRoomType.LIBRARY);
        room.setType(CommonRoom.CommonRoomType.LAUNDRY);
        assertEquals(CommonRoom.CommonRoomType.LAUNDRY, room.getType());
    }

    @Test
    void heatingShouldBeEnabledForCommonRoom() {
        Room room = new CommonRoom(15, CommonRoom.CommonRoomType.LIBRARY);
        room.updateStatus(25, 0.5);
        assertTrue(room.isHeatingEnabled());
        assertFalse(room.isCoolingEnabled());
    }

    @Test
    void coolingShouldBeEnabledForCommonRoom() {
        Room room = new CommonRoom(35, CommonRoom.CommonRoomType.GYM);
        room.updateStatus(25, 0.5);
        assertFalse(room.isHeatingEnabled());
        assertTrue(room.isCoolingEnabled());
    }
}
