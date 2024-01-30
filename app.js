console.log("Working");

let to_amount = document.querySelector("#to_amount");
let from_amount = document.querySelector("#from_amount");
let from_country = document.querySelector("#select_from")
let to_country = document.querySelector("#select_to")

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let list = document.querySelectorAll(".contents select");

for (let country_names of list) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (country_names.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (country_names.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    country_names.append(newOption);
  }

  country_names.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

from_amount.addEventListener("change", (evt) =>{
    updateExchangeRate(evt.target);
})

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

async function updateExchangeRate(element){
  let amount = from_amount.value;
   const URL = `${BASE_URL}/${from_country.value.toLowerCase()}/${to_country.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[to_country.value.toLowerCase()];
  let finalAmount = amount * rate;
  to_amount.value = finalAmount;
  to_amount.innerText = finalAmount;
}