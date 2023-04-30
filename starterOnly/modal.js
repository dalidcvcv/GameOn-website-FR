function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.getElementById("reserve");
const modalClose = document.querySelectorAll(".close");
const btnSubmit = document.querySelector(".btn-submit");
const confirmation = document.getElementById("confirmation");
const closeBtnConf = document.getElementById("closeBtnConf");

// Elements Form
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const quantity = document.getElementById("quantity");
const birthdate = document.getElementById("birthdate");
const city = document.querySelectorAll("input[name='location']");
const checkbox1 = document.getElementById("checkbox1");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
  form.style.display = "block";
  document.body.style.position = "fixed";
}

// Close modal
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

function closeModal() {
  modalbg.style.display = "none";
  document.body.style.position = "initial";
}

closeBtnConf.style.display = "none";
confirmation.style.display = "none";

function showError(input, message) {
  const errorMsg = input.parentElement.querySelector(".error_message");
  errorMsg.innerText = message;
  errorMsg.style.display = 'block';

  if (input.type === 'text' || 'email' || 'date') {
      const textControl = input.parentElement.querySelector(".text-control")
      input.classList.add("input-error");
  }
}

function hideError(input) {
  const errorMsg = input.parentElement.querySelector(".error_message");
  errorMsg.innerText = '';
  errorMsg.style.display = 'none';

  if (input.type === 'text' || 'email' || 'date') {
      const textControl = input.parentElement.querySelector(".text-control")
      input.classList.remove("input-error");
  }
}

// Form verification
let validated = true;

// Checking the first name field.
function checkFirst() {
  if (first.value.length <= 1) {
      showError(first, "Le prénom doit contenir plus d'un caractère");
      validated = false;
  } else if (!/^[A-Za-zÀ-ÿ'-]+$/.test(first.value)) {
      showError(first, "Veuillez saisir un prénom valide");
      validated = false;
  } else {
      hideError(first);
  }
}
first.addEventListener('input', checkFirst);

// Checking the last name field.
function checkLast() {
  if (last.value.length <= 1) {
      showError(last, "Le nom doit contenir plus d'un caractère");
      validated = false;
  } else if (!/^[A-Za-zÀ-ÿ'-]+$/.test(last.value)) {
      showError(last, "Veuillez saisir un nom valide");
      validated = false;
  } else {
      hideError(last);
  }
}
last.addEventListener('input', checkLast);

// Checking the email field.
function checkEmail() {
  if (email.value === '') {
      showError(email, "Veuillez saisir une adresse email");
      validated = false;
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
      showError(email, "Veuillez saisir une adresse email valide");
      validated = false;
  } else {
      hideError(email);
  }
}
email.addEventListener('input', checkEmail);

// Checking the birthdate field.
function checkBirthdate() {
  if (birthdate.value === '') {
      showError(birthdate, 'Veuillez saisir votre date de naissance');
      validated = false;
  } else {
      hideError(birthdate);
  }
}
birthdate.addEventListener('input', checkBirthdate);

// Checking the quantity field.
function checkQuantity() {
  if (quantity.value === '' || quantity.value < 0 || quantity.value > 99) {
      showError(quantity, "Veuillez saisir un nombre entre 0 et 99");
      validated = false;
  } else {
      hideError(quantity);
  }
}
quantity.addEventListener('input', checkQuantity);

// Checking the city buttons.
function checkCity() {
  let CityChecked = false;
  city.forEach((c) => {
      if (c.checked) {
          CityChecked = true;
      }
  });
  if (!CityChecked) {
      showError(city[0], "Veuillez séléctionner une ville");
      validated = false;
  } else {
      hideError(city[0]);
  }
}

// Checking if terms have been accepted
function checkTermsAccepted() {
  if (!checkbox1.checked) {
      showError(checkbox2, "Veuillez accepter les termss et conditions");
      validated = false;
  } else {
      hideError(checkbox2);
  }
}

//confirmation message
function confirmMsg() {
  form.style.display = "none";
  closeBtnConf.style.display = "block";
  confirmation.style.display = "flex";
  closeBtnConf.addEventListener("click", closeModal);
}

//validation all inputs before submit
function validate(e) {
  e.preventDefault();
  validated = true;
  checkFirst();
  checkLast();
  checkQuantity();
  checkEmail();
  checkBirthdate();
  checkCity();
  checkTermsAccepted();
  if (validated) {
      confirmMsg();
      form.reset();
  }
}

form.addEventListener('submit', validate);