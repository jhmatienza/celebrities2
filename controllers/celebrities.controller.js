const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');
const Comment = require('../models/comment.model');

module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { 
        celebrities
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports.get = (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .populate('comments')
    .then(celebrity => {
      if (celebrity) {
        res.render('celebrities/detail', {
          celebrity,
          comment: new Comment()
        });
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

module.exports.create = (req, res, next) => {
  res.render('celebrities/create', {
    celebrity: new Celebrity()
  });
}

module.exports.doCreate = (req, res, next) => {
  const celebrity = new Celebrity(req.body);

  celebrity.save()
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('celebrities/create', { 
          celebrity: celebrity,
          errors: error.errors
        });
      } else {
        next(error);
      }
    });
}

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  
  Celebrity.findById(id)
    .then(celebrity => {
      if (celebrity) {
        res.render('celebrities/update', {
          celebrity
        });
      } else {
        next(createError(404, `Celebrity with id ${id} not found`));
      }
    })
    .catch(error => next(error));
}

module.exports.doUpdate = (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      if (celebrity) {
        Object.assign(celebrity, req.body);

        celebrity.save()
          .then(() => {
            res.redirect(`/celebrities/${id}`);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('celebrities/create', { 
                celebrity: celebrity,
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
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => next(error));
}