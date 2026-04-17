package com.tems.dto;

public class MonthlyDTO {

    private Integer month;
    private Double amount;

    public MonthlyDTO(Integer month, Double amount) {
        this.month = month;
        this.amount = amount;
    }

    public Integer getMonth() { return month; }
    public Double getAmount() { return amount; }
}