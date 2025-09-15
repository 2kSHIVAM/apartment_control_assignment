package com.apartment_building_task.backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonRoom extends Room { // taking consideration that common room is a room
    public enum CommonRoomType { GYM, LIBRARY, LAUNDRY }
    private CommonRoomType type;

    public CommonRoom(double initialTemp, CommonRoomType type) {
        super(initialTemp);
        this.type = type;
    }
}

