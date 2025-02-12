/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.azmet.firstspringbootapi;

/**
 *
 * @author dremw
 */
public class ResponseObject {

    private String year;
    private String month;
    private String station; 
    private Double atmaxDegF;
    private Double atminDegF;
    private Double atmeanDegF;
    private String date;


    public ResponseObject (String sYear, String sMonth, String sStation, Double dAtmaxDegF, Double dAtminDegF, Double dAtmeanDegF, String sDate) {
        year = sYear;
        month = sMonth;
        station = sStation;
        atmaxDegF = dAtmaxDegF;
        atminDegF = dAtminDegF;
        atmeanDegF = dAtmeanDegF;
        date = sDate;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getStation() {
        return station;
    }

    public void setStation(String station) {
        this.station = station;
    }

    public Double getAtmaxDegF() {
        return atmaxDegF;
    }

    public void setAtmaxDegF(Double atmaxDegF) {
        this.atmaxDegF = atmaxDegF;
    }

    public Double getAtminDegF() {
        return atminDegF;
    }

    public void setAtminDegF(Double atminDegF) {
        this.atminDegF = atminDegF;
    }

    public Double getAtmeanDegF() {
        return atmeanDegF;
    }

    public void setAtmeanDegF(Double atmeanDegF) {
        this.atmeanDegF = atmeanDegF;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
