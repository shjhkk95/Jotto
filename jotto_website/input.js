const letter_1 = document.getElementById("letter_1");
const letter_2 = document.getElementById("letter_2");
const letter_3 = document.getElementById("letter_3");
const letter_4 = document.getElementById("letter_4");
const letter_5 = document.getElementById("letter_5");


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

// TODO: Repeating letters to check

function f1(){
  // Reset msg
  this.setCustomValidity("");
  /*
  if(this.value===letter_1.value){
    this.setCustomValidity("Repeating!!!");
  }
  */
  this.checkValidity();
  
}

function f2(){
  if (this.value === "") {
    this.setCustomValidity("Enter your guess." );

  } 
  else {
    this.setCustomValidity("Your guess can only contain letters.");
  }
}

