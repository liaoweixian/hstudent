package com.student.controller;

import com.mysql.jdbc.StringUtils;
import com.student.dao.UserMapper;
import com.student.model.User;
import com.student.util.ConstantDefault;
import com.student.util.MD5Utils;
import com.student.util.ResponeUtils;
import com.sun.deploy.net.HttpResponse;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Controller
@RequestMapping(value="/login")
public class LoginController {

    @Resource
    private UserMapper userMapper;

    @RequestMapping(value="/login",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String,Object>> login(HttpServletRequest httpRequest, HttpServletResponse response, @RequestParam String account, @RequestParam String password)
    {
        if (StringUtils.isNullOrEmpty(account))
        {
            return ResponeUtils.result(ConstantDefault.RESULT_ERROR, "请输入用户名", HttpStatus.OK);
        }
        if (StringUtils.isNullOrEmpty(password))
        {
            return ResponeUtils.result(ConstantDefault.RESULT_ERROR, "请输入密码", HttpStatus.OK);
        }
        User user = userMapper.selectByPrimaryAccount(account);
        if (user != null)
        {
            try {
                MessageDigest md5 = MessageDigest.getInstance("MD5");
                String encode = MD5Utils.encode(password);
                System.out.println("md5----------------");
                System.out.println(encode);
                if (encode.equals(user.getPassword()))
                {
                    return ResponeUtils.result(ConstantDefault.RESULT_SUCCESS, "登陆成功", HttpStatus.OK);
                }
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
        return ResponeUtils.result(ConstantDefault.RESULT_ERROR, "登陆失败", HttpStatus.OK);
    }
}
