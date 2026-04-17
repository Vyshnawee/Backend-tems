package com.tems.dto;

public class RecentExpenseDTO {

    private Integer id;
    private String userName;   // ✅ FIXED
    private String title;
    private double amount;
    private String status;

    public RecentExpenseDTO(Integer id, String userName, String title, Number amount, Object status) {
        this.id = id;
        this.userName = userName;
        this.title = title;
        this.amount = amount.doubleValue();
        this.status = status.toString();
    }

    public Integer getId() { return id; }
    public String getUserName() { return userName; } // ✅ IMPORTANT
    public String getTitle() { return title; }
    public double getAmount() { return amount; }
    public String getStatus() { return status; }
}