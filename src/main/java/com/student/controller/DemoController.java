package com.student.controller;

import com.student.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

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


}
