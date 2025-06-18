export const validatePasswordsColor = (pass, repeat) => {
  if (!pass || !repeat) return;
  const passTxt = pass.value.trim();
  const repeatTxt = repeat.value.trim();

  pass.classList.remove("match", "mismatch");
  repeat.classList.remove("match", "mismatch");

  if (!passTxt || !repeatTxt) return;

  if (passTxt === repeatTxt) {
    pass.classList.add("match");
    repeat.classList.add("match");
  } else {
    pass.classList.add("mismatch");
    repeat.classList.add("mismatch");
  }
};
