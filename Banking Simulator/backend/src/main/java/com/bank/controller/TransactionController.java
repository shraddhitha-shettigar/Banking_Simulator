package com.bank.controller;
import com.bank.model.Transaction;
import com.bank.service.TransactionService;
import com.bank.service.serviceimp.TransactionServiceImp;
import jakarta.inject.Singleton;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import java.io.ByteArrayInputStream;
import com.bank.util.ExcelExport;

import java.net.URI;
import java.util.List;

@Singleton
@Path("/transaction")

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TransactionController {

    private final TransactionService service = new TransactionServiceImp();

    @POST
    @Path("/create")
    public Response makeTransaction(@Valid Transaction t, @Context UriInfo uriInfo) {
        try {
            Transaction done = service.makeTransaction(t);
            URI uri = uriInfo.getAbsolutePathBuilder().path(String.valueOf(done.getTransactionId())).build();
            return Response.created(uri).entity(done).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/get/{accountNumber}")
    public Response getTransactions(@PathParam("accountNumber") String accountNumber) {
        try {
            List<Transaction> list = service.getTransactions(accountNumber);
            return Response.ok(list).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
    
    @GET
    @Path("/{accountNumber}/download")
    @Produces("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public Response downloadTransactionsExcel(@PathParam("accountNumber") String accountNumber) {
        try {
            List<Transaction> transactions = service.getTransactions(accountNumber);
            ByteArrayInputStream excelStream = ExcelExport.transactionsToExcel(transactions);

            return Response.ok(excelStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    .header("Content-Disposition", "attachment; filename=transactions_" + accountNumber + ".xlsx")
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error generating Excel: " + e.getMessage())
                    .build();
        }
    }
    
    @GET
    @Path("/getAll")
    public Response getAllTransactions() {
        try {
            List<Transaction> list = service.getAllTransactions();
            return Response.ok(list).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error fetching all transactions: " + e.getMessage())
                    .build();
        }
    }



    
    
}
