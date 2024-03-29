const fs = require("fs");

function agregarDeporte(req, res) {
  const deporte = { id: 1, nombre: req.query.nombre, precio: req.query.precio };

  fs.readFile("deportes.json", "utf-8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        const objetoArchivo = JSON.stringify({ data: [deporte] });

        fs.writeFile("deportes.json", objetoArchivo, (err) => {
          if (err) {
            console.log(err);
          }
          res.redirect("/crear");
        });
      } else {
        console.log("Error desconocido:", err);
      }
    } else {
      const deportes = JSON.parse(data)["data"];
      const newDeporte = {
        id: deportes.length + 1,
        nombre: deporte.nombre,
        precio: deporte.precio,
      };

      deportes.push(newDeporte);
      fs.writeFile(
        "deportes.json",
        JSON.stringify({ data: deportes }),
        (err) => {
          if (err) {
            console.log(err);
          }
          res.redirect("/crear");
        }
      );
    }
  });
}

function leerDeportes(req, res) {
  fs.readFile("deportes.json", (err, data) => {
    if (err) {
      res.render("editar_error", {
        error:
          "Archivo Deportes.json no ha sido encontrado.Debes crear un deporte en <a href='/crear'>Crear deporte</a>",
      });
      return;
    }
    res.status(200).json(JSON.parse(data));
  });
}

function editarDeporte(req, res) {
  const { id, precio } = req.query;
  if (!id) {
    res.render("editar_error", {
      error:
        "Falta el ID. Debes seleccionar un deporte en <a href='/crear'>Crear deporte</a>",
    });
    return;
  }
  fs.readFile("deportes.json", (err, data) => {
    if (err) {
      console.log(err);
      res.render("editar_error", {
        error:
          "Archivo Deportes.json no ha sido encontrado. Debes crear un deporte en <a href='/crear'>Crear deporte</a>",
      });
      return;
    }
    const deportes = JSON.parse(data)["data"];
    const deporte = deportes.find((d) => d.id == id);
    if (!deporte) {
      res.render("editar_error", {
        error: `Elemento de ${id} no encontrado. Debes seleccionar un deporte en <a href='/crear'>Crear deporte</a>`,
      });
      return;
    }
    if (!precio) {
      res.render("editar_error", {
        error:
          "Falta el precio. Debes ingresar un precio en <a href='/crear'>Crear deporte</a>",
      });
      return;
    }
    deporte.precio = precio;
    fs.writeFile("deportes.json", JSON.stringify({ data: deportes }), (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send("Elemento de ID: " + id + " editado con éxito");
    });
  });
}

function eliminarDeporte(req, res) {
  const { id } = req.query;

  if (!id) {
    res.render("editar_error", {
      error:
        "Falta el ID. Debes seleccionar un deporte en <a href='/crear'>Crear deporte</a>",
    });
    return;
  }
  fs.readFile("deportes.json", (err, data) => {
    if (err) {
      console.log(err);
      res.render("editar_error", {
        error:
          "Archivo Deportes.json no ha sido encontrado. Debes crear un deporte en <a href='/crear'>Crear deporte</a>",
      });
      return;
    }
    const deportes = JSON.parse(data)["data"];
    const deporte = deportes.find((d) => d.id == +id);
    const indiceElementoToDelete = deportes.indexOf(deporte);

    if (!deporte) {
      res.render("editar_error", {
        error: `Elemento de ${id} no encontrado. Debes seleccionar un deporte en <a href='/crear'>Crear deporte</a>`,
      });
      return;
    }
    deportes.splice(indiceElementoToDelete, 1);
    fs.writeFile("deportes.json", JSON.stringify({ data: deportes }), (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send("Elemento de ID: " + id + " eliminado con exito");
    });
  });
}

module.exports = {
  agregarDeporte,
  leerDeportes,
  editarDeporte,
  eliminarDeporte,
};
