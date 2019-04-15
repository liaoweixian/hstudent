package com.student.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import com.student.model.Student;

import java.util.List;

public interface StudentService {
    PageInfo<Student> getList(Student student, Page page);

    Student getStudentById(int id);

    boolean update(Student student);

    boolean insert(Student student);

    boolean delete(int id);
}
