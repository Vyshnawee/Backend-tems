package com.tems.controller;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.tems.service.PaymentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/webhook")
public class WebhookController {

    private final PaymentService paymentService;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    public WebhookController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("checkout.session.completed".equals(event.getType())) {

                Session session = (Session) event.getDataObjectDeserializer()
                        .getObject()
                        .orElse(null);

                if (session == null) {
                    System.out.println("❌ Session is NULL");
                    return ResponseEntity.ok("Ignored"); // 🔥 DO NOT FAIL
                }

                String expenseIdStr = session.getClientReferenceId();

                System.out.println("👉 ClientReferenceId: " + expenseIdStr);

                if (expenseIdStr == null) {
                    return ResponseEntity.ok("Ignored"); // 🔥 DO NOT FAIL
                }

                Integer expenseId = Integer.parseInt(expenseIdStr);

                paymentService.markAsPaid(expenseId);
            }

            return ResponseEntity.ok("Success");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Webhook error");
        }
    }
}