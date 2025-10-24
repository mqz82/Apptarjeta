package com.apptarjeta.backend.controller;

import com.apptarjeta.backend.domain.Config;
import com.apptarjeta.backend.dto.ConfigRequest;
import com.apptarjeta.backend.service.ConfigService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/config")
public class ConfigController {

    private final ConfigService configService;

    public ConfigController(ConfigService configService) {
        this.configService = configService;
    }

    @GetMapping
    public Config getConfig() {
        return configService.getConfig();
    }

    @PutMapping
    public ResponseEntity<Config> updateConfig(@Valid @RequestBody ConfigRequest request) {
        Config config = new Config(request.getCupo(), request.getDiaCierre(), request.getDiaPago());
        return ResponseEntity.ok(configService.updateConfig(config));
    }
}
