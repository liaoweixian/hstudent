package com.student.service.impl;

import com.student.dao.StudentMapper;
import com.student.model.Student;
import com.student.service.StudentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Override
    public List<Student> getList() {
        return studentMapper.selectAll();
    }

    @Override
    public Student getStudentById(int id) {
        return studentMapper.selectByPrimaryKey(id);
    }

    @Override
    public boolean update(Student student) {
        int result = studentMapper.updateByPrimaryKey(student);
        return result > 0 ? true : false;
    }

    @Override
    public boolean insert(Student student) {
        int result = studentMapper.insert(student);
        System.out.println("------------------------------------");
        System.out.println(result);
        return result > 0 ? true : false;
    }

    @Override
    public boolean delete(int id) {
        int result = studentMapper.deleteByPrimaryKey(id);
        return result > 1 ? true : false;
    }
}
