# Planning for browser form

## Does the program have a user interace?

- Yes. Header, body and footer. Header is simple centered title. Body contains size appropriate centered form. Footer is standard.
- Form is a signup form, with:
  - Title.
  - Form fields section, containing:
    - Email
    - Country
    - Postal code
    - Password
    - Password confirmation
  - Submit button at bottom.
    - Submit button doesn't actually submit (prevent default behavior), but it does validate the form fields.
  - Form fields also validate onBlur, highlighted with red and a custom error when incorrect.
  - Set noValidate attribute on the HTML form element to prevent automatic HTML validation. However, checkValidity() method in JS still works, so still set all the different attributes on the HTML form elements.

## What inputs will the program have and where do they come from?

- All user input besides country, which comes from a predetermined set of options. Each field is validated against a corresponding regex.

## What's the desired output?

- Beautiful, responsive form that accepts all field inputs and correctly displays errors when any fields are not correctly completed.

## What are steps to achieve output?

- Design the page and add the form and all fields to make the UI look great.
- Add error validation onBlur:
  - Email: Event listener on element for blur. Initially set custom error to "", then check validity and report custom error if invalid. Otherwise, custom error is "". Separate event listener on input that sets custom error to "" (ensures no error when typing, which can be annoying).
  - Country:
    - Install country list and postal code validater libraries (postal-codes-js i18n-iso-countries).
    - Only specific validation for country is that it has to have a selection, maybe do this onBlur, but otherwise definitely on form submission. If there is value in postal code API, will also re-check validity there.
  - Postal code:
    - Event listener on element for blur. Initially set custom error to "", then check validity and report custom error if invalid. Validity will be completness if no country selected. If country selected, then will also check for validity with postal code API.
    - Otherwise, custom error is "". Separate event listener on input that sets custom error to "" (ensures no error when typing, which can be annoying).
  - Password:
    - Event listener on element for blur. Initially set custom error to "", then check validity and report custom error if invalid. Otherwise, custom error is "". Separate event listener on input that sets custom error to "" (ensures no error when typing, which can be annoying).
    - Also check for matching with second password field and throw different custom error.
- Submit button:
  - Rechecks validity and reports relevant custom errors (should only be empty fields given error validation beforehand)
