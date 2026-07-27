# User Story: User Registration (Sign Up)

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
- When I click the "Sign Up" button in the hero section (only visible to unauthenticated users)
- Then I am navigated to `/login` with the Sign Up form pre-selected
- And the Sign Up form is displayed and ready to fill in

### AC2 - Sign Up form fields

- The form must contain the following fields:
  - Name (text, required, placeholder: "Your Name", minimum 3 characters)
  - Email (email, required, placeholder: "Email Address")
  - Gender (dropdown, options: Select Gender / Male / Female / Other / Prefer not to say, required)
  - Mobile Number (tel, required, placeholder: "Mobile Number")
  - Password (password, required, placeholder: "Password", minimum 6 characters)
  - Confirm Password (password, required, placeholder: "Confirm Password")
  - Address (text, optional, placeholder: "Address (optional)")
- A "Sign Up" submit button must be present
- While submission is in progress, the button label changes to "Creating Account..." and is disabled

### AC3 - Successful registration

- Given I fill in all required fields with valid data
- And I enter matching values in Password and Confirm Password
- When I click the "Sign Up" button
- Then my account is created
- And a toast notification confirms "Welcome, [name]! Account created."
- And I am redirected to the Landing page (`/`)
- And the navbar shows Profile, My Orders, and Logout buttons (authenticated state)

### AC4 - Toggle back to Login

- Given the Sign Up form is displayed
- When I click the "Login" link in the "Already have an account? Login" paragraph
- Then the Login form is displayed on the same page (`/login`)

### AC5 - Required field validation

- Given I submit the form with one or more required fields empty
- Then the form must not be submitted
- And an inline validation message "Required" is shown for each empty required field

### AC6 - Name minimum length validation

- Given I enter a name with fewer than 3 characters in the Name field
- When the field loses focus or I click "Sign Up"
- Then an inline validation error "Must be 3 characters or more" is shown

### AC7 - Invalid email format

- Given I enter a value that is not a valid email address in the Email field
- When the field loses focus or I click "Sign Up"
- Then an inline validation error "Invalid email address" is shown
- And the form is not submitted

### AC8 - Gender selection required

- Given I do not select a gender from the dropdown
- When I click "Sign Up"
- Then an inline validation error "Please select a gender" is shown
- And the form is not submitted

### AC9 - Invalid mobile number format

- Given I enter a value that does not match the expected mobile format (7–20 characters, digits and +, spaces, brackets, dots, dashes only)
- When the field loses focus or I click "Sign Up"
- Then an inline validation error "Enter a valid mobile number" is shown

### AC10 - Password minimum length validation

- Given I enter a password with fewer than 6 characters
- When the field loses focus or I click "Sign Up"
- Then an inline validation error "Must be 6 characters or more" is shown

### AC11 - Password confirmation mismatch

- Given I enter different values in Password and Confirm Password
- When I click the "Sign Up" button
- Then the form must not be submitted
- And an inline error message "Passwords do not match" is shown on the Confirm Password field

### AC12 - Duplicate email

- Given I attempt to register with an email address already associated with an existing account
- When I click the "Sign Up" button
- Then a toast error notification "Email already registered." is displayed
- And no new account is created

### AC13 - Redirect when already authenticated

- Given I am already logged in
- When I navigate to `/login`
- Then I am automatically redirected to the home page (`/`)
