package com.student.config;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import java.nio.charset.StandardCharsets;

/**
 * 启动配置  加载其它配置
 */
public class AppConfig implements WebApplicationInitializer
{
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException
    {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        servletContext.addFilter("CharacterEncodingFilter",characterEncodingFilter).addMappingForUrlPatterns(null,false,"/*");

        servletContext.getServletRegistration("default").addMapping("/resources/*", "/bootstrap/*", "*.js", "*.css", "*.jpg", "*.png", "*.ico");

        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        rootContext.register(RootContextConfig.class);
        servletContext.addListener(new ContextLoaderListener(rootContext));

        AnnotationConfigWebApplicationContext servletConfig = new AnnotationConfigWebApplicationContext();
        servletConfig.register(ServletContextConfig.class);
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("springDispatcher", new DispatcherServlet(servletConfig));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }


}
