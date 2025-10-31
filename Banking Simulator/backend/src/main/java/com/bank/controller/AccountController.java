package com.bank.controller;

import com.bank.model.Account;
import com.bank.service.AccountService;
import com.bank.service.serviceimp.AccountServiceImp;
import jakarta.inject.Singleton;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.net.URI;
import java.util.List;

@Singleton
@Path("/account")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountController {

    private final AccountService service = new AccountServiceImp();

    @POST
    @Path("/create")
    public Response createAccount(@Valid Account account, @Context UriInfo uriInfo) {
        try {
            Account saved = service.createAccount(account);
            URI uri = uriInfo.getAbsolutePathBuilder().path(saved.getAccountNumber()).build();
            return Response.created(uri).entity(saved).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/getAll")
    public Response getAll() {
        List<Account> list = service.getAllAccounts();
        return Response.ok(list).build();
    }

    @GET
    @Path("/get/{accountNumber}")
    public Response getByAccountNumber(@PathParam("accountNumber") String accountNumber) {
        Account acc = service.getByAccountNumber(accountNumber);
        if (acc == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Account with number " + accountNumber + " not found").build();
        }
        return Response.ok(acc).build();
    }

    @PUT
    @Path("/update/{accountNumber}")
    public Response updateByAccountNumber(@PathParam("accountNumber") String accountNumber,
                                          @Valid Account account) {
        Account updated = service.updateByAccountNumber(accountNumber, account);
        if (updated == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Account with number " + accountNumber + " not found or not updated").build();
        }
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/delete/{accountNumber}")
    public Response deleteByAccountNumber(@PathParam("accountNumber") String accountNumber) {
        boolean ok = service.deleteByAccountNumber(accountNumber);
        if (!ok) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Account with number " + accountNumber + " not found").build();
        }
        return Response.ok("Account with number " + accountNumber + " deleted").build();
    }
}

