package com.apptarjeta.backend.dto;

import jakarta.validation.constraints.NotNull;

public class SetPaidRequest {

    @NotNull
    private Boolean paid;

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }
}
