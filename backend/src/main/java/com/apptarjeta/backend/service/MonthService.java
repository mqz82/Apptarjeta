package com.apptarjeta.backend.service;

import com.apptarjeta.backend.domain.Config;
import com.apptarjeta.backend.domain.MonthStatus;
import com.apptarjeta.backend.repository.JsonFileRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class MonthService {

    private final JsonFileRepository<MonthStatus> repository;
    private final ConfigService configService;

    public MonthService(@Qualifier("monthRepository") JsonFileRepository<MonthStatus> repository,
            ConfigService configService) {
        this.repository = repository;
        this.configService = configService;
    }

    public List<MonthStatus> findAll() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(MonthStatus::getMonthKey))
                .toList();
    }

    public List<MonthStatus> generateNextMonths(int numberOfMonths) {
        Config config = configService.getConfig();
        List<MonthStatus> months = new ArrayList<>();
        YearMonth current = YearMonth.now();
        for (int i = 0; i < numberOfMonths; i++) {
            YearMonth monthKey = current.plusMonths(i);
            months.add(buildMonthStatus(config, monthKey));
        }
        repository.saveAll(months);
        return months;
    }

    public MonthStatus setPaid(UUID id, boolean paid) {
        List<MonthStatus> months = new ArrayList<>(repository.findAll());
        for (int i = 0; i < months.size(); i++) {
            MonthStatus monthStatus = months.get(i);
            if (monthStatus.getId().equals(id)) {
                monthStatus.setPaid(paid);
                months.set(i, monthStatus);
                repository.saveAll(months);
                return monthStatus;
            }
        }
        throw new IllegalArgumentException("Month not found");
    }

    public MonthStatus getByKey(YearMonth monthKey) {
        return repository.findAll().stream()
                .filter(month -> month.getMonthKey().equals(monthKey))
                .findFirst()
                .orElseGet(() -> buildAndPersistMonth(monthKey));
    }

    private MonthStatus buildAndPersistMonth(YearMonth monthKey) {
        MonthStatus monthStatus = buildMonthStatus(configService.getConfig(), monthKey);
        List<MonthStatus> months = new ArrayList<>(repository.findAll());
        months.add(monthStatus);
        repository.saveAll(months);
        return monthStatus;
    }

    private MonthStatus buildMonthStatus(Config config, YearMonth monthKey) {
        MonthStatus status = new MonthStatus();
        status.setId(UUID.randomUUID());
        status.setMonthKey(monthKey);

        LocalDate endBilling = monthKey.atDay(config.getDiaCierre());
        LocalDate startBilling = endBilling.minusMonths(1).withDayOfMonth(25);
        LocalDate idealStart = endBilling.plusDays(1);
        LocalDate idealEnd = monthKey.atDay(Math.max(config.getDiaPago() - 5, 1));
        LocalDate avoidStart = endBilling.minusDays(4);
        LocalDate avoidEnd = endBilling;
        LocalDate dueDate = monthKey.atDay(config.getDiaPago());

        status.setStartBilling(startBilling);
        status.setEndBilling(endBilling);
        status.setIdealStart(idealStart);
        status.setIdealEnd(idealEnd);
        status.setAvoidStart(avoidStart);
        status.setAvoidEnd(avoidEnd);
        status.setDueDate(dueDate);
        status.setPaid(false);
        return status;
    }
}
