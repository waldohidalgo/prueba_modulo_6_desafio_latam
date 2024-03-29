const express = require("express");
const router = express.Router();
const path = require("path");
const {
  agregarDeporte,
  leerDeportes,
  editarDeporte,
  eliminarDeporte,
} = require("../controllers/index");
router.use(
  "/bootstrap_css",
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "css")
  )
);

router.use(
  "/bootstrap_js",
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "js")
  )
);

router.use(
  "/jquery",
  express.static(path.join(__dirname, "..", "node_modules", "jquery", "dist"))
);

router.use(
  "/axios",
  express.static(path.join(__dirname, "..", "node_modules", "axios", "dist"))
);

router.use(
  "/bootstrap_icons",
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap-icons", "font")
  )
);

router.use("/public", express.static(path.join(__dirname, "..", "public")));

router.get("/", (req, res) => {
  res.render("inicio");
});

router.get("/crear", (req, res) => {
  res.render("crear");
});
router.get("/agregar_deporte", agregarDeporte);
router.get("/leer", leerDeportes);
router.get("/editar", editarDeporte);
router.get("/eliminar", eliminarDeporte);

router.get("/*", (req, res) => {
  res.render("error_404");
});

module.exports = router;
