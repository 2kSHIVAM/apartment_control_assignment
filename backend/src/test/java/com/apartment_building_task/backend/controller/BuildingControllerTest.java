package com.apartment_building_task.backend.controller;

import com.apartment_building_task.backend.dto.BuildingRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BuildingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // JSON <-> Java

    @Test
    void shouldCreateBuilding() throws Exception {
        BuildingRequest request = new BuildingRequest();
        request.setId("B1");
        request.setRequestedTemp(25);

        mockMvc.perform(post("/api/buildings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Building created successfully"))
                .andExpect(jsonPath("$.data.id").value("B1"))
                .andExpect(jsonPath("$.data.requestedTemperature").value(25.0));
    }
}
