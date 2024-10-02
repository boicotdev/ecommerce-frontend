import toast from "react-hot-toast";


export function formatPrice(price) {
  // Convertir el número a una cadena
  let priceStr = price.toString();
  // Expresión regular para insertar puntos cada tres dígitos
  let formattedprice = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedprice;
}


// capitalize the given category name
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  export function saveState(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function loadState(key) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
  }
  
  
  export function checkPasswordFunc(password, passwordConfirmation) {
      if (password !== passwordConfirmation) {
          toast.error("Las contraseñas no coinciden");
          throw new Error("Passwords do not match");
      }
  }
  
  export function validateData(data) {
      Object.keys(data).forEach(key => {
          const value = data[key];
          if (value === undefined || value === null) {
              toast.error(`${key} is required!`);
              throw new Error(`Field ${key} is required`);
          }
      })
  }
  
  
  
  // clean fields from the form 
  export function resetForm(formId) {
      // Obtener el formulario por su ID
      const form = document.getElementById(formId);
  
      // Obtener todos los inputs dentro del formulario
      const inputs = form.querySelectorAll('input');
  
      inputs.forEach(input => {
          switch (input.type) {
              case 'text':
              case 'email':
              case 'number':
              case 'password':
              case 'tel':
                  // Dejar en blanco los campos de texto, email, etc.
                  input.value = '';
                  break;
              case 'checkbox':
              case 'radio':
                  // Deseleccionar checkboxes y radios
                  input.checked = false;
                  break;
              default:
                  break;
          }
      });
  
      const textareas = form.querySelectorAll('textarea');
      textareas.forEach(textarea => textarea.value = '');
  
      const selects = form.querySelectorAll('select');
      selects.forEach(select => select.selectedIndex = 0);
  }
  
  // set username
  export function setUserName(firstname, lastname) {
    const firstnameTrimmed = firstname.trim();
    const lastnameTrimmed = lastname.trim();
    const firstnameSplit = firstnameTrimmed.split(" ");
    const lastnameSplit = lastnameTrimmed.split(" ");
    const username = [...firstnameSplit, ...lastnameSplit].join(".");
    return username;
  }