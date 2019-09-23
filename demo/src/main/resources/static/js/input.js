const letter_1 = document.getElementById("letter_1");
const letter_2 = document.getElementById("letter_2");
const letter_3 = document.getElementById("letter_3");
const letter_4 = document.getElementById("letter_4");
const letter_5 = document.getElementById("letter_5");
const word = document.getElementById("secret_word");

letter_1.addEventListener("input", f1);
letter_1.addEventListener("invalid", f2);

letter_2.addEventListener("input", f1);
letter_2.addEventListener("invalid", f2);

letter_3.addEventListener("input", f1);
letter_3.addEventListener("invalid", f2);

letter_4.addEventListener("input", f1);
letter_4.addEventListener("invalid", f2);

letter_5.addEventListener("input", f1);
letter_5.addEventListener("invalid", f2);

word.addEventListener("input", f3);
word.addEventListener("invalid", f4);

function f1() {
  // Reset msg
  this.setCustomValidity("");

  this.checkValidity();
}

function f2() {
  if (this.value === "") {
    this.setCustomValidity("Enter your guess.");
  } else {
    this.setCustomValidity("Your guess can only contain letters.");
  }
}

function f3() {
  // Reset msg
  this.setCustomValidity("");
  this.checkValidity();

  if (new Set(this.value).size !== this.value.length) {
    this.setCustomValidity("Word cannot contain repeating letters.");
  } else {
    this.setCustomValidity("");
  }
}

function f4() {
  if (this.value === "") {
    this.setCustomValidity("Enter your secret word.");
  } else if (this.value.length !== 5) {
    this.setCustomValidity("Word must have length of 5 character.");
  } else if (new Set(this.value).size !== this.value.length) {
    this.setCustomValidity("Word cannot contain repeating letters.");
  } else {
    this.setCustomValidity("Your guess can only contain letters.");
  }
}
