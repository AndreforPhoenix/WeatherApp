/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.azmet.firstspringbootapi;

/**
 *
 * @author dremw
 */
public class ResponseSelectors {
    private String field;
    private String ty;
    private String nul;
    private String key;
    private String def;
    private String ext;

    public ResponseSelectors(String field, String ty, String nul, String key, String def, String ext) {
        this.def = def;
        this.ext = ext;
        this.field = field;
        this.key = key;
        this.nul = nul;
        this.ty = ty;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getTy() {
        return ty;
    }

    public void setTy(String ty) {
        this.ty = ty;
    }

    public String getNul() {
        return nul;
    }

    public void setNul(String nul) {
        this.nul = nul;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDef() {
        return def;
    }

    public void setDef(String def) {
        this.def = def;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }



}
