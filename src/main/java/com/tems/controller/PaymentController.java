package com.tems.controller;

import com.tems.service.PaymentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;
    
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ✅ Create Stripe Checkout Session
    @PostMapping("/create-checkout-session/{expenseId}")
    public ResponseEntity<?> createCheckoutSession(@PathVariable Integer expenseId) {
        try {
            String url = paymentService.createCheckoutSession(expenseId);

            // ✅ Return JSON instead of plain string
            return ResponseEntity.ok(Map.of("url", url));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Something went wrong");
        }
    }
    
    @GetMapping("/success")
    public String paymentSuccess(
            @RequestParam String sessionId,
            @RequestParam Integer expenseId
    ) throws Exception {

        System.out.println("🔥 SUCCESS API HIT");

        paymentService.handlePaymentSuccess(sessionId, expenseId); // ✅ MUST CALL

        return "Payment recorded successfully!";
    }
    
    
}