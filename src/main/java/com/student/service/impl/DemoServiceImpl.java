package com.student.service.impl;

import com.student.dao.ArticleDao;
import com.student.dao.UserDao;
import com.student.model.Article;
import com.student.model.User;
import com.student.service.DemoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DemoServiceImpl implements DemoService {

    @Resource
    private UserDao userDao;

    @Resource
    private ArticleDao articleDao;

    @Override
    public List<User> getUserList() {
        return userDao.getList();
    }

    @Override
    @Transactional
    public boolean updateUserAndArticle()
    {
            User user = new User();
            user.setPassword("1234577");
            user.setUsername("kyrie");
            userDao.updateUser(user);

            Article article = new Article();
            article.setId(1);
            article.setDate("qwewqewqe");
            articleDao.updateArticleById(article);
            return  false;
    }

}
