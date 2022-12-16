import "./style.css";

let billAmt = document.querySelector("#Bill");
let peopleNums = document.querySelector("#person");
let finalAmt = document.querySelector("#finalAmt");
let tipPercent = document.querySelectorAll(".tip-percent");
let tipAmt = document.querySelector("#tip-Amt");

//clearing input fields on refresh
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  billAmt.value = "";
  peopleNums.value = "";
}

billAmt.addEventListener("input", billAmtFunc);
peopleNums.addEventListener("input", peopleNumFunc);
tipPercent.forEach((tipsPer) => {
  tipsPer.addEventListener("click", handleClick);
});

tipAmt.value = `$${(0.0).toFixed(2)}`;
finalAmt.value = `$${(0.0).toFixed(2)}`;

let billValue = 0.0;
let peopleCount = 0;
let tipValue = 0;

function billAmtFunc() {
  billValue = parseFloat(billAmt.value);
  calculateTip();
}

function peopleNumFunc() {
  peopleCount = parseFloat(peopleNums.value);
  console.log(peopleCount);

  calculateTip();
}

function handleClick(e) {
  tipPercent.forEach(function (val) {
    val.classList.remove("bg-[#1fbda6]");
    if (e.target.innerHTML == val.innerHTML) {
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

  if (tipValue > 0) {
    let tip = percentage(tipValue, finalAmount);
    tipAmt.textContent = `$${tip}`;
    finalAmt.textContent = `$${(Number(finalAmount) + Number(tip)).toFixed(2)}`;
  }
}
