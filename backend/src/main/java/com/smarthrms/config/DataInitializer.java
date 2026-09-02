package com.smarthrms.config;

import com.smarthrms.entity.*;
import com.smarthrms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {
    private final UserRepository users;
    private final DepartmentRepository departments;
    private final EmployeeRepository employees;
    private final PasswordEncoder encoder;

    @Bean
    CommandLineRunner seed() {
        return args -> {
            if (users.count() == 0) {
                users.save(User.builder().email("admin@smarthrms.com").password(encoder.encode("Admin@123")).role(Role.ADMIN).enabled(true).build());
                users.save(User.builder().email("employee@smarthrms.com").password(encoder.encode("Employee@123")).role(Role.EMPLOYEE).enabled(true).build());
            }
            if (departments.count() == 0) {
                var eng = departments.save(Department.builder().name("Engineering").location("Pune").manager("Rohit Verma").build());
                var hr = departments.save(Department.builder().name("Human Resources").location("Mumbai").manager("Anjali Deshmukh").build());
                var fin = departments.save(Department.builder().name("Finance").location("Mumbai").manager("Suresh Iyer").build());
                var mkt = departments.save(Department.builder().name("Marketing").location("Bangalore").manager("Karan Malhotra").build());
                var sales = departments.save(Department.builder().name("Sales").location("Delhi").manager("Neha Kapoor").build());
                employees.save(Employee.builder().firstName("Rahul").lastName("Singh").email("rahul.singh@company.com").phone("+91 98765 43210").salary(new BigDecimal("75000")).joiningDate(LocalDate.of(2023, 1, 15)).dateOfBirth(LocalDate.of(1998, 3, 12)).address("Pune, Maharashtra, India").education("B.Tech Computer Science").profession("Software Engineer").status(EmployeeStatus.ACTIVE).department(eng).build());
                employees.save(Employee.builder().firstName("Priya").lastName("Sharma").email("priya.sharma@company.com").phone("+91 98765 43211").salary(new BigDecimal("68000")).joiningDate(LocalDate.of(2023, 4, 10)).dateOfBirth(LocalDate.of(1997, 8, 21)).address("Mumbai, Maharashtra, India").education("MBA HR").profession("HR Executive").status(EmployeeStatus.ACTIVE).department(hr).build());
                employees.save(Employee.builder().firstName("Amit").lastName("Kumar").email("amit.kumar@company.com").phone("+91 98765 43212").salary(new BigDecimal("62000")).joiningDate(LocalDate.of(2022, 11, 2)).dateOfBirth(LocalDate.of(1995, 6, 18)).address("Mumbai, Maharashtra, India").education("B.Com").profession("Accountant").status(EmployeeStatus.ACTIVE).department(fin).build());
                employees.save(Employee.builder().firstName("Neha").lastName("Patil").email("neha.patil@company.com").phone("+91 98765 43213").salary(new BigDecimal("58000")).joiningDate(LocalDate.of(2024, 2, 20)).dateOfBirth(LocalDate.of(1999, 1, 5)).address("Pune, Maharashtra, India").education("B.Des").profession("UI/UX Designer").status(EmployeeStatus.ACTIVE).department(eng).build());
                employees.save(Employee.builder().firstName("Vikram").lastName("Joshi").email("vikram.joshi@company.com").phone("+91 98765 43214").salary(new BigDecimal("71000")).joiningDate(LocalDate.of(2024, 3, 1)).dateOfBirth(LocalDate.of(1994, 10, 7)).address("Delhi, India").education("BBA").profession("Marketing Manager").status(EmployeeStatus.ACTIVE).department(mkt).build());
                employees.save(Employee.builder().firstName("Shweta").lastName("Reddy").email("shweta.reddy@company.com").phone("+91 98765 43215").salary(new BigDecimal("55000")).joiningDate(LocalDate.of(2021, 7, 11)).dateOfBirth(LocalDate.of(1996, 2, 25)).address("Hyderabad, India").education("BBA").profession("Sales Executive").status(EmployeeStatus.INACTIVE).department(sales).build());
            }
        };
    }
}
