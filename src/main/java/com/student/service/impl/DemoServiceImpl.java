package com.student.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.student.dao.StudentMapper;
import com.student.model.Student;
import com.student.service.DemoService;
import org.apache.ibatis.session.RowBounds;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DemoServiceImpl implements DemoService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    @Transactional
    public boolean updateUserAndArticle()
    {

            return  false;
    }

    @Override
    public List<Student> getList() {
        /*RowBounds rowBounds = new RowBounds(1,3);
        return studentMapper.selectByRowBounds(new Student(), rowBounds);*/
        Page<Object> objects = PageHelper.startPage(1, 3, true);
        List<Student> students = studentMapper.selectAll();
        System.out.println("-----------------------------------------------------");
        System.out.println(objects.getTotal());
        System.out.println(objects.getPages());
        System.out.println(objects.getPageSize());
        return students;
    }
}
