### Test Case ID

TC_PROFILE_014

### Test Case Title

Admin log download — stepper minimum and maximum boundary values

### Feature Area

User Profile

### Priority

Low

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $ADMIN_EMAIL
- Admin profile page is open and the "Admin — Download Logs" panel is visible with "Last N minutes" selected

### Test Steps

**Minimum boundary:**

1. Note the current stepper value.
2. Click the "−" button once.
3. Read the stepper value.
4. Read whether the "−" button is enabled or disabled.

**Maximum boundary:**

5. Click the "+" button 144 times.
6. Read the stepper value.
7. Read whether the "+" button is enabled or disabled.

### Expected Result

**Minimum boundary:**

1. The current stepper value is noted (default 10).
2. The "−" button is clicked once; the value decreases by 10 (from 10 to 1, since values below 1 are not allowed, the minimum is 1).
3. The stepper value is 1 (the minimum allowed value).
4. The "−" button is disabled at value 1.

**Maximum boundary:**

5. After 144 clicks of "+" (starting from 1: 1 + 144×10 = 1441, clamped to the maximum of 1440 on the last click), the stepper value is 1440.
6. The stepper value is 1440 (the maximum allowed value).
7. The "+" button is disabled at value 1440.

Overall: The stepper enforces a minimum of 1 minute and a maximum of 1440 minutes; the decrement button disables at 1 and the increment button disables at 1440.

### Notes and Assumptions

- Tags: Regression
- Requires $ADMIN_EMAIL in `.env`.
- Clicking repeatedly may take time; use the "+" button hold or rapid-click as appropriate.
- Covers the boundary conditions of AC13.

### Defect Opportunity

- Stepper might allow values below 1 (e.g. 0 or negative).
- Stepper might allow values above 1440.
- Buttons might not become disabled at the boundary, allowing out-of-range requests.
