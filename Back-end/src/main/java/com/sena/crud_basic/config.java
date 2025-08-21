package com.sena.crud_basic;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class config implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/Api/v1/**")
                .allowedOrigins("http://192.168.10.168:8081")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(false); // o true si usas cookies/autenticación
    }
}