package com.bank.controller;

import com.bank.model.User;
import com.bank.repository.UserRepository;
import jakarta.inject.Singleton;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.*;

@Singleton
@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {

    private final UserRepository repo = new UserRepository();

    @POST
    @Path("/signup")
    public Response register(@Valid User user) {
        try {
           
            if (repo.findByEmail(user.getEmail()).isPresent()) {
                return Response.status(Response.Status.CONFLICT)
                        .entity(Map.of("message", "Email already registered")).build();
            }

            boolean saved = repo.save(user);
            if (saved)
                return Response.status(Response.Status.CREATED)
                        .entity(Map.of("message", "Signup successful")).build();
            else
                return Response.serverError().entity(Map.of("message", "Signup failed")).build();

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage())).build();
        }
    }

    @POST
    @Path("/login")
    public Response login(Map<String, String> body) {
        try {
            String email = body.get("email");
            String password = body.get("password");

            var optionalUser = repo.findByEmail(email);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (user.getPassword().equals(password)) {
                    return Response.ok(Map.of(
                            "message", "Login successful",
                            "userId", user.getUserId(),
                            "fullName", user.getFullName()
                    )).build();
                } else {
                    return Response.status(Response.Status.UNAUTHORIZED)
                            .entity(Map.of("message", "Invalid password")).build();
                }
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("message", "User not found")).build();
            }

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage())).build();
        }
    }
}
