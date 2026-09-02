package com.smarthrms.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    record ApiError(int status, String message, String path, Instant timestamp, Map<String, String> errors) {
    }

    @ExceptionHandler(ApiException.class)
    ResponseEntity<ApiError> api(ApiException e, HttpServletRequest r) {
        return ResponseEntity.status(e.getStatus()).body(new ApiError(e.getStatus().value(), e.getMessage(), r.getRequestURI(), Instant.now(), Map.of()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> validation(MethodArgumentNotValidException e, HttpServletRequest r) {
        Map<String, String> m = new LinkedHashMap<>();
        for (FieldError f : e.getBindingResult().getFieldErrors()) m.put(f.getField(), f.getDefaultMessage());
        return ResponseEntity.badRequest().body(new ApiError(400, "Validation failed", r.getRequestURI(), Instant.now(), m));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiError> generic(Exception e, HttpServletRequest r) {
        return ResponseEntity.status(500).body(new ApiError(500, "Unexpected server error", r.getRequestURI(), Instant.now(), Map.of()));
    }
}
