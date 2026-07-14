# User Story: Sign Up Form

**As a** new visitor to the OneStyle store,  
**I want to** create an account using the sign-up form,  
**So that** I can access personalised features such as order history, wishlist, and checkout.

---

## Acceptance Criteria

### AC1 - Accessing the Sign Up form from the Login page

- Given I am on the Login page (`/login`)
- When I click the "Sign Up" link in the "Don't have an account? Sign Up" paragraph
- Then the Sign Up form is displayed on the same page (`/login`)
- And the heading changes to "Sign Up"

### AC1b - Accessing the Sign Up form from the Landing page

- Given I am on the Landing page (`/`)
- When I click the "Sign Up" button in the hero section
- Then I am navigated to the Sign Up form
- And the Sign Up form is displayed and ready to fill in

### AC2 - Sign Up form fields

- The form must contain the following fields:
  - Name (text, required, placeholder: "Your Name")
  - Email (email, required, placeholder: "Email Address")
  - Gender (dropdown, options: Select Gender / Male / Female / Other / Prefer not to say)
  - Mobile Number (tel, required, placeholder: "Mobile Number")
  - Password (password, required, placeholder: "Password")
  - Confirm Password (password, required, placeholder: "Confirm Password")
  - Address (text, optional, placeholder: "Address (optional)")
- A "Sign Up" submit button must be present

### AC3 - Successful registration

- Given I fill in all required fields with valid data
- And I enter matching values in Password and Confirm Password
- When I click the "Sign Up" button
- Then my account is created
- And I am redirected to the Landing page (`/`)
- And the navbar shows Profile, My Orders, and Logout (authenticated state)

### AC4 - Toggle back to Login

- Given the Sign Up form is displayed
- When I click the "Login" link in the "Already have an account? Login" paragraph
- Then the Login form is displayed again

### AC5 - Required field validation

- Given I submit the form with one or more required fields empty
- Then the form must not be submitted
- And an appropriate validation message must be shown for each empty required field

### AC6 - Password confirmation mismatch

- Given I enter different values in Password and Confirm Password
- When I click the "Sign Up" button
- Then the form must not be submitted
- And an error message indicating the passwords do not match must be shown

### AC7 - Duplicate email

- Given I attempt to register with an email address already associated with an existing account
- When I click the "Sign Up" button
- Then the form must not be submitted
- And an error message indicating the email is already in use must be shown

### AC8 - Invalid email format

- Given I enter a value that is not a valid email address in the Email field
- When I click the "Sign Up" button
- Then the form must not be submitted
- And an appropriate validation error must be shown
