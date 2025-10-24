package com.apptarjeta.backend.repository;

import com.apptarjeta.backend.config.AppProperties;
import com.apptarjeta.backend.domain.MonthStatus;
import com.apptarjeta.backend.domain.Purchase;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Path;
import java.util.Objects;
import java.util.UUID;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("json")
public class RepositoryConfig {

    private final ObjectMapper objectMapper;
    private final AppProperties properties;

    public RepositoryConfig(ObjectMapper objectMapper, AppProperties properties) {
        this.objectMapper = objectMapper;
        this.properties = properties;
    }

    @Bean
    public JsonFileRepository<Purchase> purchaseRepository() {
        Path file = Path.of(Objects.requireNonNull(properties.getDataDirectory()), "purchases.json");
        return new JsonFileRepository<>(objectMapper, file, new TypeReference<>() {
        }, Purchase::getId, this::afterReadPurchase);
    }

    @Bean
    public JsonFileRepository<MonthStatus> monthRepository() {
        Path file = Path.of(Objects.requireNonNull(properties.getDataDirectory()), "months.json");
        return new JsonFileRepository<>(objectMapper, file, new TypeReference<>() {
        }, MonthStatus::getId, this::afterReadMonth);
    }

    private Purchase afterReadPurchase(Purchase purchase) {
        if (purchase.getId() == null) {
            purchase.setId(UUID.randomUUID());
        }
        return purchase;
    }

    private MonthStatus afterReadMonth(MonthStatus month) {
        if (month.getId() == null) {
            month.setId(UUID.randomUUID());
        }
        return month;
    }
}
