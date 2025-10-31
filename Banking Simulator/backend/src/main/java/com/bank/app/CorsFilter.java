
package com.bank.app;

import jakarta.ws.rs.container.*;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.core.MultivaluedMap;
import java.io.IOException;

@Provider
public class CorsFilter implements ContainerResponseFilter, ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        
    }

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
            throws IOException {
        MultivaluedMap<String, Object> headers = responseContext.getHeaders();
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    }
}