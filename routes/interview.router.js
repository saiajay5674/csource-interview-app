const express = require('express');
const router = express.Router();
const Interview = require("../models/interview");

router.patch('/complete/:id', (req, res, next) => {
    console.log(req.params.id);
    Interview.updateOne(
        { _id: req.params.id },
        { $set: { complete: true } },
        (error, result) => {
          if (error) {
            return res.status(500).json(error);
          }

          return res.status(200).json(result);
        }
      );
});

router.delete('/:id', (req, res, next) => {

  Interview.remove({ _id: req.params.id }, (error, result) => {
    if (error) {
      console.log("Error");
      res.json(error);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;