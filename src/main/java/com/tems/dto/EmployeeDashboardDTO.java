package com.tems.dto;

public class EmployeeDashboardDTO {

    private long totalExpenses;
    private long paidExpenses;
    private long pendingExpenses;

    private double totalAmount;
    private double paidAmount;
    private double pendingAmount;

    public EmployeeDashboardDTO(long totalExpenses, long paidExpenses, long pendingExpenses,
                                double totalAmount, double paidAmount, double pendingAmount) {
        this.totalExpenses = totalExpenses;
        this.paidExpenses = paidExpenses;
        this.pendingExpenses = pendingExpenses;
        this.totalAmount = totalAmount;
        this.paidAmount = paidAmount;
        this.pendingAmount = pendingAmount;
    }

	public long getTotalExpenses() {
		return totalExpenses;
	}

	public void setTotalExpenses(long totalExpenses) {
		this.totalExpenses = totalExpenses;
	}

	public long getPaidExpenses() {
		return paidExpenses;
	}

	public void setPaidExpenses(long paidExpenses) {
		this.paidExpenses = paidExpenses;
	}

	public long getPendingExpenses() {
		return pendingExpenses;
	}

	public void setPendingExpenses(long pendingExpenses) {
		this.pendingExpenses = pendingExpenses;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(double paidAmount) {
		this.paidAmount = paidAmount;
	}

	public double getPendingAmount() {
		return pendingAmount;
	}

	public void setPendingAmount(double pendingAmount) {
		this.pendingAmount = pendingAmount;
	}

    
}