package com.tems.dto;

public class SummaryDTO {

    private double total;
    private double approved;
    private double pending;
    private double rejected;

    public SummaryDTO(double total, double approved, double pending, double rejected) {
        this.total = total;
        this.approved = approved;
        this.pending = pending;
        this.rejected = rejected;
    }

    public double getTotal() { return total; }
    public double getApproved() { return approved; }
    public double getPending() { return pending; }
    public double getRejected() { return rejected; }
}