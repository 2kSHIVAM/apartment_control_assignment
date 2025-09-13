package com.apartment_building_task.backend.scheduler;

import com.apartment_building_task.backend.service.BuildingService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class BuildingScheduler {
    private final BuildingService buildingService;

    public BuildingScheduler(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @Scheduled(fixedRate = 5000)
    public void updateRooms() {
        buildingService.getAllBuildings().forEach(b -> {
            b.getRooms().forEach(r -> {
                if (r.isHeatingEnabled()) r.setTemperature(r.getTemperature() + 0.5);
                else if (r.isCoolingEnabled()) r.setTemperature(r.getTemperature() - 0.5);
            });
            b.recalculateStatuses();
        });
    }
}
