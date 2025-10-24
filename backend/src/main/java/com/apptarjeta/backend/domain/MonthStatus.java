package com.apptarjeta.backend.domain;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.UUID;

public class MonthStatus {

    private UUID id;
    private YearMonth monthKey;
    private LocalDate startBilling;
    private LocalDate endBilling;
    private LocalDate idealStart;
    private LocalDate idealEnd;
    private LocalDate avoidStart;
    private LocalDate avoidEnd;
    private LocalDate dueDate;
    private boolean paid;

    public MonthStatus() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public YearMonth getMonthKey() {
        return monthKey;
    }

    public void setMonthKey(YearMonth monthKey) {
        this.monthKey = monthKey;
    }

    public LocalDate getStartBilling() {
        return startBilling;
    }

    public void setStartBilling(LocalDate startBilling) {
        this.startBilling = startBilling;
    }

    public LocalDate getEndBilling() {
        return endBilling;
    }

    public void setEndBilling(LocalDate endBilling) {
        this.endBilling = endBilling;
    }

    public LocalDate getIdealStart() {
        return idealStart;
    }

    public void setIdealStart(LocalDate idealStart) {
        this.idealStart = idealStart;
    }

    public LocalDate getIdealEnd() {
        return idealEnd;
    }

    public void setIdealEnd(LocalDate idealEnd) {
        this.idealEnd = idealEnd;
    }

    public LocalDate getAvoidStart() {
        return avoidStart;
    }

    public void setAvoidStart(LocalDate avoidStart) {
        this.avoidStart = avoidStart;
    }

    public LocalDate getAvoidEnd() {
        return avoidEnd;
    }

    public void setAvoidEnd(LocalDate avoidEnd) {
        this.avoidEnd = avoidEnd;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }
}
