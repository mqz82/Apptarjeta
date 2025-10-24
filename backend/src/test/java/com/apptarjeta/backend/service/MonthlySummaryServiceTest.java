package com.apptarjeta.backend.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.apptarjeta.backend.domain.Config;
import com.apptarjeta.backend.domain.Purchase;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class MonthlySummaryServiceTest {

    @Test
    void calculateTrafficLightAndPoints() {
        PurchaseService purchaseService = new StubPurchaseService();
        ConfigProvider configProvider = () -> new Config(500000, 24, 10);
        MonthlySummaryService service = new MonthlySummaryService(purchaseService, configProvider);

        var summary = service.calculateForMonth(YearMonth.of(2024, 5));

        assertThat(summary.getTotalSpent()).isEqualTo(250000);
        assertThat(summary.getUsageRatio()).isEqualTo(0.5);
        assertThat(summary.getTrafficLight()).isEqualTo("YELLOW");
        assertThat(summary.getPoints()).isEqualTo(250);
    }

    private static class StubPurchaseService extends PurchaseService {

        StubPurchaseService() {
            super(null);
        }

        @Override
        public List<Purchase> findAll() {
            Purchase purchase = new Purchase();
            purchase.setId(UUID.randomUUID());
            purchase.setAmount(250000);
            purchase.setDate(LocalDate.of(2024, 5, 3));
            purchase.setMonthKey(YearMonth.of(2024, 5));
            return List.of(purchase);
        }
    }
}
