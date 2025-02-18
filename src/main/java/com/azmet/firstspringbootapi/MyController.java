/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.azmet.firstspringbootapi;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author dremw
 */

 @RestController
public class MyController {

    DataResults myData;
    ResponseObject myResponse;
    ResponseSelectors myRespSel;
    ArrayList<Object> data1 = new ArrayList<>();
    ArrayList<String> data2 = new ArrayList<>();

   // UpdateFilter myFilter = new UpdateFilter("");

    @CrossOrigin
    @RequestMapping("/response")
    public ResponseEntity<ArrayList<String>> getResponse(){
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type:", "application/json; charset=utf-8");

       data2.clear();

       myData = new DataResults(FirstspringbootapiApplication.RESPONSE);
        
        try {
            System.out.println("In endpoint response, trying query... " + FirstspringbootapiApplication.RESPONSE);
        while (myData.rs.next() == true) {

            String sField = myData.rs.getString("Field");
            String sTy = myData.rs.getString("Type");
            String sNul = myData.rs.getString("Null");
            String sKey = myData.rs.getString("Key");
            String sDef = myData.rs.getString("Default");
            String sExt = myData.rs.getString("Extra");

            myRespSel = new ResponseSelectors(sField,sTy,sNul,sKey,sDef,sExt);

            System.out.println(myRespSel.getField());
            data2.add(myRespSel.getField());
        }
            } catch (SQLException e) {
                
            }

            try {
                myData.stmt.close();
                    } catch (SQLException e) {}

        return new ResponseEntity<ArrayList<String>>(data2, headers, HttpStatus.OK);

    }

    @CrossOrigin
    @RequestMapping("/data")
    public ResponseEntity<ArrayList<Object>> getData() {
       
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type:", "application/json; charset=utf-8");

        data1.clear();

        myData = new DataResults(FirstspringbootapiApplication.DATA);
        
        try {
            System.out.println("In endpoint data, trying query... " + FirstspringbootapiApplication.DATA);
        while (myData.rs.next() == true) {

            String sYear = myData.rs.getString("year");
            String sMonth = myData.rs.getString("monthname");
            String sStation = myData.rs.getString("station");
            Double dAtmax = myData.rs.getDouble("atmaxDegF");
            Double dAtmin = myData.rs.getDouble("atminDegF");
            Double dAtmean = myData.rs.getDouble("atmeanDegF");
            String sDate = myData.rs.getString("date");

            myResponse = new ResponseObject(sYear,sMonth,sStation,dAtmax,dAtmin,dAtmean,sDate);
            data1.add(myResponse);

        }
            } catch (SQLException e) {

            }

            try {
                myData.stmt.close();
              
                } catch (SQLException e) {}

     

        return new ResponseEntity<ArrayList<Object>>(data1 , headers, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping("/year")
    public ResponseEntity<ArrayList<String>> getYear(){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type:", "application/json; charset=utf-8");

        data2.clear();

        myData = new DataResults(FirstspringbootapiApplication.YEAR);
         
         try {
            System.out.println("In endpoint year, trying query... " + FirstspringbootapiApplication.YEAR);            
         while (myData.rs.next() == true) {
 
             String sOption = myData.rs.getString("year");
             Selectors mySel = new Selectors(sOption);
             data2.add(mySel.getOption());
         }
             } catch (SQLException e) {
 
             }

             try {

                myData.stmt.close();
            
                    } catch (SQLException e) {}

         return new ResponseEntity<ArrayList<String>>(data2, headers, HttpStatus.OK);
    } 

    @CrossOrigin
    @RequestMapping("/station")
    public ResponseEntity<ArrayList<String>> getStation(){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type:", "application/json; charset=utf-8");

        data2.clear();

        myData = new DataResults(FirstspringbootapiApplication.STATION);
         
         try {
            System.out.println("In endpoint station, trying query... " + FirstspringbootapiApplication.STATION);            
         while (myData.rs.next() == true) {
 
             String sOption = myData.rs.getString("station");
             Selectors mySel = new Selectors(sOption);
             data2.add(mySel.getOption());
         }
             } catch (SQLException e) {
 
             }

             try {

                myData.stmt.close();

                    } catch (SQLException e) {}

         return new ResponseEntity<ArrayList<String>>(data2, headers,HttpStatus.OK);
    } 

    @CrossOrigin
    @RequestMapping("/month")
    public ResponseEntity<ArrayList<String>> getMonth(){
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type:", "application/json; charset=utf-8");

        data2.clear();

        myData = new DataResults(FirstspringbootapiApplication.MONTH);
         
         try {
            System.out.println("In endpoint month, trying query... " + FirstspringbootapiApplication.MONTH);            
         while (myData.rs.next() == true) {
 
             String sOption = myData.rs.getString("monthname");
             Selectors mySel = new Selectors(sOption);
             data2.add(mySel.getOption());
         }
             } catch (SQLException e) {
 
             }

             try {

                myData.stmt.close();

                    } catch (SQLException e) {}

         return new ResponseEntity<ArrayList<String>>(data2, headers,HttpStatus.OK);
    } 
    
    
  //  @CrossOrigin
  //  @PostMapping("/update")
   // public int setFilter(@RequestBody String mysql){
    //    myFilter.setQueryStr(mysql);
     //   int status = 201;
       // return status;
   // }    

}
