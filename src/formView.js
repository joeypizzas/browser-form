// JS for form view

import countries from "i18n-iso-countries";
import postalCodes from "postal-codes-js";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
const allCountries = countries.getNames("en");

export function initFormListeners() {
  const root = document.documentElement;
  const inputs = document.querySelectorAll("input");
  const emailInput = document.querySelector("#email-input");
  const select = document.querySelector("select");
  const postalInput = document.querySelector("#postal-input");
  const passwordInput = document.querySelector("#password-input");
  const confirmPasswordInput = document.querySelector(
    "#confirm-password-input",
  );
  const button = document.querySelector("button");

  inputs.forEach((input) => {
    input.addEventListener("mouseover", () => {
      input.style.borderColor =
        getComputedStyle(root).getPropertyValue("--border-hover");
    });
    input.addEventListener("mouseout", () => {
      input.style.borderColor =
        getComputedStyle(root).getPropertyValue("--border");
    });
  });

  emailInput.addEventListener("blur", () => {
    emailInput.setCustomValidity("");
    if (!emailInput.checkValidity()) {
      emailInput.setCustomValidity("Please enter an email address.");
      emailInput.reportValidity();
    } else {
      emailInput.setCustomValidity("");
    }
  });
  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity("");
  });

  for (const country of Object.values(allCountries)) {
    const newCountryOption = document.createElement("option");
    const countryKey = Object.keys(allCountries).find(
      (key) => allCountries[key] === country,
    );
    newCountryOption.value = countryKey;
    newCountryOption.textContent = country;
    select.appendChild(newCountryOption);
  }

  select.addEventListener("mouseover", () => {
    select.style.borderColor =
      getComputedStyle(root).getPropertyValue("--border-hover");
  });
  select.addEventListener("mouseout", () => {
    select.style.borderColor =
      getComputedStyle(root).getPropertyValue("--border");
  });
  select.addEventListener("blur", () => {
    select.setCustomValidity("");
    if (!select.checkValidity()) {
      select.setCustomValidity("Please select a country.");
      select.reportValidity();
    } else {
      select.setCustomValidity("");
    }
  });
  select.addEventListener("change", () => {
    select.blur();
    select.style.color =
      getComputedStyle(root).getPropertyValue("--text-primary");
  });

  postalInput.addEventListener("blur", () => {
    postalInput.setCustomValidity("");
    if (select.value === "") {
      postalInput.setCustomValidity("Please select a country.");
    } else if (select.value != "" && !postalInput.checkValidity()) {
      postalInput.setCustomValidity("Please enter a postal code.");
    } else if (postalCodes.validate(select.value, postalInput.value) !== true) {
      postalInput.setCustomValidity(
        `Please enter a valid postal code for ${select.options[select.selectedIndex].text}`,
      );
    } else {
      postalInput.setCustomValidity("");
    }
    postalInput.reportValidity();
  });
  postalInput.addEventListener("input", () => {
    postalInput.setCustomValidity("");
  });

  passwordInput.addEventListener("blur", () => {
    passwordInput.setCustomValidity("");
    if (!passwordInput.checkValidity()) {
      passwordInput.setCustomValidity("Your password must be 10+ characters.");
    } else if (
      passwordInput.value !== confirmPasswordInput.value &&
      confirmPasswordInput.value !== ""
    ) {
      passwordInput.setCustomValidity("Both password fields must match.");
    } else {
      passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
  });
  passwordInput.addEventListener("input", () => {
    passwordInput.setCustomValidity("");
  });

  confirmPasswordInput.addEventListener("blur", () => {
    confirmPasswordInput.setCustomValidity("");
    if (!confirmPasswordInput.checkValidity()) {
      confirmPasswordInput.setCustomValidity(
        "Your password must be 10+ characters.",
      );
    } else if (
      passwordInput.value !== confirmPasswordInput.value &&
      passwordInput.value !== ""
    ) {
      confirmPasswordInput.setCustomValidity(
        "Both password fields must match.",
      );
    } else {
      confirmPasswordInput.setCustomValidity("");
    }
    confirmPasswordInput.reportValidity();
  });
  confirmPasswordInput.addEventListener("input", () => {
    confirmPasswordInput.setCustomValidity("");
  });

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor =
      getComputedStyle(root).getPropertyValue("--button-hover");
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor =
      getComputedStyle(root).getPropertyValue("--button");
  });
  button.addEventListener("mousedown", () => {
    button.style.backgroundColor =
      getComputedStyle(root).getPropertyValue("--button-click");
  });
  button.addEventListener("mouseup", () => {
    button.style.backgroundColor =
      getComputedStyle(root).getPropertyValue("--button-hover");
  });
}
