# FarmChain OTP & Authentication Verification Script

This document specifies the exact test coverage and procedures for verifying FarmChain's authentication system under **Part B**.

---

## 1. Automated Architecture Verification

### Providers Configured in `src/lib/otp/`
- **`DemoOtpProvider`**:
  - Enforces `VITE_DEMO_PHONES` (`9849201842`, `9876543210`).
  - Rejects unknown numbers with: `"SMS login is not switched on in this demo. Please use email or Google."`
  - Accepts ONLY `123456`.
  - Rejects wrong codes with plain language: `"Wrong code. Try again."`
  - Enforces non-admin privilege (never assigns `admin` role in demo mode).
  - Displays visible "Demo mode" banner.
- **`SupabaseOtpProvider`**:
  - Direct integration with `supabase.auth.signInWithOtp` and `verifyOtp({ type: 'sms' })`.
  - Activates when `VITE_OTP_MODE="supabase"`.
- **`OffOtpProvider`**:
  - Safe fallback when phone OTP is toggled off (`VITE_OTP_MODE="off"`).

---

## 2. Test Cases and Manual Verification Steps

### Test Case 1: Correct Code Login
- **Target**: Mobile number `9849201842` (Demo Farmer Ramesh Reddy).
- **Steps**:
  1. Open Login modal by clicking "Login" in Navbar or any gated action ("Sell your crop").
  2. Ensure "Phone OTP" tab is selected.
  3. Enter `9849201842` and tap "Send 6-Digit Code".
  4. Notice the 6-digit OTP fields appear with focus on digit 1.
  5. Enter `123456` or paste `123456`.
- **Expected Result**:
  - Auto-advances through digits.
  - Submits code automatically upon 6th digit.
  - Success badge displays: "Welcome, Ramesh Reddy (FARMER)".
  - Role redirects to `/farmer` (My Farm & Crops).

---

### Test Case 2: Wrong Code Handling
- **Target**: Mobile number `9849201842`.
- **Steps**:
  1. On OTP screen, enter `654321` or any code other than `123456`.
- **Expected Result**:
  - Form displays plain language error: `"Wrong code. Try again."`
  - User remains on the OTP screen and can re-enter.

---

### Test Case 3: 5-Attempt Lockout (Brute Force Protection)
- **Target**: Security guard against automated guessing.
- **Steps**:
  1. Enter an incorrect code (`111111`) 5 consecutive times.
- **Expected Result**:
  - On the 5th failed attempt, system engages lockout: `"Too many wrong attempts. Locked for 60 seconds."`
  - Submit and Resend buttons are disabled.
  - Countdown timer counts down from 60s before allowing any new attempt.

---

### Test Case 4: 30s Resend Cooldown
- **Target**: Prevent SMS rate limiting and spamming.
- **Steps**:
  1. Upon dispatching an OTP, check the resend link below the input.
- **Expected Result**:
  - Displays: `Resend code in 30s` (counting down to 0).
  - While timer > 0, button cannot be tapped.
  - At 0s, button switches to: `Resend code` (with refresh icon).

---

### Test Case 5: Session Refresh Persistence (Zero Flash)
- **Target**: Session continuity across browser page reloads.
- **Steps**:
  1. Log in as either Demo Farmer or Demo Buyer.
  2. Refresh the browser page (`F5` or `Ctrl+R`).
- **Expected Result**:
  - Session is read synchronously from localStorage.
  - Navbar immediately reflects logged-in state ("Ramesh Reddy" or "Priya Sharma").
  - Current dashboard remains active with NO flash of the login modal.

---

### Test Case 6: Role-Based Redirect & Admin Protection
- **Target**: Separation of Farmer, Buyer, and Admin privileges.
- **Steps**:
  1. Verify login modal contains two demo buttons: **"Try as demo Farmer"** and **"Try as demo Buyer"**.
  2. Verify there is **NO demo button for Admin**.
  3. Attempting to navigate directly to `/admin` as a non-admin shows "Admin Area Restricted" with return home option.
- **Expected Result**:
  - Non-admin cannot escalate privileges to Admin.
  - Farmer sees farmer-centric nav (My Farm, My Crops, My Orders, Today's Prices, Best Time to Sell).
  - Buyer sees buyer-centric nav (Buy Fresh Crops, My Orders, Cart, Today's Prices).
