package com.apptarjeta.backend.domain;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.UUID;

public class Purchase {

    public enum Type {
        NATIONAL,
        INTERNATIONAL
    }

    private UUID id;
    private LocalDate date;
    private String merchant;
    private long amount;
    private int installments;
    private Type type;
    private boolean paid;
    private YearMonth monthKey;
    private String notes;

    public Purchase() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public int getInstallments() {
        return installments;
    }

    public void setInstallments(int installments) {
        this.installments = installments;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public YearMonth getMonthKey() {
        return monthKey;
    }

    public void setMonthKey(YearMonth monthKey) {
        this.monthKey = monthKey;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
