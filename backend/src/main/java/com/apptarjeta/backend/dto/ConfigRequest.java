package com.apptarjeta.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ConfigRequest {

    @Min(10000)
    private Long cupo;

    @NotNull
    @Min(1)
    @Max(31)
    private Integer diaCierre;

    @NotNull
    @Min(1)
    @Max(31)
    private Integer diaPago;

    public Long getCupo() {
        return cupo;
    }

    public void setCupo(Long cupo) {
        this.cupo = cupo;
    }

    public Integer getDiaCierre() {
        return diaCierre;
    }

    public void setDiaCierre(Integer diaCierre) {
        this.diaCierre = diaCierre;
    }

    public Integer getDiaPago() {
        return diaPago;
    }

    public void setDiaPago(Integer diaPago) {
        this.diaPago = diaPago;
    }
}
