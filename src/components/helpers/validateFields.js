const regExpSurveyName = /^[A-Za-z\s?]+$/;
const regExpCategory = /^[A-Za-z\s\s?]+$/;

export const validateSurveyName = (field) => {
    if (regExpSurveyName.test(field) && field.trim() !== "") {
        return true;
    } else {
        console.log("ValidateName");
      return false;
    }
  };

  export const validateCategory = (field) => {
    if (
      /* regExpCategory.test(field) && */
      field.trim() !== "" /* &&
      (field === "Privada" ||
        field === "Publica" ) */

    ) {
      return true;
    } else {
        console.log("ValidateCat");
      return false;
    }
  };

  