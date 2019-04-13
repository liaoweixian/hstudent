package com.student.controller;

import com.student.service.DemoService;
import com.student.util.ResponeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
