document.addEventListener("DOMContentLoaded", function () {
  const taxForm = document.getElementById("tax-form");
  const grossIncomeInput = document.getElementById("gross-income");
  const extraIncomeInput = document.getElementById("extra-income");
  const deductionsInput = document.getElementById("deductions");
  const ageSelect = document.getElementById("age");
  const errorIcons = document.querySelectorAll(".error-icon");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("close-modal");

  taxForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    if (!validateInputs()) {
      return;
    }

    const grossIncome = parseFloat(grossIncomeInput.value) || 0;
    const extraIncome = parseFloat(extraIncomeInput.value) || 0;
    const deductions = parseFloat(deductionsInput.value) || 0;
    const age = ageSelect.value;

    const totalIncome = grossIncome + extraIncome - deductions;

    let taxAmount = 0;
    if (totalIncome > 800000) {
      switch (age) {
        case "<40":
          taxAmount = 0.3 * (totalIncome - 800000);
          break;
        case ">=40 && <60":
          taxAmount = 0.4 * (totalIncome - 800000);
          break;
        case ">=60":
          taxAmount = 0.1 * (totalIncome - 800000);
          break;
        default:
          break;
      }
    }

    const overallIncome = totalIncome - taxAmount;

    document.getElementById("overall-income").textContent =
      overallIncome.toLocaleString("en-IN", { maximumFractionDigits: 2 });
    document
      .getElementById("tax-amount")
      .getElementsByTagName("span")[0].textContent = taxAmount.toLocaleString(
      "en-IN",
      { maximumFractionDigits: 2 }
    );

    modal.classList.add("show");
  });

  closeModalBtn.addEventListener("click", function () {
    modal.classList.remove("show");
  });

  function validateInputs() {
    let isValid = true;

    if (
      grossIncomeInput.value.trim() === "" ||
      isNaN(parseFloat(grossIncomeInput.value))
    ) {
      showError(grossIncomeInput);
      isValid = false;
    }

    if (
      extraIncomeInput.value.trim() === "" ||
      isNaN(parseFloat(extraIncomeInput.value))
    ) {
      showError(extraIncomeInput);
      isValid = false;
    }

    if (
      deductionsInput.value.trim() === "" ||
      isNaN(parseFloat(deductionsInput.value))
    ) {
      showError(deductionsInput);
      isValid = false;
    }

    if (ageSelect.value === "") {
      showError(ageSelect);
      isValid = false;
    }

    return isValid;
  }

  function showError(input) {
    const errorIcon = input.nextElementSibling;

    errorIcon.style.display = "block";
  }

  function clearErrors() {
    errorIcons.forEach(function (icon) {
      icon.style.display = "none";
    });
  }
});
