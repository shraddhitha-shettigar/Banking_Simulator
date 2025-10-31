package com.bank.util;

import com.bank.model.Transaction;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelExport {

    public static ByteArrayInputStream transactionsToExcel(List<Transaction> transactions) throws IOException {
        String[] columns = {"Transaction ID", "Sender Account", "Receiver Account", "Amount", "Description", "Date"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Transactions");

           
            Row headerRow = sheet.createRow(0);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);

            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

           
            int rowIdx = 1;
            for (Transaction t : transactions) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(t.getTransactionId());
                row.createCell(1).setCellValue(t.getSenderAccountNumber());
                row.createCell(2).setCellValue(t.getReceiverAccountNumber());
                row.createCell(3).setCellValue(t.getAmount());
                row.createCell(4).setCellValue(t.getDescription());
                row.createCell(5).setCellValue(t.getTransactionTime() != null ? t.getTransactionTime().toString() : "");
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}
