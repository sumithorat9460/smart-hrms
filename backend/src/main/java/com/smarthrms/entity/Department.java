package com.smarthrms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Table(name = "departments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 80)
    private String name;
    @Column(length = 100)
    private String location;
    @Column(length = 120)
    private String manager;
    @OneToMany(mappedBy = "department")
    private List<Employee> employees = new ArrayList<>();
}
