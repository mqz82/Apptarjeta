package com.apptarjeta.backend.controller;

import com.apptarjeta.backend.domain.Purchase;
import com.apptarjeta.backend.dto.PurchaseRequest;
import com.apptarjeta.backend.dto.SetPaidRequest;
import com.apptarjeta.backend.service.PurchaseService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping
    public List<Purchase> findAll() {
        return purchaseService.findAll();
    }

    @PostMapping
    public ResponseEntity<Purchase> create(@Valid @RequestBody PurchaseRequest request) {
        Purchase purchase = toPurchase(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(purchaseService.create(purchase));
    }

    @PutMapping("/{id}")
    public Purchase update(@PathVariable UUID id, @Valid @RequestBody PurchaseRequest request) {
        Purchase purchase = toPurchase(request);
        return purchaseService.update(id, purchase);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        purchaseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/paid")
    public Purchase markPaid(@PathVariable UUID id, @Valid @RequestBody SetPaidRequest request) {
        return purchaseService.setPaid(id, request.getPaid());
    }

    private Purchase toPurchase(PurchaseRequest request) {
        Purchase purchase = new Purchase();
        purchase.setDate(request.getDate());
        purchase.setMerchant(request.getMerchant());
        purchase.setAmount(request.getAmount());
        purchase.setInstallments(request.getInstallments());
        purchase.setType(request.getType());
        purchase.setPaid(request.isPaid());
        purchase.setNotes(request.getNotes());
        return purchase;
    }
}
