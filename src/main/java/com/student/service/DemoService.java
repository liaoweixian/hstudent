package com.student.service;

import com.student.model.User;

import java.util.List;

public interface DemoService {
    List<User> getUserList();

    boolean updateUserAndArticle() ;
}
