/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.azmet.firstspringbootapi;

/**
 *
 * @author dremw
 */
 public class UpdateFilter {

     String queryStr;

        public UpdateFilter (String sql) {
            queryStr = sql;
        }

    public String getQueryStr() {
        return queryStr;
    }

    public void setQueryStr(String sql) {
        queryStr = sql;
    }

    @Override
    public String toString() {
        String newStr = queryStr.substring(14, queryStr.length() - 2);
        return newStr;
    }

}
