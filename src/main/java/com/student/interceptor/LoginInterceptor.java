package com.student.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.student.model.User;
import com.student.util.ConstantDefault;
import com.student.util.ResponeUtils;
import org.apache.log4j.Logger;
import org.apache.log4j.spi.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class LoginInterceptor implements HandlerInterceptor{

    private final Logger logger = Logger.getLogger(LoginInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        if (uri.indexOf("/index.jsp") > 0 || uri.indexOf("/login") > 0)
        {
            return true;
        }
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("USER_SESSION");
        if (user != null)
        {
            return true;
        }
        String header = request.getHeader("X-Requested-With");
        if (header.equals("XMLHttpRequest"))
        {
            HashMap<String, Object> stringObjectHashMap = new HashMap<>();
            stringObjectHashMap.put("code","4000");
            stringObjectHashMap.put("msg","请登录");
            String json = JSONObject.toJSONString(stringObjectHashMap);
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html; charset=utf-8");
            PrintWriter writer = null;
            writer = response.getWriter();
            writer.print(json);
            writer.close();
            return false;
        }
        request.setAttribute("msg", "您还没有登录，请先登录！");
        request.getRequestDispatcher("/login.jsp").forward(request, response);
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("----------------postHandle------------------------");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("----------------afterCompletion------------------------");
    }
}
