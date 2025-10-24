package com.apptarjeta.backend.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JsonFileRepository<T> {

    private static final Logger log = LoggerFactory.getLogger(JsonFileRepository.class);

    private final ObjectMapper objectMapper;
    private final Path filePath;
    private final TypeReference<List<T>> typeReference;
    private final Function<T, UUID> idExtractor;
    private final Function<T, T> afterRead;

    public JsonFileRepository(ObjectMapper objectMapper, Path filePath, TypeReference<List<T>> typeReference,
            Function<T, UUID> idExtractor, Function<T, T> afterRead) {
        this.objectMapper = objectMapper;
        this.filePath = filePath;
        this.typeReference = typeReference;
        this.idExtractor = idExtractor;
        this.afterRead = afterRead;
    }

    public synchronized List<T> findAll() {
        ensureFileExists();
        try {
            byte[] bytes = Files.readAllBytes(filePath);
            if (bytes.length == 0) {
                return List.of();
            }
            List<T> values = objectMapper.readValue(bytes, typeReference);
            return values.stream().map(afterRead).toList();
        } catch (IOException e) {
            log.error("Error reading {}", filePath, e);
            throw new IllegalStateException("Unable to read file " + filePath, e);
        }
    }

    public synchronized void saveAll(List<T> values) {
        ensureFileExists();
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(filePath.toFile(), values);
        } catch (IOException e) {
            log.error("Error writing {}", filePath, e);
            throw new IllegalStateException("Unable to write file " + filePath, e);
        }
    }

    public synchronized Optional<T> findById(UUID id) {
        return findAll().stream().filter(item -> idExtractor.apply(item).equals(id)).findFirst();
    }

    private void ensureFileExists() {
        if (Files.notExists(filePath)) {
            try {
                Files.createDirectories(filePath.getParent());
                Files.writeString(filePath, "[]");
            } catch (IOException e) {
                throw new IllegalStateException("Unable to create file " + filePath, e);
            }
        }
    }
}
