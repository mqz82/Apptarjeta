package com.apptarjeta.backend.service;

import com.apptarjeta.backend.domain.Purchase;
import com.apptarjeta.backend.repository.JsonFileRepository;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService {

    private final JsonFileRepository<Purchase> repository;

    public PurchaseService(@Qualifier("purchaseRepository") JsonFileRepository<Purchase> repository) {
        this.repository = repository;
    }

    public List<Purchase> findAll() {
        return repository.findAll();
    }

    public Purchase create(Purchase purchase) {
        purchase.setId(UUID.randomUUID());
        if (purchase.getDate() == null) {
            purchase.setDate(LocalDate.now());
        }
        purchase.setMonthKey(YearMonth.from(purchase.getDate()));
        List<Purchase> purchases = repository.findAll();
        purchases = new java.util.ArrayList<>(purchases);
        purchases.add(purchase);
        repository.saveAll(purchases);
        return purchase;
    }

    public Purchase update(UUID id, Purchase updated) {
        List<Purchase> purchases = new java.util.ArrayList<>(repository.findAll());
        for (int i = 0; i < purchases.size(); i++) {
            if (purchases.get(i).getId().equals(id)) {
                updated.setId(id);
                if (updated.getDate() != null) {
                    updated.setMonthKey(YearMonth.from(updated.getDate()));
                }
                purchases.set(i, updated);
                repository.saveAll(purchases);
                return updated;
            }
        }
        throw new IllegalArgumentException("Purchase not found");
    }

    public void delete(UUID id) {
        List<Purchase> purchases = new java.util.ArrayList<>(repository.findAll());
        purchases.removeIf(p -> p.getId().equals(id));
        repository.saveAll(purchases);
    }

    public Purchase setPaid(UUID id, boolean paid) {
        List<Purchase> purchases = new java.util.ArrayList<>(repository.findAll());
        for (int i = 0; i < purchases.size(); i++) {
            Purchase current = purchases.get(i);
            if (current.getId().equals(id)) {
                current.setPaid(paid);
                purchases.set(i, current);
                repository.saveAll(purchases);
                return current;
            }
        }
        throw new IllegalArgumentException("Purchase not found");
    }
}
