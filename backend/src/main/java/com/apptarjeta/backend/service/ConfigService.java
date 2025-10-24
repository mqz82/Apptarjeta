package com.apptarjeta.backend.service;

import com.apptarjeta.backend.config.AppProperties;
import com.apptarjeta.backend.domain.Config;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ConfigService implements ConfigProvider {

    private static final Logger log = LoggerFactory.getLogger(ConfigService.class);

    private final ObjectMapper objectMapper;
    private final Path filePath;

    public ConfigService(ObjectMapper objectMapper, AppProperties properties) {
        this.objectMapper = objectMapper;
        this.filePath = Path.of(Objects.requireNonNull(properties.getDataDirectory()), "config.json");
    }

    @PostConstruct
    public void ensureExists() {
        if (Files.notExists(filePath)) {
            try {
                Files.createDirectories(filePath.getParent());
                objectMapper.writeValue(filePath.toFile(), new Config(530000L, 24, 10));
            } catch (IOException e) {
                throw new IllegalStateException("Unable to create config file", e);
            }
        }
    }

    @Override
    public synchronized Config getConfig() {
        try {
            return objectMapper.readValue(filePath.toFile(), Config.class);
        } catch (IOException e) {
            log.error("Unable to read config", e);
            throw new IllegalStateException("Unable to read config", e);
        }
    }

    public synchronized Config updateConfig(Config config) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(filePath.toFile(), config);
            return config;
        } catch (IOException e) {
            log.error("Unable to update config", e);
            throw new IllegalStateException("Unable to update config", e);
        }
    }
}
