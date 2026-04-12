package com.tems.dto;

public class RecentExpenseDTO {

    private Integer id;   // ✅ FIXED
    private String name;
    private String title;
    private double amount;
    private String status;

    public RecentExpenseDTO(Integer id, String name, String title, double amount, String status) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.amount = amount;
        this.status = status;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getTitle() { return title; }
    public double getAmount() { return amount; }
    public String getStatus() { return status; }
}