const db = require('./db-config');
const {nanoid} = require('nanoid');

const Articles = db.articles;

exports.home = (req, res) => {
  const title = req.query.title;
  const condition = title ? {
    title: {
      $regex: new RegExp(title),
      $options: 'i',
    },
  } : {};

  Articles.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
          err.message || 'Some error occurred while retrieving Articles.',
        });
      });
};

exports.add = (req, res) => {
  const article = new Articles({
    _id: nanoid(5),
    title: req.body.title,
    article: req.body.article,
  });

  article
      .save(article)
      .then((data1) => {
        res.send(data1);
      })
      .catch((err) => {
        res.status(500).send({
          message:
    err.message || 'Some error occurred while creating the Article.',
        });
      });
};


exports.findOne = (req, res) => {
  Articles.findById({
    _id: req.params.id,
  })
      .then((data) => {
        if (!data) {
          res.status(404).send({message: 'Not found Article with id ' + id});
        } else res.send(data);
      })
      .catch((err) => {
        res
            .status(500)
            .send({message: 'Error retrieving Article with id=' + id});
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Articles.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Article with id=${id}. Maybe Article was not found!`,
          });
        } else res.send({message: 'Article was updated successfully.'});
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating Article with id=' + id,
        });
      });
};

exports.delete = (req, res) => {
  Articles.findByIdAndRemove({
    _id: req.params.id,
  })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
          });
        } else {
          res.send({
            message: 'Article was deleted successfully!',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Article with id=' + id,
        });
      });
};