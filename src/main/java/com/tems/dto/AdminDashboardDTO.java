package com.tems.dto;

public class AdminDashboardDTO {
    private Long totalUsers;
    private Long totalExpenses;
    private Double paidAmount;
    private Double pendingAmount;

    public AdminDashboardDTO(Long totalUsers, Long totalExpenses, Double paidAmount, Double pendingAmount) {
        this.totalUsers = totalUsers;
        this.totalExpenses = totalExpenses;
        this.paidAmount = paidAmount;
        this.pendingAmount = pendingAmount;
    }

    public Long getTotalUsers() { return totalUsers; }
    public Long getTotalExpenses() { return totalExpenses; }
    public Double getPaidAmount() { return paidAmount; }
    public Double getPendingAmount() { return pendingAmount; }
}