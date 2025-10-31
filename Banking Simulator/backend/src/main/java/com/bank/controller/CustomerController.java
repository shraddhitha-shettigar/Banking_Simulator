package com.bank.controller;

import com.bank.model.Customer;
import com.bank.service.CustomerService;
import com.bank.service.serviceimp.CustomerServiceImp;
import jakarta.inject.Singleton;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.net.URI;
import java.util.List;

@Singleton
@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CustomerController {

    private final CustomerService service = new CustomerServiceImp();

    @POST
    @Path("/create")
    public Response createCustomer(@Valid Customer customer, @Context UriInfo uriInfo) {
        try {
            Customer saved = service.createCustomer(customer);
            URI uri = uriInfo.getAbsolutePathBuilder()
                    .path(saved.getAadharNumber())  
                    .build();
            return Response.created(uri).entity(saved).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

   
    @GET
    @Path("/get/{aadhar}")
    public Response getCustomer(@PathParam("aadhar") String aadharNumber) {
        try {
            Customer c = service.getCustomerByAadhar(aadharNumber);
            if (c == null)
                return Response.status(Response.Status.NOT_FOUND).entity("Customer not found").build();
            return Response.ok(c).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/getAll")
    public Response getAll() {
        try {
            List<Customer> list = service.getAllCustomers();
            return Response.ok(list).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

   
    @PUT
    @Path("/update/{aadhar}")
    public Response updateCustomer(@PathParam("aadhar") String aadharNumber, @Valid Customer customer) {
        try {
            Customer updated = service.updateCustomerByAadhar(aadharNumber, customer);
            if (updated == null)
                return Response.status(Response.Status.NOT_FOUND).entity("Customer not found or duplicate").build();
            return Response.ok(updated).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    
    @DELETE
    @Path("/delete/{aadhar}")
    public Response deleteCustomer(@PathParam("aadhar") String aadharNumber) {
        try {
            boolean ok = service.deleteCustomerByAadhar(aadharNumber);
            if (!ok)
                return Response.status(Response.Status.NOT_FOUND).entity("Customer with Aadhar " + aadharNumber + " not found").build();
            return Response.ok("Customer with Aadhar " + aadharNumber + " is deleted").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
    
    
    @GET
    @Path("/user/{userId}")
    public Response getCustomerByUserId(@PathParam("userId") int userId) {
        try {
            Customer c = service.getCustomerByUserId(userId);
            if (c == null)
                return Response.status(Response.Status.NOT_FOUND).entity("No customer found for this user").build();
            return Response.ok(c).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    
    
}
