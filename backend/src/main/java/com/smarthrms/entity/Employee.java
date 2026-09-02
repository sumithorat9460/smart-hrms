package com.smarthrms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees", indexes = {@Index(name = "idx_employee_email", columnList = "email"), @Index(name = "idx_employee_status", columnList = "status")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 60)
    private String firstName;
    @Column(nullable = false, length = 60)
    private String lastName;
    @Column(nullable = false, unique = true, length = 120)
    private String email;
    @Column(length = 20)
    private String phone;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal salary;
    private LocalDate dateOfBirth;
    @Column(nullable = false)
    private LocalDate joiningDate;
    @Column(length = 255)
    private String address;
    @Column(length = 120)
    private String education;
    @Column(length = 100)
    private String profession;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EmployeeStatus status;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}
