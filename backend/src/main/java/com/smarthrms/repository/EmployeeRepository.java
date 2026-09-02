package com.smarthrms.repository;

import com.smarthrms.entity.Employee;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
import java.math.BigDecimal;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    Page<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String first, String last, String email, Pageable pageable);

    Page<Employee> findByDepartmentId(Long departmentId, Pageable pageable);

    Page<Employee> findByStatus(com.smarthrms.entity.EmployeeStatus status, Pageable pageable);

    Optional<Employee> findTopByOrderByJoiningDateDesc();
}
