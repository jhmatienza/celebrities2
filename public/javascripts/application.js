function renderFormErrors(errorsJSON) {
  let errors = JSON.parse(errorsJSON);

  Object.keys(errors).forEach((field => {
    let input = document.getElementById(field);
    let msg = errors[field].message;

    input.classList.add("is-invalid");

    toastr.error(msg);
  }));
}

// Listeners

window.onload = function() {
  document.querySelectorAll("[data-confirm]").forEach((element) => {
    element.onclick = function(event) {
      let msg = element.dataset.confirm;

      if (!confirm(msg)) {
        event.preventDefault();
      }
    }
  });

  document.querySelectorAll("form[data-errors]").forEach((element) => {
    if (element.dataset.errors.length > 0) {
      renderFormErrors(element.dataset.errors);
    }
  });
}
















