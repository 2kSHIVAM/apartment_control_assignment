package com.apartment_building_task.backend.controller;

import com.apartment_building_task.backend.dto.*;
import com.apartment_building_task.backend.model.*;
import com.apartment_building_task.backend.service.BuildingService;
import com.apartment_building_task.backend.util.BuildingMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    // constructor injection
    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BuildingDTO>> createBuilding(
            @Valid @RequestBody BuildingRequest request) {
        Building building = buildingService.createBuilding(request.getId(), request.getRequestedTemp());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Building created successfully",
                        BuildingMapper.toBuildingDTO(building)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BuildingDTO>> getBuilding(@PathVariable String id) {
        Building building = buildingService.getBuilding(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>("Success",
                        BuildingMapper.toBuildingDTO(building)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BuildingDTO>>> getAllBuildings() {
        List<Building> buildings = buildingService.getAllBuildings();
        List<BuildingDTO> buildingDTOs = BuildingMapper.toBuildingDTOList(buildings);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>("Success", buildingDTOs));
    }


    @PutMapping("/setTemperature")
    public ResponseEntity<?> setRequestedTemperature(@Valid @RequestBody BuildingRequest request) {
        buildingService.setRequestedTemperature(request.getId(), request.getRequestedTemp());
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Success", null));
    }

    @PostMapping("/{id}/apartments")
    public ResponseEntity<ApiResponse<Void>> addApartment(
            @PathVariable String id,
            @Valid @RequestBody ApartmentRequest request) {
        buildingService.addApartment(id, new Apartment(request.getTemp(), request.getOwnerName()));
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Apartment added successfully", null));
    }

    @PostMapping("/{id}/common-rooms")
    public ResponseEntity<ApiResponse<Void>> addCommonRoom(
            @PathVariable String id,
            @Valid @RequestBody CommonRoomRequest request) {
        CommonRoom.CommonRoomType type = CommonRoom.CommonRoomType.valueOf(request.getType().toUpperCase());
        buildingService.addCommonRoom(id, new CommonRoom(request.getTemp(), type));
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Common room added successfully", null));
    }
}

