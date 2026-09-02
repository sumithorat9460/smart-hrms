package com.smarthrms.dto;

import jakarta.validation.constraints.*;

public final class AuthDtos {
    private AuthDtos() {
    }

    public record LoginRequest(@Email @NotBlank String email, @NotBlank @Size(min = 6) String password) {
    }

    public record LoginResponse(String token, String email, String role) {
    }
}
