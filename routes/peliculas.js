var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    req.db.query("SELECT * FROM pelicula", (err, result) => {
        if (err)
            res.send({ msg: "Error al realizar consulta" });
        else
            res.send(result);
    });
});

router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("SELECT * FROM pelicula WHERE id = " + id, (err, result) => {
        if (err) {
            res.send({ msg: "Error al realizar consulta" });
        } else {
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.status(404).send({ msg: "Pelicula no encontrada" });
            }
        }
    });
});

router.post("/", (req, res, next) => {
    let body = req.body;
    req.db.query("INSERT INTO pelicula SET nombre = ?, calificacion = ?, sinopsis = ?, genero = ?, duracion = ?"
        , [body.nombre, body.calificacion, body.sinopsis, body.genero, body.duracion]
        , (err, result) => {
            if (err) {
                console.log(err);
                res.send({ success: false });
            } else {
                res.send({ success: true });
            }

        });
});

router.put("/:id", (req, res, next) => {
    let id = req.params.id;
    let body = req.body;

    req.db.query("UPDATE pelicula SET nombre = ?, calificacion = ?, sinopsis = ?, genero = ?, duracion = ?"
        , [body.nombre, body.calificacion, body.sinopsis, body.genero, body.duracion]
        , (err, result) => {
            if (err) {
                res.send({ success: false });
            } else {
                res.send({ success: true });
            }
        });
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id;

    req.db.query("DELETE FROM pelicula WHERE id = " + id, (err, result) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });

});

module.exports = router