package com.smarthrms.dto;

import jakarta.validation.constraints.*;

public final class DepartmentDtos {
    private DepartmentDtos() {
    }

    public record Request(@NotBlank @Size(max = 80) String name, @Size(max = 100) String location,
                          @Size(max = 120) String manager) {
    }

    public record Response(Long id, String name, String location, String manager, long employeeCount) {
    }
}
