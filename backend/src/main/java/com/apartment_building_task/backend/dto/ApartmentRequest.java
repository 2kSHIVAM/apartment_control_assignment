package com.apartment_building_task.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApartmentRequest {
    @NotBlank(message = "Owner name cannot be blank")
    private String ownerName;

    @Positive(message = "Temperature must be positive")
    private double temp;
}