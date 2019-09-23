function set_secret_word_UI3(str1, str2) {
  // User chooses computer's secret word
  document.getElementById("comp_letter_1").value = str1.charAt(0);
  document.getElementById("comp_letter_2").value = str1.charAt(1);
  document.getElementById("comp_letter_3").value = str1.charAt(2);
  document.getElementById("comp_letter_4").value = str1.charAt(3);
  document.getElementById("comp_letter_5").value = str1.charAt(4);

  document.getElementById("user_letter_1").value = str2.charAt(0);
  document.getElementById("user_letter_2").value = str2.charAt(1);
  document.getElementById("user_letter_3").value = str2.charAt(2);
  document.getElementById("user_letter_4").value = str2.charAt(3);
  document.getElementById("user_letter_5").value = str2.charAt(4);
}
