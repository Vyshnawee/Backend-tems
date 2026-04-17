package com.tems.dto;

public class CategoryDTO {

    private String name;
    private Double value;

    public CategoryDTO(String name, Double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() { return name; }
    public Double getValue() { return value; }
}