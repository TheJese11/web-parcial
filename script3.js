// Aquí va el código JavaScript
$(document).ready(function() {
  // Arreglo para almacenar los roles registrados
  var roles = [];

  // Evento submit del formulario de registro
  $('#registroForm').submit(function(e) {
    e.preventDefault();

    // Obtener los valores ingresados en el formulario
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var usuario = $('#usuario').val();
    var rol = $('#rol').val();
    var estado = $('input[name="estado"]:checked').val();
    var fechaLimite = $('#fechaLimite').val();
    var fechaRegistro = getCurrentDate();
    var diasRestantes = calculateRemainingDays(fechaRegistro, fechaLimite);

    // Crear un objeto con los datos del rol
    var nuevoRol = {
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      rol: rol,
      estado: estado,
      fechaLimite: fechaLimite,
      fechaRegistro: fechaRegistro,
      diasRestantes: diasRestantes
    };

    // Agregar el nuevo rol al arreglo
    roles.push(nuevoRol);

    // Limpiar los campos del formulario
    $('#nombre').val('');
    $('#apellido').val('');
    $('#usuario').val('');
    $('#rol').val('');
    $('input[name="estado"]').prop('checked', false);
    $('#fechaLimite').val('');

    // Actualizar la tabla de roles
    updateRolesTable();

    // Mostrar mensaje de éxito
    alert('El rol ha sido registrado exitosamente.');
  });

  // Función para actualizar la tabla de roles
  function updateRolesTable() {
    var tableBody = $('#rolesTabla');

    // Limpiar la tabla
    tableBody.empty();

    // Recorrer el arreglo de roles y agregar cada uno como una fila en la tabla
    roles.forEach(function(rol) {
      var row = $('<tr>');
      row.append($('<td>').text(rol.nombre));
      row.append($('<td>').text(rol.apellido));
      row.append($('<td>').text(rol.usuario));
      row.append($('<td>').text(rol.rol));
      row.append($('<td>').html(createEstadoButton(rol.estado)));
      row.append($('<td>').text(rol.fechaLimite));
      row.append($('<td>').text(rol.fechaRegistro));
      row.append($('<td>').text(rol.diasRestantes));
      row.append($('<td>').html(createAccionesButton(rol.estado)));

      tableBody.append(row);
    });
  }

  // Función para crear el botón de estado
  function createEstadoButton(estado) {
    var buttonClass = estado === 'Activo' ? 'btn-success' : 'btn-secondary';
    return '<button type="button" class="btn ' + buttonClass + '">' + estado + '</button>';
  }

  // Función para crear el botón de acciones
  function createAccionesButton(estado) {
    var buttonClass = estado === 'Activo' ? 'btn btn-danger' : 'btn btn-success';
    var buttonText = estado === 'Activo' ? 'Deshabilitar' : 'Habilitar';
    return '<button type="button" class="' + buttonClass + '">' + buttonText + '</button>';
  }

  // Función para obtener la fecha actual en formato 'dd/mm/yyyy'
  function getCurrentDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; // Los meses comienzan desde 0
    var year = today.getFullYear();

// Formatear la fecha
var formattedDate = padNumber(day) + '/' + padNumber(month) + '/' + year;

return formattedDate;
}

// Función para calcular los días restantes entre dos fechas
function calculateRemainingDays(fechaInicio, fechaLimite) {
var fechaInicioObj = new Date(fechaInicio);
var fechaLimiteObj = new Date(fechaLimite);

// Calcular la diferencia en milisegundos entre las dos fechas
var diffMs = fechaLimiteObj - fechaInicioObj;

// Convertir la diferencia en días
var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

return diffDays;
}

// Función para agregar un cero delante de un número si es necesario
function padNumber(num) {
return num.toString().padStart(2, '0');
}

// Evento click del botón de acciones en la tabla
$('#rolesTabla').on('click', '.btn', function() {
var rowIndex = $(this).closest('tr').index();
var estado = roles[rowIndex].estado;

// Cambiar el estado del rol y actualizar la tabla
roles[rowIndex].estado = estado === 'Activo' ? 'Inactivo' : 'Activo';
updateRolesTable();
});

// Función para inicializar la página
function initializePage() {
// Obtener los roles del almacenamiento local
var rolesStr = localStorage.getItem('roles');

// Si existen roles almacenados, cargarlos en el arreglo
if (rolesStr) {
roles = JSON.parse(rolesStr);
}

// Actualizar la tabla de roles
updateRolesTable();
}

// Llamar a la función para inicializar la página
initializePage();
});