package com.smarthrms.dto;

import java.math.BigDecimal;
import java.util.*;

public final class DashboardDtos {
    private DashboardDtos() {
    }

    public record Stats(long totalEmployees, long totalDepartments, long activeEmployees, BigDecimal averageSalary,
                        BigDecimal highestSalary, List<RecentEmployee> recentEmployees,
                        List<DepartmentStat> departmentDistribution) {
    }

    public record RecentEmployee(Long id, String name, String profession, String departmentName, String joinedLabel) {
    }

    public record DepartmentStat(String name, long count, double percentage) {
    }
}
