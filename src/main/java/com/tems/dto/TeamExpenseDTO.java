package com.tems.dto;

public class TeamExpenseDTO {
    private String teamName;
    private Double amount;

    public TeamExpenseDTO(String teamName, Double amount) {
        this.teamName = teamName;
        this.amount = amount;
    }

    public String getTeamName() { return teamName; }
    public Double getAmount() { return amount; }
}