package com.apartment_building_task.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuildingRequest {
    @NotBlank(message = "Building id cannot be blank")
    private String id;

    @Positive(message = "Requested temperature must be positive")
    private double requestedTemp;

}
