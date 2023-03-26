const regExpSurveyName = /^[A-Za-z\s?]+$/;
const regExpCategory = /^[A-Za-z\-\s?]+$/;

export const validateSurveyName = (field) => {
    if (regExpSurveyName.test(field) && field.trim() !== "") {
      return true;
    } else {
      return false;
    }
  };

  export const validateCategory = (field) => {
    if (
      regExpCategory.test(field) &&
      field.trim() !== "" &&
      (field === "Privada" ||
        field === "Publica" )

    ) {
      return true;
    } else {
      return false;
    }
  };
