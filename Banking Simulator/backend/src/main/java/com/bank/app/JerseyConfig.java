package com.bank.app;

import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/api")  
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {

    	packages("com.bank.app", "com.bank.controller", "com.bank.exception");
    }
}
