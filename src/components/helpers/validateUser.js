const regExpUsername = /^[A-Za-z\s?].{6,100}$/;
const regExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,100}$/;

export const validateUsername = (field) => {
  if (regExpUsername.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (field) => {
  if (regExpEmail.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (field) => {
  if (regExpPassword.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};