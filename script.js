const tip_amount = document.getElementById("tip"),
  person = document.getElementById("person"),
  perPersonTip = document.getElementById("per-person-tip"),
  totalTip = document.getElementById("total-tip"),
  customTip = document.getElementById("custom"),
  reset = document.getElementById("reset");

function calculateTip() {
  if (person.value === "" || person.value === "0") {
    document.getElementById("error").textContent = "Can't be zero";
    totalTip.textContent = "0.00";
    perPersonTip.textContent = "0.00";
    return;
  }

  let tipPercentage;
  if (customTip.value !== "") {
    tipPercentage = customTip.value;
  } else {
    const selectedTip = document.querySelector(".tip.selected");
    tipPercentage = selectedTip.textContent.replace("%", "");
  }

  let totalCount = (tip_amount.value * tipPercentage) / 100;
  let perPersonCount = totalCount / person.value;

  totalTip.textContent = totalCount.toFixed(2);
  perPersonTip.textContent = perPersonCount.toFixed(2);

  if (totalTip.textContent !== "0" && perPersonTip.textContent !== "0") {
    reset.classList.add("active");
    reset.classList.remove("btn");
  }
}

function resetValues() {
  tip_amount.value = "";
  customTip.value = "";
  person.value = "";
  totalTip.textContent = "0.00";
  perPersonTip.textContent = "0.00";
  reset.classList.remove("active");
  reset.classList.add("btn");
}

tip_amount.addEventListener("input", calculateTip);
person.addEventListener("input", calculateTip);
customTip.addEventListener("input", calculateTip);
reset.addEventListener("click", resetValues);

const tipSelection = document.querySelectorAll(".tip");
tipSelection.forEach((tip) => {
  tip.addEventListener("click", function () {
    tipSelection.forEach((tip) => {
      tip.classList.remove("selected");
    });
    this.classList.add("selected");
    calculateTip();
  });
});
