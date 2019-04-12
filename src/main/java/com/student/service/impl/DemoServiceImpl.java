package com.student.service.impl;

import com.student.service.DemoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DemoServiceImpl implements DemoService {

    @Override
    @Transactional
    public boolean updateUserAndArticle()
    {

            return  false;
    }

}
