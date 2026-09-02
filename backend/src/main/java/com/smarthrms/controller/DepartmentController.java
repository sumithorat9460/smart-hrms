package com.smarthrms.controller;

import com.smarthrms.dto.DepartmentDtos.*;
import com.smarthrms.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService service;

    @GetMapping
    public List<Response> list() {
        return service.list();
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
