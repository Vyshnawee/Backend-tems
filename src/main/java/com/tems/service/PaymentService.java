package com.tems.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tems.model.Expense;
import com.tems.model.Payment;
import com.tems.Repository.ExpenseRepository;
import com.tems.Repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final ExpenseRepository expenseRepository;
    private final PaymentRepository paymentRepository;

    public PaymentService(ExpenseRepository expenseRepository,
                          PaymentRepository paymentRepository) {
        this.expenseRepository = expenseRepository;
        this.paymentRepository = paymentRepository;
    }

    // 🔥 Create Stripe Session
    public String createCheckoutSession(Integer expenseId) throws Exception {

        Stripe.apiKey = stripeSecretKey;

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        long amount = (long) (expense.getAmount() * 100);

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl(
                        	    "http://localhost:5173/payment-success?expenseId=" 
                        	    + expenseId + 
                        	    "&session_id={CHECKOUT_SESSION_ID}"
                        	)
                        .setCancelUrl("http://localhost:5173/payment-cancel")
                        .putMetadata("expenseId", String.valueOf(expenseId))
                        .setClientReferenceId(String.valueOf(expenseId))
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("inr")
                                                        .setUnitAmount(amount)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName(expense.getTitle())
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .build();

        Session session = Session.create(params);

        return session.getUrl();
    }

    public void markAsPaid(Integer expenseId) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setStatus("PAID");
        expense.setPaidAt(LocalDateTime.now());

        expenseRepository.save(expense);
    }
    
    public void handlePaymentSuccess(String sessionId, Integer expenseId) throws Exception {

        Stripe.apiKey = stripeSecretKey;

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // 🔥 CRITICAL FIX
        if (expense.getPaidAt() != null) {
            System.out.println("Already paid, skipping...");
            return;
        }

        Session session = Session.retrieve(sessionId);

        Payment payment = new Payment();
        payment.setExpense(expense);
        payment.setAmount(session.getAmountTotal() / 100.0);
        payment.setPaymentMethod("STRIPE");
        payment.setTransactionId(sessionId);
        payment.setStatus("PAID");
        payment.setPaidAt(LocalDateTime.now());

        paymentRepository.save(payment);

        expense.setStatus("PAID");
        expense.setPaidAt(LocalDateTime.now());

        expenseRepository.save(expense);
    }

}