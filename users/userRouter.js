const express = require('express');

const db = require('./userDb.js');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  res.send(`<h2>Users</h2>`);

});

router.post('/:id/posts', validatePost, (req, res) => {
  db.insertComment(comment)
  .then(result => {
    comment.comment_id = result.id;
    res.status(201).json({
      success: true,
      result: comment
    });
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error
    });
  });
});

router.get('/', (req, res) => {
  res.send(`<h2>Users</h2>`);

});

router.get('/:id', validateUserId, (req, res) => {
  res.send(`<h2>Users</h2>`);
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
  .then(comments => {
    if (comments && comments.length) {
      res.status(200).json({
        success: true,
        comments: comments
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'The post with the specified ID does not exist.'
      });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'The comments information could not be retrieved',
    });
  })
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  db.getById(id)
  .then(user => {
    console.log((user))
    if (user === undefined) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid User ID.' 
      });
    } else{
      req.user = user;
      next();
    }
  })
  .catch(error => {
    console.log('error');
    })
};

function validateUser(req, res, next) {
  if (!req.body || !req.body.name) {
    let msg = Object.keys(req.body).length === 0 ?
      'Missing User Data' :
      'Missing Required Name Field'
    res.status(400).json({
      success: false,
      errorMessage: msg
    });
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!req.body || !req.body.text) {
    let msg = Object.keys(req.body).length === 0 ?
      'Missing Post Data' :
      'Missing Required Text Field'
    res.status(400).json({
      success: false,
      errorMessage: msg
    });
  } else {
    next();
  }
};

module.exports = router;
