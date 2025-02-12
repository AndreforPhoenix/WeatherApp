/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.azmet.firstspringbootapi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author dremw
 */
public class DataResults {

    static final String DBNAME = "azmetdata";
    static final String DBPATH = "jdbc:mysql://srv-02.mysql.database.azure.com:3306/" + DBNAME + "?useSSL=true";
    static final String USER = "azmetsqladmin";
    static final String PASS = "%Phoenix101";
    private static final String GET_URL = "https://localhost:8080"; //

    Connection myc;
    ResultSet rs;
    Statement stmt; 

    public DataResults(String QUERY) {

        try {
            // load and register JDBC driver for MySQL 
            Class.forName("com.mysql.cj.jdbc.Driver");
            this.myc = DriverManager.getConnection(DBPATH, USER, PASS);
            this.stmt = myc.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
           this.rs = stmt.executeQuery(QUERY); 
        } catch (ClassNotFoundException | SQLException e) {
            
    }
}    

    public void setMyc(Connection myc) {
        this.myc = myc;
    }

    public void setRs(ResultSet rs) {
     this.rs = rs;
    }

    public void setStmt(Statement stmt) {
        this.stmt = stmt;
    }

public Connection getMyc() {
    return myc;
}

public ResultSet getRs() {
    return rs;
}

public Statement getStmt() {
    return stmt;
}

}
