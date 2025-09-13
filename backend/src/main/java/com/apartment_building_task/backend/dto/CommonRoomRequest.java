package com.apartment_building_task.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonRoomRequest {
    @NotBlank(message = "Common room type cannot be blank")
    private String type;

    @Positive(message = "Temperature must be positive")
    private double temp;
}

