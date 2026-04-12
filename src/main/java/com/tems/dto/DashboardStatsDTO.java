package com.tems.dto;

public class DashboardStatsDTO {
    private long users;
    private long teams;
    private double expenses;
    private double paid;

    public DashboardStatsDTO(long users, long teams, double expenses, double paid) {
        this.users = users;
        this.teams = teams;
        this.expenses = expenses;
        this.paid = paid;
    }

    public long getUsers() { return users; }
    public long getTeams() { return teams; }
    public double getExpenses() { return expenses; }
    public double getPaid() { return paid; }
}