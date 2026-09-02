package com.smarthrms.dto;

import com.smarthrms.entity.EmployeeStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public final class EmployeeDtos {
    private EmployeeDtos() {
    }

    public record Request(@NotBlank @Size(max = 60) String firstName, @NotBlank @Size(max = 60) String lastName,
                          @Email @NotBlank String email, @Size(max = 20) String phone,
                          @NotNull @DecimalMin("0.0") BigDecimal salary, LocalDate dateOfBirth,
                          @NotNull LocalDate joiningDate, @Size(max = 255) String address,
                          @Size(max = 120) String education, @Size(max = 100) String profession,
                          @NotNull EmployeeStatus status, @NotNull Long departmentId) {
    }

    public record Response(Long id, String firstName, String lastName, String email, String phone, BigDecimal salary,
                           LocalDate dateOfBirth, LocalDate joiningDate, String address, String education,
                           String profession, EmployeeStatus status, Long departmentId, String departmentName) {
    }
}
