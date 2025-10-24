package com.apptarjeta.backend.service;

import com.apptarjeta.backend.config.AppProperties;
import com.apptarjeta.backend.domain.PlanItem;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    private final ObjectMapper objectMapper;
    private final Path filePath;

    public PlanService(ObjectMapper objectMapper, AppProperties properties) {
        this.objectMapper = objectMapper;
        this.filePath = Path.of(Objects.requireNonNull(properties.getDataDirectory()), "plan.json");
    }

    public List<PlanItem> findAll() {
        ensureFileExists();
        try {
            byte[] bytes = Files.readAllBytes(filePath);
            if (bytes.length == 0) {
                return List.of();
            }
            return objectMapper.readValue(bytes, new TypeReference<>() {
            });
        } catch (IOException e) {
            throw new IllegalStateException("Unable to read plan file", e);
        }
    }

    private void ensureFileExists() {
        if (Files.notExists(filePath)) {
            try {
                Files.createDirectories(filePath.getParent());
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(filePath.toFile(), List.of());
            } catch (IOException e) {
                throw new IllegalStateException("Unable to create plan file", e);
            }
        }
    }
}
