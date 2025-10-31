package com.bank.controller;

import com.bank.model.Query;
import com.bank.repository.QueryRepository;
import com.bank.alert.NotificationService;
import jakarta.inject.Singleton;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminController {

    private static final String ADMIN_USER = "admin";
    private static final String ADMIN_PASS = "admin123";
    private static final String ADMIN_EMAIL = "shraddhashettigar10@gmail.com";

    private final QueryRepository repo = new QueryRepository();
    private final NotificationService notifier = new NotificationService();

    @POST
    @Path("/login")
    public Response login(Map<String, String> body) {
        String user = body.get("username");
        String pass = body.get("password");
        if (ADMIN_USER.equals(user) && ADMIN_PASS.equals(pass)) {
            Map<String,String> resp = new HashMap<>();
            resp.put("status", "success");
            resp.put("message", "Login successful");
            return Response.ok(resp).build();
        } else {
            Map<String,String> resp = new HashMap<>();
            resp.put("status", "error");
            resp.put("message", "Invalid credentials");
            return Response.status(Response.Status.UNAUTHORIZED).entity(resp).build();
        }
    }

    @POST
    @Path("/query")
    public Response createQuery(@Valid Query query, @Context UriInfo uriInfo) {
        try {
            int id = repo.insert(query);
            if (id <= 0) {
                return Response.serverError().entity("Failed to save query").build();
            }

            String subject = "New customer query received";
            String message = "Name: " + query.getName() + "\n"
                    + "Email: " + query.getEmail() + "\n\n"
                    + "Query:\n" + query.getMessage() + "\n\n"
                    + "Regards,\n" + query.getName();

            try {
                notifier.sendNotification(ADMIN_EMAIL, subject, message);
            } catch (Exception e) {
                System.err.println("Failed to send admin email: " + e.getMessage());
            }

            return Response.created(uriInfo.getAbsolutePathBuilder().path(String.valueOf(id)).build())
                    .entity(query)
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/queries")
    public Response getAllQueries() {
        try {
            List<Query> list = repo.findAll();
            return Response.ok(list).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
