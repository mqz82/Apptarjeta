package com.apptarjeta.backend.dto;

import com.apptarjeta.backend.domain.Purchase;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class PurchaseRequest {

    @NotNull
    private LocalDate date;

    @NotBlank
    private String merchant;

    @Min(1)
    private long amount;

    @Min(1)
    private int installments;

    @NotNull
    private Purchase.Type type;

    private boolean paid;

    private String notes;

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

    public Purchase.Type getType() {
        return type;
    }

    public void setType(Purchase.Type type) {
        this.type = type;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
