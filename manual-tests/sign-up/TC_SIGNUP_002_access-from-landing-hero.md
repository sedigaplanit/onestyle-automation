# TC_SIGNUP_002 - Access Sign Up Form from Landing Page Hero Button

## Test Case ID

TC_SIGNUP_002

## Test Case Title

Access the Sign Up form by clicking the "Sign Up" button in the landing page hero section

## Feature Area

Sign Up

## Priority

High

## Preconditions

- User is not logged in
- Browser is open

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/`
2. Verify the Landing page loads with the hero section visible
3. Locate the three hero CTA buttons: "Shop Now", "Sign Up", "Learn More"
4. Click the "Sign Up" button

## Expected Result

1. The Landing page loads at `/` with the hero section displaying heading "Discover New Collections"
2. Hero section is visible with three buttons: Shop Now, Sign Up, Learn More (Learn More has an arrow icon)
3. The "Sign Up" button is visible in the hero section
4. Clicking "Sign Up" navigates to the Sign Up form:
   - The Sign Up form is displayed and ready to fill in
   - Heading "Sign Up" is visible
   - All Sign Up form fields are accessible (Name, Email, Gender, Mobile Number, Password, Confirm Password, Address)
   - A "Sign Up" submit button is present

**Overall:** A visitor can reach the Sign Up form directly from the landing page hero without going through the Login page first.

## Notes and Assumptions

- The exact destination (URL and behaviour) of the "Sign Up" hero button should be verified — it may navigate to `/login` with the Sign Up form toggled, or to another route
- If the button navigates to `/login` with the Login form shown instead of Sign Up, that is a defect

## Defect Opportunity

- "Sign Up" hero button may navigate to the Login form (default state) instead of the Sign Up form — destination and toggle state unverified
