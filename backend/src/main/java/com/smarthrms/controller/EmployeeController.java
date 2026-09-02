package com.smarthrms.controller;

import com.smarthrms.dto.EmployeeDtos.*;
import com.smarthrms.entity.EmployeeStatus;
import com.smarthrms.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService service;

    @GetMapping
    public Page<Response> list(@RequestParam(required = false) String q, @RequestParam(required = false) Long departmentId, @RequestParam(required = false) EmployeeStatus status, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sort, @RequestParam(defaultValue = "asc") String dir) {
        return service.list(q, departmentId, status, page, size, sort, dir);
    }

    @GetMapping("/{id}")
    public Response get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    public Response create(@Valid @RequestBody Request r) {
        return service.create(r);
    }

    @PutMapping("/{id}")
    public Response update(@PathVariable Long id, @Valid @RequestBody Request r) {
        return service.update(id, r);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
