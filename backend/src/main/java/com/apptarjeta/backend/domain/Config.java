package com.apptarjeta.backend.domain;

public class Config {

    private long cupo;
    private int diaCierre;
    private int diaPago;

    public Config() {
    }

    public Config(long cupo, int diaCierre, int diaPago) {
        this.cupo = cupo;
        this.diaCierre = diaCierre;
        this.diaPago = diaPago;
    }

    public long getCupo() {
        return cupo;
    }

    public void setCupo(long cupo) {
        this.cupo = cupo;
    }

    public int getDiaCierre() {
        return diaCierre;
    }

    public void setDiaCierre(int diaCierre) {
        this.diaCierre = diaCierre;
    }

    public int getDiaPago() {
        return diaPago;
    }

    public void setDiaPago(int diaPago) {
        this.diaPago = diaPago;
    }
}
