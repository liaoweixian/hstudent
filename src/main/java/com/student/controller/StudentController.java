package com.student.controller;

import com.student.model.Student;
import com.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentServiceImpl;

    @RequestMapping("/get-list")
    @ResponseBody
    public Map<String,Object> getList()
    {
        List<Student> students = studentServiceImpl.getList();
        HashMap<String, Object> stringObjectHashMap = new HashMap<>();
        stringObjectHashMap.put("code",200);
        stringObjectHashMap.put("data",students);
        return stringObjectHashMap;
    }


}
