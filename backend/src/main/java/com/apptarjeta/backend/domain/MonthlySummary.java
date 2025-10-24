package com.apptarjeta.backend.domain;

import java.time.YearMonth;

public class MonthlySummary {

    private YearMonth monthKey;
    private long totalSpent;
    private long cupo;
    private double usageRatio;
    private long points;
    private String trafficLight;

    public MonthlySummary() {
    }

    public MonthlySummary(YearMonth monthKey, long totalSpent, long cupo, double usageRatio, long points,
            String trafficLight) {
        this.monthKey = monthKey;
        this.totalSpent = totalSpent;
        this.cupo = cupo;
        this.usageRatio = usageRatio;
        this.points = points;
        this.trafficLight = trafficLight;
    }

    public YearMonth getMonthKey() {
        return monthKey;
    }

    public void setMonthKey(YearMonth monthKey) {
        this.monthKey = monthKey;
    }

    public long getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(long totalSpent) {
        this.totalSpent = totalSpent;
    }

    public long getCupo() {
        return cupo;
    }

    public void setCupo(long cupo) {
        this.cupo = cupo;
    }

    public double getUsageRatio() {
        return usageRatio;
    }

    public void setUsageRatio(double usageRatio) {
        this.usageRatio = usageRatio;
    }

    public long getPoints() {
        return points;
    }

    public void setPoints(long points) {
        this.points = points;
    }

    public String getTrafficLight() {
        return trafficLight;
    }

    public void setTrafficLight(String trafficLight) {
        this.trafficLight = trafficLight;
    }
}
