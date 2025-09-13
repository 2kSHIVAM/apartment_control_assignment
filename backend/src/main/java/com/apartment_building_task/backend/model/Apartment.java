package com.apartment_building_task.backend.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

//@Data  //comment Data since it needed default constructor in parent
@Getter
@Setter
public class Apartment extends Room { //taking consideration that apartment is a room
    private String ownerName;

    public Apartment(double initialTemp, String ownerName) {
        super(initialTemp);
        this.ownerName = ownerName;
    }
}

