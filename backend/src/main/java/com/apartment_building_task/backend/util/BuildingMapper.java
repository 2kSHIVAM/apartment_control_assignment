package com.apartment_building_task.backend.util;

import com.apartment_building_task.backend.dto.*;
import com.apartment_building_task.backend.model.*;

import java.util.List;
import java.util.stream.Collectors;

public class BuildingMapper {

    public static RoomDTO toRoomDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setId(room.getId());
        dto.setTemperature(room.getTemperature());
        dto.setHeatingEnabled(room.isHeatingEnabled());
        dto.setCoolingEnabled(room.isCoolingEnabled());

        if (room instanceof Apartment) {
            dto.setType("Apartment");
            dto.setOwnerName(((Apartment) room).getOwnerName());
        } else if (room instanceof CommonRoom) {
            dto.setType("CommonRoom");
            dto.setCommonRoomType(((CommonRoom) room).getType().name());
        }

        return dto;
    }

    public static BuildingDTO toBuildingDTO(Building building) {
        BuildingDTO dto = new BuildingDTO();
        dto.setId(building.getId());
        dto.setRequestedTemperature(building.getRequestedTemperature());
        List<RoomDTO> roomDTOs = building.getRooms().stream()
                .map(BuildingMapper::toRoomDTO)
                .collect(Collectors.toList());
        dto.setRooms(roomDTOs);
        return dto;
    }

    public static List<BuildingDTO> toBuildingDTOList(List<Building> buildings) {
        return buildings.stream()
                .map(BuildingMapper::toBuildingDTO)
                .collect(Collectors.toList());
    }

}
