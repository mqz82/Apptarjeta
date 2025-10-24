package com.apptarjeta.backend.controller;

import com.apptarjeta.backend.domain.PlanItem;
import com.apptarjeta.backend.service.PlanService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/plan")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public List<PlanItem> plan() {
        return planService.findAll();
    }
}
