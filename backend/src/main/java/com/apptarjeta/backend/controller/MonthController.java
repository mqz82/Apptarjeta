package com.apptarjeta.backend.controller;

import com.apptarjeta.backend.domain.MonthStatus;
import com.apptarjeta.backend.domain.MonthlySummary;
import com.apptarjeta.backend.dto.SetPaidRequest;
import com.apptarjeta.backend.service.MonthService;
import com.apptarjeta.backend.service.MonthlySummaryService;
import jakarta.validation.Valid;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/months")
public class MonthController {

    private final MonthService monthService;
    private final MonthlySummaryService monthlySummaryService;

    public MonthController(MonthService monthService, MonthlySummaryService monthlySummaryService) {
        this.monthService = monthService;
        this.monthlySummaryService = monthlySummaryService;
    }

    @GetMapping
    public List<MonthStatus> findAll() {
        return monthService.findAll();
    }

    @PostMapping("/generate")
    public List<MonthStatus> generateMonths() {
        return monthService.generateNextMonths(12);
    }

    @PatchMapping("/{id}/paid")
    public MonthStatus setPaid(@PathVariable UUID id, @Valid @RequestBody SetPaidRequest request) {
        return monthService.setPaid(id, request.getPaid());
    }

    @GetMapping("/{monthKey}/summary")
    public ResponseEntity<MonthlySummary> summary(@PathVariable String monthKey) {
        YearMonth key = YearMonth.parse(monthKey);
        MonthStatus status = monthService.getByKey(key);
        MonthlySummary summary = monthlySummaryService.calculateForMonth(status.getMonthKey());
        return ResponseEntity.ok(summary);
    }
}
