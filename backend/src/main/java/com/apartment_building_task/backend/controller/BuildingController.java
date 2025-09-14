package com.apartment_building_task.backend.controller;

import com.apartment_building_task.backend.dto.*;
import com.apartment_building_task.backend.model.*;
import com.apartment_building_task.backend.service.BuildingService;
import com.apartment_building_task.backend.util.BuildingMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
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


    @PutMapping("/{id}/apartments/{roomId}")
    public ResponseEntity<ApiResponse<Void>> editApartment(
            @PathVariable String id, @PathVariable String roomId,
            @RequestBody ApartmentRequest req) {
        buildingService.editApartment(id, roomId, req.getOwnerName(), req.getTemp());
        return ResponseEntity.ok(new ApiResponse<>("Apartment updated successfully", null));
    }

    @PutMapping("/{id}/common-rooms/{roomId}")
    public ResponseEntity<ApiResponse<Void>> editCommonRoom(
            @PathVariable String id, @PathVariable String roomId,
            @RequestBody CommonRoomRequest req) {
        buildingService.editCommonRoom(id, roomId, CommonRoom.CommonRoomType.valueOf(req.getType().toUpperCase()), req.getTemp());
        return ResponseEntity.ok(new ApiResponse<>("Common room updated successfully", null));
    }

    @DeleteMapping("/{id}/rooms/{roomId}")
    public ResponseEntity<ApiResponse<Void>> deleteRoom(
            @PathVariable String id, @PathVariable String roomId) {
        buildingService.removeRoom(id, roomId);
        return ResponseEntity.ok(new ApiResponse<>("Room deleted successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBuilding(@PathVariable String id) {
        buildingService.deleteBuilding(id);
        return ResponseEntity.ok(new ApiResponse<>("Building deleted successfully", null));
    }

    @GetMapping("/common-room-types")
    public ResponseEntity<ApiResponse<List<String>>> getCommonRoomTypes() {
        List<String> types = Arrays.stream(CommonRoom.CommonRoomType.values())
                .map(Enum::name)
                .toList();
        return ResponseEntity.ok(new ApiResponse<>("Success", types));
    }

}

