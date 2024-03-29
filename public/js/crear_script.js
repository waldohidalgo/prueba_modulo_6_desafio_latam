$(function () {
  const ubicacion = location.pathname;

  if (ubicacion == "/crear") {
    getData();

    $("#formModalEditar").on("submit", (e) => {
      e.preventDefault();
      const id = $("#idModal").val();
      edit(id);
    });
  }
});

function getData() {
  axios
    .get("/leer")
    .then((data) => {
      let deportes = data.data.data;

      if (deportes.length > 0) {
        $("#cuerpo_crear").html("");
        deportes.forEach((d, i) => {
          $("#cuerpo_crear").append(`
          <tr>
            <th scope="row">${d.id}</th>
            <td class="td_break_word">${d.nombre}</td>
            <td class="td_break_word">${d.precio}</td>
            <td>
              <button class="btn btn-warning" onclick='preEdit("${d.id}","${d.nombre}","${d.precio}")' data-bs-toggle="modal"  data-bs-target="#exampleModal"><i class="bi bi-pencil-fill"></i> Editar</button>
            </td>
            <td>
            <button class="btn btn-danger" onclick='eliminar("${d.id}")'><i class="bi bi-trash-fill"></i> Eliminar</button>
            </td>
          </tr>
          `);
        });
      } else {
        $("#cuerpo_crear").html("");
        $("#cuerpo_crear").append(`
        <td colspan="5" class="text-center bg-light p-3">
          Ingresa deportes para que se
          muestren aquí
        </td>
          `);
      }
    })
    .catch((err) => console.log(err));
}

function preEdit(id, nombre, precio) {
  $("#idModal").val(id);
  $("#nombreModal").val(nombre);
  $("#precioModal").val(precio);
}

function edit(id) {
  let precio = $("#precioModal").val();

  axios.get(`/editar?id=${id}&precio=${precio}`).then((data) => {
    getData();
    alert(data.data);
  });
  $("#exampleModal").modal("hide");
}

function eliminar(id) {
  axios
    .get(`/eliminar?id=${id}`)
    .then((data) => {
      alert(data.data);
      getData();
    })
    .catch((err) => console.log(err));
  $("#exampleModal").modal("hide");
}
