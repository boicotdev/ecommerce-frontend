import toast from "react-hot-toast";

export function formatPrice(price) {
  // Convertir el número a una cadena
  let priceStr = price.toString();
  // Expresión regular para insertar puntos cada tres dígitos
  let formattedprice = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedprice;
}

// capitalize the given string name
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// state into the localStorage
export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// get the state from localStorage
export function loadState(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
}

export function checkPasswordFunc(password, passwordConfirmation) {
  if (password !== passwordConfirmation) {
    toast.error("Las contraseñas no coinciden");
    throw new Error("Passwords do not match");
  }
}

export function validateData(data) {
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value === undefined || value === null) {
      toast.error(`${key} is required!`);
      throw new Error(`Field ${key} is required`);
    }
  });
}

// clean fields from the form
export function resetForm(formId) {
  // Get the form by ID
  const form = document.getElementById(formId);

  // Getting all input fields into the form
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    switch (input.type) {
      case "text":
      case "email":
      case "number":
      case "password":
      case "tel":
        // set blank all input of type email, text, etc
        input.value = "";
        break;
      case "checkbox":
      case "radio":
        // Unselect checkboxes and radios inputs
        input.checked = false;
        break;
      case "file":
        input.value = null;
        break;
      default:
        break;
    }
  });

  const textareas = form.querySelectorAll("textarea");
  textareas.forEach((textarea) => (textarea.value = ""));

  const selects = form.querySelectorAll("select");
  selects.forEach((select) => (select.selectedIndex = 0));
}

/***
 * Take the firstname and lastname
 * convert this fields on lowercase
 * remove blank spaces and replace by a dot
 * Params String
 * Returns String
 */
export function setUserName(firstname, lastname) {
  const firstnameTrimmed = firstname.trim();
  const lastnameTrimmed = lastname.trim();
  const firstnameSplit = firstnameTrimmed.split(" ");
  const lastnameSplit = lastnameTrimmed.split(" ");
  const username = [...firstnameSplit, ...lastnameSplit].join(".");
  return username;
}



/**
 * 
 * @param {*} date 
 * @returns new Date object
 */
export const formatDate = (date) => {
  const tempDate = new Date(date);
  return tempDate.toISOString().slice(0, 10);
};

export default formatDate;


export function checkStateWhenUserOpenedANewWindow() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const { username, is_superuser } = user;
  const userSession = user && username;
  return  {userSession, is_superuser}
}