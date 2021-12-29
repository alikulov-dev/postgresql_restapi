const express = require('express');
const models = require('../db/connection')
const db = require('../db/connection');
var router = express.Router();
const Author = db.Author;
const Op = db.Sequelize.Op;

router.get('/', (req, res) => {
    res.send('Hello World, this is an author page');
    console.log("Server Sent A Hello World!");
});

router.post('/create', (req, res) => {
    // Create a Tutorial
    const tutorial = {
        name: req.body.name,
        tel_number: req.body.tel_number,
        sciense: req.body.sciense
    };
    // Save Tutorial in the database
    Author.create(tutorial)
        .then(data => {
            res.status(200).send({ status: 200, data: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
});


router.get('/list', (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    console.log(condition)
    Author.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
});
router.get('/list_with_blogs', (req, res) => {
    models.sequelize.query(`SELECT auth.id,auth.name,auth.tel_number,auth.sciense,blo.id,blo.name as blog_name,blo.author_id
	                        FROM public."Author" as auth
	                        INNER JOIN public."Blog" as blo on auth.id=blo.author_id;`, { type:models.Sequelize.QueryTypes.SELECT})
   .then(function(properties) {
      res.json(properties)
  })
});
router.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Author.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Author was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Author with id=" + id
            });
        });
})

router.get('/getone/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    Author.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Author with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Author with id=" + id
            });
        });
});

router.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, tel_number, sciense } = req.body;

    const newValues = {
        name: req.body.name,
        tel_number: req.body.tel_number,
        sciense: req.body.sciense
    };

    Author.update(newValues, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Author was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Author with id=" + id
            });
        });
});

module.exports = router;