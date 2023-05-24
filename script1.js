$(document).ready(function() {
    // Array para almacenar los productos
    var products = [];

    // Variable para almacenar el índice del producto en edición
    var editingIndex = -1;

    // Obtener los elementos del formulario
    var nameInput = $('#nameInput');
    var quantityInput = $('#quantityInput');
    var descriptionInput = $('#descriptionInput');
    var imageInput = $('#imageInput');

    // Función para agregar un producto
    function addProduct() {
      // Crear un nuevo objeto de producto
      var product = {
        name: nameInput.val(),
        quantity: quantityInput.val(),
        description: descriptionInput.val(),
        image: URL.createObjectURL(imageInput[0].files[0]) // Obtener la URL de la imagen
      };

      // Agregar el producto al array
      products.push(product);

      // Limpiar los campos del formulario
      clearForm();

      // Actualizar la tabla de productos
      renderProductTable();
    }
          // Función para eliminar un producto
          function deleteProduct(index) {
      // Eliminar el producto del array
      products.splice(index, 1);

      // Actualizar la tabla de productos
      renderProductTable();
    }

    // Función para editar un producto
    function editProduct(index) {
      // Obtener el producto del array según el índice
      var product = products[index];

      // Rellenar los campos del formulario con los datos del producto
      nameInput.val(product.name);
      quantityInput.val(product.quantity);
      descriptionInput.val(product.description);
      imageInput.val(''); // Limpiar el campo de imagen, no se mostrará la imagen anterior

      // Mostrar los botones de actualización y cancelar
      $('#updateButton').show();
      $('#cancelButton').show();

      // Ocultar el botón de agregar
      $('button[type="submit"]').hide();

      // Guardar el índice del producto en edición
      editingIndex = index;
    }

    // Función para actualizar un producto
    function updateProduct() {
      // Obtener el producto del array según el índice de edición
      var product = products[editingIndex];

      // Actualizar los datos del producto con los valores del formulario
      product.name = nameInput.val();
      product.quantity = quantityInput.val();
      product.description = descriptionInput.val();
      product.image = URL.createObjectURL(imageInput[0].files[0]);

      // Limpiar los campos del formulario
      clearForm();

      // Actualizar la tabla de productos
      renderProductTable();

      // Restaurar el formulario a su estado original
      $('#updateButton').hide();
      $('#cancelButton').hide();
      $('button[type="submit"]').show();

      // Restablecer el índice de edición
      editingIndex = -1;
    }

    // Función para cancelar la edición de un producto
    function cancelEdit() {
      // Limpiar los campos del formulario
      clearForm();

      // Restaurar el formulario a su estado original
      $('#updateButton').hide();
      $('#cancelButton').hide();
      $('button[type="submit"]').show();

      // Restablecer el índice de edición
      editingIndex = -1;
    }

    // Función para limpiar los campos del formulario
    function clearForm() {
      nameInput.val('');
      quantityInput.val('');
      descriptionInput.val('');
      imageInput.val('');
    }

    // Función para renderizar la tabla de productos
    function renderProductTable() {
      var tableBody = $('#productTableBody');
      tableBody.empty(); // Limpiar el contenido de la tabla

      // Recorrer el array de productos y agregar cada producto a la tabla
      $.each(products, function(index, product) {
        // Crear una nueva fila en la tabla
        var row = $('<tr>');

        // Agregar la imagen del producto
        var imageCell = $('<td>').html('<img src="' + product.image + '" width="150">');
        row.append(imageCell);

        // Agregar el nombre del producto
        var nameCell = $('<td>').text(product.name);
        row.append(nameCell);

        // Agregar la descripción del producto
        var descriptionCell = $('<td>').text(product.description);
        row.append(descriptionCell);

        // Agregar la cantidad del producto
        var quantityCell = $('<td>').text(product.quantity);
        row.append(quantityCell);

                  // Agregar las acciones de editar y eliminar
                  var actionsCell = $('<td>').html('<button class="btn btn-primary btn-sm edit-btn">Editar</button> <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>');
        row.append(actionsCell);

        // Agregar la fila a la tabla
        tableBody.append(row);
      });

      // Asignar eventos a los botones de editar y eliminar
      $('.edit-btn').click(function() {
        var index = $(this).closest('tr').index();
        editProduct(index);
      });

      $('.delete-btn').click(function() {
        var index = $(this).closest('tr').index();
        deleteProduct(index);
      });
    }

    // Evento para manejar la carga del formulario
    $('#productForm').submit(function(e) {
      e.preventDefault(); // Evitar el envío del formulario

      if (editingIndex === -1) {
        // Si no se está editando un producto, agregar uno nuevo
        addProduct();
      } else {
        // Si se está editando un producto, actualizarlo
        updateProduct();
      }
    });

    // Evento para manejar la cancelación de la edición
    $('#cancelButton').click(function() {
      cancelEdit();
    });
  });