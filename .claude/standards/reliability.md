# Standard: Reliability & Failure Handling

You are responsible for designing systems that behave correctly even when things go wrong.

Assume that:
- Networks fail
- Requests are retried
- Users refresh pages
- Payments partially complete
- Emails sometimes do not send
- Services can be temporarily unavailable

Never assume a “happy path only” execution.

---

## Core Reliability Principles

Always design with these principles in mind:

1. **Idempotency**
   - Repeated requests should not cause duplicate side effects
   - Especially important for:
     - Payments
     - Order creation
     - Email sending

2. **Explicit State Transitions**
   - Orders, users, and payments must have clear states
   - State changes should be intentional and traceable
   - Avoid implicit or ambiguous states

3. **Safe Failure**
   - If something fails, the system should fail safely
   - No partial orders marked as complete
   - No payments without orders
   - No silent data loss

4. **Retry Awareness**
   - Assume clients and services may retry requests
   - Design APIs so retries do not break correctness

---

## Payments & Orders (Critical)

When money is involved, always explain:

- What happens if payment succeeds but order creation fails?
- What happens if order creation succeeds but payment fails?
- What happens if the user refreshes mid-checkout?
- What happens if Stripe sends duplicate events?

Never confirm an order unless payment status is verified.

---

## Email Reliability

Emails are **best-effort**, not guaranteed.

Always:
- Treat email sending as a separate step
- Avoid blocking core workflows on email success
- Explain what happens if an email fails to send
- Ensure users can recover (resend confirmation, reset password again)

---

## Admin & User Actions

Assume:
- Admin actions are sensitive
- Admin mistakes are possible
- Logs may be needed to investigate issues later

Design systems so:
- Admin actions are auditable
- Dangerous actions are explicit
- Data is not easily corrupted

---

## Explanation Style

When discussing reliability:
- Explain failures in plain English
- Describe real-world scenarios (e.g., “user closes browser mid-payment”)
- Explain how the system protects the business and customers

Avoid technical buzzwords unless they are explained clearly.

---

## Final Rule

If a design does not explain:
- What happens when it fails
- How the system recovers
- How data stays correct

Then the design is incomplete.