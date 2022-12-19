import "./style.css";

let billAmt = document.querySelector("#Bill");
let peopleNums = document.querySelector("#person");
let finalAmt = document.querySelector("#finalAmt");
let tipPercent = document.querySelectorAll(".tip-percent");
let tipAmt = document.querySelector("#tip-Amt");
let customInput = document.querySelector("#custom-input");
let resetBtn = document.querySelector("#btn-reset");
let pattern1 = new RegExp(/^\d+$/);
let pattern2 = new RegExp(/^[1-9][0-9]*$/);
let billInpErrtxt = document.querySelector("#Bill-input-error");
let billzeroIntErrtxt = document.querySelector("#input-0-error");
let peopleInpErrtxt = document.querySelector("#People-input-error");
let peopleInpZeroErrtxt = document.querySelector("#People-input-error-0");

//clearing input fields on refresh
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  billAmt.value = "";
  peopleNums.value = "";
  customInput.value = "";
}

billAmt.addEventListener("input", billAmtFunc);
customInput.addEventListener("input", customInputFunc);
peopleNums.addEventListener("input", peopleNumFunc);
tipPercent.forEach((tipsPer) => {
  tipsPer.addEventListener("click", handleClick);
});

tipAmt.value = `$${(0.0).toFixed(2)}`;
finalAmt.value = `$${(0.0).toFixed(2)}`;

let billValue = 0.0;
let peopleCount = 0;
let tipValue = 0;
let customValue = 0;

function billAmtFunc() {
  billValue = parseFloat(billAmt.value);

  if (pattern1.test(billAmt.value) === false) {
    billInpErrtxt.classList.remove("hidden");
    billAmt.style.border = "2px solid red";
  } else {
    billInpErrtxt.classList.add("hidden");
    billAmt.style.border = "2px solid #1fbda6";
  }

  if (isNaN(billValue) || billAmt.value == "") {
    billzeroIntErrtxt.classList.add("hidden");
  }

  if (!pattern2.test(billValue)) {
    billzeroIntErrtxt.classList.remove("hidden");
    billAmt.style.border = "2px solid red";
  } else {
    billzeroIntErrtxt.classList.add("hidden");
    billAmt.style.border = "2px solid #1fbda6";
  }

  if (isNaN(billValue)) {
    billzeroIntErrtxt.classList.add("hidden");
  }
  if (billAmt.value == "") {
    billInpErrtxt.classList.add("hidden");
    billAmt.style.border = "none";
  }

  calculateTip();
}

function customInputFunc(e) {
  customValue = parseFloat(e.target.value);
  calculateTip();
}

function peopleNumFunc() {
  peopleCount = parseFloat(peopleNums.value);

  if (pattern1.test(peopleNums.value) === false) {
    peopleInpErrtxt.classList.remove("hidden");
    peopleNums.style.border = "2px solid red";
  } else {
    peopleInpErrtxt.classList.add("hidden");
    peopleNums.style.border = "2px solid #1fbda6";
  }

  if (isNaN(peopleCount) || peopleNums.value == "") {
    peopleInpZeroErrtxt.classList.add("hidden");
  }

  if (!pattern2.test(peopleCount)) {
    peopleInpZeroErrtxt.classList.remove("hidden");
    peopleNums.style.border = "2px solid red";
  } else {
    peopleInpZeroErrtxt.classList.add("hidden");
    peopleNums.style.border = "2px solid #1fbda6";
  }

  if (isNaN(peopleCount)) {
    peopleInpZeroErrtxt.classList.add("hidden");
  }
  if (peopleNums.value == "") {
    peopleInpErrtxt.classList.add("hidden");
    peopleNums.style.border = "none";
  }

  calculateTip();
}

function handleClick(e) {
  tipPercent.forEach(function (val) {
    val.classList.remove("bg-[#1fbda6]");
    if (e.target.innerHTML == val.innerHTML) {
      console.log(e);
      val.classList.add("bg-[#1fbda6]");
      tipValue = parseFloat(val.children[0].innerHTML);
    }
  });
  calculateTip();
}

function calculateTip() {
  if (Number.isNaN(billValue) || Number.isNaN(peopleCount)) {
    finalAmt.textContent = "$0.00";
  }

  if (isNaN(peopleCount)) {
    tipAmt.textContent = "$0.00";
  }

  let finalAmount = billValue / peopleCount;

  if (finalAmount === Infinity) {
    finalAmt.textContent = "$0.00";
  } else if (finalAmount !== Infinity) {
    finalAmt.textContent = `$${finalAmount.toFixed(2)}`;
  }

  if (isNaN(finalAmount)) {
    finalAmt.textContent = "$0.00";
  }

  function percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2);
  }

  if (tipValue > 0 && peopleCount > 0) {
    let tip = percentage(tipValue, finalAmount);
    tipAmt.textContent = `$${tip}`;

    if (isNaN(tip)) {
      tipAmt.textContent = "$0.00";
      finalAmount.textContent = "$0.00";
    }

    if (finalAmount === Infinity) {
      finalAmt.textContent = "hello";
    }

    finalAmt.textContent = `$${(Number(finalAmount) + Number(tip)).toFixed(2)}`;
  }

  // custom input

  if (peopleCount > 0 && customValue > 0) {
    let customTip = percentage(customValue, finalAmount);
    tipAmt.textContent = `$${customTip}`;
    finalAmount = Number(finalAmount) + Number(customTip);
    finalAmt.textContent = `$${finalAmount.toFixed(2)}`;
  }

  if (isNaN(customValue)) {
    tipAmt.textContent = "$0.00";
  }

  if (isNaN(billValue)) {
    tipAmt.textContent = "$0.00";
    finalAmt.textContent = "$0.00";
  }
}

resetBtn.addEventListener("click", () => {
  tipAmt.textContent = "$0.00";
  finalAmt.textContent = "$0.00";
  peopleNums.value = "";
  peopleNums.value = "";
  customInput.value = "";
});
