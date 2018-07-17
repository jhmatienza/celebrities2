const createError = require('http-errors');
const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity.model');
const Comment = require('../models/comment.model');

module.exports.doCreate = (req, res, next) => {
  const id = req.body.celebrity;

  Celebrity.findById(id)
    .then(celebrity => {
      if (celebrity) {
        let comment = new Comment({
          title: req.body.title,
          text: req.body.text,
          celebrity: celebrity._id
        });

        comment.save()
          .then(() => {
            celebrity.comments.push(comment);

            return celebrity.save();
          })
          .then(() => {
            res.redirect(`/celebrities/${id}`)
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('celebrities/detail', { 
                celebrity: celebrity,
                comment: comment,
                errors: error.errors
              });
            } else {
              next(error);
            }
          })
      } else {
        next(createError(404, `Celebrity with id ${id} not found`));
      }
  })
  .catch(error => {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(404, `Celebrity with id ${id} not found`));
    } else {
      next(error);
    }
  });
}
