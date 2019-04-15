package com.student.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.student.dao.StudentMapper;
import com.student.model.Student;
import com.student.service.DemoService;
import com.student.service.StudentService;
import com.student.util.ConstantDefault;
import com.student.util.ResponeUtils;
import com.sun.xml.internal.bind.v2.runtime.reflect.opt.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/demo")
public class DemoController
{

    @Autowired
    private DemoService demoServiceImpl;

    @Autowired
    private StudentService studentServiceImpl;

    @Resource
    private StudentMapper studentMapper;

    @RequestMapping(value="/test")
    @ResponseBody
    public String test(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        System.out.println(httpServletResponse.getCharacterEncoding());
        System.out.println("就是这样");
        return "哈哈- ";
    }

    @RequestMapping(value="/test1",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> test1()
    {
        System.out.println("就是这样");
        List<String> list = new ArrayList<String>();
        list.add("11111");
        list.add("是这个");
        return list;
    }


    @RequestMapping(value = "/update-user-and-article")
    @ResponseBody
    public boolean update()
    {
        try {
    	   return demoServiceImpl.updateUserAndArticle();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return false;
    }

    @RequestMapping(value = "/entity")
    @ResponseBody
    public  ResponseEntity<Map<String,Object>> entity()
    {
        HashMap<String, Object> stringObjectHashMap = new HashMap<>();
        ArrayList<String> strings = new ArrayList<>();
        strings.add("12321321");
        strings.add("wwwwwwwwwwwwww");
        return ResponeUtils.result("200",strings,HttpStatus.OK);
    }

    @RequestMapping(value="/student-id")
    @ResponseBody
    public ResponseEntity<Map<String,Object>> getStudentByid(@RequestParam Integer id)
    {
        return ResponeUtils.result(ConstantDefault.RESULT_SUCCESS,studentServiceImpl.getStudentById(id),HttpStatus.OK);
    }

    @RequestMapping(value="/get-student-list")
    @ResponseBody
    public ResponseEntity<Map<String,Object>> getSeleteByRowBounds()
    {
        return ResponeUtils.result(ConstantDefault.RESULT_SUCCESS,demoServiceImpl.getList(),HttpStatus.OK);
    }

    @RequestMapping(value="/get-student-list2")
    @ResponseBody
    public ResponseEntity<Map<String,Object>> getSeleteByRowBounds2()
    {
        Page<Object> page = PageHelper.startPage(1, 3);
        List<Student> selectAll = studentMapper.selectAll();
        PageInfo<Student> studentPageInfo = new PageInfo<>(selectAll);
        return ResponeUtils.result(ConstantDefault.RESULT_SUCCESS,studentPageInfo,HttpStatus.OK);
    }
}
