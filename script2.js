// Evento para manejar la carga del formulario
document
  .getElementById("birthdayForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el envío del formulario

    // Obtener los elementos del formulario
    var nameInput = document.getElementById("nameInput");
    var birthdayInput = document.getElementById("birthdayInput");
    var imageInput = document.getElementById("imageInput");

    // Crear un nuevo elemento de cumpleaños
    var birthdayItem = document.createElement("li");
    birthdayItem.classList.add("birthday-item");

    // Crear un span para mostrar el nombre
    var nameSpan = document.createElement("span");
    nameSpan.textContent = nameInput.value;

    // Crear un span para mostrar la edad
    var ageSpan = document.createElement("span");
    ageSpan.textContent = calcularEdad(birthdayInput.value) + " años";

    // Crear un contenedor para la imagen
    var imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    // Crear la etiqueta de imagen
    var image = document.createElement("img");
    image.src = URL.createObjectURL(imageInput.files[0]);

    // Agregar la imagen al contenedor
    imageContainer.appendChild(image);

    // Crear botones para editar y eliminar
    var editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("btn", "btn-sm", "btn-primary");
    editButton.addEventListener("click", function () {
      nameInput.value = nameSpan.textContent; // Prellenar el nombre en el formulario para editar
      birthdayInput.value = ""; // Limpiar la fecha de nacimiento
      imageInput.value = ""; // Limpiar la imagen
      birthdayItem.remove(); // Eliminar el cumpleaños de la lista
    });

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("btn", "btn-sm", "btn-danger", "ml-2");
    deleteButton.addEventListener("click", function () {
      if (confirm("¿Estás seguro de que quieres eliminar este cumpleaños?")) {
        birthdayItem.remove();
      }
    });

    // Agregar los elementos al elemento de cumpleaños
      birthdayItem.appendChild(imageContainer);
      birthdayItem.appendChild(nameSpan);
       birthdayItem.appendChild(ageSpan);
       birthdayItem.appendChild(editButton);
       birthdayItem.appendChild(deleteButton);

    // Agregar el elemento de cumpleaños a la lista
    var birthdayList = document.getElementById("birthdayList");
    birthdayList.appendChild(birthdayItem);

    // Limpiar el formulario
    nameInput.value = "";
    birthdayInput.value = "";
    imageInput.value = "";
  });

// Función para calcular la edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  var fechaActual = new Date();
  var fechaNac = new Date(fechaNacimiento);
  var edad = fechaActual.getFullYear() - fechaNac.getFullYear();
  var mes = fechaActual.getMonth() - fechaNac.getMonth();
  if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
    edad--;
  }
  return edad;
}
