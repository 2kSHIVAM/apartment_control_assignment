package com.apartment_building_task.backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BuildingTest {

    @Test
    void shouldAddRoomToBuilding() {
        Building building = new Building("B1", 25);
        Apartment apt = new Apartment(20, "Alice");
        building.addRoom(apt);

        assertEquals(1, building.getRooms().size());
        assertEquals("Alice", ((Apartment) building.getRooms().get(0)).getOwnerName());
    }

    @Test
    void shouldRemoveRoomFromBuilding() {
        Building building = new Building("B1", 25);
        Apartment apt = new Apartment(20, "Bob");
        building.addRoom(apt);

        building.removeRoom(apt.getId());
        assertEquals(0, building.getRooms().size());
    }
}
