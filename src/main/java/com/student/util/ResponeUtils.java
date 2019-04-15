package com.student.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponeUtils
{

    public static ResponseEntity<Map<String,Object>> result(String code, Object data, HttpStatus HttpStatus)
    {
        HashMap<String, Object> stringObjectHashMap = new HashMap<>();
        stringObjectHashMap.put(ConstantDefault.RESULT_CODE,code);
        stringObjectHashMap.put(ConstantDefault.RESULT_DATA,data);
        ResponseEntity<Map<String, Object>> mapResponseEntity = new ResponseEntity<Map<String, Object>>(stringObjectHashMap,HttpStatus);
        return  mapResponseEntity;
    }
}
