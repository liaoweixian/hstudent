package com.student.service;

import com.student.model.Student;

import java.util.List;

public interface StudentService {
    List<Student> getList();

    Student getStudentById(int id);

    boolean update(Student student);

    boolean insert(Student student);

    boolean delete(int id);


}
