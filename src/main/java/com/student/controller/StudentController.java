package com.student.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mysql.jdbc.StringUtils;
import com.student.model.Student;
import com.student.service.StudentService;
import com.student.util.ConstantDefault;
import com.student.util.ResponeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.Date;
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
    public ResponseEntity<Map<String,Object>> getList(@ModelAttribute Student student, @RequestParam(defaultValue = "1") Integer startPage,@RequestParam(defaultValue = "3") Integer pageSize)
    {
        Page<Object> page  = PageHelper.startPage(startPage, pageSize);
        return ResponeUtils.result(ConstantDefault.RESULT_SUCCESS, studentServiceImpl.getList(student,page), HttpStatus.OK);
    }

    @RequestMapping(value="/add", method = { RequestMethod.POST })
    @ResponseBody
    public ResponseEntity<Map<String,Object>> add(@ModelAttribute Student student)
    {
        student.setCreateTime(new Date());
        student.setUpdateTime(new Date());
        System.out.println(student);
        if (StringUtils.isNullOrEmpty(student.getName()))
        {
            return ResponeUtils.result(ConstantDefault.RESULT_ERROR,"姓名必填", HttpStatus.OK);
        }
        boolean result = studentServiceImpl.insert(student);
        ResponseEntity<Map<String,Object>> response = null;
        if (result)
        {
            response = ResponeUtils.result(ConstantDefault.RESULT_SUCCESS,"添加成功", HttpStatus.OK);
        }
        else
        {
            response = ResponeUtils.result(ConstantDefault.RESULT_ERROR,"添加成功", HttpStatus.OK);
        }
        return response;
    }

    @RequestMapping(value="/update",method = { RequestMethod.POST })
    @ResponseBody
    public ResponseEntity<Map<String,Object>> update(@ModelAttribute Student student)
    {
        if (student.getId() == null)
        {
            return ResponeUtils.result(ConstantDefault.RESULT_ERROR,"系统错误", HttpStatus.OK);
        }
        boolean result = studentServiceImpl.update(student);
        ResponseEntity<Map<String,Object>> response = null;
        if (result)
        {
            response = ResponeUtils.result(ConstantDefault.RESULT_SUCCESS,"编辑成功", HttpStatus.OK);
        }
        else
        {
            response = ResponeUtils.result(ConstantDefault.RESULT_ERROR,"编辑失败", HttpStatus.OK);
        }
        return response;
    }

    /*@RequestMapping(value="/delete/{}",method = { RequestMethod.GET })
    @ResponseBody
    public ResponseEntity<Map<String,Object>> delete()
    {

    }*/
}
