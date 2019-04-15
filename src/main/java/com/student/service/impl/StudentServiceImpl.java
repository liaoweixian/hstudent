package com.student.service.impl;

import com.student.dao.StudentMapper;
import com.student.model.Student;
import com.student.service.StudentService;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentMapper;

    @Resource
    private SqlSessionFactory sqlSessionFactory;
 
    
    @Transactional
    @Override
    public List<Student> getList() {
        SqlSession sqlSession = sqlSessionFactory.openSession();
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
        mapper.selectAll();
        return mapper.selectAll();
        //return studentMapper.selectAll();
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
