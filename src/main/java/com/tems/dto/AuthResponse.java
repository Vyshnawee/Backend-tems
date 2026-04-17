package com.tems.dto;

public class AuthResponse {

    private String token;
    private String role;
    private Integer userId;
    private Integer teamId;

    public AuthResponse(String token, String role, Integer userId, Integer teamId) {
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.teamId = teamId;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public Integer getUserId() { return userId; }
    public Integer getTeamId() { return teamId; }
}