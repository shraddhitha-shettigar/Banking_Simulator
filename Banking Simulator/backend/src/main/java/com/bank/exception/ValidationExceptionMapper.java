package com.bank.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Provider
public class ValidationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException exception) {
        Set<ConstraintViolation<?>> violations = exception.getConstraintViolations();
        List<String> errors = new ArrayList<>();

        for (ConstraintViolation<?> violation : violations) {
            errors.add(violation.getMessage());
        }

        return Response.status(Response.Status.BAD_REQUEST)
                .type(MediaType.APPLICATION_JSON)
                .entity(errors)
                .build();
    }
}
