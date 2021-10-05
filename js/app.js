const numberInputs = document.querySelectorAll(".calculator-inputs [type=number]");
const toggleListBtn = document.querySelector(".calculator-form__select");
const packageList = document.querySelector(".calculator-form__list");
const packageListItems = document.querySelector(".calculator-form__list").children;
const checkInputs = document.querySelectorAll(".calculator-inputs [type=checkbox]");
const resultList = document.querySelector(".calculator-results__list");
const totalValue = document.querySelector(".calculator-results__summary");

numberInputs.forEach(function (item) {
   item.addEventListener("click", calculateQuantity);
   item.addEventListener("keyup", calculateQuantity);
});

toggleListBtn.addEventListener("click", toggleList);

for (let i = 0; i < packageListItems.length; i++) {
    packageListItems[i].addEventListener("click",function () {
       const toShowElement = resultList.querySelector(`[data-id=${packageListItems[i].dataset.id}]`);
       toShowElement.querySelector(".calculator-results__select").innerText = packageListItems[i].innerText;
       toggleListBtn.innerText = packageListItems[i].innerText;
       toShowElement.classList.remove("d-none");
       toShowElement.dataset.result = packageListItems[i].dataset.price;
       toShowElement.querySelector(".calculator-results__price").innerText = `$${toShowElement.dataset.result}`;
       toggleList();
       calculateTotal();
    });
}

checkInputs.forEach(function (item) {
    item.addEventListener("click", checkboxResult);
});

function calculateQuantity() {
    const toShowElement = resultList.querySelector(`[data-id=${this.id}]`);
    toShowElement.classList.remove("d-none");
    const value = parseFloat(this.value);
    if (value >= 1) {
        if (value <= 100000) {
            const result = value * parseFloat(this.dataset.price);
            const operation = toShowElement.querySelector(".calculator-results__calc");
            const calcResult = toShowElement.querySelector(".calculator-results__price");
            operation.innerText = `${value} * $${this.dataset.price}`;
            toShowElement.dataset.result = result.toString();
            calcResult.innerText = `$${result}`;
            calculateTotal();
        }
    }
    else {
        toShowElement.classList.add("d-none");
    }
}

function toggleList() {
    if (packageList.classList.contains("d-none")) {
        packageList.classList.remove("d-none");
        toggleListBtn.classList.add("calculator-form__selectrotate");
    }
    else {
        packageList.classList.add("d-none");
        toggleListBtn.classList.remove("calculator-form__selectrotate");
    }
}

function checkboxResult() {
    const toShowElement = resultList.querySelector(`[data-id=${this.id}]`);
    elementAction(toShowElement, this.dataset.price);
    calculateTotal();
}

function elementAction(element, price) {
    if (element.classList.contains("d-none")) {
        element.classList.remove("d-none");
        element.dataset.result = price;
        element.querySelector(".calculator-results__price").innerText = `$${element.dataset.result}`;
    }
    else {
        element.classList.add("d-none");
        element.dataset.result = "0";
    }
}

function calculateTotal() {
    let summaryValue = 0;
    for (let i = 0; i < resultList.children.length; i++) {
        if (!(resultList.children[i].classList.contains("d-none"))) {
            summaryValue += parseFloat(resultList.children[i].dataset.result);
        }
    }
    totalValue.innerText = `$${summaryValue}`;
}