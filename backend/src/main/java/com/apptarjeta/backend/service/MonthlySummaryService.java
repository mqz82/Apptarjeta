package com.apptarjeta.backend.service;

import com.apptarjeta.backend.domain.Config;
import com.apptarjeta.backend.domain.MonthlySummary;
import com.apptarjeta.backend.domain.Purchase;
import java.time.YearMonth;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MonthlySummaryService {

    private final PurchaseService purchaseService;
    private final ConfigProvider configProvider;

    public MonthlySummaryService(PurchaseService purchaseService, ConfigProvider configProvider) {
        this.purchaseService = purchaseService;
        this.configProvider = configProvider;
    }

    public MonthlySummary calculateForMonth(YearMonth monthKey) {
        Config config = configProvider.getConfig();
        List<Purchase> purchases = purchaseService.findAll().stream()
                .filter(purchase -> monthKey.equals(purchase.getMonthKey()))
                .toList();
        long totalSpent = purchases.stream().mapToLong(Purchase::getAmount).sum();
        double usageRatio = config.getCupo() == 0 ? 0 : (double) totalSpent / config.getCupo();
        long points = totalSpent / 1000;
        String trafficLight;
        if (usageRatio < 0.3) {
            trafficLight = "GREEN";
        } else if (usageRatio < 0.6) {
            trafficLight = "YELLOW";
        } else {
            trafficLight = "RED";
        }
        return new MonthlySummary(monthKey, totalSpent, config.getCupo(), usageRatio, points, trafficLight);
    }
}
