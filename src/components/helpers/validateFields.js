const regExpSurveyName =/^[A-Za-z0-9\s?]+$/;
const regExpImage = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const validateSurveyName = (field) => {
    if (regExpSurveyName.test(field) && field.trim() !== "") {
        return true;
    } else {
        console.log("ValidateName");
      return false;
    }
  };

  export const validateImage = (field) => {
    if (
      regExpImage.test(field) 

    ) {
      return true;
    } else {
        console.log("ValidateImg");
      return false;
    }
  };

