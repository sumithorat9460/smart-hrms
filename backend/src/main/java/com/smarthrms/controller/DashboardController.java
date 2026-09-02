package com.smarthrms.controller;

import com.smarthrms.dto.DashboardDtos.Stats;
import com.smarthrms.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService service;

    @GetMapping("/stats")
    public Stats stats() {
        return service.stats();
    }
}
